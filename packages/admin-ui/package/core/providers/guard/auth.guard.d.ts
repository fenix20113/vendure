import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
/**
 * This guard prevents unauthorized users from accessing any routes which require
 * authorization.
 */
export declare class AuthGuard implements CanActivate {
    private router;
    private authService;
    private readonly externalLoginUrl;
    constructor(router: Router, authService: AuthService);
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean>;
}
