import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { getDefaultUiLanguage } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class CollectionResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Collection',
            id: '',
            createdAt: '',
            updatedAt: '',
            languageCode: getDefaultUiLanguage(),
            name: '',
            slug: '',
            isPrivate: false,
            description: '',
            featuredAsset: null,
            assets: [],
            translations: [],
            filters: [],
            parent: {},
            children: null,
        }, id => dataService.collection.getCollection(id).mapStream(data => data.collection));
    }
}
CollectionResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function CollectionResolver_Factory() { return new CollectionResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: CollectionResolver, providedIn: "root" });
CollectionResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CollectionResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvcHJvdmlkZXJzL3JvdXRpbmcvY29sbGVjdGlvbi1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFLckQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGtCQUF1QztJQUMzRSxZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLFlBQTRCO1lBQ3hDLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFlBQVksRUFBRSxvQkFBb0IsRUFBRTtZQUNwQyxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsSUFBSTtZQUNuQixNQUFNLEVBQUUsRUFBRTtZQUNWLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQVM7WUFDakIsUUFBUSxFQUFFLElBQUk7U0FDakIsRUFDRCxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDcEYsQ0FBQztJQUNOLENBQUM7Ozs7WUExQkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFSUSxNQUFNO1lBSU4sV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IENvbGxlY3Rpb24sIFByb2R1Y3RXaXRoVmFyaWFudHMgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGdldERlZmF1bHRVaUxhbmd1YWdlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uUmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8Q29sbGVjdGlvbi5GcmFnbWVudD4ge1xuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb3V0ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX190eXBlbmFtZTogJ0NvbGxlY3Rpb24nIGFzICdDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZTogZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UoKSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBzbHVnOiAnJyxcbiAgICAgICAgICAgICAgICBpc1ByaXZhdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBmZWF0dXJlZEFzc2V0OiBudWxsLFxuICAgICAgICAgICAgICAgIGFzc2V0czogW10sXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25zOiBbXSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiBbXSxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IHt9IGFzIGFueSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZCA9PiBkYXRhU2VydmljZS5jb2xsZWN0aW9uLmdldENvbGxlY3Rpb24oaWQpLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuY29sbGVjdGlvbiksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19