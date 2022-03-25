import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, } from '@vendure/admin-ui/core';
export class AddManualPaymentDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.form = new FormGroup({
            method: new FormControl('', Validators.required),
            transactionId: new FormControl('', Validators.required),
        });
    }
    ngOnInit() {
        this.paymentMethods$ = this.dataService.settings
            .getPaymentMethods(999)
            .mapSingle(data => data.paymentMethods.items);
    }
    submit() {
        const formValue = this.form.value;
        this.resolveWith({
            method: formValue.method,
            transactionId: formValue.transactionId,
        });
    }
    cancel() {
        this.resolveWith();
    }
}
AddManualPaymentDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-add-manual-payment-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.add-payment-to-order' | translate }}</ng-template>\n<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'order.payment-method' | translate\" for=\"method\">\n        <ng-select\n            [items]=\"paymentMethods$ | async\"\n            bindLabel=\"code\"\n            autofocus\n            bindValue=\"code\"\n            [addTag]=\"true\"\n            formControlName=\"method\"\n        ></ng-select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'order.transaction-id' | translate\" for=\"transactionId\">\n        <input id=\"transactionId\" type=\"text\" formControlName=\"transactionId\" />\n    </vdr-form-field>\n</form>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" class=\"btn btn-primary\" [disabled]=\"form.invalid || form.pristine\">\n        {{ 'order.add-payment' | translate }}  ({{ outstandingAmount | localeCurrency: currencyCode }})\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ng-select{min-width:100%}"]
            },] }
];
AddManualPaymentDialogComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLW1hbnVhbC1wYXltZW50LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL2FkZC1tYW51YWwtcGF5bWVudC1kaWFsb2cvYWRkLW1hbnVhbC1wYXltZW50LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBRUgsV0FBVyxHQUlkLE1BQU0sd0JBQXdCLENBQUM7QUFTaEMsTUFBTSxPQUFPLCtCQUErQjtJQVd4QyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUw1QyxTQUFJLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDakIsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ2hELGFBQWEsRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUMxRCxDQUFDLENBQUM7SUFFNEMsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDM0MsaUJBQWlCLENBQUMsR0FBRyxDQUFDO2FBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2IsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1lBQ3hCLGFBQWEsRUFBRSxTQUFTLENBQUMsYUFBYTtTQUN6QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7WUFuQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLHdrQ0FBeUQ7Z0JBRXpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBWkcsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgQ3VycmVuY3lDb2RlLFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIERpYWxvZyxcbiAgICBHZXRQYXltZW50TWV0aG9kTGlzdCxcbiAgICBNYW51YWxQYXltZW50SW5wdXQsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hZGQtbWFudWFsLXBheW1lbnQtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWRkLW1hbnVhbC1wYXltZW50LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWRkLW1hbnVhbC1wYXltZW50LWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRNYW51YWxQYXltZW50RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEaWFsb2c8T21pdDxNYW51YWxQYXltZW50SW5wdXQsICdvcmRlcklkJz4+IHtcbiAgICAvLyBwb3B1bGF0ZWQgYnkgTW9kYWxTZXJ2aWNlIGNhbGxcbiAgICBvdXRzdGFuZGluZ0Ftb3VudDogbnVtYmVyO1xuICAgIGN1cnJlbmN5Q29kZTogQ3VycmVuY3lDb2RlO1xuXG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBPbWl0PE1hbnVhbFBheW1lbnRJbnB1dCwgJ29yZGVySWQnPikgPT4gdm9pZDtcbiAgICBmb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgIG1ldGhvZDogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgICAgdHJhbnNhY3Rpb25JZDogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICB9KTtcbiAgICBwYXltZW50TWV0aG9kcyQ6IE9ic2VydmFibGU8R2V0UGF5bWVudE1ldGhvZExpc3QuSXRlbXNbXT47XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXltZW50TWV0aG9kcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzXG4gICAgICAgICAgICAuZ2V0UGF5bWVudE1ldGhvZHMoOTk5KVxuICAgICAgICAgICAgLm1hcFNpbmdsZShkYXRhID0+IGRhdGEucGF5bWVudE1ldGhvZHMuaXRlbXMpO1xuICAgIH1cblxuICAgIHN1Ym1pdCgpIHtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5mb3JtLnZhbHVlO1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHtcbiAgICAgICAgICAgIG1ldGhvZDogZm9ybVZhbHVlLm1ldGhvZCxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQ6IGZvcm1WYWx1ZS50cmFuc2FjdGlvbklkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG59XG4iXX0=