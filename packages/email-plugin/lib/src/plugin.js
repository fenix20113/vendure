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
var EmailPlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailPlugin = void 0;
const core_1 = require("@nestjs/core");
const core_2 = require("@vendure/core");
const common_1 = require("./common");
const constants_1 = require("./constants");
const dev_mailbox_1 = require("./dev-mailbox");
const email_processor_1 = require("./email-processor");
/**
 * @description
 * The EmailPlugin creates and sends transactional emails based on Vendure events. By default it uses an [MJML](https://mjml.io/)-based
 * email generator to generate the email body and [Nodemailer](https://nodemailer.com/about/) to send the emails.
 *
 * ## Installation
 *
 * `yarn add \@vendure/email-plugin`
 *
 * or
 *
 * `npm install \@vendure/email-plugin`
 *
 * @example
 * ```ts
 * import { defaultEmailHandlers, EmailPlugin } from '\@vendure/email-plugin';
 *
 * const config: VendureConfig = {
 *   // Add an instance of the plugin to the plugins array
 *   plugins: [
 *     EmailPlugin.init({
 *       handlers: defaultEmailHandlers,
 *       templatePath: path.join(__dirname, 'vendure/email/templates'),
 *       transport: {
 *         type: 'smtp',
 *         host: 'smtp.example.com',
 *         port: 587,
 *         auth: {
 *           user: 'username',
 *           pass: 'password',
 *         }
 *       },
 *     }),
 *   ],
 * };
 * ```
 *
 * ## Email templates
 *
 * In the example above, the plugin has been configured to look in `<app-root>/vendure/email/templates`
 * for the email template files. If you used `\@vendure/create` to create your application, the templates will have
 * been copied to that location during setup.
 *
 * If you are installing the EmailPlugin separately, then you'll need to copy the templates manually from
 * `node_modules/\@vendure/email-plugin/templates` to a location of your choice, and then point the `templatePath` config
 * property at that directory.
 *
 * ## Customizing templates
 *
 * Emails are generated from templates which use [MJML](https://mjml.io/) syntax. MJML is an open-source HTML-like markup
 * language which makes the task of creating responsive email markup simple. By default, the templates are installed to
 * `<project root>/vendure/email/templates` and can be freely edited.
 *
 * Dynamic data such as the recipient's name or order items are specified using [Handlebars syntax](https://handlebarsjs.com/):
 *
 * ```HTML
 * <p>Dear {{ order.customer.firstName }} {{ order.customer.lastName }},</p>
 *
 * <p>Thank you for your order!</p>
 *
 * <mj-table cellpadding="6px">
 *   {{#each order.lines }}
 *     <tr class="order-row">
 *       <td>{{ quantity }} x {{ productVariant.name }}</td>
 *       <td>{{ productVariant.quantity }}</td>
 *       <td>{{ formatMoney totalPrice }}</td>
 *     </tr>
 *   {{/each}}
 * </mj-table>
 * ```
 *
 * ### Handlebars helpers
 *
 * The following helper functions are available for use in email templates:
 *
 * * `formatMoney`: Formats an amount of money (which are always stored as integers in Vendure) as a decimal, e.g. `123` => `1.23`
 * * `formatDate`: Formats a Date value with the [dateformat](https://www.npmjs.com/package/dateformat) package.
 *
 * ## Extending the default email handlers
 *
 * The `defaultEmailHandlers` array defines the default handlers such as for handling new account registration, order confirmation, password reset
 * etc. These defaults can be extended by adding custom templates for languages other than the default, or even completely new types of emails
 * which respond to any of the available [VendureEvents](/docs/typescript-api/events/). See the {@link EmailEventHandler} documentation for
 * details on how to do so.
 *
 * ## Dev mode
 *
 * For development, the `transport` option can be replaced by `devMode: true`. Doing so configures Vendure to use the
 * file transport (See {@link FileTransportOptions}) and outputs emails as rendered HTML files in the directory specified by the
 * `outputPath` property.
 *
 * ```ts
 * EmailPlugin.init({
 *   devMode: true,
 *   handlers: defaultEmailHandlers,
 *   templatePath: path.join(__dirname, 'vendure/email/templates'),
 *   outputPath: path.join(__dirname, 'test-emails'),
 * })
 * ```
 *
 * ### Dev mailbox
 *
 * In dev mode, a webmail-like interface available at the `/mailbox` path, e.g.
 * http://localhost:3000/mailbox. This is a simple way to view the output of all emails generated by the EmailPlugin while in dev mode.
 *
 * ## Troubleshooting SMTP Connections
 *
 * If you are having trouble sending email over and SMTP connection, set the `logging` and `debug` options to `true`. This will
 * send detailed information from the SMTP transporter to the configured logger (defaults to console). For maximum detail combine
 * this with a detail log level in the configured VendureLogger:
 *
 * ```TypeScript
 * const config: VendureConfig = {
 *   logger: new DefaultLogger({ level: LogLevel.Debug })
 *   // ...
 *   plugins: [
 *     EmailPlugin.init({
 *       // ...
 *       transport: {
 *         type: 'smtp',
 *         host: 'smtp.example.com',
 *         port: 587,
 *         auth: {
 *           user: 'username',
 *           pass: 'password',
 *         },
 *         logging: true,
 *         debug: true,
 *       },
 *     }),
 *   ],
 * };
 * ```
 *
 * @docsCategory EmailPlugin
 */
