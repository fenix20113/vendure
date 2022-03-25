import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { AddManualPaymentDialogComponent } from './components/add-manual-payment-dialog/add-manual-payment-dialog.component';
import { CancelOrderDialogComponent } from './components/cancel-order-dialog/cancel-order-dialog.component';
import { FulfillOrderDialogComponent } from './components/fulfill-order-dialog/fulfill-order-dialog.component';
import { FulfillmentCardComponent } from './components/fulfillment-card/fulfillment-card.component';
import { FulfillmentDetailComponent } from './components/fulfillment-detail/fulfillment-detail.component';
import { FulfillmentStateLabelComponent } from './components/fulfillment-state-label/fulfillment-state-label.component';
import { LineFulfillmentComponent } from './components/line-fulfillment/line-fulfillment.component';
import { LineRefundsComponent } from './components/line-refunds/line-refunds.component';
import { ModificationDetailComponent } from './components/modification-detail/modification-detail.component';
import { OrderCustomFieldsCardComponent } from './components/order-custom-fields-card/order-custom-fields-card.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderEditorComponent } from './components/order-editor/order-editor.component';
import { OrderEditsPreviewDialogComponent } from './components/order-edits-preview-dialog/order-edits-preview-dialog.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPaymentCardComponent } from './components/order-payment-card/order-payment-card.component';
import { OrderProcessGraphDialogComponent } from './components/order-process-graph-dialog/order-process-graph-dialog.component';
import { OrderProcessEdgeComponent } from './components/order-process-graph/order-process-edge.component';
import { OrderProcessGraphComponent } from './components/order-process-graph/order-process-graph.component';
import { OrderProcessNodeComponent } from './components/order-process-graph/order-process-node.component';
import { OrderStateSelectDialogComponent } from './components/order-state-select-dialog/order-state-select-dialog.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { PaymentStateLabelComponent } from './components/payment-state-label/payment-state-label.component';
import { RefundOrderDialogComponent } from './components/refund-order-dialog/refund-order-dialog.component';
import { RefundStateLabelComponent } from './components/refund-state-label/refund-state-label.component';
import { SettleRefundDialogComponent } from './components/settle-refund-dialog/settle-refund-dialog.component';
import { SimpleItemListComponent } from './components/simple-item-list/simple-item-list.component';
import { orderRoutes } from './order.routes';
export class OrderModule {
}
OrderModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(orderRoutes)],
                declarations: [
                    OrderListComponent,
                    OrderDetailComponent,
                    FulfillOrderDialogComponent,
                    LineFulfillmentComponent,
                    RefundOrderDialogComponent,
                    CancelOrderDialogComponent,
                    PaymentStateLabelComponent,
                    LineRefundsComponent,
                    OrderPaymentCardComponent,
                    RefundStateLabelComponent,
                    SettleRefundDialogComponent,
                    OrderHistoryComponent,
                    FulfillmentDetailComponent,
                    PaymentDetailComponent,
                    SimpleItemListComponent,
                    OrderCustomFieldsCardComponent,
                    OrderProcessGraphComponent,
                    OrderProcessNodeComponent,
                    OrderProcessEdgeComponent,
                    OrderProcessGraphDialogComponent,
                    FulfillmentStateLabelComponent,
                    FulfillmentCardComponent,
                    OrderEditorComponent,
                    OrderTableComponent,
                    OrderEditsPreviewDialogComponent,
                    ModificationDetailComponent,
                    AddManualPaymentDialogComponent,
                    OrderStateSelectDialogComponent,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvb3JkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUMvRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQUN4SCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM3RyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUMxSCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQztBQUNoSSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQztBQUNoSSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUMxRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUMxRyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUMvRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNuRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFtQzdDLE1BQU0sT0FBTyxXQUFXOzs7WUFqQ3ZCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0QsWUFBWSxFQUFFO29CQUNWLGtCQUFrQjtvQkFDbEIsb0JBQW9CO29CQUNwQiwyQkFBMkI7b0JBQzNCLHdCQUF3QjtvQkFDeEIsMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsb0JBQW9CO29CQUNwQix5QkFBeUI7b0JBQ3pCLHlCQUF5QjtvQkFDekIsMkJBQTJCO29CQUMzQixxQkFBcUI7b0JBQ3JCLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLDhCQUE4QjtvQkFDOUIsMEJBQTBCO29CQUMxQix5QkFBeUI7b0JBQ3pCLHlCQUF5QjtvQkFDekIsZ0NBQWdDO29CQUNoQyw4QkFBOEI7b0JBQzlCLHdCQUF3QjtvQkFDeEIsb0JBQW9CO29CQUNwQixtQkFBbUI7b0JBQ25CLGdDQUFnQztvQkFDaEMsMkJBQTJCO29CQUMzQiwrQkFBK0I7b0JBQy9CLCtCQUErQjtpQkFDbEM7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbmltcG9ydCB7IEFkZE1hbnVhbFBheW1lbnREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRkLW1hbnVhbC1wYXltZW50LWRpYWxvZy9hZGQtbWFudWFsLXBheW1lbnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW5jZWxPcmRlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYW5jZWwtb3JkZXItZGlhbG9nL2NhbmNlbC1vcmRlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEZ1bGZpbGxPcmRlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mdWxmaWxsLW9yZGVyLWRpYWxvZy9mdWxmaWxsLW9yZGVyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnVsZmlsbG1lbnRDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Z1bGZpbGxtZW50LWNhcmQvZnVsZmlsbG1lbnQtY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnVsZmlsbG1lbnREZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZnVsZmlsbG1lbnQtZGV0YWlsL2Z1bGZpbGxtZW50LWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnVsZmlsbG1lbnRTdGF0ZUxhYmVsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Z1bGZpbGxtZW50LXN0YXRlLWxhYmVsL2Z1bGZpbGxtZW50LXN0YXRlLWxhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5lRnVsZmlsbG1lbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGluZS1mdWxmaWxsbWVudC9saW5lLWZ1bGZpbGxtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5lUmVmdW5kc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9saW5lLXJlZnVuZHMvbGluZS1yZWZ1bmRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RpZmljYXRpb25EZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kaWZpY2F0aW9uLWRldGFpbC9tb2RpZmljYXRpb24tZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckN1c3RvbUZpZWxkc0NhcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItY3VzdG9tLWZpZWxkcy1jYXJkL29yZGVyLWN1c3RvbS1maWVsZHMtY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItZGV0YWlsL29yZGVyLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItZWRpdG9yL29yZGVyLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJFZGl0c1ByZXZpZXdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItZWRpdHMtcHJldmlldy1kaWFsb2cvb3JkZXItZWRpdHMtcHJldmlldy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVySGlzdG9yeUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9vcmRlci1oaXN0b3J5L29yZGVyLWhpc3RvcnkuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9vcmRlci1saXN0L29yZGVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyUGF5bWVudENhcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItcGF5bWVudC1jYXJkL29yZGVyLXBheW1lbnQtY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJQcm9jZXNzR3JhcGhEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItcHJvY2Vzcy1ncmFwaC1kaWFsb2cvb3JkZXItcHJvY2Vzcy1ncmFwaC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyUHJvY2Vzc0VkZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItcHJvY2Vzcy1ncmFwaC9vcmRlci1wcm9jZXNzLWVkZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyUHJvY2Vzc0dyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL29yZGVyLXByb2Nlc3MtZ3JhcGgvb3JkZXItcHJvY2Vzcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJQcm9jZXNzTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9vcmRlci1wcm9jZXNzLWdyYXBoL29yZGVyLXByb2Nlc3Mtbm9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJTdGF0ZVNlbGVjdERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9vcmRlci1zdGF0ZS1zZWxlY3QtZGlhbG9nL29yZGVyLXN0YXRlLXNlbGVjdC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyVGFibGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvb3JkZXItdGFibGUvb3JkZXItdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBheW1lbnREZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGF5bWVudC1kZXRhaWwvcGF5bWVudC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFBheW1lbnRTdGF0ZUxhYmVsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BheW1lbnQtc3RhdGUtbGFiZWwvcGF5bWVudC1zdGF0ZS1sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVmdW5kT3JkZXJEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVmdW5kLW9yZGVyLWRpYWxvZy9yZWZ1bmQtb3JkZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWZ1bmRTdGF0ZUxhYmVsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlZnVuZC1zdGF0ZS1sYWJlbC9yZWZ1bmQtc3RhdGUtbGFiZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNldHRsZVJlZnVuZERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zZXR0bGUtcmVmdW5kLWRpYWxvZy9zZXR0bGUtcmVmdW5kLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltcGxlSXRlbUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2ltcGxlLWl0ZW0tbGlzdC9zaW1wbGUtaXRlbS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBvcmRlclJvdXRlcyB9IGZyb20gJy4vb3JkZXIucm91dGVzJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQob3JkZXJSb3V0ZXMpXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgT3JkZXJMaXN0Q29tcG9uZW50LFxuICAgICAgICBPcmRlckRldGFpbENvbXBvbmVudCxcbiAgICAgICAgRnVsZmlsbE9yZGVyRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBMaW5lRnVsZmlsbG1lbnRDb21wb25lbnQsXG4gICAgICAgIFJlZnVuZE9yZGVyRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBDYW5jZWxPcmRlckRpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgUGF5bWVudFN0YXRlTGFiZWxDb21wb25lbnQsXG4gICAgICAgIExpbmVSZWZ1bmRzQ29tcG9uZW50LFxuICAgICAgICBPcmRlclBheW1lbnRDYXJkQ29tcG9uZW50LFxuICAgICAgICBSZWZ1bmRTdGF0ZUxhYmVsQ29tcG9uZW50LFxuICAgICAgICBTZXR0bGVSZWZ1bmREaWFsb2dDb21wb25lbnQsXG4gICAgICAgIE9yZGVySGlzdG9yeUNvbXBvbmVudCxcbiAgICAgICAgRnVsZmlsbG1lbnREZXRhaWxDb21wb25lbnQsXG4gICAgICAgIFBheW1lbnREZXRhaWxDb21wb25lbnQsXG4gICAgICAgIFNpbXBsZUl0ZW1MaXN0Q29tcG9uZW50LFxuICAgICAgICBPcmRlckN1c3RvbUZpZWxkc0NhcmRDb21wb25lbnQsXG4gICAgICAgIE9yZGVyUHJvY2Vzc0dyYXBoQ29tcG9uZW50LFxuICAgICAgICBPcmRlclByb2Nlc3NOb2RlQ29tcG9uZW50LFxuICAgICAgICBPcmRlclByb2Nlc3NFZGdlQ29tcG9uZW50LFxuICAgICAgICBPcmRlclByb2Nlc3NHcmFwaERpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgRnVsZmlsbG1lbnRTdGF0ZUxhYmVsQ29tcG9uZW50LFxuICAgICAgICBGdWxmaWxsbWVudENhcmRDb21wb25lbnQsXG4gICAgICAgIE9yZGVyRWRpdG9yQ29tcG9uZW50LFxuICAgICAgICBPcmRlclRhYmxlQ29tcG9uZW50LFxuICAgICAgICBPcmRlckVkaXRzUHJldmlld0RpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgTW9kaWZpY2F0aW9uRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBBZGRNYW51YWxQYXltZW50RGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBPcmRlclN0YXRlU2VsZWN0RGlhbG9nQ29tcG9uZW50LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyTW9kdWxlIHt9XG4iXX0=