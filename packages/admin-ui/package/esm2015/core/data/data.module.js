import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client/link/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { createUploadLink } from 'apollo-upload-client';
import { getAppConfig } from '../app.config';
import { introspectionResult } from '../common/introspection-result-wrapper';
import { LocalStorageService } from '../providers/local-storage/local-storage.service';
import { CheckJobsLink } from './check-jobs-link';
import { getClientDefaults } from './client-state/client-defaults';
import { clientResolvers } from './client-state/client-resolvers';
import { GET_CLIENT_STATE } from './definitions/client-definitions';
import { OmitTypenameLink } from './omit-typename-link';
import { BaseDataService } from './providers/base-data.service';
import { DataService } from './providers/data.service';
import { FetchAdapter } from './providers/fetch-adapter';
import { DefaultInterceptor } from './providers/interceptor';
import { initializeServerConfigService, ServerConfigService } from './server-config';
import { getServerLocation } from './utils/get-server-location';
export function createApollo(localStorageService, fetchAdapter, injector) {
    const { adminApiPath, tokenMethod } = getAppConfig();
    const serverLocation = getServerLocation();
    const apolloCache = new InMemoryCache({
        possibleTypes: introspectionResult.possibleTypes,
        typePolicies: {
            GlobalSettings: {
                fields: {
                    serverConfig: {
                        merge: (existing, incoming) => (Object.assign(Object.assign({}, existing), incoming)),
                    },
                },
            },
        },
    });
    apolloCache.writeQuery({
        query: GET_CLIENT_STATE,
        data: getClientDefaults(localStorageService),
    });
    if (!false) {
        // TODO: enable only for dev mode
        // make the Apollo Cache inspectable in the console for debug purposes
        window['apolloCache'] = apolloCache;
    }
    return {
        link: ApolloLink.from([
            new OmitTypenameLink(),
            new CheckJobsLink(injector),
            setContext(() => {
                const headers = {};
                const channelToken = localStorageService.get('activeChannelToken');
                if (channelToken) {
                    headers['vendure-token'] = channelToken;
                }
                if (tokenMethod === 'bearer') {
                    const authToken = localStorageService.get('authToken');
                    if (authToken) {
                        headers.authorization = `Bearer ${authToken}`;
                    }
                }
                return { headers };
            }),
            createUploadLink({
                uri: `${serverLocation}/${adminApiPath}`,
                fetch: fetchAdapter.fetch,
            }),
        ]),
        cache: apolloCache,
        resolvers: clientResolvers,
    };
}
const ɵ0 = initializeServerConfigService;
/**
 * The DataModule is responsible for all API calls *and* serves as the source of truth for global app
 * state via the apollo-link-state package.
 */
