import { ChangeDetectionStrategy, Component } from '@angular/core';
export var OrderEditResultType;
(function (OrderEditResultType) {
    OrderEditResultType[OrderEditResultType["Refund"] = 0] = "Refund";
    OrderEditResultType[OrderEditResultType["Payment"] = 1] = "Payment";
    OrderEditResultType[OrderEditResultType["PriceUnchanged"] = 2] = "PriceUnchanged";
    OrderEditResultType[OrderEditResultType["Cancel"] = 3] = "Cancel";
})(OrderEditResultType || (OrderEditResultType = {}));
export class OrderEditsPreviewDialogComponent {
    get priceDifference() {
        return this.order.totalWithTax - this.originalTotalWithTax;
    }
    ngOnInit() {
        this.refundNote = this.modifyOrderInput.note || '';
    }
    cancel() {
        this.resolveWith({
            result: OrderEditResultType.Cancel,
        });
    }
    submit() {
        if (0 < this.priceDifference) {
            this.resolveWith({
                result: OrderEditResultType.Payment,
            });
        }
        else if (this.priceDifference < 0) {
            this.resolveWith({
                result: OrderEditResultType.Refund,
                // tslint:disable-next-line:no-non-null-assertion
                refundPaymentId: this.selectedPayment.id,
                refundNote: this.refundNote,
            });
        }
        else {
            this.resolveWith({
                result: OrderEditResultType.PriceUnchanged,
            });
        }
    }
}
OrderEditsPreviewDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-edits-preview-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.confirm-modifications' | translate }}</ng-template>\n<vdr-order-table [order]=\"order\" [orderLineCustomFields]=\"orderLineCustomFields\"></vdr-order-table>\n\n<h4 class=\"h4\">\n    {{ 'order.modify-order-price-difference' | translate }}:\n    <strong>{{ priceDifference | localeCurrency: order.currencyCode }}</strong>\n</h4>\n<div *ngIf=\"priceDifference < 0\">\n<clr-select-container>\n    <label>{{ 'order.payment-to-refund' | translate }}</label>\n    <select clrSelect name=\"options\" [(ngModel)]=\"selectedPayment\">\n        <option\n            *ngFor=\"let payment of order.payments\"\n            [ngValue]=\"payment\"\n        >\n            #{{ payment.id }} {{ payment.method }}:\n            {{ payment.amount | localeCurrency: order.currencyCode }}\n        </option>\n    </select>\n</clr-select-container>\n    <label class=\"clr-control-label\">{{ 'order.refund-cancellation-reason' | translate }}</label>\n    <textarea [(ngModel)]=\"refundNote\" name=\"refundNote\" clrTextarea required></textarea>\n</div>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" [disabled]=\"priceDifference < 0 && !selectedPayment\" class=\"btn btn-primary\">\n        {{ 'common.confirm' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZWRpdHMtcHJldmlldy1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvY29tcG9uZW50cy9vcmRlci1lZGl0cy1wcmV2aWV3LWRpYWxvZy9vcmRlci1lZGl0cy1wcmV2aWV3LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUczRSxNQUFNLENBQU4sSUFBWSxtQkFLWDtBQUxELFdBQVksbUJBQW1CO0lBQzNCLGlFQUFNLENBQUE7SUFDTixtRUFBTyxDQUFBO0lBQ1AsaUZBQWMsQ0FBQTtJQUNkLGlFQUFNLENBQUE7QUFDVixDQUFDLEVBTFcsbUJBQW1CLEtBQW5CLG1CQUFtQixRQUs5QjtBQTRCRCxNQUFNLE9BQU8sZ0NBQWdDO0lBV3pDLElBQUksZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQy9ELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDYixNQUFNLEVBQUUsbUJBQW1CLENBQUMsTUFBTTtTQUNyQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDYixNQUFNLEVBQUUsbUJBQW1CLENBQUMsT0FBTzthQUN0QyxDQUFDLENBQUM7U0FDTjthQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDYixNQUFNLEVBQUUsbUJBQW1CLENBQUMsTUFBTTtnQkFDbEMsaURBQWlEO2dCQUNqRCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWdCLENBQUMsRUFBRTtnQkFDekMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQzlCLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNiLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxjQUFjO2FBQzdDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7O1lBaERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxtNUNBQTBEO2dCQUUxRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEN1c3RvbUZpZWxkQ29uZmlnLCBEaWFsb2csIE1vZGlmeU9yZGVySW5wdXQsIE9yZGVyRGV0YWlsIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbmV4cG9ydCBlbnVtIE9yZGVyRWRpdFJlc3VsdFR5cGUge1xuICAgIFJlZnVuZCxcbiAgICBQYXltZW50LFxuICAgIFByaWNlVW5jaGFuZ2VkLFxuICAgIENhbmNlbCxcbn1cblxuaW50ZXJmYWNlIE9yZGVyRWRpdHNSZWZ1bmRSZXN1bHQge1xuICAgIHJlc3VsdDogT3JkZXJFZGl0UmVzdWx0VHlwZS5SZWZ1bmQ7XG4gICAgcmVmdW5kUGF5bWVudElkOiBzdHJpbmc7XG4gICAgcmVmdW5kTm90ZT86IHN0cmluZztcbn1cbmludGVyZmFjZSBPcmRlckVkaXRzUGF5bWVudFJlc3VsdCB7XG4gICAgcmVzdWx0OiBPcmRlckVkaXRSZXN1bHRUeXBlLlBheW1lbnQ7XG59XG5pbnRlcmZhY2UgT3JkZXJFZGl0c1ByaWNlVW5jaGFuZ2VkUmVzdWx0IHtcbiAgICByZXN1bHQ6IE9yZGVyRWRpdFJlc3VsdFR5cGUuUHJpY2VVbmNoYW5nZWQ7XG59XG5pbnRlcmZhY2UgT3JkZXJFZGl0c0NhbmNlbFJlc3VsdCB7XG4gICAgcmVzdWx0OiBPcmRlckVkaXRSZXN1bHRUeXBlLkNhbmNlbDtcbn1cbnR5cGUgT3JkZXJFZGl0UmVzdWx0ID1cbiAgICB8IE9yZGVyRWRpdHNSZWZ1bmRSZXN1bHRcbiAgICB8IE9yZGVyRWRpdHNQYXltZW50UmVzdWx0XG4gICAgfCBPcmRlckVkaXRzUHJpY2VVbmNoYW5nZWRSZXN1bHRcbiAgICB8IE9yZGVyRWRpdHNDYW5jZWxSZXN1bHQ7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9yZGVyLWVkaXRzLXByZXZpZXctZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXItZWRpdHMtcHJldmlldy1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29yZGVyLWVkaXRzLXByZXZpZXctZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyRWRpdHNQcmV2aWV3RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEaWFsb2c8T3JkZXJFZGl0UmVzdWx0PiB7XG4gICAgLy8gUGFzc2VkIGluIHZpYSB0aGUgbW9kYWxTZXJ2aWNlXG4gICAgb3JkZXI6IE9yZGVyRGV0YWlsLkZyYWdtZW50O1xuICAgIG9yaWdpbmFsVG90YWxXaXRoVGF4OiBudW1iZXI7XG4gICAgb3JkZXJMaW5lQ3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIG1vZGlmeU9yZGVySW5wdXQ6IE1vZGlmeU9yZGVySW5wdXQ7XG5cbiAgICBzZWxlY3RlZFBheW1lbnQ/OiBPcmRlckRldGFpbC5QYXltZW50cztcbiAgICByZWZ1bmROb3RlOiBzdHJpbmc7XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBPcmRlckVkaXRSZXN1bHQpID0+IHZvaWQ7XG5cbiAgICBnZXQgcHJpY2VEaWZmZXJlbmNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yZGVyLnRvdGFsV2l0aFRheCAtIHRoaXMub3JpZ2luYWxUb3RhbFdpdGhUYXg7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucmVmdW5kTm90ZSA9IHRoaXMubW9kaWZ5T3JkZXJJbnB1dC5ub3RlIHx8ICcnO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh7XG4gICAgICAgICAgICByZXN1bHQ6IE9yZGVyRWRpdFJlc3VsdFR5cGUuQ2FuY2VsLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWJtaXQoKSB7XG4gICAgICAgIGlmICgwIDwgdGhpcy5wcmljZURpZmZlcmVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogT3JkZXJFZGl0UmVzdWx0VHlwZS5QYXltZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmljZURpZmZlcmVuY2UgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IE9yZGVyRWRpdFJlc3VsdFR5cGUuUmVmdW5kLFxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICAgICByZWZ1bmRQYXltZW50SWQ6IHRoaXMuc2VsZWN0ZWRQYXltZW50IS5pZCxcbiAgICAgICAgICAgICAgICByZWZ1bmROb3RlOiB0aGlzLnJlZnVuZE5vdGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogT3JkZXJFZGl0UmVzdWx0VHlwZS5QcmljZVVuY2hhbmdlZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19