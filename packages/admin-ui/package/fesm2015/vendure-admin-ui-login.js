import { Component, ɵɵdefineInjectable, ɵɵinject, Injectable, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ADMIN_UI_VERSION, getAppConfig, AUTH_REDIRECT_PARAM, AuthService, SharedModule } from '@vendure/admin-ui/core';
import { map } from 'rxjs/operators';

class LoginComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.username = '';
        this.password = '';
        this.rememberMe = false;
        this.version = ADMIN_UI_VERSION;
        this.brand = getAppConfig().brand;
        this.hideVendureBranding = getAppConfig().hideVendureBranding;
        this.hideVersion = getAppConfig().hideVersion;
    }
    logIn() {
        this.errorMessage = undefined;
        this.authService.logIn(this.username, this.password, this.rememberMe).subscribe(result => {
            switch (result.__typename) {
                case 'CurrentUser':
                    const redirect = this.getRedirectRoute();
                    this.router.navigateByUrl(redirect ? redirect : '/');
                    break;
                case 'InvalidCredentialsError':
                case 'NativeAuthStrategyError':
                    this.errorMessage = result.message;
                    break;
            }
        });
    }
    /**
     * Attempts to read a redirect param from the current url and parse it into a
     * route from which the user was redirected after a 401 error.
     */
    getRedirectRoute() {
        let redirectTo;
        const re = new RegExp(`${AUTH_REDIRECT_PARAM}=(.*)`);
        try {
            const redirectToParam = window.location.search.match(re);
            if (redirectToParam && 1 < redirectToParam.length) {
                redirectTo = atob(decodeURIComponent(redirectToParam[1]));
            }
        }
        catch (e) {
            // ignore
        }
        return redirectTo;
    }
}
LoginComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-login',
                template: "<div class=\"login-wrapper\">\n    <form class=\"login\">\n        <label class=\"title\"><img src=\"assets/logo-300px.png\" /></label>\n        <div class=\"login-group\">\n            <input\n                class=\"username\"\n                type=\"text\"\n                name=\"username\"\n                id=\"login_username\"\n                [(ngModel)]=\"username\"\n                [placeholder]=\"'common.username' | translate\"\n            />\n            <input\n                class=\"password\"\n                name=\"password\"\n                type=\"password\"\n                id=\"login_password\"\n                [(ngModel)]=\"password\"\n                [placeholder]=\"'common.password' | translate\"\n            />\n            <clr-alert [clrAlertType]=\"'danger'\"  [clrAlertClosable]=\"false\" [class.visible]=\"errorMessage\" class=\"login-error\">\n                <clr-alert-item>\n                    <span class=\"alert-text\">\n                        {{ errorMessage }}\n                    </span>\n                </clr-alert-item>\n            </clr-alert>\n            <clr-checkbox-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrCheckbox\n                    id=\"rememberme\"\n                    name=\"rememberme\"\n                    [(ngModel)]=\"rememberMe\"\n                />\n                <label>{{ 'common.remember-me' | translate }}</label>\n            </clr-checkbox-wrapper>\n            <button\n                type=\"submit\"\n                class=\"btn btn-primary\"\n                (click)=\"logIn()\"\n                [disabled]=\"!username || !password\"\n            >\n                {{ 'common.login' | translate }}\n            </button>\n        </div>\n        <div class=\"version\">\n            <span *ngIf=\"brand\">{{ brand }} <span *ngIf=\"!hideVendureBranding || !hideVersion\">-</span></span>\n            <span *ngIf=\"!hideVendureBranding\">vendure</span>\n            <span *ngIf=\"!hideVersion\">v{{ version }}</span>\n        </div>\n    </form>\n</div>\n",
                styles: [".login-wrapper{background:var(--login-page-bg);background-size:auto;justify-content:center}.title{text-align:center}.version{flex:1;display:flex;align-items:flex-end;justify-content:center;color:var(--color-grey-300)}.version span+span{margin-left:5px}.login-error{max-height:0;overflow:hidden}.login-error.visible{max-height:46px;transition:max-height .2s;-webkit-animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;-webkit-animation-delay:.2s;animation-delay:.2s;transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;perspective:1000px}@-webkit-keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}"]
            },] }
];
LoginComponent.ctorParameters = () => [
    { type: AuthService },
    { type: Router }
];

/**
 * This guard prevents loggen-in users from navigating to the login screen.
 */
class LoginGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate(route) {
        return this.authService.checkAuthenticatedStatus().pipe(map(authenticated => {
            if (authenticated) {
                this.router.navigate(['/']);
            }
            return !authenticated;
        }));
    }
}
LoginGuard.ɵprov = ɵɵdefineInjectable({ factory: function LoginGuard_Factory() { return new LoginGuard(ɵɵinject(Router), ɵɵinject(AuthService)); }, token: LoginGuard, providedIn: "root" });
LoginGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
LoginGuard.ctorParameters = () => [
    { type: Router },
    { type: AuthService }
];

const loginRoutes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [LoginGuard],
    },
];

class LoginModule {
}
LoginModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(loginRoutes)],
                exports: [],
                declarations: [LoginComponent],
            },] }
];

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { LoginComponent, LoginGuard, LoginModule, loginRoutes };
//# sourceMappingURL=vendure-admin-ui-login.js.map
