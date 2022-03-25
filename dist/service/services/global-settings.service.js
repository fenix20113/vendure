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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSettingsService = void 0;
const common_1 = require("@nestjs/common");
const request_context_1 = require("../../api/common/request-context");
const errors_1 = require("../../common/error/errors");
const config_service_1 = require("../../config/config.service");
const global_settings_entity_1 = require("../../entity/global-settings/global-settings.entity");
const custom_field_relation_service_1 = require("../helpers/custom-field-relation/custom-field-relation.service");
const patch_entity_1 = require("../helpers/utils/patch-entity");
const transactional_connection_1 = require("../transaction/transactional-connection");
let GlobalSettingsService = class GlobalSettingsService {
    constructor(connection, configService, customFieldRelationService) {
        this.connection = connection;
        this.configService = configService;
        this.customFieldRelationService = customFieldRelationService;
    }
    /**
     * Ensure there is a global settings row in the database.
     */
    async initGlobalSettings() {
        try {
            await this.getSettings(request_context_1.RequestContext.empty());
        }
        catch (err) {
            const settings = new global_settings_entity_1.GlobalSettings({
                availableLanguages: [this.configService.defaultLanguageCode],
            });
            await this.connection.getRepository(global_settings_entity_1.GlobalSettings).save(settings, { reload: false });
        }
    }
    async getSettings(ctx) {
        const settings = await this.connection.getRepository(ctx, global_settings_entity_1.GlobalSettings).findOne();
        if (!settings) {
            throw new errors_1.InternalServerError(`error.global-settings-not-found`);
        }
        return settings;
    }
    async updateSettings(ctx, input) {
        const settings = await this.getSettings(ctx);
        patch_entity_1.patchEntity(settings, input);
        await this.customFieldRelationService.updateRelations(ctx, global_settings_entity_1.GlobalSettings, input, settings);
        return this.connection.getRepository(ctx, global_settings_entity_1.GlobalSettings).save(settings);
    }
};
GlobalSettingsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [transactional_connection_1.TransactionalConnection,
        config_service_1.ConfigService,
        custom_field_relation_service_1.CustomFieldRelationService])
], GlobalSettingsService);
exports.GlobalSettingsService = GlobalSettingsService;
//# sourceMappingURL=global-settings.service.js.map