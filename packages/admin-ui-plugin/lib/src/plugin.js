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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AdminUiPlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUiPlugin = void 0;
const shared_constants_1 = require("@vendure/common/lib/shared-constants");
const core_1 = require("@vendure/core");
const express_1 = __importDefault(require("express"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
/**
 * @description
 * This plugin starts a static server for the Admin UI app, and proxies it via the `/admin/` path of the main Vendure server.
 *
 * The Admin UI allows you to administer all aspects of your store, from inventory management to order tracking. It is the tool used by
 * store administrators on a day-to-day basis for the management of the store.
 *
 * ## Installation
 *
 * `yarn add \@vendure/admin-ui-plugin`
 *
 * or
 *
 * `npm install \@vendure/admin-ui-plugin`
 *
 * @example
 * ```ts
 * import { AdminUiPlugin } from '\@vendure/admin-ui-plugin';
 *
 * const config: VendureConfig = {
 *   // Add an instance of the plugin to the plugins array
 *   plugins: [
 *     AdminUiPlugin.init({ port: 3002 }),
 *   ],
 * };
 * ```
 *
 * @docsCategory AdminUiPlugin
 */
let AdminUiPlugin = AdminUiPlugin_1 = class AdminUiPlugin {
    constructor(configService) {
        this.configService = configService;
    }
    /**
     * @description
     * Set the plugin options
     */
    static init(options) {
        this.options = options;
        return AdminUiPlugin_1;
    }
    async configure(consumer) {
        const { app, hostname, route, adminUiConfig } = AdminUiPlugin_1.options;
        const adminUiAppPath = AdminUiPlugin_1.isDevModeApp(app)
            ? path_1.default.join(app.sourcePath, 'src')
            : (app && app.path) || constants_1.DEFAULT_APP_PATH;
        const adminUiConfigPath = path_1.default.join(adminUiAppPath, 'vendure-ui-config.json');
        const overwriteConfig = () => {
            const uiConfig = this.getAdminUiConfig(adminUiConfig);
            return this.overwriteAdminUiConfig(adminUiConfigPath, uiConfig);
        };
        let port;
        if (AdminUiPlugin_1.isDevModeApp(app)) {
            port = app.port;
        }
        else {
            port = AdminUiPlugin_1.options.port;
        }
        if (AdminUiPlugin_1.isDevModeApp(app)) {
            core_1.Logger.info('Creating admin ui middleware (dev mode)', constants_1.loggerCtx);
            consumer
                .apply(core_1.createProxyHandler({
                hostname,
                port,
                route,
                label: 'Admin UI',
                basePath: route,
            }))
                .forRoutes(route);
            consumer
                .apply(core_1.createProxyHandler({
                hostname,
                port,
                route: 'sockjs-node',
                label: 'Admin UI live reload',
                basePath: 'sockjs-node',
            }))
                .forRoutes('sockjs-node');
            core_1.Logger.info(`Compiling Admin UI app in development mode`, constants_1.loggerCtx);
            app.compile().then(() => {
                core_1.Logger.info(`Admin UI compiling and watching for changes...`, constants_1.loggerCtx);
            }, (err) => {
                core_1.Logger.error(`Failed to compile: ${err}`, constants_1.loggerCtx, err.stack);
            });
            await overwriteConfig();
        }
        else {
            core_1.Logger.info('Creating admin ui middleware (prod mode)', constants_1.loggerCtx);
            consumer.apply(await this.createStaticServer(app)).forRoutes(route);
            if (app && typeof app.compile === 'function') {
                core_1.Logger.info(`Compiling Admin UI app in production mode...`, constants_1.loggerCtx);
                app.compile()
                    .then(overwriteConfig)
                    .then(() => {
                    core_1.Logger.info(`Admin UI successfully compiled`, constants_1.loggerCtx);
                }, (err) => {
                    core_1.Logger.error(`Failed to compile: ${err}`, constants_1.loggerCtx, err.stack);
                });
            }
            else {
                await overwriteConfig();
            }
        }
        core_1.registerPluginStartupMessage('Admin UI', route);
    }
    async createStaticServer(app) {
        const adminUiAppPath = (app && app.path) || constants_1.DEFAULT_APP_PATH;
        const adminUiServer = express_1.default.Router();
        adminUiServer.use(express_1.default.static(adminUiAppPath));
        adminUiServer.use((req, res) => {
            res.sendFile(path_1.default.join(adminUiAppPath, 'index.html'));
        });
        return adminUiServer;
    }
    /**
     * Takes an optional AdminUiConfig provided in the plugin options, and returns a complete
     * config object for writing to disk.
     */
    getAdminUiConfig(partialConfig) {
        var _a, _b, _c, _d;
        const { authOptions } = this.configService;
        const propOrDefault = (prop, defaultVal) => {
            return partialConfig ? partialConfig[prop] || defaultVal : defaultVal;
        };
        return {
            adminApiPath: propOrDefault('adminApiPath', this.configService.apiOptions.adminApiPath),
            apiHost: propOrDefault('apiHost', 'auto'),
            apiPort: propOrDefault('apiPort', 'auto'),
            tokenMethod: propOrDefault('tokenMethod', authOptions.tokenMethod || 'cookie'),
            authTokenHeaderKey: propOrDefault('authTokenHeaderKey', authOptions.authTokenHeaderKey || shared_constants_1.DEFAULT_AUTH_TOKEN_HEADER_KEY),
            defaultLanguage: propOrDefault('defaultLanguage', constants_1.defaultLanguage),
            availableLanguages: propOrDefault('availableLanguages', constants_1.defaultAvailableLanguages),
            loginUrl: (_a = AdminUiPlugin_1.options.adminUiConfig) === null || _a === void 0 ? void 0 : _a.loginUrl,
            brand: (_b = AdminUiPlugin_1.options.adminUiConfig) === null || _b === void 0 ? void 0 : _b.brand,
            hideVendureBranding: propOrDefault('hideVendureBranding', ((_c = AdminUiPlugin_1.options.adminUiConfig) === null || _c === void 0 ? void 0 : _c.hideVendureBranding) || false),
            hideVersion: propOrDefault('hideVersion', ((_d = AdminUiPlugin_1.options.adminUiConfig) === null || _d === void 0 ? void 0 : _d.hideVersion) || false),
        };
    }
    /**
     * Overwrites the parts of the admin-ui app's `vendure-ui-config.json` file relating to connecting to
     * the server admin API.
     */
    async overwriteAdminUiConfig(adminUiConfigPath, config) {
        try {
            const content = await this.pollForConfigFile(adminUiConfigPath);
        }
        catch (e) {
            core_1.Logger.error(e.message, constants_1.loggerCtx);
            throw e;
        }
        try {
            await fs_extra_1.default.writeFile(adminUiConfigPath, JSON.stringify(config, null, 2));
        }
        catch (e) {
            throw new Error('[AdminUiPlugin] Could not write vendure-ui-config.json file:\n' + e.message);
        }
        core_1.Logger.verbose(`Applied configuration to vendure-ui-config.json file`, constants_1.loggerCtx);
    }
    /**
     * It might be that the ui-devkit compiler has not yet copied the config
     * file to the expected location (particularly when running in watch mode),
     * so polling is used to check multiple times with a delay.
     */
    async pollForConfigFile(adminUiConfigPath) {
        const maxRetries = 10;
        const retryDelay = 200;
        let attempts = 0;
        const pause = () => new Promise(resolve => setTimeout(resolve, retryDelay));
        while (attempts < maxRetries) {
            try {
                core_1.Logger.verbose(`Checking for config file: ${adminUiConfigPath}`, constants_1.loggerCtx);
                const configFileContent = await fs_extra_1.default.readFile(adminUiConfigPath, 'utf-8');
                return configFileContent;
            }
            catch (e) {
                attempts++;
                core_1.Logger.verbose(`Unable to locate config file: ${adminUiConfigPath} (attempt ${attempts})`, constants_1.loggerCtx);
            }
            await pause();
        }
        throw new Error(`Unable to locate config file: ${adminUiConfigPath}`);
    }
    static isDevModeApp(app) {
        if (!app) {
            return false;
        }
        return !!app.sourcePath;
    }
};
AdminUiPlugin = AdminUiPlugin_1 = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        providers: [],
    }),
    __metadata("design:paramtypes", [core_1.ConfigService])
], AdminUiPlugin);
exports.AdminUiPlugin = AdminUiPlugin;
//# sourceMappingURL=plugin.js.map