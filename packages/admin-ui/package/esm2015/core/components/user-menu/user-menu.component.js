import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageCode } from '../../common/generated-types';
export class UserMenuComponent {
    constructor() {
        this.userName = '';
        this.availableLanguages = [];
        this.logOut = new EventEmitter();
        this.selectUiLanguage = new EventEmitter();
    }
}
UserMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-user-menu',
                template: "<vdr-dropdown>\n    <button class=\"btn btn-link trigger\" vdrDropdownTrigger>\n        <span class=\"user-name\">{{ userName }}</span>\n        <clr-icon shape=\"user\" size=\"24\"></clr-icon>\n        <clr-icon shape=\"caret down\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n        <a [routerLink]=\"['/settings', 'profile']\" vdrDropdownItem>\n            <clr-icon shape=\"user\" class=\"is-solid\"></clr-icon> {{ 'settings.profile' | translate }}\n        </a>\n        <ng-container *ngIf=\"1 < availableLanguages.length\">\n            <button\n                type=\"button\"\n                vdrDropdownItem\n                (click)=\"selectUiLanguage.emit()\"\n                [title]=\"'common.select-display-language' | translate\"\n            >\n                <clr-icon shape=\"language\"></clr-icon> {{ 'lang.' + uiLanguage | translate }}\n            </button>\n        </ng-container>\n        <div class=\"dropdown-item\">\n            <vdr-theme-switcher></vdr-theme-switcher>\n        </div>\n        <div class=\"dropdown-divider\"></div>\n        <button type=\"button\" vdrDropdownItem (click)=\"logOut.emit()\">\n            <clr-icon shape=\"logout\"></clr-icon> {{ 'common.log-out' | translate }}\n        </button>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                styles: [":host{display:flex;align-items:center;margin:0 .5rem;height:2.5rem}.user-name{color:var(--color-grey-200);margin-right:12px}@media screen and (max-width:768px){.user-name{display:none}}.trigger clr-icon{color:#fff}"]
            },] }
];
UserMenuComponent.propDecorators = {
    userName: [{ type: Input }],
    availableLanguages: [{ type: Input }],
    uiLanguage: [{ type: Input }],
    logOut: [{ type: Output }],
    selectUiLanguage: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tcG9uZW50cy91c2VyLW1lbnUvdXNlci1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQU81RCxNQUFNLE9BQU8saUJBQWlCO0lBTDlCO1FBTWEsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLHVCQUFrQixHQUFtQixFQUFFLENBQUM7UUFFdkMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUMxRCxDQUFDOzs7WUFYQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLDR6Q0FBeUM7O2FBRTVDOzs7dUJBRUksS0FBSztpQ0FDTCxLQUFLO3lCQUNMLEtBQUs7cUJBQ0wsTUFBTTsrQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGFuZ3VhZ2VDb2RlIH0gZnJvbSAnLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXVzZXItbWVudScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3VzZXItbWVudS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdXNlci1tZW51LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJNZW51Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSB1c2VyTmFtZSA9ICcnO1xuICAgIEBJbnB1dCgpIGF2YWlsYWJsZUxhbmd1YWdlczogTGFuZ3VhZ2VDb2RlW10gPSBbXTtcbiAgICBASW5wdXQoKSB1aUxhbmd1YWdlOiBMYW5ndWFnZUNvZGU7XG4gICAgQE91dHB1dCgpIGxvZ091dCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgc2VsZWN0VWlMYW5ndWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbn1cbiJdfQ==