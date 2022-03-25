import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
/**
 * This guard prevents loggen-in users from navigating to the login screen.
 */
export declare class LoginGuard implements CanActivate {
    private router;
    private authService;
    constructor(router: Router, authService: AuthService);
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean>;
}
