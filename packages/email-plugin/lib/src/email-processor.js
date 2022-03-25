"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailProcessor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const fs_extra_1 = __importDefault(require("fs-extra"));
const attachment_utils_1 = require("./attachment-utils");
const common_2 = require("./common");
const constants_1 = require("./constants");
const handlebars_mjml_generator_1 = require("./handlebars-mjml-generator");
const nodemailer_email_sender_1 = require("./nodemailer-email-sender");
const template_loader_1 = require("./template-loader");
/**
 * This class combines the template loading, generation, and email sending - the actual "work" of
 * the EmailPlugin. It is arranged this way primarily to accommodate easier testing, so that the
 * tests can be run without needing all the JobQueue stuff which would require a full e2e test.
 */
let EmailProcessor = class EmailProcessor {
    constructor(options) {
        this.options = options;
    }
    async init() {
        this.templateLoader = new template_loader_1.TemplateLoader(this.options.templatePath);
        this.emailSender = this.options.emailSender ? this.options.emailSender : new nodemailer_email_sender_1.NodemailerEmailSender();
        this.generator = this.options.emailGenerator
            ? this.options.emailGenerator
            : new handlebars_mjml_generator_1.HandlebarsMjmlGenerator();
        if (this.generator.onInit) {
            await this.generator.onInit.call(this.generator, this.options);
        }
        if (common_2.isDevModeOptions(this.options)) {
            this.transport = {
                type: 'file',
                raw: false,
                outputPath: this.options.outputPath,
            };
        }
        else {
            if (!this.options.transport) {
                throw new core_1.InternalServerError(`When devMode is not set to true, the 'transport' property must be set.`);
            }
            this.transport = this.options.transport;
        }
        if (this.transport.type === 'file') {
            // ensure the configured directory exists before
            // we attempt to write files to it
            const emailPath = this.transport.outputPath;
            await fs_extra_1.default.ensureDir(emailPath);
        }
    }
    async process(data) {
        try {
            const bodySource = await this.templateLoader.loadTemplate(data.type, data.templateFile);
            const generated = await this.generator.generate(data.from, data.subject, bodySource, data.templateVars);
            const emailDetails = Object.assign(Object.assign({}, generated), { recipient: data.recipient, attachments: attachment_utils_1.deserializeAttachments(data.attachments) });
            await this.emailSender.send(emailDetails, this.transport);
            return true;
        }
        catch (err) {
            if (err instanceof Error) {
                core_1.Logger.error(err.message, constants_1.loggerCtx, err.stack);
            }
            else {
                core_1.Logger.error(String(err), constants_1.loggerCtx);
            }
            return false;
        }
    }
};
EmailProcessor = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.EMAIL_PLUGIN_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], EmailProcessor);
exports.EmailProcessor = EmailProcessor;
//# sourceMappingURL=email-processor.js.map