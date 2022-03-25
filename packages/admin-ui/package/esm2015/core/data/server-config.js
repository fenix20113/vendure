import { Injectable, Injector } from '@angular/core';
import { GET_GLOBAL_SETTINGS, GET_SERVER_CONFIG } from './definitions/settings-definitions';
import { BaseDataService } from './providers/base-data.service';
export function initializeServerConfigService(serverConfigService) {
    return serverConfigService.init();
}
/**
 * A service which fetches the config from the server upon initialization, and then provides that config
 * to the components which require it.
 */
export class ServerConfigService {
    constructor(injector) {
        this.injector = injector;
        this._serverConfig = {};
    }
    get baseDataService() {
        return this.injector.get(BaseDataService);
    }
    /**
     * Fetches the ServerConfig. Should be run as part of the app bootstrap process by attaching
     * to the Angular APP_INITIALIZER token.
     */
    init() {
        return () => this.getServerConfig();
    }
    /**
     * Fetch the ServerConfig. Should be run on app init (in case user is already logged in) and on successful login.
     */
    getServerConfig() {
        return this.baseDataService
            .query(GET_SERVER_CONFIG)
            .single$.toPromise()
            .then(result => {
            this._serverConfig = result.globalSettings.serverConfig;
        }, err => {
            // Let the error fall through to be caught by the http interceptor.
        });
    }
    getAvailableLanguages() {
        return this.baseDataService
            .query(GET_GLOBAL_SETTINGS, {}, 'cache-first')
            .mapSingle(res => res.globalSettings.availableLanguages);
    }
    /**
     * When any of the GlobalSettings are modified, this method should be called to update the Apollo cache.
     */
    refreshGlobalSettings() {
        return this.baseDataService.query(GET_GLOBAL_SETTINGS, {}, 'network-only')
            .single$;
    }
    /**
     * Retrieves the custom field configs for the given entity type.
     */
    getCustomFieldsFor(type) {
        return this.serverConfig.customFieldConfig[type] || [];
    }
    getOrderProcessStates() {
        return this.serverConfig.orderProcess;
    }
    getPermittedAssetTypes() {
        return this.serverConfig.permittedAssetTypes;
    }
    getPermissionDefinitions() {
        return this.serverConfig.permissions;
    }
    get serverConfig() {
        return this._serverConfig;
    }
}
ServerConfigService.decorators = [
    { type: Injectable }
];
ServerConfigService.ctorParameters = () => [
    { type: Injector }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9zZXJ2ZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBWXJELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVoRSxNQUFNLFVBQVUsNkJBQTZCLENBQUMsbUJBQXdDO0lBQ2xGLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdEMsQ0FBQztBQUVEOzs7R0FHRztBQUVILE1BQU0sT0FBTyxtQkFBbUI7SUFPNUIsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQU45QixrQkFBYSxHQUFpQixFQUFTLENBQUM7SUFNUCxDQUFDO0lBSjFDLElBQVksZUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFrQixlQUFlLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBSUQ7OztPQUdHO0lBQ0gsSUFBSTtRQUNBLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDWCxPQUFPLElBQUksQ0FBQyxlQUFlO2FBQ3RCLEtBQUssQ0FBd0IsaUJBQWlCLENBQUM7YUFDL0MsT0FBTyxDQUFDLFNBQVMsRUFBRTthQUNuQixJQUFJLENBQ0QsTUFBTSxDQUFDLEVBQUU7WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQzVELENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRTtZQUNGLG1FQUFtRTtRQUN2RSxDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZTthQUN0QixLQUFLLENBQTBCLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUM7YUFDdEUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7T0FFRztJQUNILHFCQUFxQjtRQUNqQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUEwQixtQkFBbUIsRUFBRSxFQUFFLEVBQUUsY0FBYyxDQUFDO2FBQzlGLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0IsQ0FBQyxJQUErQztRQUM5RCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNELENBQUM7SUFFRCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBRUQsc0JBQXNCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztJQUNqRCxDQUFDO0lBRUQsd0JBQXdCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7WUF0RUosVUFBVTs7O1lBdkJVLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEN1c3RvbUZpZWxkQ29uZmlnLFxuICAgIEN1c3RvbUZpZWxkcyxcbiAgICBHZXRHbG9iYWxTZXR0aW5ncyxcbiAgICBHZXRTZXJ2ZXJDb25maWcsXG4gICAgT3JkZXJQcm9jZXNzU3RhdGUsXG4gICAgUGVybWlzc2lvbkRlZmluaXRpb24sXG4gICAgU2VydmVyQ29uZmlnLFxufSBmcm9tICcuLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcblxuaW1wb3J0IHsgR0VUX0dMT0JBTF9TRVRUSU5HUywgR0VUX1NFUlZFUl9DT05GSUcgfSBmcm9tICcuL2RlZmluaXRpb25zL3NldHRpbmdzLWRlZmluaXRpb25zJztcbmltcG9ydCB7IEJhc2VEYXRhU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Jhc2UtZGF0YS5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVTZXJ2ZXJDb25maWdTZXJ2aWNlKHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UpOiAoKSA9PiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBzZXJ2ZXJDb25maWdTZXJ2aWNlLmluaXQoKTtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2Ugd2hpY2ggZmV0Y2hlcyB0aGUgY29uZmlnIGZyb20gdGhlIHNlcnZlciB1cG9uIGluaXRpYWxpemF0aW9uLCBhbmQgdGhlbiBwcm92aWRlcyB0aGF0IGNvbmZpZ1xuICogdG8gdGhlIGNvbXBvbmVudHMgd2hpY2ggcmVxdWlyZSBpdC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlckNvbmZpZ1NlcnZpY2Uge1xuICAgIHByaXZhdGUgX3NlcnZlckNvbmZpZzogU2VydmVyQ29uZmlnID0ge30gYXMgYW55O1xuXG4gICAgcHJpdmF0ZSBnZXQgYmFzZURhdGFTZXJ2aWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQ8QmFzZURhdGFTZXJ2aWNlPihCYXNlRGF0YVNlcnZpY2UpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgU2VydmVyQ29uZmlnLiBTaG91bGQgYmUgcnVuIGFzIHBhcnQgb2YgdGhlIGFwcCBib290c3RyYXAgcHJvY2VzcyBieSBhdHRhY2hpbmdcbiAgICAgKiB0byB0aGUgQW5ndWxhciBBUFBfSU5JVElBTElaRVIgdG9rZW4uXG4gICAgICovXG4gICAgaW5pdCgpOiAoKSA9PiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4gdGhpcy5nZXRTZXJ2ZXJDb25maWcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCB0aGUgU2VydmVyQ29uZmlnLiBTaG91bGQgYmUgcnVuIG9uIGFwcCBpbml0IChpbiBjYXNlIHVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW4pIGFuZCBvbiBzdWNjZXNzZnVsIGxvZ2luLlxuICAgICAqL1xuICAgIGdldFNlcnZlckNvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlXG4gICAgICAgICAgICAucXVlcnk8R2V0U2VydmVyQ29uZmlnLlF1ZXJ5PihHRVRfU0VSVkVSX0NPTkZJRylcbiAgICAgICAgICAgIC5zaW5nbGUkLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSByZXN1bHQuZ2xvYmFsU2V0dGluZ3Muc2VydmVyQ29uZmlnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTGV0IHRoZSBlcnJvciBmYWxsIHRocm91Z2ggdG8gYmUgY2F1Z2h0IGJ5IHRoZSBodHRwIGludGVyY2VwdG9yLlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEF2YWlsYWJsZUxhbmd1YWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlXG4gICAgICAgICAgICAucXVlcnk8R2V0R2xvYmFsU2V0dGluZ3MuUXVlcnk+KEdFVF9HTE9CQUxfU0VUVElOR1MsIHt9LCAnY2FjaGUtZmlyc3QnKVxuICAgICAgICAgICAgLm1hcFNpbmdsZShyZXMgPT4gcmVzLmdsb2JhbFNldHRpbmdzLmF2YWlsYWJsZUxhbmd1YWdlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBhbnkgb2YgdGhlIEdsb2JhbFNldHRpbmdzIGFyZSBtb2RpZmllZCwgdGhpcyBtZXRob2Qgc2hvdWxkIGJlIGNhbGxlZCB0byB1cGRhdGUgdGhlIEFwb2xsbyBjYWNoZS5cbiAgICAgKi9cbiAgICByZWZyZXNoR2xvYmFsU2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRHbG9iYWxTZXR0aW5ncy5RdWVyeT4oR0VUX0dMT0JBTF9TRVRUSU5HUywge30sICduZXR3b3JrLW9ubHknKVxuICAgICAgICAgICAgLnNpbmdsZSQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBjdXN0b20gZmllbGQgY29uZmlncyBmb3IgdGhlIGdpdmVuIGVudGl0eSB0eXBlLlxuICAgICAqL1xuICAgIGdldEN1c3RvbUZpZWxkc0Zvcih0eXBlOiBFeGNsdWRlPGtleW9mIEN1c3RvbUZpZWxkcywgJ19fdHlwZW5hbWUnPik6IEN1c3RvbUZpZWxkQ29uZmlnW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJDb25maWcuY3VzdG9tRmllbGRDb25maWdbdHlwZV0gfHwgW107XG4gICAgfVxuXG4gICAgZ2V0T3JkZXJQcm9jZXNzU3RhdGVzKCk6IE9yZGVyUHJvY2Vzc1N0YXRlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJDb25maWcub3JkZXJQcm9jZXNzO1xuICAgIH1cblxuICAgIGdldFBlcm1pdHRlZEFzc2V0VHlwZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJDb25maWcucGVybWl0dGVkQXNzZXRUeXBlcztcbiAgICB9XG5cbiAgICBnZXRQZXJtaXNzaW9uRGVmaW5pdGlvbnMoKTogUGVybWlzc2lvbkRlZmluaXRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlckNvbmZpZy5wZXJtaXNzaW9ucztcbiAgICB9XG5cbiAgICBnZXQgc2VydmVyQ29uZmlnKCk6IFNlcnZlckNvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2ZXJDb25maWc7XG4gICAgfVxufVxuIl19