import { Observable } from 'rxjs';
import { AttemptLogin } from '../../common/generated-types';
import { DataService } from '../../data/providers/data.service';
import { ServerConfigService } from '../../data/server-config';
import { LocalStorageService } from '../local-storage/local-storage.service';
/**
 * This service handles logic relating to authentication of the current user.
 */
export declare class AuthService {
    private localStorageService;
    private dataService;
    private serverConfigService;
    constructor(localStorageService: LocalStorageService, dataService: DataService, serverConfigService: ServerConfigService);
    /**
     * Attempts to log in via the REST login endpoint and updates the app
     * state on success.
     */
    logIn(username: string, password: string, rememberMe: boolean): Observable<AttemptLogin.Login>;
    /**
     * Update the user status to being logged out.
     */
    logOut(): Observable<boolean>;
    /**
     * Checks the app state to see if the user is already logged in,
     * and if not, attempts to validate any auth token found.
     */
    checkAuthenticatedStatus(): Observable<boolean>;
    /**
     * Checks for an auth token and if found, attempts to validate
     * that token against the API.
     */
    validateAuthToken(): Observable<boolean>;
    private getActiveChannel;
    private setChannelToken;
}
