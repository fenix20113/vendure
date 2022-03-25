"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManagerModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("./config.module");
const config_service_1 = require("./config.service");
/**
 * The coreCacheModule is imported internally by the CacheManagerModule. It is arranged in this way so that
 * there is only a single instance of this module being instantiated, and thus the lifecycle hooks will
 * only run a single time.
 */
const coreCacheModule = common_1.CacheModule.registerAsync({
    imports: [config_module_1.ConfigModule],
    useFactory: async (configService) => {
        return configService.cacheOptions;
    },
    inject: [config_service_1.ConfigService],
});
let CacheManagerModule = class CacheManagerModule {
};
CacheManagerModule = __decorate([
    common_1.Module({
        imports: [coreCacheModule],
        exports: [coreCacheModule],
    })
], CacheManagerModule);
exports.CacheManagerModule = CacheManagerModule;
//# sourceMappingURL=cache-manager.module.js.map