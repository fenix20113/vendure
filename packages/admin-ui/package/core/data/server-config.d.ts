import { Injector } from '@angular/core';
import { CustomFieldConfig, CustomFields, OrderProcessState, PermissionDefinition, ServerConfig } from '../common/generated-types';
export declare function initializeServerConfigService(serverConfigService: ServerConfigService): () => Promise<any>;
/**
 * A service which fetches the config from the server upon initialization, and then provides that config
 * to the components which require it.
 */
export declare class ServerConfigService {
    private injector;
    private _serverConfig;
    private get baseDataService();
    constructor(injector: Injector);
    /**
     * Fetches the ServerConfig. Should be run as part of the app bootstrap process by attaching
     * to the Angular APP_INITIALIZER token.
     */
    init(): () => Promise<any>;
    /**
     * Fetch the ServerConfig. Should be run on app init (in case user is already logged in) and on successful login.
     */
    getServerConfig(): Promise<void>;
    getAvailableLanguages(): import("rxjs").Observable<import("../common/generated-types").LanguageCode[]>;
    /**
     * When any of the GlobalSettings are modified, this method should be called to update the Apollo cache.
     */
    refreshGlobalSettings(): import("rxjs").Observable<import("../common/generated-types").GetGlobalSettingsQuery>;
    /**
     * Retrieves the custom field configs for the given entity type.
     */
    getCustomFieldsFor(type: Exclude<keyof CustomFields, '__typename'>): CustomFieldConfig[];
    getOrderProcessStates(): OrderProcessState[];
    getPermittedAssetTypes(): string[];
    getPermissionDefinitions(): PermissionDefinition[];
    get serverConfig(): ServerConfig;
}
