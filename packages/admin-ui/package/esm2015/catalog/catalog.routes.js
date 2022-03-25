import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { CanDeactivateDetailGuard, createResolveData, detailBreadcrumb, } from '@vendure/admin-ui/core';
import { map } from 'rxjs/operators';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { FacetDetailComponent } from './components/facet-detail/facet-detail.component';
import { FacetListComponent } from './components/facet-list/facet-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductVariantsEditorComponent } from './components/product-variants-editor/product-variants-editor.component';
import { AssetResolver } from './providers/routing/asset-resolver';
import { CollectionResolver } from './providers/routing/collection-resolver';
import { FacetResolver } from './providers/routing/facet-resolver';
import { ProductResolver } from './providers/routing/product-resolver';
import { ProductVariantsResolver } from './providers/routing/product-variants-resolver';
const ɵ0 = {
    breadcrumb: _('breadcrumb.products'),
}, ɵ1 = {
    breadcrumb: productBreadcrumb,
}, ɵ2 = {
    breadcrumb: productVariantEditorBreadcrumb,
}, ɵ3 = {
    breadcrumb: _('breadcrumb.facets'),
}, ɵ4 = {
    breadcrumb: facetBreadcrumb,
}, ɵ5 = {
    breadcrumb: _('breadcrumb.collections'),
}, ɵ6 = {
    breadcrumb: collectionBreadcrumb,
}, ɵ7 = {
    breadcrumb: _('breadcrumb.assets'),
}, ɵ8 = {
    breadcrumb: assetBreadcrumb,
};
export const catalogRoutes = [
    {
        path: 'products',
        component: ProductListComponent,
        data: ɵ0,
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
        resolve: createResolveData(ProductResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ1,
    },
    {
        path: 'products/:id/manage-variants',
        component: ProductVariantsEditorComponent,
        resolve: createResolveData(ProductVariantsResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ2,
    },
    {
        path: 'facets',
        component: FacetListComponent,
        data: ɵ3,
    },
    {
        path: 'facets/:id',
        component: FacetDetailComponent,
        resolve: createResolveData(FacetResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ4,
    },
    {
        path: 'collections',
        component: CollectionListComponent,
        data: ɵ5,
    },
    {
        path: 'collections/:id',
        component: CollectionDetailComponent,
        resolve: createResolveData(CollectionResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ6,
    },
    {
        path: 'assets',
        component: AssetListComponent,
        data: ɵ7,
    },
    {
        path: 'assets/:id',
        component: AssetDetailComponent,
        resolve: createResolveData(AssetResolver),
        data: ɵ8,
    },
];
export function productBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.products',
        getName: product => product.name,
        route: 'products',
    });
}
export function productVariantEditorBreadcrumb(data, params) {
    return data.entity.pipe(map((entity) => {
        return [
            {
                label: _('breadcrumb.products'),
                link: ['../', 'products'],
            },
            {
                label: `${entity.name}`,
                link: ['../', 'products', params.id, { tab: 'variants' }],
            },
            {
                label: _('breadcrumb.manage-variants'),
                link: ['manage-variants'],
            },
        ];
    }));
}
export function facetBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.facets',
        getName: facet => facet.name,
        route: 'facets',
    });
}
export function collectionBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.collections',
        getName: collection => collection.name,
        route: 'collections',
    });
}
export function assetBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.assets',
        getName: asset => asset.name,
        route: 'assets',
    });
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NhdGFsb2cucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUVILHdCQUF3QixFQUV4QixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBR25CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFB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O1FBQ25CLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNiLGFBQWEsRUFBRSxtQkFBbUI7UUFDbEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUk7UUFDNUIsS0FBSyxFQUFFLFFBQVE7S0FDbEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQXNzZXQsXG4gICAgQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkLFxuICAgIENvbGxlY3Rpb24sXG4gICAgY3JlYXRlUmVzb2x2ZURhdGEsXG4gICAgZGV0YWlsQnJlYWRjcnVtYixcbiAgICBGYWNldFdpdGhWYWx1ZXMsXG4gICAgUHJvZHVjdFdpdGhWYXJpYW50cyxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFzc2V0RGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Fzc2V0LWRldGFpbC9hc3NldC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IEFzc2V0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hc3NldC1saXN0L2Fzc2V0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25EZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGVjdGlvbi1kZXRhaWwvY29sbGVjdGlvbi1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxlY3Rpb24tbGlzdC9jb2xsZWN0aW9uLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0RGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZhY2V0LWRldGFpbC9mYWNldC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mYWNldC1saXN0L2ZhY2V0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3REZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvZHVjdC1kZXRhaWwvcHJvZHVjdC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RWYXJpYW50c0VkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9kdWN0LXZhcmlhbnRzLWVkaXRvci9wcm9kdWN0LXZhcmlhbnRzLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNzZXRSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvYXNzZXQtcmVzb2x2ZXInO1xuaW1wb3J0IHsgQ29sbGVjdGlvblJlc29sdmVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcm91dGluZy9jb2xsZWN0aW9uLXJlc29sdmVyJztcbmltcG9ydCB7IEZhY2V0UmVzb2x2ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3V0aW5nL2ZhY2V0LXJlc29sdmVyJztcbmltcG9ydCB7IFByb2R1Y3RSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvcHJvZHVjdC1yZXNvbHZlcic7XG5pbXBvcnQgeyBQcm9kdWN0VmFyaWFudHNSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvcHJvZHVjdC12YXJpYW50cy1yZXNvbHZlcic7XG5cbmV4cG9ydCBjb25zdCBjYXRhbG9nUm91dGVzOiBSb3V0ZVtdID0gW1xuICAgIHtcbiAgICAgICAgcGF0aDogJ3Byb2R1Y3RzJyxcbiAgICAgICAgY29tcG9uZW50OiBQcm9kdWN0TGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogXygnYnJlYWRjcnVtYi5wcm9kdWN0cycpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAncHJvZHVjdHMvOmlkJyxcbiAgICAgICAgY29tcG9uZW50OiBQcm9kdWN0RGV0YWlsQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShQcm9kdWN0UmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogcHJvZHVjdEJyZWFkY3J1bWIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdwcm9kdWN0cy86aWQvbWFuYWdlLXZhcmlhbnRzJyxcbiAgICAgICAgY29tcG9uZW50OiBQcm9kdWN0VmFyaWFudHNFZGl0b3JDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKFByb2R1Y3RWYXJpYW50c1Jlc29sdmVyKSxcbiAgICAgICAgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVEZXRhaWxHdWFyZF0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IHByb2R1Y3RWYXJpYW50RWRpdG9yQnJlYWRjcnVtYixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2ZhY2V0cycsXG4gICAgICAgIGNvbXBvbmVudDogRmFjZXRMaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBfKCdicmVhZGNydW1iLmZhY2V0cycpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAnZmFjZXRzLzppZCcsXG4gICAgICAgIGNvbXBvbmVudDogRmFjZXREZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKEZhY2V0UmVzb2x2ZXIpLFxuICAgICAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZURldGFpbEd1YXJkXSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogZmFjZXRCcmVhZGNydW1iLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAnY29sbGVjdGlvbnMnLFxuICAgICAgICBjb21wb25lbnQ6IENvbGxlY3Rpb25MaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBfKCdicmVhZGNydW1iLmNvbGxlY3Rpb25zJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdjb2xsZWN0aW9ucy86aWQnLFxuICAgICAgICBjb21wb25lbnQ6IENvbGxlY3Rpb25EZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKENvbGxlY3Rpb25SZXNvbHZlciksXG4gICAgICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlRGV0YWlsR3VhcmRdLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBjb2xsZWN0aW9uQnJlYWRjcnVtYixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2Fzc2V0cycsXG4gICAgICAgIGNvbXBvbmVudDogQXNzZXRMaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBfKCdicmVhZGNydW1iLmFzc2V0cycpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAnYXNzZXRzLzppZCcsXG4gICAgICAgIGNvbXBvbmVudDogQXNzZXREZXRhaWxDb21wb25lbnQsXG4gICAgICAgIHJlc29sdmU6IGNyZWF0ZVJlc29sdmVEYXRhKEFzc2V0UmVzb2x2ZXIpLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBicmVhZGNydW1iOiBhc3NldEJyZWFkY3J1bWIsXG4gICAgICAgIH0sXG4gICAgfSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9kdWN0QnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8UHJvZHVjdFdpdGhWYXJpYW50cy5GcmFnbWVudD4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi5wcm9kdWN0cycsXG4gICAgICAgIGdldE5hbWU6IHByb2R1Y3QgPT4gcHJvZHVjdC5uYW1lLFxuICAgICAgICByb3V0ZTogJ3Byb2R1Y3RzJyxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2R1Y3RWYXJpYW50RWRpdG9yQnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRhdGEuZW50aXR5LnBpcGUoXG4gICAgICAgIG1hcCgoZW50aXR5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnYnJlYWRjcnVtYi5wcm9kdWN0cycpLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBbJy4uLycsICdwcm9kdWN0cyddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7ZW50aXR5Lm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgbGluazogWycuLi8nLCAncHJvZHVjdHMnLCBwYXJhbXMuaWQsIHsgdGFiOiAndmFyaWFudHMnIH1dLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXygnYnJlYWRjcnVtYi5tYW5hZ2UtdmFyaWFudHMnKSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogWydtYW5hZ2UtdmFyaWFudHMnXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfSksXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZhY2V0QnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8RmFjZXRXaXRoVmFsdWVzLkZyYWdtZW50Pih7XG4gICAgICAgIGVudGl0eTogZGF0YS5lbnRpdHksXG4gICAgICAgIGlkOiBwYXJhbXMuaWQsXG4gICAgICAgIGJyZWFkY3J1bWJLZXk6ICdicmVhZGNydW1iLmZhY2V0cycsXG4gICAgICAgIGdldE5hbWU6IGZhY2V0ID0+IGZhY2V0Lm5hbWUsXG4gICAgICAgIHJvdXRlOiAnZmFjZXRzJyxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3Rpb25CcmVhZGNydW1iKGRhdGE6IGFueSwgcGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gZGV0YWlsQnJlYWRjcnVtYjxDb2xsZWN0aW9uLkZyYWdtZW50Pih7XG4gICAgICAgIGVudGl0eTogZGF0YS5lbnRpdHksXG4gICAgICAgIGlkOiBwYXJhbXMuaWQsXG4gICAgICAgIGJyZWFkY3J1bWJLZXk6ICdicmVhZGNydW1iLmNvbGxlY3Rpb25zJyxcbiAgICAgICAgZ2V0TmFtZTogY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLm5hbWUsXG4gICAgICAgIHJvdXRlOiAnY29sbGVjdGlvbnMnLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXRCcmVhZGNydW1iKGRhdGE6IGFueSwgcGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gZGV0YWlsQnJlYWRjcnVtYjxBc3NldC5GcmFnbWVudD4oe1xuICAgICAgICBlbnRpdHk6IGRhdGEuZW50aXR5LFxuICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICBicmVhZGNydW1iS2V5OiAnYnJlYWRjcnVtYi5hc3NldHMnLFxuICAgICAgICBnZXROYW1lOiBhc3NldCA9PiBhc3NldC5uYW1lLFxuICAgICAgICByb3V0ZTogJ2Fzc2V0cycsXG4gICAgfSk7XG59XG4iXX0=