import { ChangeDetectionStrategy, Component } from '@angular/core';
export class CustomerGroupDetailDialogComponent {
    cancel() {
        this.resolveWith();
    }
    save() {
        this.resolveWith(this.group.name);
    }
}
CustomerGroupDetailDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-detail-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"group.id\">{{ 'customer.update-customer-group' | translate }}</span>\n    <span *ngIf=\"!group.id\">{{ 'customer.create-customer-group' | translate }}</span>\n</ng-template>\n\n<vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n    <input id=\"name\" type=\"text\" [(ngModel)]=\"group.name\" [readonly]=\"!(['CreateCustomerGroup', 'UpdateCustomerGroup'] | hasPermission)\" />\n</vdr-form-field>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"save()\" [disabled]=\"!group.name\" class=\"btn btn-primary\">\n        <span *ngIf=\"group.id\">{{ 'customer.update-customer-group' | translate }}</span>\n        <span *ngIf=\"!group.id\">{{ 'customer.create-customer-group' | translate }}</span>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZ3JvdXAtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2N1c3RvbWVyL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyLWdyb3VwLWRldGFpbC1kaWFsb2cvY3VzdG9tZXItZ3JvdXAtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNuRSxNQUFNLE9BQU8sa0NBQWtDO0lBSTNDLE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7O1lBaEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QyxxNkJBQTREO2dCQUU1RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY3VzdG9tZXItZ3JvdXAtZGV0YWlsLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLWdyb3VwLWRldGFpbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLWdyb3VwLWRldGFpbC1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJHcm91cERldGFpbERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIERpYWxvZzxzdHJpbmc+IHtcbiAgICBncm91cDogeyBpZD86IHN0cmluZzsgbmFtZTogc3RyaW5nIH07XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBzdHJpbmcpID0+IHZvaWQ7XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRoaXMuZ3JvdXAubmFtZSk7XG4gICAgfVxufVxuIl19