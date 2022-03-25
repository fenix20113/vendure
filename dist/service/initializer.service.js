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
exports.InitializerService = void 0;
const common_1 = require("@nestjs/common");
const administrator_service_1 = require("./services/administrator.service");
const channel_service_1 = require("./services/channel.service");
const global_settings_service_1 = require("./services/global-settings.service");
const role_service_1 = require("./services/role.service");
const shipping_method_service_1 = require("./services/shipping-method.service");
/**
 * Only used internally to run the various service init methods in the correct
 * sequence on bootstrap.
 */
let InitializerService = class InitializerService {
    constructor(channelService, roleService, administratorService, shippingMethodService, globalSettingsService) {
        this.channelService = channelService;
        this.roleService = roleService;
        this.administratorService = administratorService;
        this.shippingMethodService = shippingMethodService;
        this.globalSettingsService = globalSettingsService;
    }
    async onModuleInit() {
        // IMPORTANT - why manually invoke these init methods rather than just relying on
        // Nest's "onModuleInit" lifecycle hook within each individual service class?
        // The reason is that the order of invokation matters. By explicitly invoking the
        // methods below, we can e.g. guarantee that the default channel exists
        // (channelService.initChannels()) before we try to create any roles (which assume that
        // there is a default Channel to work with.
        await this.globalSettingsService.initGlobalSettings();
        await this.channelService.initChannels();
        await this.roleService.initRoles();
        await this.administratorService.initAdministrators();
        await this.shippingMethodService.initShippingMethods();
    }
};
InitializerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        role_service_1.RoleService,
        administrator_service_1.AdministratorService,
        shipping_method_service_1.ShippingMethodService,
        global_settings_service_1.GlobalSettingsService])
], InitializerService);
exports.InitializerService = InitializerService;
//# sourceMappingURL=initializer.service.js.map