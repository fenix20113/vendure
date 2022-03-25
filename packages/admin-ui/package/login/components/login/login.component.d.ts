import { Router } from '@angular/router';
import { AuthService } from '@vendure/admin-ui/core';
export declare class LoginComponent {
    private authService;
    private router;
    username: string;
    password: string;
    rememberMe: boolean;
    version: string;
    errorMessage: string | undefined;
    brand: string | undefined;
    hideVendureBranding: boolean | undefined;
    hideVersion: boolean | undefined;
    constructor(authService: AuthService, router: Router);
    logIn(): void;
    /**
     * Attempts to read a redirect param from the current url and parse it into a
     * route from which the user was redirected after a 401 error.
     */
    private getRedirectRoute;
}