let EmailPlugin = EmailPlugin_1 = class EmailPlugin {
    /** @internal */
    constructor(eventBus, moduleRef, emailProcessor, jobQueueService) {
        this.eventBus = eventBus;
        this.moduleRef = moduleRef;
        this.emailProcessor = emailProcessor;
        this.jobQueueService = jobQueueService;
    }
    /**
     * Set the plugin options.
     */
    static init(options) {
        this.options = options;
        return EmailPlugin_1;
    }
    /** @internal */
    async onApplicationBootstrap() {
        const options = EmailPlugin_1.options;
        await this.setupEventSubscribers();
        if (!common_1.isDevModeOptions(options) && options.transport.type === 'testing') {
            // When running tests, we don't want to go through the JobQueue system,
            // so we just call the email sending logic directly.
            this.testingProcessor = new email_processor_1.EmailProcessor(options);
            await this.testingProcessor.init();
        }
        else {
            await this.emailProcessor.init();
            this.jobQueue = await this.jobQueueService.createQueue({
                name: 'send-email',
                process: job => {
                    return this.emailProcessor.process(job.data);
                },
            });
        }
    }
    configure(consumer) {
        const options = EmailPlugin_1.options;
        if (common_1.isDevModeOptions(options)) {
            core_2.Logger.info('Creating dev mailbox middleware', constants_1.loggerCtx);
            this.devMailbox = new dev_mailbox_1.DevMailbox();
            consumer.apply(this.devMailbox.serve(options)).forRoutes(options.route);
            this.devMailbox.handleMockEvent((handler, event) => this.handleEvent(handler, event));
            core_2.registerPluginStartupMessage('Dev mailbox', options.route);
        }
    }
    async setupEventSubscribers() {
        for (const handler of EmailPlugin_1.options.handlers) {
            this.eventBus.ofType(handler.event).subscribe(event => {
                return this.handleEvent(handler, event);
            });
        }
    }
    async handleEvent(handler, event) {
        core_2.Logger.debug(`Handling event "${handler.type}"`, constants_1.loggerCtx);
        const { type } = handler;
        try {
            const injector = new core_2.Injector(this.moduleRef);
            const result = await handler.handle(event, EmailPlugin_1.options.globalTemplateVars, injector);
            if (!result) {
                return;
            }
            if (this.jobQueue) {
                await this.jobQueue.add(result);
            }
            else if (this.testingProcessor) {
                await this.testingProcessor.process(result);
            }
        }
        catch (e) {
            core_2.Logger.error(e.message, constants_1.loggerCtx, e.stack);
        }
    }
};
EmailPlugin = EmailPlugin_1 = __decorate([
    core_2.VendurePlugin({
        imports: [core_2.PluginCommonModule],
        providers: [{ provide: constants_1.EMAIL_PLUGIN_OPTIONS, useFactory: () => EmailPlugin_1.options }, email_processor_1.EmailProcessor],
    }),
    __metadata("design:paramtypes", [core_2.EventBus,
        core_1.ModuleRef,
        email_processor_1.EmailProcessor,
        core_2.JobQueueService])
], EmailPlugin);
exports.EmailPlugin = EmailPlugin;
//# sourceMappingURL=plugin.js.map