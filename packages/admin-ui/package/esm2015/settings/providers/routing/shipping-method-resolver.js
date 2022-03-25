import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * Resolves the id from the path into a Customer entity.
 */
export class ShippingMethodResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'ShippingMethod',
            createdAt: '',
            updatedAt: '',
            id: '',
            code: '',
            name: '',
            description: '',
            fulfillmentHandlerCode: undefined,
            checker: undefined,
            calculator: undefined,
            translations: [],
        }, id => dataService.shippingMethod.getShippingMethod(id).mapStream(data => data.shippingMethod));
    }
}
ShippingMethodResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ShippingMethodResolver_Factory() { return new ShippingMethodResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: ShippingMethodResolver, providedIn: "root" });
ShippingMethodResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ShippingMethodResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmctbWV0aG9kLXJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvcHJvdmlkZXJzL3JvdXRpbmcvc2hpcHBpbmctbWV0aG9kLXJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUVyRDs7R0FFRztBQUlILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxrQkFBMkM7SUFDbkYsWUFBWSxNQUFjLEVBQUUsV0FBd0I7UUFDaEQsS0FBSyxDQUNELE1BQU0sRUFDTjtZQUNJLFVBQVUsRUFBRSxnQkFBZ0I7WUFDNUIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxFQUFFO1lBQ2Ysc0JBQXNCLEVBQUUsU0FBZ0I7WUFDeEMsT0FBTyxFQUFFLFNBQWdCO1lBQ3pCLFVBQVUsRUFBRSxTQUFnQjtZQUM1QixZQUFZLEVBQUUsRUFBRTtTQUNuQixFQUNELEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQ2hHLENBQUM7SUFDTixDQUFDOzs7O1lBdEJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBVlEsTUFBTTtZQUdOLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUVudGl0eVJlc29sdmVyIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBTaGlwcGluZ01ldGhvZCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgaWQgZnJvbSB0aGUgcGF0aCBpbnRvIGEgQ3VzdG9tZXIgZW50aXR5LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTaGlwcGluZ01ldGhvZFJlc29sdmVyIGV4dGVuZHMgQmFzZUVudGl0eVJlc29sdmVyPFNoaXBwaW5nTWV0aG9kLkZyYWdtZW50PiB7XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3R5cGVuYW1lOiAnU2hpcHBpbmdNZXRob2QnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiAnJyxcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgY29kZTogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGZ1bGZpbGxtZW50SGFuZGxlckNvZGU6IHVuZGVmaW5lZCBhcyBhbnksXG4gICAgICAgICAgICAgICAgY2hlY2tlcjogdW5kZWZpbmVkIGFzIGFueSxcbiAgICAgICAgICAgICAgICBjYWxjdWxhdG9yOiB1bmRlZmluZWQgYXMgYW55LFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWQgPT4gZGF0YVNlcnZpY2Uuc2hpcHBpbmdNZXRob2QuZ2V0U2hpcHBpbmdNZXRob2QoaWQpLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuc2hpcHBpbmdNZXRob2QpLFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==