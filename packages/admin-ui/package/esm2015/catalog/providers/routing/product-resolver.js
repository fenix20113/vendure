import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { getDefaultUiLanguage } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@vendure/admin-ui/core";
import * as i2 from "@angular/router";
export class ProductResolver extends BaseEntityResolver {
    constructor(dataService, router) {
        super(router, {
            __typename: 'Product',
            id: '',
            createdAt: '',
            updatedAt: '',
            enabled: true,
            languageCode: getDefaultUiLanguage(),
            name: '',
            slug: '',
            featuredAsset: null,
            assets: [],
            description: '',
            translations: [],
            optionGroups: [],
            facetValues: [],
            variants: [],
            channels: [],
        }, (id) => dataService.product
            .getProduct(id)
            .refetchOnChannelChange()
            .mapStream((data) => data.product));
    }
}
ProductResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ProductResolver_Factory() { return new ProductResolver(i0.ɵɵinject(i1.DataService), i0.ɵɵinject(i2.Router)); }, token: ProductResolver, providedIn: "root" });
ProductResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProductResolver.ctorParameters = () => [
    { type: DataService },
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvcHJvdmlkZXJzL3JvdXRpbmcvcHJvZHVjdC1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFLckQsTUFBTSxPQUFPLGVBQWdCLFNBQVEsa0JBQWdEO0lBQ2pGLFlBQVksV0FBd0IsRUFBRSxNQUFjO1FBQ2hELEtBQUssQ0FDRCxNQUFNLEVBQ047WUFDSSxVQUFVLEVBQUUsU0FBc0I7WUFDbEMsRUFBRSxFQUFFLEVBQUU7WUFDTixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixZQUFZLEVBQUUsb0JBQW9CLEVBQUU7WUFDcEMsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxJQUFJO1lBQ25CLE1BQU0sRUFBRSxFQUFFO1lBQ1YsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsRUFBRTtZQUNoQixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxFQUFFLEVBQUU7U0FDZixFQUNELENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FDSCxXQUFXLENBQUMsT0FBTzthQUNkLFVBQVUsQ0FBQyxFQUFFLENBQUM7YUFDZCxzQkFBc0IsRUFBRTthQUN4QixTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDN0MsQ0FBQztJQUNOLENBQUM7Ozs7WUEvQkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFKUSxXQUFXO1lBSlgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IFByb2R1Y3RXaXRoVmFyaWFudHMgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGdldERlZmF1bHRVaUxhbmd1YWdlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0UmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8UHJvZHVjdFdpdGhWYXJpYW50cy5GcmFnbWVudD4ge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb3V0ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZTogJ1Byb2R1Y3QnIGFzICdQcm9kdWN0JyxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlOiBnZXREZWZhdWx0VWlMYW5ndWFnZSgpLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIHNsdWc6ICcnLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVkQXNzZXQ6IG51bGwsXG4gICAgICAgICAgICAgICAgYXNzZXRzOiBbXSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25zOiBbXSxcbiAgICAgICAgICAgICAgICBvcHRpb25Hcm91cHM6IFtdLFxuICAgICAgICAgICAgICAgIGZhY2V0VmFsdWVzOiBbXSxcbiAgICAgICAgICAgICAgICB2YXJpYW50czogW10sXG4gICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChpZCkgPT5cbiAgICAgICAgICAgICAgICBkYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgIC5nZXRQcm9kdWN0KGlkKVxuICAgICAgICAgICAgICAgICAgICAucmVmZXRjaE9uQ2hhbm5lbENoYW5nZSgpXG4gICAgICAgICAgICAgICAgICAgIC5tYXBTdHJlYW0oKGRhdGEpID0+IGRhdGEucHJvZHVjdCksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19