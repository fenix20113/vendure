import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { CanDeactivateDetailGuard, createResolveData, detailBreadcrumb, } from '@vendure/admin-ui/core';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { ChannelDetailComponent } from './components/channel-detail/channel-detail.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { PaymentMethodDetailComponent } from './components/payment-method-detail/payment-method-detail.component';
import { PaymentMethodListComponent } from './components/payment-method-list/payment-method-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { ShippingMethodDetailComponent } from './components/shipping-method-detail/shipping-method-detail.component';
import { ShippingMethodListComponent } from './components/shipping-method-list/shipping-method-list.component';
import { TaxCategoryDetailComponent } from './components/tax-category-detail/tax-category-detail.component';
import { TaxCategoryListComponent } from './components/tax-category-list/tax-category-list.component';
import { TaxRateDetailComponent } from './components/tax-rate-detail/tax-rate-detail.component';
import { TaxRateListComponent } from './components/tax-rate-list/tax-rate-list.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { AdministratorResolver } from './providers/routing/administrator-resolver';
import { ChannelResolver } from './providers/routing/channel-resolver';
import { CountryResolver } from './providers/routing/country-resolver';
import { GlobalSettingsResolver } from './providers/routing/global-settings-resolver';
import { PaymentMethodResolver } from './providers/routing/payment-method-resolver';
import { ProfileResolver } from './providers/routing/profile-resolver';
import { RoleResolver } from './providers/routing/role-resolver';
import { ShippingMethodResolver } from './providers/routing/shipping-method-resolver';
import { TaxCategoryResolver } from './providers/routing/tax-category-resolver';
import { TaxRateResolver } from './providers/routing/tax-rate-resolver';
const ɵ0 = {
    breadcrumb: _('breadcrumb.profile'),
}, ɵ1 = {
    breadcrumb: _('breadcrumb.administrators'),
}, ɵ2 = { breadcrumb: administratorBreadcrumb }, ɵ3 = {
    breadcrumb: _('breadcrumb.channels'),
}, ɵ4 = { breadcrumb: channelBreadcrumb }, ɵ5 = {
    breadcrumb: _('breadcrumb.roles'),
}, ɵ6 = { breadcrumb: roleBreadcrumb }, ɵ7 = {
    breadcrumb: _('breadcrumb.tax-categories'),
}, ɵ8 = {
    breadcrumb: taxCategoryBreadcrumb,
}, ɵ9 = {
    breadcrumb: _('breadcrumb.tax-rates'),
}, ɵ10 = {
    breadcrumb: taxRateBreadcrumb,
}, ɵ11 = {
    breadcrumb: _('breadcrumb.countries'),
}, ɵ12 = {
    breadcrumb: countryBreadcrumb,
}, ɵ13 = {
    breadcrumb: _('breadcrumb.zones'),
}, ɵ14 = {
    breadcrumb: _('breadcrumb.shipping-methods'),
}, ɵ15 = {
    breadcrumb: shippingMethodBreadcrumb,
}, ɵ16 = {
    breadcrumb: _('breadcrumb.payment-methods'),
}, ɵ17 = {
    breadcrumb: paymentMethodBreadcrumb,
}, ɵ18 = {
    breadcrumb: _('breadcrumb.global-settings'),
};
export const settingsRoutes = [
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: createResolveData(ProfileResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ0,
    },
    {
        path: 'administrators',
        component: AdministratorListComponent,
        data: ɵ1,
    },
    {
        path: 'administrators/:id',
        component: AdminDetailComponent,
        resolve: createResolveData(AdministratorResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ2,
    },
    {
        path: 'channels',
        component: ChannelListComponent,
        data: ɵ3,
    },
    {
        path: 'channels/:id',
        component: ChannelDetailComponent,
        resolve: createResolveData(ChannelResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ4,
    },
    {
        path: 'roles',
        component: RoleListComponent,
        data: ɵ5,
    },
    {
        path: 'roles/:id',
        component: RoleDetailComponent,
        resolve: createResolveData(RoleResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ6,
    },
    {
        path: 'tax-categories',
        component: TaxCategoryListComponent,
        data: ɵ7,
    },
    {
        path: 'tax-categories/:id',
        component: TaxCategoryDetailComponent,
        resolve: createResolveData(TaxCategoryResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ8,
    },
    {
        path: 'tax-rates',
        component: TaxRateListComponent,
        data: ɵ9,
    },
    {
        path: 'tax-rates/:id',
        component: TaxRateDetailComponent,
        resolve: createResolveData(TaxRateResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ10,
    },
    {
        path: 'countries',
        component: CountryListComponent,
        data: ɵ11,
    },
    {
        path: 'countries/:id',
        component: CountryDetailComponent,
        resolve: createResolveData(CountryResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ12,
    },
    {
        path: 'zones',
        component: ZoneListComponent,
        data: ɵ13,
    },
    {
        path: 'shipping-methods',
        component: ShippingMethodListComponent,
        data: ɵ14,
    },
    {
        path: 'shipping-methods/:id',
        component: ShippingMethodDetailComponent,
        resolve: createResolveData(ShippingMethodResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ15,
    },
    {
        path: 'payment-methods',
        component: PaymentMethodListComponent,
        data: ɵ16,
    },
    {
        path: 'payment-methods/:id',
        component: PaymentMethodDetailComponent,
        resolve: createResolveData(PaymentMethodResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ17,
    },
    {
        path: 'global-settings',
        component: GlobalSettingsComponent,
        resolve: createResolveData(GlobalSettingsResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ18,
    },
];
export function administratorBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.administrators',
        getName: admin => `${admin.firstName} ${admin.lastName}`,
        route: 'administrators',
    });
}
export function channelBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.channels',
        getName: channel => channel.code,
        route: 'channels',
    });
}
export function roleBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.roles',
        getName: role => role.description,
        route: 'roles',
    });
}
export function taxCategoryBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.tax-categories',
        getName: category => category.name,
        route: 'tax-categories',
    });
}
export function taxRateBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.tax-rates',
        getName: category => category.name,
        route: 'tax-rates',
    });
}
export function countryBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.countries',
        getName: promotion => promotion.name,
        route: 'countries',
    });
}
export function shippingMethodBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.shipping-methods',
        getName: method => method.name,
        route: 'shipping-methods',
    });
}
export function paymentMethodBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.payment-methods',
        getName: method => method.code,
        route: 'payment-methods',
    });
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15, ɵ16, ɵ17, ɵ18 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Mucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvc2V0dGluZ3Mucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUVILHdCQUF3QixFQUd4QixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBS25CLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDMUcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDakcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDbEgsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDNUcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDckgsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFD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SSxDQUFDLE1BQU07UUFDbkIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ2IsYUFBYSxFQUFFLDRCQUE0QjtRQUMzQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSTtRQUM5QixLQUFLLEVBQUUsaUJBQWlCO0tBQzNCLENBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEFkbWluaXN0cmF0b3IsXG4gICAgQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkLFxuICAgIENoYW5uZWwsXG4gICAgQ291bnRyeSxcbiAgICBjcmVhdGVSZXNvbHZlRGF0YSxcbiAgICBkZXRhaWxCcmVhZGNydW1iLFxuICAgIFJvbGUsXG4gICAgU2hpcHBpbmdNZXRob2QsXG4gICAgVGF4Q2F0ZWdvcnksXG4gICAgVGF4UmF0ZSxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbmltcG9ydCB7IEFkbWluRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FkbWluLWRldGFpbC9hZG1pbi1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IEFkbWluaXN0cmF0b3JMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FkbWluaXN0cmF0b3ItbGlzdC9hZG1pbmlzdHJhdG9yLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENoYW5uZWxEZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2hhbm5lbC1kZXRhaWwvY2hhbm5lbC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IENoYW5uZWxMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NoYW5uZWwtbGlzdC9jaGFubmVsLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvdW50cnlEZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY291bnRyeS1kZXRhaWwvY291bnRyeS1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvdW50cnlMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvdW50cnktbGlzdC9jb3VudHJ5LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEdsb2JhbFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2dsb2JhbC1zZXR0aW5ncy9nbG9iYWwtc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IFBheW1lbnRNZXRob2REZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGF5bWVudC1tZXRob2QtZGV0YWlsL3BheW1lbnQtbWV0aG9kLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF5bWVudE1ldGhvZExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGF5bWVudC1tZXRob2QtbGlzdC9wYXltZW50LW1ldGhvZC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9maWxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm9sZURldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yb2xlLWRldGFpbC9yb2xlLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm9sZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcm9sZS1saXN0L3JvbGUtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hpcHBpbmdNZXRob2REZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hpcHBpbmctbWV0aG9kLWRldGFpbC9zaGlwcGluZy1tZXRob2QtZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGlwcGluZ01ldGhvZExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2hpcHBpbmctbWV0aG9kLWxpc3Qvc2hpcHBpbmctbWV0aG9kLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRheENhdGVnb3J5RGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RheC1jYXRlZ29yeS1kZXRhaWwvdGF4LWNhdGVnb3J5LWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGF4Q2F0ZWdvcnlMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RheC1jYXRlZ29yeS1saXN0L3RheC1jYXRlZ29yeS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYXhSYXRlRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RheC1yYXRlLWRldGFpbC90YXgtcmF0ZS1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFRheFJhdGVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RheC1yYXRlLWxpc3QvdGF4LXJhdGUtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgWm9uZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvem9uZS1saXN0L3pvbmUtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRtaW5pc3RyYXRvclJlc29sdmVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcm91dGluZy9hZG1pbmlzdHJhdG9yLXJlc29sdmVyJztcbmltcG9ydCB7IENoYW5uZWxSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvY2hhbm5lbC1yZXNvbHZlcic7XG5pbXBvcnQgeyBDb3VudHJ5UmVzb2x2ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3V0aW5nL2NvdW50cnktcmVzb2x2ZXInO1xuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3NSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvZ2xvYmFsLXNldHRpbmdzLXJlc29sdmVyJztcbmltcG9ydCB7IFBheW1lbnRNZXRob2RSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvcGF5bWVudC1tZXRob2QtcmVzb2x2ZXInO1xuaW1wb3J0IHsgUHJvZmlsZVJlc29sdmVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcm91dGluZy9wcm9maWxlLXJlc29sdmVyJztcbmltcG9ydCB7IFJvbGVSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvcm9sZS1yZXNvbHZlcic7XG5pbXBvcnQgeyBTaGlwcGluZ01ldGhvZFJlc29sdmVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcm91dGluZy9zaGlwcGluZy1tZXRob2QtcmVzb2x2ZXInO1xuaW1wb3J0IHsgVGF4Q2F0ZWdvcnlSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvdGF4LWNhdGVnb3J5LXJlc29sdmVyJztcbmltcG9ydCB7IFRheFJhdGVSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvdGF4LXJhdGUtcmVzb2x2ZXInO1xuXG5leHBvcnQgY29uc3Qgc2V0dGluZ3NSb3V0ZXM6IFJvdXRlW10gPSBbXG4gICAge1xuICAgICAgICBwYXRoOiAncHJvZmlsZScsXG4gICAgICAgIGNvbXBvbmVudDogUHJvZmlsZUNvbXBvbmVudCxcbiAgICAgICAgcmVzb2x2ZTogY3JlYXRlUmVzb2x2ZURhdGEoUHJvZmlsZVJlc29sdmVyKSxcbiAgICAgICAgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVEZXRhaWxHdWFyZF0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IF8oJ2JyZWFkY3J1bWIucHJvZmlsZScpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAnYWRtaW5pc3RyYXRvcnMnLFxuICAgICAgICBjb21wb25lbnQ6IEFkbWluaXN0cmF0b3JMaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBfKCdicmVhZGNydW1iLmFkbWluaXN0cmF0b3JzJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdhZG1pbmlzdHJhdG9ycy86aWQnLFxuICAgICAgICBjb21wb25lbnQ6IEFkbWluRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShBZG1pbmlzdHJhdG9yUmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YTogeyBicmVhZGNydW1iOiBhZG1pbmlzdHJhdG9yQnJlYWRjcnVtYiB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAnY2hhbm5lbHMnLFxuICAgICAgICBjb21wb25lbnQ6IENoYW5uZWxMaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBfKCdicmVhZGNydW1iLmNoYW5uZWxzJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdjaGFubmVscy86aWQnLFxuICAgICAgICBjb21wb25lbnQ6IENoYW5uZWxEZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKENoYW5uZWxSZXNvbHZlciksXG4gICAgICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlRGV0YWlsR3VhcmRdLFxuICAgICAgICBkYXRhOiB7IGJyZWFkY3J1bWI6IGNoYW5uZWxCcmVhZGNydW1iIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdyb2xlcycsXG4gICAgICAgIGNvbXBvbmVudDogUm9sZUxpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IF8oJ2JyZWFkY3J1bWIucm9sZXMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ3JvbGVzLzppZCcsXG4gICAgICAgIGNvbXBvbmVudDogUm9sZURldGFpbENvbXBvbmVudCxcbiAgICAgICAgcmVzb2x2ZTogY3JlYXRlUmVzb2x2ZURhdGEoUm9sZVJlc29sdmVyKSxcbiAgICAgICAgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVEZXRhaWxHdWFyZF0sXG4gICAgICAgIGRhdGE6IHsgYnJlYWRjcnVtYjogcm9sZUJyZWFkY3J1bWIgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ3RheC1jYXRlZ29yaWVzJyxcbiAgICAgICAgY29tcG9uZW50OiBUYXhDYXRlZ29yeUxpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IF8oJ2JyZWFkY3J1bWIudGF4LWNhdGVnb3JpZXMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ3RheC1jYXRlZ29yaWVzLzppZCcsXG4gICAgICAgIGNvbXBvbmVudDogVGF4Q2F0ZWdvcnlEZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKFRheENhdGVnb3J5UmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogdGF4Q2F0ZWdvcnlCcmVhZGNydW1iLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAndGF4LXJhdGVzJyxcbiAgICAgICAgY29tcG9uZW50OiBUYXhSYXRlTGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogXygnYnJlYWRjcnVtYi50YXgtcmF0ZXMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ3RheC1yYXRlcy86aWQnLFxuICAgICAgICBjb21wb25lbnQ6IFRheFJhdGVEZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKFRheFJhdGVSZXNvbHZlciksXG4gICAgICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlRGV0YWlsR3VhcmRdLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiB0YXhSYXRlQnJlYWRjcnVtYixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2NvdW50cmllcycsXG4gICAgICAgIGNvbXBvbmVudDogQ291bnRyeUxpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IF8oJ2JyZWFkY3J1bWIuY291bnRyaWVzJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdjb3VudHJpZXMvOmlkJyxcbiAgICAgICAgY29tcG9uZW50OiBDb3VudHJ5RGV0YWlsQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShDb3VudHJ5UmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogY291bnRyeUJyZWFkY3J1bWIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICd6b25lcycsXG4gICAgICAgIGNvbXBvbmVudDogWm9uZUxpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IF8oJ2JyZWFkY3J1bWIuem9uZXMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ3NoaXBwaW5nLW1ldGhvZHMnLFxuICAgICAgICBjb21wb25lbnQ6IFNoaXBwaW5nTWV0aG9kTGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogXygnYnJlYWRjcnVtYi5zaGlwcGluZy1tZXRob2RzJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdzaGlwcGluZy1tZXRob2RzLzppZCcsXG4gICAgICAgIGNvbXBvbmVudDogU2hpcHBpbmdNZXRob2REZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKFNoaXBwaW5nTWV0aG9kUmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogc2hpcHBpbmdNZXRob2RCcmVhZGNydW1iLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAncGF5bWVudC1tZXRob2RzJyxcbiAgICAgICAgY29tcG9uZW50OiBQYXltZW50TWV0aG9kTGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogXygnYnJlYWRjcnVtYi5wYXltZW50LW1ldGhvZHMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ3BheW1lbnQtbWV0aG9kcy86aWQnLFxuICAgICAgICBjb21wb25lbnQ6IFBheW1lbnRNZXRob2REZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKFBheW1lbnRNZXRob2RSZXNvbHZlciksXG4gICAgICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlRGV0YWlsR3VhcmRdLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBwYXltZW50TWV0aG9kQnJlYWRjcnVtYixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2dsb2JhbC1zZXR0aW5ncycsXG4gICAgICAgIGNvbXBvbmVudDogR2xvYmFsU2V0dGluZ3NDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKEdsb2JhbFNldHRpbmdzUmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogXygnYnJlYWRjcnVtYi5nbG9iYWwtc2V0dGluZ3MnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkbWluaXN0cmF0b3JCcmVhZGNydW1iKGRhdGE6IGFueSwgcGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gZGV0YWlsQnJlYWRjcnVtYjxBZG1pbmlzdHJhdG9yPih7XG4gICAgICAgIGVudGl0eTogZGF0YS5lbnRpdHksXG4gICAgICAgIGlkOiBwYXJhbXMuaWQsXG4gICAgICAgIGJyZWFkY3J1bWJLZXk6ICdicmVhZGNydW1iLmFkbWluaXN0cmF0b3JzJyxcbiAgICAgICAgZ2V0TmFtZTogYWRtaW4gPT4gYCR7YWRtaW4uZmlyc3ROYW1lfSAke2FkbWluLmxhc3ROYW1lfWAsXG4gICAgICAgIHJvdXRlOiAnYWRtaW5pc3RyYXRvcnMnLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbEJyZWFkY3J1bWIoZGF0YTogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIHJldHVybiBkZXRhaWxCcmVhZGNydW1iPENoYW5uZWw+KHtcbiAgICAgICAgZW50aXR5OiBkYXRhLmVudGl0eSxcbiAgICAgICAgaWQ6IHBhcmFtcy5pZCxcbiAgICAgICAgYnJlYWRjcnVtYktleTogJ2JyZWFkY3J1bWIuY2hhbm5lbHMnLFxuICAgICAgICBnZXROYW1lOiBjaGFubmVsID0+IGNoYW5uZWwuY29kZSxcbiAgICAgICAgcm91dGU6ICdjaGFubmVscycsXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb2xlQnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8Um9sZT4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi5yb2xlcycsXG4gICAgICAgIGdldE5hbWU6IHJvbGUgPT4gcm9sZS5kZXNjcmlwdGlvbixcbiAgICAgICAgcm91dGU6ICdyb2xlcycsXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0YXhDYXRlZ29yeUJyZWFkY3J1bWIoZGF0YTogYW55LCBwYXJhbXM6IGFueSkge1xuICAgIHJldHVybiBkZXRhaWxCcmVhZGNydW1iPFRheENhdGVnb3J5LkZyYWdtZW50Pih7XG4gICAgICAgIGVudGl0eTogZGF0YS5lbnRpdHksXG4gICAgICAgIGlkOiBwYXJhbXMuaWQsXG4gICAgICAgIGJyZWFkY3J1bWJLZXk6ICdicmVhZGNydW1iLnRheC1jYXRlZ29yaWVzJyxcbiAgICAgICAgZ2V0TmFtZTogY2F0ZWdvcnkgPT4gY2F0ZWdvcnkubmFtZSxcbiAgICAgICAgcm91dGU6ICd0YXgtY2F0ZWdvcmllcycsXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0YXhSYXRlQnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8VGF4UmF0ZS5GcmFnbWVudD4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi50YXgtcmF0ZXMnLFxuICAgICAgICBnZXROYW1lOiBjYXRlZ29yeSA9PiBjYXRlZ29yeS5uYW1lLFxuICAgICAgICByb3V0ZTogJ3RheC1yYXRlcycsXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3VudHJ5QnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8Q291bnRyeS5GcmFnbWVudD4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi5jb3VudHJpZXMnLFxuICAgICAgICBnZXROYW1lOiBwcm9tb3Rpb24gPT4gcHJvbW90aW9uLm5hbWUsXG4gICAgICAgIHJvdXRlOiAnY291bnRyaWVzJyxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaXBwaW5nTWV0aG9kQnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8U2hpcHBpbmdNZXRob2QuRnJhZ21lbnQ+KHtcbiAgICAgICAgZW50aXR5OiBkYXRhLmVudGl0eSxcbiAgICAgICAgaWQ6IHBhcmFtcy5pZCxcbiAgICAgICAgYnJlYWRjcnVtYktleTogJ2JyZWFkY3J1bWIuc2hpcHBpbmctbWV0aG9kcycsXG4gICAgICAgIGdldE5hbWU6IG1ldGhvZCA9PiBtZXRob2QubmFtZSxcbiAgICAgICAgcm91dGU6ICdzaGlwcGluZy1tZXRob2RzJyxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBheW1lbnRNZXRob2RCcmVhZGNydW1iKGRhdGE6IGFueSwgcGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gZGV0YWlsQnJlYWRjcnVtYjxTaGlwcGluZ01ldGhvZC5GcmFnbWVudD4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi5wYXltZW50LW1ldGhvZHMnLFxuICAgICAgICBnZXROYW1lOiBtZXRob2QgPT4gbWV0aG9kLmNvZGUsXG4gICAgICAgIHJvdXRlOiAncGF5bWVudC1tZXRob2RzJyxcbiAgICB9KTtcbn1cbiJdfQ==