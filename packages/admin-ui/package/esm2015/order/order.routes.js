import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { CanDeactivateDetailGuard, createResolveData, detailBreadcrumb, } from '@vendure/admin-ui/core';
import { map } from 'rxjs/operators';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderEditorComponent } from './components/order-editor/order-editor.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderResolver } from './providers/routing/order-resolver';
const ɵ0 = {
    breadcrumb: _('breadcrumb.orders'),
}, ɵ1 = {
    breadcrumb: orderBreadcrumb,
}, ɵ2 = {
    breadcrumb: modifyingOrderBreadcrumb,
};
export const orderRoutes = [
    {
        path: '',
        component: OrderListComponent,
        data: ɵ0,
    },
    {
        path: ':id',
        component: OrderDetailComponent,
        resolve: createResolveData(OrderResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ1,
    },
    {
        path: ':id/modify',
        component: OrderEditorComponent,
        resolve: createResolveData(OrderResolver),
        // canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ2,
    },
];
export function orderBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.orders',
        getName: order => order.code,
        route: '',
    });
}
export function modifyingOrderBreadcrumb(data, params) {
    return orderBreadcrumb(data, params).pipe(map((breadcrumbs) => {
        const modifiedBreadcrumbs = breadcrumbs.slice();
        modifiedBreadcrumbs[0].link[0] = '../';
        modifiedBreadcrumbs[1].link[0] = '../orders';
        return modifiedBreadcrumbs.concat({ label: _('breadcrumb.modifying'), link: [''] });
    }));
}
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvb3JkZXIucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUVILHdCQUF3QixFQUN4QixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBRW5CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztXQU1yRDtJQUNGLFVBQVUsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUM7Q0FDckMsT0FPSztJQUNGLFVBQVUsRUFBRSxlQUFlO0NBQzlCLE9BT0s7SUFDRixVQUFVLEVBQUUsd0JBQXdCO0NBQ3ZDO0FBeEJULE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBWTtJQUNoQztRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLGtCQUFrQjtRQUM3QixJQUFJLElBRUg7S0FDSjtJQUNEO1FBQ0ksSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsb0JBQW9CO1FBQy9CLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDekMsYUFBYSxFQUFFLENBQUMsd0JBQXdCLENBQUM7UUFDekMsSUFBSSxJQUVIO0tBQ0o7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLFNBQVMsRUFBRSxvQkFBb0I7UUFDL0IsT0FBTyxFQUFFLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUN6Qyw2Q0FBNkM7UUFDN0MsSUFBSSxJQUVIO0tBQ0o7Q0FDSixDQUFDO0FBRUYsTUFBTSxVQUFVLGVBQWUsQ0FBQyxJQUFTLEVBQUUsTUFBVztJQUNsRCxPQUFPLGdCQUFnQixDQUF1QjtRQUMxQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07UUFDbkIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ2IsYUFBYSxFQUFFLG1CQUFtQjtRQUNsQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUM1QixLQUFLLEVBQUUsRUFBRTtLQUNaLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsSUFBUyxFQUFFLE1BQVc7SUFDM0QsT0FBTyxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDckMsR0FBRyxDQUFDLENBQUMsV0FBc0MsRUFBRSxFQUFFO1FBQzNDLE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdkMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUM3QyxPQUFPLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEYsQ0FBQyxDQUFRLENBQ1osQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJyZWFkY3J1bWJMYWJlbExpbmtQYWlyLFxuICAgIENhbkRlYWN0aXZhdGVEZXRhaWxHdWFyZCxcbiAgICBjcmVhdGVSZXNvbHZlRGF0YSxcbiAgICBkZXRhaWxCcmVhZGNydW1iLFxuICAgIE9yZGVyRGV0YWlsLFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgT3JkZXJEZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItZGV0YWlsL29yZGVyLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItZWRpdG9yL29yZGVyLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL29yZGVyLWxpc3Qvb3JkZXItbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJSZXNvbHZlciB9IGZyb20gJy4vcHJvdmlkZXJzL3JvdXRpbmcvb3JkZXItcmVzb2x2ZXInO1xuXG5leHBvcnQgY29uc3Qgb3JkZXJSb3V0ZXM6IFJvdXRlW10gPSBbXG4gICAge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgY29tcG9uZW50OiBPcmRlckxpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IF8oJ2JyZWFkY3J1bWIub3JkZXJzJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICc6aWQnLFxuICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShPcmRlclJlc29sdmVyKSxcbiAgICAgICAgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVEZXRhaWxHdWFyZF0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IG9yZGVyQnJlYWRjcnVtYixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJzppZC9tb2RpZnknLFxuICAgICAgICBjb21wb25lbnQ6IE9yZGVyRWRpdG9yQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiBjcmVhdGVSZXNvbHZlRGF0YShPcmRlclJlc29sdmVyKSxcbiAgICAgICAgLy8gY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVEZXRhaWxHdWFyZF0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6IG1vZGlmeWluZ09yZGVyQnJlYWRjcnVtYixcbiAgICAgICAgfSxcbiAgICB9LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9yZGVyQnJlYWRjcnVtYihkYXRhOiBhbnksIHBhcmFtczogYW55KSB7XG4gICAgcmV0dXJuIGRldGFpbEJyZWFkY3J1bWI8T3JkZXJEZXRhaWwuRnJhZ21lbnQ+KHtcbiAgICAgICAgZW50aXR5OiBkYXRhLmVudGl0eSxcbiAgICAgICAgaWQ6IHBhcmFtcy5pZCxcbiAgICAgICAgYnJlYWRjcnVtYktleTogJ2JyZWFkY3J1bWIub3JkZXJzJyxcbiAgICAgICAgZ2V0TmFtZTogb3JkZXIgPT4gb3JkZXIuY29kZSxcbiAgICAgICAgcm91dGU6ICcnLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kaWZ5aW5nT3JkZXJCcmVhZGNydW1iKGRhdGE6IGFueSwgcGFyYW1zOiBhbnkpIHtcbiAgICByZXR1cm4gb3JkZXJCcmVhZGNydW1iKGRhdGEsIHBhcmFtcykucGlwZShcbiAgICAgICAgbWFwKChicmVhZGNydW1iczogQnJlYWRjcnVtYkxhYmVsTGlua1BhaXJbXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kaWZpZWRCcmVhZGNydW1icyA9IGJyZWFkY3J1bWJzLnNsaWNlKCk7XG4gICAgICAgICAgICBtb2RpZmllZEJyZWFkY3J1bWJzWzBdLmxpbmtbMF0gPSAnLi4vJztcbiAgICAgICAgICAgIG1vZGlmaWVkQnJlYWRjcnVtYnNbMV0ubGlua1swXSA9ICcuLi9vcmRlcnMnO1xuICAgICAgICAgICAgcmV0dXJuIG1vZGlmaWVkQnJlYWRjcnVtYnMuY29uY2F0KHsgbGFiZWw6IF8oJ2JyZWFkY3J1bWIubW9kaWZ5aW5nJyksIGxpbms6IFsnJ10gfSk7XG4gICAgICAgIH0pIGFzIGFueSxcbiAgICApO1xufVxuIl19