import { ChangeDetectionStrategy, Component } from '@angular/core';
export class ZoneDetailDialogComponent {
    cancel() {
        this.resolveWith();
    }
    save() {
        this.resolveWith(this.zone.name);
    }
}
ZoneDetailDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-zone-detail-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"zone.id\">{{ 'settings.update-zone' | translate }}</span>\n    <span *ngIf=\"!zone.id\">{{ 'settings.create-zone' | translate }}</span>\n</ng-template>\n\n<vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n    <input id=\"name\" type=\"text\" [(ngModel)]=\"zone.name\" [readonly]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\" />\n</vdr-form-field>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"save()\" [disabled]=\"!zone.name\" class=\"btn btn-primary\">\n        <span *ngIf=\"zone.id\">{{ 'settings.update-zone' | translate }}</span>\n        <span *ngIf=\"!zone.id\">{{ 'settings.create-zone' | translate }}</span>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS1kZXRhaWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvem9uZS1kZXRhaWwtZGlhbG9nL3pvbmUtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNuRSxNQUFNLE9BQU8seUJBQXlCO0lBSWxDLE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7O1lBaEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyx5MkJBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItem9uZS1kZXRhaWwtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vem9uZS1kZXRhaWwtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi96b25lLWRldGFpbC1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgWm9uZURldGFpbERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIERpYWxvZzxzdHJpbmc+IHtcbiAgICB6b25lOiB7IGlkPzogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfTtcbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdD86IHN0cmluZykgPT4gdm9pZDtcblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgodGhpcy56b25lLm5hbWUpO1xuICAgIH1cbn1cbiJdfQ==