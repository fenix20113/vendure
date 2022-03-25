import { HttpErrorResponse, HttpResponse, } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DEFAULT_AUTH_TOKEN_HEADER_KEY } from '@vendure/common/lib/shared-constants';
import { tap } from 'rxjs/operators';
import { getAppConfig } from '../../app.config';
import { AuthService } from '../../providers/auth/auth.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { NotificationService } from '../../providers/notification/notification.service';
import { DataService } from '../providers/data.service';
export const AUTH_REDIRECT_PARAM = 'redirectTo';
/**
 * The default interceptor examines all HTTP requests & responses and automatically updates the requesting state
 * and shows error notifications.
 */
export class DefaultInterceptor {
    constructor(dataService, injector, authService, router, localStorageService) {
        this.dataService = dataService;
        this.injector = injector;
        this.authService = authService;
        this.router = router;
        this.localStorageService = localStorageService;
        this.tokenMethod = 'cookie';
        this.tokenMethod = getAppConfig().tokenMethod;
        this.authTokenHeaderKey = getAppConfig().authTokenHeaderKey || DEFAULT_AUTH_TOKEN_HEADER_KEY;
    }
    intercept(req, next) {
        this.dataService.client.startRequest().subscribe();
        return next.handle(req).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                this.checkForAuthToken(event);
                this.notifyOnError(event);
                this.dataService.client.completeRequest().subscribe();
            }
        }, err => {
            if (err instanceof HttpErrorResponse) {
                this.notifyOnError(err);
                this.dataService.client.completeRequest().subscribe();
            }
            else {
                this.displayErrorNotification(err.message);
            }
        }));
    }
    notifyOnError(response) {
        var _a, _b, _c;
        if (response instanceof HttpErrorResponse) {
            if (response.status === 0) {
                const { apiHost, apiPort } = getAppConfig();
                this.displayErrorNotification(_(`error.could-not-connect-to-server`), {
                    url: `${apiHost}:${apiPort}`,
                });
            }
            else if (response.status === 503 && ((_a = response.url) === null || _a === void 0 ? void 0 : _a.endsWith('/health'))) {
                this.displayErrorNotification(_(`error.health-check-failed`));
            }
            else {
                this.displayErrorNotification(this.extractErrorFromHttpResponse(response));
            }
        }
        else {
            // GraphQL errors still return 200 OK responses, but have the actual error message
            // inside the body of the response.
            const graqhQLErrors = response.body.errors;
            if (graqhQLErrors && Array.isArray(graqhQLErrors)) {
                const firstCode = (_c = (_b = graqhQLErrors[0]) === null || _b === void 0 ? void 0 : _b.extensions) === null || _c === void 0 ? void 0 : _c.code;
                if (firstCode === 'FORBIDDEN') {
                    this.authService.logOut().subscribe(() => {
                        if (!window.location.pathname.includes('login')) {
                            const path = graqhQLErrors[0].path.join(' > ');
                            this.displayErrorNotification(_(`error.403-forbidden`), { path });
                        }
                        this.router.navigate(['/login'], {
                            queryParams: {
                                [AUTH_REDIRECT_PARAM]: btoa(this.router.url),
                            },
                        });
                    });
                }
                else if (firstCode === 'CHANNEL_NOT_FOUND') {
                    const message = graqhQLErrors.map(err => err.message).join('\n');
                    this.displayErrorNotification(message);
                    this.localStorageService.remove('activeChannelToken');
                }
                else {
                    const message = graqhQLErrors.map(err => err.message).join('\n');
                    this.displayErrorNotification(message);
                }
            }
        }
    }
    extractErrorFromHttpResponse(response) {
        const errors = response.error.errors;
        if (Array.isArray(errors)) {
            return errors.map(e => e.message).join('\n');
        }
        else {
            return response.message;
        }
    }
    /**
     * We need to lazily inject the NotificationService since it depends on the I18nService which
     * eventually depends on the HttpClient (used to load messages from json files). If we were to
     * directly inject NotificationService into the constructor, we get a cyclic dependency.
     */
    displayErrorNotification(message, vars) {
        const notificationService = this.injector.get(NotificationService);
        notificationService.error(message, vars);
    }
    /**
     * If the server is configured to use the "bearer" tokenMethod, each response should be checked
     * for the existence of an auth token.
     */
    checkForAuthToken(response) {
        if (this.tokenMethod === 'bearer') {
            const authToken = response.headers.get(this.authTokenHeaderKey);
            if (authToken) {
                this.localStorageService.set('authToken', authToken);
            }
        }
    }
}
DefaultInterceptor.decorators = [
    { type: Injectable }
];
DefaultInterceptor.ctorParameters = () => [
    { type: DataService },
    { type: Injector },
    { type: AuthService },
    { type: Router },
    { type: LocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvcHJvdmlkZXJzL2ludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxpQkFBaUIsRUFLakIsWUFBWSxHQUNmLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFHckYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDeEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQztBQUVoRDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sa0JBQWtCO0lBSTNCLFlBQ1ksV0FBd0IsRUFDeEIsUUFBa0IsRUFDbEIsV0FBd0IsRUFDeEIsTUFBYyxFQUNkLG1CQUF3QztRQUp4QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBUm5DLGdCQUFXLEdBQWlDLFFBQVEsQ0FBQztRQVVsRSxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUM5QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxFQUFFLENBQUMsa0JBQWtCLElBQUksNkJBQTZCLENBQUM7SUFDakcsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFxQixFQUFFLElBQWlCO1FBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ3hCLEdBQUcsQ0FDQyxLQUFLLENBQUMsRUFBRTtZQUNKLElBQUksS0FBSyxZQUFZLFlBQVksRUFBRTtnQkFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN6RDtRQUNMLENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRTtZQUNGLElBQUksR0FBRyxZQUFZLGlCQUFpQixFQUFFO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN6RDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlDO1FBQ0wsQ0FBQyxDQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFTyxhQUFhLENBQUMsUUFBK0M7O1FBQ2pFLElBQUksUUFBUSxZQUFZLGlCQUFpQixFQUFFO1lBQ3ZDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsWUFBWSxFQUFFLENBQUM7Z0JBQzVDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsbUNBQW1DLENBQUMsRUFBRTtvQkFDbEUsR0FBRyxFQUFFLEdBQUcsT0FBTyxJQUFJLE9BQU8sRUFBRTtpQkFDL0IsQ0FBQyxDQUFDO2FBQ047aUJBQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsV0FBSSxRQUFRLENBQUMsR0FBRywwQ0FBRSxRQUFRLENBQUMsU0FBUyxFQUFDLEVBQUU7Z0JBQ3JFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2dCQUNILElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUM5RTtTQUNKO2FBQU07WUFDSCxrRkFBa0Y7WUFDbEYsbUNBQW1DO1lBQ25DLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNDLElBQUksYUFBYSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQy9DLE1BQU0sU0FBUyxlQUFXLGFBQWEsQ0FBQyxDQUFDLENBQUMsMENBQUUsVUFBVSwwQ0FBRSxJQUFJLENBQUM7Z0JBQzdELElBQUksU0FBUyxLQUFLLFdBQVcsRUFBRTtvQkFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO3dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUM3QyxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDL0MsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt5QkFDckU7d0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDN0IsV0FBVyxFQUFFO2dDQUNULENBQUMsbUJBQW1CLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7NkJBQy9DO3lCQUNKLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTSxJQUFJLFNBQVMsS0FBSyxtQkFBbUIsRUFBRTtvQkFDMUMsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2lCQUN6RDtxQkFBTTtvQkFDSCxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQzthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRU8sNEJBQTRCLENBQUMsUUFBMkI7UUFDNUQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssd0JBQXdCLENBQUMsT0FBZSxFQUFFLElBQTBCO1FBQ3hFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQXNCLG1CQUFtQixDQUFDLENBQUM7UUFDeEYsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssaUJBQWlCLENBQUMsUUFBMkI7UUFDakQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUMvQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoRSxJQUFJLFNBQVMsRUFBRTtnQkFDWCxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4RDtTQUNKO0lBQ0wsQ0FBQzs7O1lBL0dKLFVBQVU7OztZQVJGLFdBQVc7WUFaQyxRQUFRO1lBU3BCLFdBQVc7WUFSWCxNQUFNO1lBU04sbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgICBIdHRwRXZlbnQsXG4gICAgSHR0cEhhbmRsZXIsXG4gICAgSHR0cEludGVyY2VwdG9yLFxuICAgIEh0dHBSZXF1ZXN0LFxuICAgIEh0dHBSZXNwb25zZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBERUZBVUxUX0FVVEhfVE9LRU5fSEVBREVSX0tFWSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBBZG1pblVpQ29uZmlnIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBnZXRBcHBDb25maWcgfSBmcm9tICcuLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2F1dGgvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IEFVVEhfUkVESVJFQ1RfUEFSQU0gPSAncmVkaXJlY3RUbyc7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgaW50ZXJjZXB0b3IgZXhhbWluZXMgYWxsIEhUVFAgcmVxdWVzdHMgJiByZXNwb25zZXMgYW5kIGF1dG9tYXRpY2FsbHkgdXBkYXRlcyB0aGUgcmVxdWVzdGluZyBzdGF0ZVxuICogYW5kIHNob3dzIGVycm9yIG5vdGlmaWNhdGlvbnMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWZhdWx0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9rZW5NZXRob2Q6IEFkbWluVWlDb25maWdbJ3Rva2VuTWV0aG9kJ10gPSAnY29va2llJztcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF1dGhUb2tlbkhlYWRlcktleTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy50b2tlbk1ldGhvZCA9IGdldEFwcENvbmZpZygpLnRva2VuTWV0aG9kO1xuICAgICAgICB0aGlzLmF1dGhUb2tlbkhlYWRlcktleSA9IGdldEFwcENvbmZpZygpLmF1dGhUb2tlbkhlYWRlcktleSB8fCBERUZBVUxUX0FVVEhfVE9LRU5fSEVBREVSX0tFWTtcbiAgICB9XG5cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jbGllbnQuc3RhcnRSZXF1ZXN0KCkuc3Vic2NyaWJlKCk7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUoXG4gICAgICAgICAgICB0YXAoXG4gICAgICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JBdXRoVG9rZW4oZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlPbkVycm9yKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LmNvbXBsZXRlUmVxdWVzdCgpLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5T25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jbGllbnQuY29tcGxldGVSZXF1ZXN0KCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvck5vdGlmaWNhdGlvbihlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5vdGlmeU9uRXJyb3IocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+IHwgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGFwaUhvc3QsIGFwaVBvcnQgfSA9IGdldEFwcENvbmZpZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yTm90aWZpY2F0aW9uKF8oYGVycm9yLmNvdWxkLW5vdC1jb25uZWN0LXRvLXNlcnZlcmApLCB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYCR7YXBpSG9zdH06JHthcGlQb3J0fWAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNTAzICYmIHJlc3BvbnNlLnVybD8uZW5kc1dpdGgoJy9oZWFsdGgnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yTm90aWZpY2F0aW9uKF8oYGVycm9yLmhlYWx0aC1jaGVjay1mYWlsZWRgKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yTm90aWZpY2F0aW9uKHRoaXMuZXh0cmFjdEVycm9yRnJvbUh0dHBSZXNwb25zZShyZXNwb25zZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gR3JhcGhRTCBlcnJvcnMgc3RpbGwgcmV0dXJuIDIwMCBPSyByZXNwb25zZXMsIGJ1dCBoYXZlIHRoZSBhY3R1YWwgZXJyb3IgbWVzc2FnZVxuICAgICAgICAgICAgLy8gaW5zaWRlIHRoZSBib2R5IG9mIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgIGNvbnN0IGdyYXFoUUxFcnJvcnMgPSByZXNwb25zZS5ib2R5LmVycm9ycztcbiAgICAgICAgICAgIGlmIChncmFxaFFMRXJyb3JzICYmIEFycmF5LmlzQXJyYXkoZ3JhcWhRTEVycm9ycykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENvZGU6IHN0cmluZyA9IGdyYXFoUUxFcnJvcnNbMF0/LmV4dGVuc2lvbnM/LmNvZGU7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0Q29kZSA9PT0gJ0ZPUkJJRERFTicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dPdXQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJ2xvZ2luJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gZ3JhcWhRTEVycm9yc1swXS5wYXRoLmpvaW4oJyA+ICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yTm90aWZpY2F0aW9uKF8oYGVycm9yLjQwMy1mb3JiaWRkZW5gKSwgeyBwYXRoIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtBVVRIX1JFRElSRUNUX1BBUkFNXTogYnRvYSh0aGlzLnJvdXRlci51cmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaXJzdENvZGUgPT09ICdDSEFOTkVMX05PVF9GT1VORCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGdyYXFoUUxFcnJvcnMubWFwKGVyciA9PiBlcnIubWVzc2FnZSkuam9pbignXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yTm90aWZpY2F0aW9uKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UucmVtb3ZlKCdhY3RpdmVDaGFubmVsVG9rZW4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZ3JhcWhRTEVycm9ycy5tYXAoZXJyID0+IGVyci5tZXNzYWdlKS5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JOb3RpZmljYXRpb24obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleHRyYWN0RXJyb3JGcm9tSHR0cFJlc3BvbnNlKHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc3BvbnNlLmVycm9yLmVycm9ycztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXJyb3JzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9ycy5tYXAoZSA9PiBlLm1lc3NhZ2UpLmpvaW4oJ1xcbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBuZWVkIHRvIGxhemlseSBpbmplY3QgdGhlIE5vdGlmaWNhdGlvblNlcnZpY2Ugc2luY2UgaXQgZGVwZW5kcyBvbiB0aGUgSTE4blNlcnZpY2Ugd2hpY2hcbiAgICAgKiBldmVudHVhbGx5IGRlcGVuZHMgb24gdGhlIEh0dHBDbGllbnQgKHVzZWQgdG8gbG9hZCBtZXNzYWdlcyBmcm9tIGpzb24gZmlsZXMpLiBJZiB3ZSB3ZXJlIHRvXG4gICAgICogZGlyZWN0bHkgaW5qZWN0IE5vdGlmaWNhdGlvblNlcnZpY2UgaW50byB0aGUgY29uc3RydWN0b3IsIHdlIGdldCBhIGN5Y2xpYyBkZXBlbmRlbmN5LlxuICAgICAqL1xuICAgIHByaXZhdGUgZGlzcGxheUVycm9yTm90aWZpY2F0aW9uKG1lc3NhZ2U6IHN0cmluZywgdmFycz86IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0PE5vdGlmaWNhdGlvblNlcnZpY2U+KE5vdGlmaWNhdGlvblNlcnZpY2UpO1xuICAgICAgICBub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHZhcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBzZXJ2ZXIgaXMgY29uZmlndXJlZCB0byB1c2UgdGhlIFwiYmVhcmVyXCIgdG9rZW5NZXRob2QsIGVhY2ggcmVzcG9uc2Ugc2hvdWxkIGJlIGNoZWNrZWRcbiAgICAgKiBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhbiBhdXRoIHRva2VuLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tGb3JBdXRoVG9rZW4ocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSB7XG4gICAgICAgIGlmICh0aGlzLnRva2VuTWV0aG9kID09PSAnYmVhcmVyJykge1xuICAgICAgICAgICAgY29uc3QgYXV0aFRva2VuID0gcmVzcG9uc2UuaGVhZGVycy5nZXQodGhpcy5hdXRoVG9rZW5IZWFkZXJLZXkpO1xuICAgICAgICAgICAgaWYgKGF1dGhUb2tlbikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2F1dGhUb2tlbicsIGF1dGhUb2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=