import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { map, startWith } from 'rxjs/operators';
import { Permission } from '../../common/generated-types';
import { DataService } from '../../data/providers/data.service';
import { HealthCheckService } from '../../providers/health-check/health-check.service';
import { JobQueueService } from '../../providers/job-queue/job-queue.service';
import { NavBuilderService } from '../../providers/nav-builder/nav-builder.service';
export class MainNavComponent {
    constructor(route, router, navBuilderService, healthCheckService, jobQueueService, dataService) {
        this.route = route;
        this.router = router;
        this.navBuilderService = navBuilderService;
        this.healthCheckService = healthCheckService;
        this.jobQueueService = jobQueueService;
        this.dataService = dataService;
    }
    shouldDisplayLink(menuItem) {
        if (!this.userPermissions) {
            return false;
        }
        if (!menuItem.requiresPermission) {
            return true;
        }
        if (typeof menuItem.requiresPermission === 'string') {
            return this.userPermissions.includes(menuItem.requiresPermission);
        }
        if (typeof menuItem.requiresPermission === 'function') {
            return menuItem.requiresPermission(this.userPermissions);
        }
    }
    ngOnInit() {
        this.defineNavMenu();
        this.subscription = this.dataService.client
            .userStatus()
            .mapStream(({ userStatus }) => {
            this.userPermissions = userStatus.permissions;
        })
            .subscribe();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    getRouterLink(item) {
        return this.navBuilderService.getRouterLink(item, this.route);
    }
    defineNavMenu() {
        function allow(...permissions) {
            return userPermissions => {
                for (const permission of permissions) {
                    if (userPermissions.includes(permission)) {
                        return true;
                    }
                }
                return false;
            };
        }
        this.navBuilderService.defineNavMenuSections([
            {
                requiresPermission: allow(Permission.ReadCatalog, Permission.ReadProduct, Permission.ReadFacet, Permission.ReadCollection, Permission.ReadAsset),
                id: 'catalog',
                label: _('nav.catalog'),
                items: [
                    {
                        requiresPermission: allow(Permission.ReadCatalog, Permission.ReadProduct),
                        id: 'products',
                        label: _('nav.products'),
                        icon: 'library',
                        routerLink: ['/catalog', 'products'],
                    },
                    {
                        requiresPermission: allow(Permission.ReadCatalog, Permission.ReadFacet),
                        id: 'facets',
                        label: _('nav.facets'),
                        icon: 'tag',
                        routerLink: ['/catalog', 'facets'],
                    },
                    {
                        requiresPermission: allow(Permission.ReadCatalog, Permission.ReadCollection),
                        id: 'collections',
                        label: _('nav.collections'),
                        icon: 'folder-open',
                        routerLink: ['/catalog', 'collections'],
                    },
                    {
                        requiresPermission: allow(Permission.ReadCatalog, Permission.ReadAsset),
                        id: 'assets',
                        label: _('nav.assets'),
                        icon: 'image-gallery',
                        routerLink: ['/catalog', 'assets'],
                    },
                ],
            },
            {
                id: 'sales',
                label: _('nav.sales'),
                requiresPermission: allow(Permission.ReadOrder),
                items: [
                    {
                        requiresPermission: allow(Permission.ReadOrder),
                        id: 'orders',
                        label: _('nav.orders'),
                        routerLink: ['/orders'],
                        icon: 'shopping-cart',
                    },
                ],
            },
            {
                id: 'customers',
                label: _('nav.customers'),
                requiresPermission: allow(Permission.ReadCustomer, Permission.ReadCustomerGroup),
                items: [
                    {
                        requiresPermission: allow(Permission.ReadCustomer),
                        id: 'customers',
                        label: _('nav.customers'),
                        routerLink: ['/customer', 'customers'],
                        icon: 'user',
                    },
                    {
                        requiresPermission: allow(Permission.ReadCustomerGroup),
                        id: 'customer-groups',
                        label: _('nav.customer-groups'),
                        routerLink: ['/customer', 'groups'],
                        icon: 'users',
                    },
                ],
            },
            {
                id: 'marketing',
                label: _('nav.marketing'),
                requiresPermission: allow(Permission.ReadPromotion),
                items: [
                    {
                        requiresPermission: allow(Permission.ReadPromotion),
                        id: 'promotions',
                        label: _('nav.promotions'),
                        routerLink: ['/marketing', 'promotions'],
                        icon: 'asterisk',
                    },
                ],
            },
            {
                id: 'settings',
                label: _('nav.settings'),
                requiresPermission: allow(Permission.ReadSettings, Permission.ReadChannel, Permission.ReadAdministrator, Permission.ReadShippingMethod, Permission.ReadPaymentMethod, Permission.ReadTaxCategory, Permission.ReadTaxRate, Permission.ReadCountry, Permission.ReadZone, Permission.UpdateGlobalSettings),
                collapsible: true,
                collapsedByDefault: true,
                items: [
                    {
                        requiresPermission: allow(Permission.ReadChannel),
                        id: 'channels',
                        label: _('nav.channels'),
                        routerLink: ['/settings', 'channels'],
                        icon: 'layers',
                    },
                    {
                        requiresPermission: allow(Permission.ReadAdministrator),
                        id: 'administrators',
                        label: _('nav.administrators'),
                        routerLink: ['/settings', 'administrators'],
                        icon: 'administrator',
                    },
                    {
                        requiresPermission: allow(Permission.ReadAdministrator),
                        id: 'roles',
                        label: _('nav.roles'),
                        routerLink: ['/settings', 'roles'],
                        icon: 'users',
                    },
                    {
                        requiresPermission: allow(Permission.ReadShippingMethod),
                        id: 'shipping-methods',
                        label: _('nav.shipping-methods'),
                        routerLink: ['/settings', 'shipping-methods'],
                        icon: 'truck',
                    },
                    {
                        requiresPermission: allow(Permission.ReadPaymentMethod),
                        id: 'payment-methods',
                        label: _('nav.payment-methods'),
                        routerLink: ['/settings', 'payment-methods'],
                        icon: 'credit-card',
                    },
                    {
                        requiresPermission: allow(Permission.ReadTaxCategory),
                        id: 'tax-categories',
                        label: _('nav.tax-categories'),
                        routerLink: ['/settings', 'tax-categories'],
                        icon: 'view-list',
                    },
                    {
                        requiresPermission: allow(Permission.ReadTaxRate),
                        id: 'tax-rates',
                        label: _('nav.tax-rates'),
                        routerLink: ['/settings', 'tax-rates'],
                        icon: 'calculator',
                    },
                    {
                        requiresPermission: allow(Permission.ReadCountry),
                        id: 'countries',
                        label: _('nav.countries'),
                        routerLink: ['/settings', 'countries'],
                        icon: 'flag',
                    },
                    {
                        requiresPermission: allow(Permission.ReadZone),
                        id: 'zones',
                        label: _('nav.zones'),
                        routerLink: ['/settings', 'zones'],
                        icon: 'world',
                    },
                    {
                        requiresPermission: allow(Permission.UpdateGlobalSettings),
                        id: 'global-settings',
                        label: _('nav.global-settings'),
                        routerLink: ['/settings', 'global-settings'],
                        icon: 'cog',
                    },
                ],
            },
            {
                id: 'system',
                label: _('nav.system'),
                requiresPermission: Permission.ReadSystem,
                collapsible: true,
                collapsedByDefault: true,
                items: [
                    {
                        id: 'job-queue',
                        label: _('nav.job-queue'),
                        routerLink: ['/system', 'jobs'],
                        icon: 'tick-chart',
                        statusBadge: this.jobQueueService.activeJobs$.pipe(startWith([]), map(jobs => ({
                            type: jobs.length === 0 ? 'none' : 'info',
                            propagateToSection: jobs.length > 0,
                        }))),
                    },
                    {
                        id: 'system-status',
                        label: _('nav.system-status'),
                        routerLink: ['/system', 'system-status'],
                        icon: 'rack-server',
                        statusBadge: this.healthCheckService.status$.pipe(map(status => ({
                            type: status === 'ok' ? 'success' : 'error',
                            propagateToSection: status === 'error',
                        }))),
                    },
                ],
            },
        ]);
    }
}
MainNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-main-nav',
                template: "<nav class=\"sidenav\" [clr-nav-level]=\"2\">\n    <section class=\"sidenav-content\">\n        <ng-container *ngFor=\"let section of navBuilderService.navMenuConfig$ | async\">\n            <section\n                class=\"nav-group\"\n                [attr.data-section-id]=\"section.id\"\n                [class.collapsible]=\"section.collapsible\"\n                *ngIf=\"shouldDisplayLink(section)\"\n            >\n                <ng-container *ngIf=\"navBuilderService.sectionBadges[section.id] | async as sectionBadge\">\n                    <div *ngIf=\"sectionBadge !== 'none'\" class=\"status-badge\" [class]=\"sectionBadge\"></div>\n                </ng-container>\n                <input [id]=\"section.id\" type=\"checkbox\" [checked]=\"section.collapsedByDefault\" />\n                <label [for]=\"section.id\">{{ section.label | translate }}</label>\n                <ul class=\"nav-list\">\n                    <ng-container *ngFor=\"let item of section.items\">\n                        <li *ngIf=\"shouldDisplayLink(item)\">\n                            <a\n                                class=\"nav-link\"\n                                [attr.data-item-id]=\"section.id\"\n                                [routerLink]=\"getRouterLink(item)\"\n                                routerLinkActive=\"active\"\n                            >\n                                <ng-container *ngIf=\"item.statusBadge | async as itemBadge\">\n                                    <div\n                                        *ngIf=\"itemBadge.type !== 'none'\"\n                                        class=\"status-badge\"\n                                        [class]=\"itemBadge.type\"\n                                    ></div>\n                                </ng-container>\n                                <clr-icon [attr.shape]=\"item.icon || 'block'\" size=\"20\"></clr-icon>\n                                {{ item.label | translate }}\n                            </a>\n                        </li>\n                    </ng-container>\n                </ul>\n            </section>\n        </ng-container>\n    </section>\n</nav>\n",
                styles: [":host{order:-1;background-color:var(--clr-nav-background-color)}nav.sidenav{height:100%;width:10.8rem;border-right-color:var(--clr-sidenav-border-color)}.nav-list clr-icon{margin-right:12px}.nav-group,.nav-link{position:relative}.status-badge{width:10px;height:10px;position:absolute;border-radius:50%;border:1px solid var(--color-component-border-100)}.status-badge.info{background-color:var(--color-primary-600)}.status-badge.success{background-color:var(--color-success-500)}.status-badge.warning{background-color:var(--color-warning-500)}.status-badge.error{background-color:var(--color-error-400)}.nav-group .status-badge{left:10px;top:6px}.nav-link .status-badge{left:25px;top:3px}"]
            },] }
];
MainNavComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: NavBuilderService },
    { type: HealthCheckService },
    { type: JobQueueService },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1uYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9jb21wb25lbnRzL21haW4tbmF2L21haW4tbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFdEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQU9wRixNQUFNLE9BQU8sZ0JBQWdCO0lBQ3pCLFlBQ1ksS0FBcUIsRUFDckIsTUFBYyxFQUNmLGlCQUFvQyxFQUNuQyxrQkFBc0MsRUFDdEMsZUFBZ0MsRUFDaEMsV0FBd0I7UUFMeEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDbkMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDakMsQ0FBQztJQUtKLGlCQUFpQixDQUFDLFFBQWlEO1FBQy9E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QUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUNYLElBQUksRUFBRSxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU87NEJBQzNDLGtCQUFrQixFQUFFLE1BQU0sS0FBSyxPQUFPO3lCQUN6QyxDQUFDLENBQUMsQ0FDTjtxQkFDSjtpQkFDSjthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBNVJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsc29FQUF3Qzs7YUFFM0M7OztZQWhCUSxjQUFjO1lBQUUsTUFBTTtZQVV0QixpQkFBaUI7WUFIakIsa0JBQWtCO1lBQ2xCLGVBQWU7WUFGZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQZXJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBIZWFsdGhDaGVja1NlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvaGVhbHRoLWNoZWNrL2hlYWx0aC1jaGVjay5zZXJ2aWNlJztcbmltcG9ydCB7IEpvYlF1ZXVlU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9qb2ItcXVldWUvam9iLXF1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2TWVudUJhZGdlLCBOYXZNZW51SXRlbSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9uYXYtYnVpbGRlci9uYXYtYnVpbGRlci10eXBlcyc7XG5pbXBvcnQgeyBOYXZCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9uYXYtYnVpbGRlci9uYXYtYnVpbGRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItbWFpbi1uYXYnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYWluLW5hdi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbWFpbi1uYXYuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFpbk5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHB1YmxpYyBuYXZCdWlsZGVyU2VydmljZTogTmF2QnVpbGRlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgaGVhbHRoQ2hlY2tTZXJ2aWNlOiBIZWFsdGhDaGVja1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgam9iUXVldWVTZXJ2aWNlOiBKb2JRdWV1ZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICkge31cblxuICAgIHByaXZhdGUgdXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgc2hvdWxkRGlzcGxheUxpbmsobWVudUl0ZW06IFBpY2s8TmF2TWVudUl0ZW0sICdyZXF1aXJlc1Blcm1pc3Npb24nPikge1xuICAgICAgICBpZiAoIXRoaXMudXNlclBlcm1pc3Npb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZW51SXRlbS5yZXF1aXJlc1Blcm1pc3Npb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbWVudUl0ZW0ucmVxdWlyZXNQZXJtaXNzaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlclBlcm1pc3Npb25zLmluY2x1ZGVzKG1lbnVJdGVtLnJlcXVpcmVzUGVybWlzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBtZW51SXRlbS5yZXF1aXJlc1Blcm1pc3Npb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBtZW51SXRlbS5yZXF1aXJlc1Blcm1pc3Npb24odGhpcy51c2VyUGVybWlzc2lvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVmaW5lTmF2TWVudSgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAudXNlclN0YXR1cygpXG4gICAgICAgICAgICAubWFwU3RyZWFtKCh7IHVzZXJTdGF0dXMgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlclBlcm1pc3Npb25zID0gdXNlclN0YXR1cy5wZXJtaXNzaW9ucztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJvdXRlckxpbmsoaXRlbTogTmF2TWVudUl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2QnVpbGRlclNlcnZpY2UuZ2V0Um91dGVyTGluayhpdGVtLCB0aGlzLnJvdXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmluZU5hdk1lbnUoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGFsbG93KC4uLnBlcm1pc3Npb25zOiBzdHJpbmdbXSk6ICh1c2VyUGVybWlzc2lvbnM6IHN0cmluZ1tdKSA9PiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VyUGVybWlzc2lvbnMgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiBwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlclBlcm1pc3Npb25zLmluY2x1ZGVzKHBlcm1pc3Npb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uYXZCdWlsZGVyU2VydmljZS5kZWZpbmVOYXZNZW51U2VjdGlvbnMoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coXG4gICAgICAgICAgICAgICAgICAgIFBlcm1pc3Npb24uUmVhZENhdGFsb2csXG4gICAgICAgICAgICAgICAgICAgIFBlcm1pc3Npb24uUmVhZFByb2R1Y3QsXG4gICAgICAgICAgICAgICAgICAgIFBlcm1pc3Npb24uUmVhZEZhY2V0LFxuICAgICAgICAgICAgICAgICAgICBQZXJtaXNzaW9uLlJlYWRDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBQZXJtaXNzaW9uLlJlYWRBc3NldCxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGlkOiAnY2F0YWxvZycsXG4gICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5jYXRhbG9nJyksXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNQZXJtaXNzaW9uOiBhbGxvdyhQZXJtaXNzaW9uLlJlYWRDYXRhbG9nLCBQZXJtaXNzaW9uLlJlYWRQcm9kdWN0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAncHJvZHVjdHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5wcm9kdWN0cycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2xpYnJhcnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyTGluazogWycvY2F0YWxvZycsICdwcm9kdWN0cyddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlc1Blcm1pc3Npb246IGFsbG93KFBlcm1pc3Npb24uUmVhZENhdGFsb2csIFBlcm1pc3Npb24uUmVhZEZhY2V0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZmFjZXRzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBfKCduYXYuZmFjZXRzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAndGFnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms6IFsnL2NhdGFsb2cnLCAnZmFjZXRzJ10sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coUGVybWlzc2lvbi5SZWFkQ2F0YWxvZywgUGVybWlzc2lvbi5SZWFkQ29sbGVjdGlvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2NvbGxlY3Rpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBfKCduYXYuY29sbGVjdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmb2xkZXItb3BlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJMaW5rOiBbJy9jYXRhbG9nJywgJ2NvbGxlY3Rpb25zJ10sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coUGVybWlzc2lvbi5SZWFkQ2F0YWxvZywgUGVybWlzc2lvbi5SZWFkQXNzZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdhc3NldHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5hc3NldHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdpbWFnZS1nYWxsZXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms6IFsnL2NhdGFsb2cnLCAnYXNzZXRzJ10sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdzYWxlcycsXG4gICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5zYWxlcycpLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coUGVybWlzc2lvbi5SZWFkT3JkZXIpLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coUGVybWlzc2lvbi5SZWFkT3JkZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdvcmRlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5vcmRlcnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms6IFsnL29yZGVycyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3Nob3BwaW5nLWNhcnQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnY3VzdG9tZXJzJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogXygnbmF2LmN1c3RvbWVycycpLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coUGVybWlzc2lvbi5SZWFkQ3VzdG9tZXIsIFBlcm1pc3Npb24uUmVhZEN1c3RvbWVyR3JvdXApLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coUGVybWlzc2lvbi5SZWFkQ3VzdG9tZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdjdXN0b21lcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5jdXN0b21lcnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms6IFsnL2N1c3RvbWVyJywgJ2N1c3RvbWVycyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3VzZXInLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlc1Blcm1pc3Npb246IGFsbG93KFBlcm1pc3Npb24uUmVhZEN1c3RvbWVyR3JvdXApLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdjdXN0b21lci1ncm91cHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5jdXN0b21lci1ncm91cHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms6IFsnL2N1c3RvbWVyJywgJ2dyb3VwcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3VzZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ21hcmtldGluZycsXG4gICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5tYXJrZXRpbmcnKSxcbiAgICAgICAgICAgICAgICByZXF1aXJlc1Blcm1pc3Npb246IGFsbG93KFBlcm1pc3Npb24uUmVhZFByb21vdGlvbiksXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNQZXJtaXNzaW9uOiBhbGxvdyhQZXJtaXNzaW9uLlJlYWRQcm9tb3Rpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdwcm9tb3Rpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBfKCduYXYucHJvbW90aW9ucycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyTGluazogWycvbWFya2V0aW5nJywgJ3Byb21vdGlvbnMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdhc3RlcmlzaycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdzZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5zZXR0aW5ncycpLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coXG4gICAgICAgICAgICAgICAgICAgIFBlcm1pc3Npb24uUmVhZFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICBQZXJtaXNzaW9uLlJlYWRDaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICBQZXJtaXNzaW9uLlJlYWRBZG1pbmlzdHJhdG9yLFxuICAgICAgICAgICAgICAgICAgICBQZXJtaXNzaW9uLlJlYWRTaGlwcGluZ01ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgUGVybWlzc2lvbi5SZWFkUGF5bWVudE1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgUGVybWlzc2lvbi5SZWFkVGF4Q2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgIFBlcm1pc3Npb24uUmVhZFRheFJhdGUsXG4gICAgICAgICAgICAgICAgICAgIFBlcm1pc3Npb24uUmVhZENvdW50cnksXG4gICAgICAgICAgICAgICAgICAgIFBlcm1pc3Npb24uUmVhZFpvbmUsXG4gICAgICAgICAgICAgICAgICAgIFBlcm1pc3Npb24uVXBkYXRlR2xvYmFsU2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWRCeURlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNQZXJtaXNzaW9uOiBhbGxvdyhQZXJtaXNzaW9uLlJlYWRDaGFubmVsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnY2hhbm5lbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5jaGFubmVscycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyTGluazogWycvc2V0dGluZ3MnLCAnY2hhbm5lbHMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdsYXllcnMnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlc1Blcm1pc3Npb246IGFsbG93KFBlcm1pc3Npb24uUmVhZEFkbWluaXN0cmF0b3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdhZG1pbmlzdHJhdG9ycycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnbmF2LmFkbWluaXN0cmF0b3JzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJMaW5rOiBbJy9zZXR0aW5ncycsICdhZG1pbmlzdHJhdG9ycyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2FkbWluaXN0cmF0b3InLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlc1Blcm1pc3Npb246IGFsbG93KFBlcm1pc3Npb24uUmVhZEFkbWluaXN0cmF0b3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdyb2xlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnbmF2LnJvbGVzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJMaW5rOiBbJy9zZXR0aW5ncycsICdyb2xlcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3VzZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNQZXJtaXNzaW9uOiBhbGxvdyhQZXJtaXNzaW9uLlJlYWRTaGlwcGluZ01ldGhvZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3NoaXBwaW5nLW1ldGhvZHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5zaGlwcGluZy1tZXRob2RzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJMaW5rOiBbJy9zZXR0aW5ncycsICdzaGlwcGluZy1tZXRob2RzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAndHJ1Y2snLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlc1Blcm1pc3Npb246IGFsbG93KFBlcm1pc3Npb24uUmVhZFBheW1lbnRNZXRob2QpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdwYXltZW50LW1ldGhvZHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5wYXltZW50LW1ldGhvZHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms6IFsnL3NldHRpbmdzJywgJ3BheW1lbnQtbWV0aG9kcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2NyZWRpdC1jYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNQZXJtaXNzaW9uOiBhbGxvdyhQZXJtaXNzaW9uLlJlYWRUYXhDYXRlZ29yeSksXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3RheC1jYXRlZ29yaWVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBfKCduYXYudGF4LWNhdGVnb3JpZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms6IFsnL3NldHRpbmdzJywgJ3RheC1jYXRlZ29yaWVzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAndmlldy1saXN0JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNQZXJtaXNzaW9uOiBhbGxvdyhQZXJtaXNzaW9uLlJlYWRUYXhSYXRlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAndGF4LXJhdGVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBfKCduYXYudGF4LXJhdGVzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJMaW5rOiBbJy9zZXR0aW5ncycsICd0YXgtcmF0ZXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdjYWxjdWxhdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNQZXJtaXNzaW9uOiBhbGxvdyhQZXJtaXNzaW9uLlJlYWRDb3VudHJ5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnY291bnRyaWVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBfKCduYXYuY291bnRyaWVzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJMaW5rOiBbJy9zZXR0aW5ncycsICdjb3VudHJpZXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmbGFnJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNQZXJtaXNzaW9uOiBhbGxvdyhQZXJtaXNzaW9uLlJlYWRab25lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnem9uZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi56b25lcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyTGluazogWycvc2V0dGluZ3MnLCAnem9uZXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICd3b3JsZCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogYWxsb3coUGVybWlzc2lvbi5VcGRhdGVHbG9iYWxTZXR0aW5ncyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2dsb2JhbC1zZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnbmF2Lmdsb2JhbC1zZXR0aW5ncycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyTGluazogWycvc2V0dGluZ3MnLCAnZ2xvYmFsLXNldHRpbmdzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnY29nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3N5c3RlbScsXG4gICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5zeXN0ZW0nKSxcbiAgICAgICAgICAgICAgICByZXF1aXJlc1Blcm1pc3Npb246IFBlcm1pc3Npb24uUmVhZFN5c3RlbSxcbiAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWRCeURlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdqb2ItcXVldWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF8oJ25hdi5qb2ItcXVldWUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms6IFsnL3N5c3RlbScsICdqb2JzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAndGljay1jaGFydCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNCYWRnZTogdGhpcy5qb2JRdWV1ZVNlcnZpY2UuYWN0aXZlSm9icyQucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoW10pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgam9icyA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBqb2JzLmxlbmd0aCA9PT0gMCA/ICdub25lJyA6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wYWdhdGVUb1NlY3Rpb246IGpvYnMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgTmF2TWVudUJhZGdlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdzeXN0ZW0tc3RhdHVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBfKCduYXYuc3lzdGVtLXN0YXR1cycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyTGluazogWycvc3lzdGVtJywgJ3N5c3RlbS1zdGF0dXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdyYWNrLXNlcnZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNCYWRnZTogdGhpcy5oZWFsdGhDaGVja1NlcnZpY2Uuc3RhdHVzJC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChzdGF0dXMgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RhdHVzID09PSAnb2snID8gJ3N1Y2Nlc3MnIDogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGFnYXRlVG9TZWN0aW9uOiBzdGF0dXMgPT09ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIl19