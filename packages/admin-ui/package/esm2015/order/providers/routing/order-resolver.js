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
export class OrderResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Order',
            id: '',
            code: '',
            createdAt: '',
            updatedAt: '',
            total: 0,
        }, id => dataService.order.getOrder(id).mapStream(data => data.order));
    }
}
OrderResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function OrderResolver_Factory() { return new OrderResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: OrderResolver, providedIn: "root" });
OrderResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
OrderResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9wcm92aWRlcnMvcm91dGluZy9vcmRlci1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFckQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8sYUFBYyxTQUFRLGtCQUF3QztJQUN2RSxZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLE9BQU87WUFDbkIsRUFBRSxFQUFFLEVBQUU7WUFDTixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQztTQUNKLEVBQ1IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ3JFLENBQUM7SUFDTixDQUFDOzs7O1lBakJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBVlEsTUFBTTtZQUdOLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUVudGl0eVJlc29sdmVyIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBPcmRlckRldGFpbCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgaWQgZnJvbSB0aGUgcGF0aCBpbnRvIGEgQ3VzdG9tZXIgZW50aXR5LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclJlc29sdmVyIGV4dGVuZHMgQmFzZUVudGl0eVJlc29sdmVyPE9yZGVyRGV0YWlsLkZyYWdtZW50PiB7XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3R5cGVuYW1lOiAnT3JkZXInLFxuICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICBjb2RlOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgdG90YWw6IDAsXG4gICAgICAgICAgICB9IGFzIGFueSxcbiAgICAgICAgICAgIGlkID0+IGRhdGFTZXJ2aWNlLm9yZGVyLmdldE9yZGVyKGlkKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLm9yZGVyKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=