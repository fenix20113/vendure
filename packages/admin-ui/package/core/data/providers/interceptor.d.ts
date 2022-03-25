import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../providers/auth/auth.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { DataService } from '../providers/data.service';
export declare const AUTH_REDIRECT_PARAM = "redirectTo";
/**
 * The default interceptor examines all HTTP requests & responses and automatically updates the requesting state
 * and shows error notifications.
 */
export declare class DefaultInterceptor implements HttpInterceptor {
    private dataService;
    private injector;
    private authService;
    private router;
    private localStorageService;
    private readonly tokenMethod;
    private readonly authTokenHeaderKey;
    constructor(dataService: DataService, injector: Injector, authService: AuthService, router: Router, localStorageService: LocalStorageService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private notifyOnError;
    private extractErrorFromHttpResponse;
    /**
     * We need to lazily inject the NotificationService since it depends on the I18nService which
     * eventually depends on the HttpClient (used to load messages from json files). If we were to
     * directly inject NotificationService into the constructor, we get a cyclic dependency.
     */
    private displayErrorNotification;
    /**
     * If the server is configured to use the "bearer" tokenMethod, each response should be checked
     * for the existence of an auth token.
     */
    private checkForAuthToken;
}
