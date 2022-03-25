import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { getAppConfig } from '../../app.config';
import { DataService } from '../../data/providers/data.service';
import { AuthService } from '../../providers/auth/auth.service';
import { I18nService } from '../../providers/i18n/i18n.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { ModalService } from '../../providers/modal/modal.service';
import { UiLanguageSwitcherDialogComponent } from '../ui-language-switcher-dialog/ui-language-switcher-dialog.component';
export class AppShellComponent {
    constructor(authService, dataService, router, i18nService, modalService, localStorageService) {
        this.authService = authService;
        this.dataService = dataService;
        this.router = router;
        this.i18nService = i18nService;
        this.modalService = modalService;
        this.localStorageService = localStorageService;
        this.availableLanguages = [];
    }
    ngOnInit() {
        this.userName$ = this.dataService.client
            .userStatus()
            .single$.pipe(map(data => data.userStatus.username));
        this.uiLanguage$ = this.dataService.client.uiState().stream$.pipe(map(data => data.uiState.language));
        this.availableLanguages = this.i18nService.availableLanguages;
    }
    selectUiLanguage() {
        this.uiLanguage$
            .pipe(take(1), switchMap(currentLanguage => this.modalService.fromComponent(UiLanguageSwitcherDialogComponent, {
            closable: true,
            size: 'sm',
            locals: {
                availableLanguages: this.availableLanguages,
                currentLanguage,
            },
        })), switchMap(value => (value ? this.dataService.client.setUiLanguage(value) : EMPTY)))
            .subscribe(result => {
            if (result.setUiLanguage) {
                this.i18nService.setLanguage(result.setUiLanguage);
                this.localStorageService.set('uiLanguageCode', result.setUiLanguage);
            }
        });
    }
    logOut() {
        this.authService.logOut().subscribe(() => {
            const { loginUrl } = getAppConfig();
            if (loginUrl) {
                window.location.href = loginUrl;
            }
            else {
                this.router.navigate(['/login']);
            }
        });
    }
}
AppShellComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-app-shell',
                template: "<clr-main-container>\n    <clr-header>\n        <div class=\"branding\">\n            <a [routerLink]=\"['/']\"><img src=\"assets/logo-75px.png\" class=\"logo\" /></a>\n        </div>\n        <div class=\"header-nav\"></div>\n        <div class=\"header-actions\">\n            <vdr-channel-switcher *vdrIfMultichannel></vdr-channel-switcher>\n            <vdr-user-menu [userName]=\"userName$ | async\"\n                           [uiLanguage]=\"uiLanguage$ | async\"\n                           [availableLanguages]=\"availableLanguages\"\n                           (selectUiLanguage)=\"selectUiLanguage()\"\n                           (logOut)=\"logOut()\"></vdr-user-menu>\n        </div>\n    </clr-header>\n    <nav class=\"subnav\"><vdr-breadcrumb></vdr-breadcrumb></nav>\n\n    <div class=\"content-container\">\n        <div class=\"content-area\"><router-outlet></router-outlet></div>\n        <vdr-main-nav></vdr-main-nav>\n    </div>\n</clr-main-container>\n",
                styles: [".branding{min-width:0}.logo{width:60px}@media screen and (min-width:768px){vdr-breadcrumb{margin-left:10.8rem}}.header-actions{align-items:center}.content-area{position:relative}"]
            },] }
];
AppShellComponent.ctorParameters = () => [
    { type: AuthService },
    { type: DataService },
    { type: Router },
    { type: I18nService },
    { type: ModalService },
    { type: LocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNoZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tcG9uZW50cy9hcHAtc2hlbGwvYXBwLXNoZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFPekgsTUFBTSxPQUFPLGlCQUFpQjtJQUsxQixZQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLE1BQWMsRUFDZCxXQUF3QixFQUN4QixZQUEwQixFQUMxQixtQkFBd0M7UUFMeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFScEQsdUJBQWtCLEdBQW1CLEVBQUUsQ0FBQztJQVNyQyxDQUFDO0lBRUosUUFBUTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2FBQ25DLFVBQVUsRUFBRTthQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7SUFDbEUsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxXQUFXO2FBQ1gsSUFBSSxDQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxTQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsaUNBQWlDLEVBQUU7WUFDL0QsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRTtnQkFDSixrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO2dCQUMzQyxlQUFlO2FBQ2xCO1NBQ0osQ0FBQyxDQUNMLEVBQ0QsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDckY7YUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO2dCQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3hFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNyQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDcEMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNwQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBNURKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsdzlCQUF5Qzs7YUFFNUM7OztZQVZRLFdBQVc7WUFEWCxXQUFXO1lBTlgsTUFBTTtZQVFOLFdBQVc7WUFFWCxZQUFZO1lBRFosbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGdldEFwcENvbmZpZyB9IGZyb20gJy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgTGFuZ3VhZ2VDb2RlIH0gZnJvbSAnLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9hdXRoL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBJMThuU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9pMThuL2kxOG4uc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGFsU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9tb2RhbC9tb2RhbC5zZXJ2aWNlJztcbmltcG9ydCB7IFVpTGFuZ3VhZ2VTd2l0Y2hlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3VpLWxhbmd1YWdlLXN3aXRjaGVyLWRpYWxvZy91aS1sYW5ndWFnZS1zd2l0Y2hlci1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYXBwLXNoZWxsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwLXNoZWxsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAtc2hlbGwuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwU2hlbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHVzZXJOYW1lJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIHVpTGFuZ3VhZ2UkOiBPYnNlcnZhYmxlPExhbmd1YWdlQ29kZT47XG4gICAgYXZhaWxhYmxlTGFuZ3VhZ2VzOiBMYW5ndWFnZUNvZGVbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBpMThuU2VydmljZTogSTE4blNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51c2VyTmFtZSQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLnVzZXJTdGF0dXMoKVxuICAgICAgICAgICAgLnNpbmdsZSQucGlwZShtYXAoZGF0YSA9PiBkYXRhLnVzZXJTdGF0dXMudXNlcm5hbWUpKTtcbiAgICAgICAgdGhpcy51aUxhbmd1YWdlJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVpU3RhdGUoKS5zdHJlYW0kLnBpcGUobWFwKGRhdGEgPT4gZGF0YS51aVN0YXRlLmxhbmd1YWdlKSk7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlTGFuZ3VhZ2VzID0gdGhpcy5pMThuU2VydmljZS5hdmFpbGFibGVMYW5ndWFnZXM7XG4gICAgfVxuXG4gICAgc2VsZWN0VWlMYW5ndWFnZSgpIHtcbiAgICAgICAgdGhpcy51aUxhbmd1YWdlJFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoY3VycmVudExhbmd1YWdlID0+XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLmZyb21Db21wb25lbnQoVWlMYW5ndWFnZVN3aXRjaGVyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6ICdzbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVMYW5ndWFnZXM6IHRoaXMuYXZhaWxhYmxlTGFuZ3VhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHZhbHVlID0+ICh2YWx1ZSA/IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnNldFVpTGFuZ3VhZ2UodmFsdWUpIDogRU1QVFkpKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnNldFVpTGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pMThuU2VydmljZS5zZXRMYW5ndWFnZShyZXN1bHQuc2V0VWlMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3VpTGFuZ3VhZ2VDb2RlJywgcmVzdWx0LnNldFVpTGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ091dCgpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dPdXQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBsb2dpblVybCB9ID0gZ2V0QXBwQ29uZmlnKCk7XG4gICAgICAgICAgICBpZiAobG9naW5VcmwpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxvZ2luVXJsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19