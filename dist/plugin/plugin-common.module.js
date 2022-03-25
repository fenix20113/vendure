"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginCommonModule = void 0;
const common_1 = require("@nestjs/common");
const cache_module_1 = require("../cache/cache.module");
const cache_manager_module_1 = require("../config/cache-manager.module");
const config_module_1 = require("../config/config.module");
const event_bus_module_1 = require("../event-bus/event-bus.module");
const health_check_module_1 = require("../health-check/health-check.module");
const job_queue_module_1 = require("../job-queue/job-queue.module");
const service_module_1 = require("../service/service.module");
/**
 * @description
 * This module provides the common services, configuration, and event bus capabilities
 * required by a typical plugin. It should be imported into plugins to avoid having to
 * repeat the same boilerplate for each individual plugin.
 *
 * The PluginCommonModule exports:
 *
 * * `EventBusModule`, allowing the injection of the {@link EventBus} service.
 * * `ServiceModule` allowing the injection of any of the various entity services such as ProductService, OrderService etc.
 * * `ConfigModule`, allowing the injection of the ConfigService.
 * * `JobQueueModule`, allowing the injection of the {@link JobQueueService}.
 * * `HealthCheckModule`, allowing the injection of the {@link HealthCheckRegistryService}.
 *
 * @docsCategory plugin
 */
let PluginCommonModule = class PluginCommonModule {
};
PluginCommonModule = __decorate([
    common_1.Module({
        imports: [
            event_bus_module_1.EventBusModule,
            config_module_1.ConfigModule,
            service_module_1.ServiceModule.forPlugin(),
            job_queue_module_1.JobQueueModule,
            health_check_module_1.HealthCheckModule,
            cache_module_1.CacheModule,
            cache_manager_module_1.CacheManagerModule
        ],
        exports: [
            event_bus_module_1.EventBusModule,
            config_module_1.ConfigModule,
            service_module_1.ServiceModule.forPlugin(),
            job_queue_module_1.JobQueueModule,
            health_check_module_1.HealthCheckModule,
            cache_module_1.CacheModule,
            cache_manager_module_1.CacheManagerModule
        ],
    })
], PluginCommonModule);
exports.PluginCommonModule = PluginCommonModule;
//# sourceMappingURL=plugin-common.module.js.map