export class DataModule {
}
DataModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                exports: [],
                declarations: [],
                providers: [
                    BaseDataService,
                    DataService,
                    FetchAdapter,
                    ServerConfigService,
                    {
                        provide: APOLLO_OPTIONS,
                        useFactory: createApollo,
                        deps: [LocalStorageService, FetchAdapter, Injector],
                    },
                    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
                    {
                        provide: APP_INITIALIZER,
                        multi: true,
                        useFactory: ɵ0,
                        deps: [ServerConfigService],
                    },
                ],
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGF0YS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBdUIsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUV2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0s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QkFDRCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDekU7d0JBQ0ksT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLEtBQUssRUFBRSxJQUFJO3dCQUNYLFVBQVUsSUFBK0I7d0JBQ3pDLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO3FCQUM5QjtpQkFDSjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIEluamVjdG9yLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBvbGxvQ2xpZW50T3B0aW9ucywgSW5NZW1vcnlDYWNoZSB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2NvcmUnO1xuaW1wb3J0IHsgc2V0Q29udGV4dCB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2xpbmsvY29udGV4dCc7XG5pbXBvcnQgeyBBcG9sbG9MaW5rIH0gZnJvbSAnQGFwb2xsby9jbGllbnQvbGluay9jb3JlJztcbmltcG9ydCB7IEFQT0xMT19PUFRJT05TIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuaW1wb3J0IHsgY3JlYXRlVXBsb2FkTGluayB9IGZyb20gJ2Fwb2xsby11cGxvYWQtY2xpZW50JztcblxuaW1wb3J0IHsgZ2V0QXBwQ29uZmlnIH0gZnJvbSAnLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBpbnRyb3NwZWN0aW9uUmVzdWx0IH0gZnJvbSAnLi4vY29tbW9uL2ludHJvc3BlY3Rpb24tcmVzdWx0LXdyYXBwZXInO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5cbmltcG9ydCB7IENoZWNrSm9ic0xpbmsgfSBmcm9tICcuL2NoZWNrLWpvYnMtbGluayc7XG5pbXBvcnQgeyBnZXRDbGllbnREZWZhdWx0cyB9IGZyb20gJy4vY2xpZW50LXN0YXRlL2NsaWVudC1kZWZhdWx0cyc7XG5pbXBvcnQgeyBjbGllbnRSZXNvbHZlcnMgfSBmcm9tICcuL2NsaWVudC1zdGF0ZS9jbGllbnQtcmVzb2x2ZXJzJztcbmltcG9ydCB7IEdFVF9DTElFTlRfU1RBVEUgfSBmcm9tICcuL2RlZmluaXRpb25zL2NsaWVudC1kZWZpbml0aW9ucyc7XG5pbXBvcnQgeyBPbWl0VHlwZW5hbWVMaW5rIH0gZnJvbSAnLi9vbWl0LXR5cGVuYW1lLWxpbmsnO1xuaW1wb3J0IHsgQmFzZURhdGFTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYmFzZS1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmV0Y2hBZGFwdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmV0Y2gtYWRhcHRlcic7XG5pbXBvcnQgeyBEZWZhdWx0SW50ZXJjZXB0b3IgfSBmcm9tICcuL3Byb3ZpZGVycy9pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBpbml0aWFsaXplU2VydmVyQ29uZmlnU2VydmljZSwgU2VydmVyQ29uZmlnU2VydmljZSB9IGZyb20gJy4vc2VydmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJMb2NhdGlvbiB9IGZyb20gJy4vdXRpbHMvZ2V0LXNlcnZlci1sb2NhdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBcG9sbG8oXG4gICAgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICBmZXRjaEFkYXB0ZXI6IEZldGNoQWRhcHRlcixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4pOiBBcG9sbG9DbGllbnRPcHRpb25zPGFueT4ge1xuICAgIGNvbnN0IHsgYWRtaW5BcGlQYXRoLCB0b2tlbk1ldGhvZCB9ID0gZ2V0QXBwQ29uZmlnKCk7XG4gICAgY29uc3Qgc2VydmVyTG9jYXRpb24gPSBnZXRTZXJ2ZXJMb2NhdGlvbigpO1xuICAgIGNvbnN0IGFwb2xsb0NhY2hlID0gbmV3IEluTWVtb3J5Q2FjaGUoe1xuICAgICAgICBwb3NzaWJsZVR5cGVzOiBpbnRyb3NwZWN0aW9uUmVzdWx0LnBvc3NpYmxlVHlwZXMsXG4gICAgICAgIHR5cGVQb2xpY2llczoge1xuICAgICAgICAgICAgR2xvYmFsU2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZTogKGV4aXN0aW5nLCBpbmNvbWluZykgPT4gKHsgLi4uZXhpc3RpbmcsIC4uLmluY29taW5nIH0pLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIGFwb2xsb0NhY2hlLndyaXRlUXVlcnkoe1xuICAgICAgICBxdWVyeTogR0VUX0NMSUVOVF9TVEFURSxcbiAgICAgICAgZGF0YTogZ2V0Q2xpZW50RGVmYXVsdHMobG9jYWxTdG9yYWdlU2VydmljZSksXG4gICAgfSk7XG5cbiAgICBpZiAoIWZhbHNlKSB7XG4gICAgICAgIC8vIFRPRE86IGVuYWJsZSBvbmx5IGZvciBkZXYgbW9kZVxuICAgICAgICAvLyBtYWtlIHRoZSBBcG9sbG8gQ2FjaGUgaW5zcGVjdGFibGUgaW4gdGhlIGNvbnNvbGUgZm9yIGRlYnVnIHB1cnBvc2VzXG4gICAgICAgICh3aW5kb3cgYXMgYW55KVsnYXBvbGxvQ2FjaGUnXSA9IGFwb2xsb0NhY2hlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5rOiBBcG9sbG9MaW5rLmZyb20oW1xuICAgICAgICAgICAgbmV3IE9taXRUeXBlbmFtZUxpbmsoKSxcbiAgICAgICAgICAgIG5ldyBDaGVja0pvYnNMaW5rKGluamVjdG9yKSxcbiAgICAgICAgICAgIHNldENvbnRleHQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFubmVsVG9rZW4gPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYWN0aXZlQ2hhbm5lbFRva2VuJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5uZWxUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWyd2ZW5kdXJlLXRva2VuJ10gPSBjaGFubmVsVG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b2tlbk1ldGhvZCA9PT0gJ2JlYXJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXV0aFRva2VuID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2F1dGhUb2tlbicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXV0aFRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLmF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7YXV0aFRva2VufWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgaGVhZGVycyB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjcmVhdGVVcGxvYWRMaW5rKHtcbiAgICAgICAgICAgICAgICB1cmk6IGAke3NlcnZlckxvY2F0aW9ufS8ke2FkbWluQXBpUGF0aH1gLFxuICAgICAgICAgICAgICAgIGZldGNoOiBmZXRjaEFkYXB0ZXIuZmV0Y2gsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSksXG4gICAgICAgIGNhY2hlOiBhcG9sbG9DYWNoZSxcbiAgICAgICAgcmVzb2x2ZXJzOiBjbGllbnRSZXNvbHZlcnMsXG4gICAgfTtcbn1cblxuLyoqXG4gKiBUaGUgRGF0YU1vZHVsZSBpcyByZXNwb25zaWJsZSBmb3IgYWxsIEFQSSBjYWxscyAqYW5kKiBzZXJ2ZXMgYXMgdGhlIHNvdXJjZSBvZiB0cnV0aCBmb3IgZ2xvYmFsIGFwcFxuICogc3RhdGUgdmlhIHRoZSBhcG9sbG8tbGluay1zdGF0ZSBwYWNrYWdlLlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBCYXNlRGF0YVNlcnZpY2UsXG4gICAgICAgIERhdGFTZXJ2aWNlLFxuICAgICAgICBGZXRjaEFkYXB0ZXIsXG4gICAgICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IEFQT0xMT19PUFRJT05TLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQXBvbGxvLFxuICAgICAgICAgICAgZGVwczogW0xvY2FsU3RvcmFnZVNlcnZpY2UsIEZldGNoQWRhcHRlciwgSW5qZWN0b3JdLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogRGVmYXVsdEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGluaXRpYWxpemVTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgZGVwczogW1NlcnZlckNvbmZpZ1NlcnZpY2VdLFxuICAgICAgICB9LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFNb2R1bGUge31cbiJdfQ==