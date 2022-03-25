import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, NotificationService, Permission, ServerConfigService, } from '@vendure/admin-ui/core';
import { mergeMap, take } from 'rxjs/operators';
export class TaxRateDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateTaxRate];
        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
            enabled: [true],
            value: [0, Validators.required],
            taxCategoryId: [''],
            zoneId: [''],
            customerGroupId: [''],
        });
    }
    ngOnInit() {
        this.init();
        this.taxCategories$ = this.dataService.settings
            .getTaxCategories()
            .mapSingle(data => data.taxCategories);
        this.zones$ = this.dataService.settings.getZones().mapSingle(data => data.zones);
    }
    ngOnDestroy() {
        this.destroy();
    }
    saveButtonEnabled() {
        return this.detailForm.dirty && this.detailForm.valid;
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        const input = {
            name: formValue.name,
            enabled: formValue.enabled,
            value: formValue.value,
            categoryId: formValue.taxCategoryId,
            zoneId: formValue.zoneId,
            customerGroupId: formValue.customerGroupId,
        };
        this.dataService.settings.createTaxRate(input).subscribe(data => {
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'TaxRate',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createTaxRate.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'TaxRate',
            });
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        this.entity$
            .pipe(take(1), mergeMap(taxRate => {
            const input = {
                id: taxRate.id,
                name: formValue.name,
                enabled: formValue.enabled,
                value: formValue.value,
                categoryId: formValue.taxCategoryId,
                zoneId: formValue.zoneId,
                customerGroupId: formValue.customerGroupId,
            };
            return this.dataService.settings.updateTaxRate(input);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'TaxRate',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'TaxRate',
            });
        });
    }
    /**
     * Update the form values when the entity changes.
     */
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            name: entity.name,
            enabled: entity.enabled,
            value: entity.value,
            taxCategoryId: entity.category ? entity.category.id : '',
            zoneId: entity.zone ? entity.zone.id : '',
            customerGroupId: entity.customerGroup ? entity.customerGroup.id : '',
        });
    }
}
TaxRateDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tax-rate-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-rate-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!saveButtonEnabled()\"\n                *vdrIfPermissions=\"updatePermission\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"enabled\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                formControlName=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.rate' | translate\" for=\"value\">\n        <vdr-affixed-input suffix=\"%\">\n            <input\n                id=\"value\"\n                type=\"number\"\n                step=\"0.1\"\n                formControlName=\"value\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n            />\n        </vdr-affixed-input>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.tax-category' | translate\" for=\"taxCategoryId\">\n        <select\n            clrSelect\n            name=\"taxCategoryId\"\n            formControlName=\"taxCategoryId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let taxCategory of taxCategories$ | async\" [value]=\"taxCategory.id\">\n                {{ taxCategory.name }}\n            </option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.zone' | translate\" for=\"zoneId\">\n        <select\n            clrSelect\n            name=\"zoneId\"\n            formControlName=\"zoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TaxRateDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4LXJhdGUtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvdGF4LXJhdGUtZGV0YWlsL3RheC1yYXRlLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILG1CQUFtQixFQUduQixXQUFXLEVBR1gsbUJBQW1CLEVBQ25CLFVBQVUsRUFDVixtQkFBbUIsR0FJdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUWhELE1BQU0sT0FBTyxzQkFDVCxTQUFRLG1CQUFxQztJQVE3QyxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNyQixtQkFBd0MsRUFDaEMsY0FBaUMsRUFDL0IsV0FBd0IsRUFDMUIsV0FBd0IsRUFDeEIsbUJBQXdDO1FBRWhELEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTC9DLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBVDNDLHFCQUFnQixHQUFHLENBQUMsVUFBVSxDQUFDLGNB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QUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDakIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixhQUFhLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDeEQsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pDLGVBQWUsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUN2RSxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFsSUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLGc3RkFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBeEJ3QixNQUFNO1lBQXRCLGNBQWM7WUFXbkIsbUJBQW1CO1lBYlcsaUJBQWlCO1lBUS9DLFdBQVc7WUFQTixXQUFXO1lBVWhCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBCYXNlRGV0YWlsQ29tcG9uZW50LFxuICAgIENyZWF0ZVRheFJhdGVJbnB1dCxcbiAgICBDdXN0b21lckdyb3VwLFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIEdldFpvbmVzLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFBlcm1pc3Npb24sXG4gICAgU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICBUYXhDYXRlZ29yeSxcbiAgICBUYXhSYXRlLFxuICAgIFVwZGF0ZVRheFJhdGVJbnB1dCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItdGF4LXJhdGUtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGF4LXJhdGUtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YXgtcmF0ZS1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGF4UmF0ZURldGFpbENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxUYXhSYXRlLkZyYWdtZW50PlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHRheENhdGVnb3JpZXMkOiBPYnNlcnZhYmxlPFRheENhdGVnb3J5LkZyYWdtZW50W10+O1xuICAgIHpvbmVzJDogT2JzZXJ2YWJsZTxHZXRab25lcy5ab25lc1tdPjtcbiAgICBncm91cHMkOiBPYnNlcnZhYmxlPEN1c3RvbWVyR3JvdXBbXT47XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuICAgIHJlYWRvbmx5IHVwZGF0ZVBlcm1pc3Npb24gPSBbUGVybWlzc2lvbi5VcGRhdGVTZXR0aW5ncywgUGVybWlzc2lvbi5VcGRhdGVUYXhSYXRlXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGUsIHJvdXRlciwgc2VydmVyQ29uZmlnU2VydmljZSwgZGF0YVNlcnZpY2UpO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBlbmFibGVkOiBbdHJ1ZV0sXG4gICAgICAgICAgICB2YWx1ZTogWzAsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgdGF4Q2F0ZWdvcnlJZDogWycnXSxcbiAgICAgICAgICAgIHpvbmVJZDogWycnXSxcbiAgICAgICAgICAgIGN1c3RvbWVyR3JvdXBJZDogWycnXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLnRheENhdGVnb3JpZXMkID0gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5nc1xuICAgICAgICAgICAgLmdldFRheENhdGVnb3JpZXMoKVxuICAgICAgICAgICAgLm1hcFNpbmdsZShkYXRhID0+IGRhdGEudGF4Q2F0ZWdvcmllcyk7XG4gICAgICAgIHRoaXMuem9uZXMkID0gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5nZXRab25lcygpLm1hcFNpbmdsZShkYXRhID0+IGRhdGEuem9uZXMpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBzYXZlQnV0dG9uRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlsRm9ybS5kaXJ0eSAmJiB0aGlzLmRldGFpbEZvcm0udmFsaWQ7XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV0YWlsRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgICAgICBuYW1lOiBmb3JtVmFsdWUubmFtZSxcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZvcm1WYWx1ZS5lbmFibGVkLFxuICAgICAgICAgICAgdmFsdWU6IGZvcm1WYWx1ZS52YWx1ZSxcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGZvcm1WYWx1ZS50YXhDYXRlZ29yeUlkLFxuICAgICAgICAgICAgem9uZUlkOiBmb3JtVmFsdWUuem9uZUlkLFxuICAgICAgICAgICAgY3VzdG9tZXJHcm91cElkOiBmb3JtVmFsdWUuY3VzdG9tZXJHcm91cElkLFxuICAgICAgICB9IGFzIENyZWF0ZVRheFJhdGVJbnB1dDtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5jcmVhdGVUYXhSYXRlKGlucHV0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnVGF4UmF0ZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLycsIGRhdGEuY3JlYXRlVGF4UmF0ZS5pZF0sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1RheFJhdGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV0YWlsRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgdGhpcy5lbnRpdHkkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKHRheFJhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0YXhSYXRlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZm9ybVZhbHVlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmb3JtVmFsdWUuZW5hYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmb3JtVmFsdWUudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBmb3JtVmFsdWUudGF4Q2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvbmVJZDogZm9ybVZhbHVlLnpvbmVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyR3JvdXBJZDogZm9ybVZhbHVlLmN1c3RvbWVyR3JvdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgfSBhcyBVcGRhdGVUYXhSYXRlSW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLnVwZGF0ZVRheFJhdGUoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdUYXhSYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1RheFJhdGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGZvcm0gdmFsdWVzIHdoZW4gdGhlIGVudGl0eSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXRGb3JtVmFsdWVzKGVudGl0eTogVGF4UmF0ZS5GcmFnbWVudCwgbGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgbmFtZTogZW50aXR5Lm5hbWUsXG4gICAgICAgICAgICBlbmFibGVkOiBlbnRpdHkuZW5hYmxlZCxcbiAgICAgICAgICAgIHZhbHVlOiBlbnRpdHkudmFsdWUsXG4gICAgICAgICAgICB0YXhDYXRlZ29yeUlkOiBlbnRpdHkuY2F0ZWdvcnkgPyBlbnRpdHkuY2F0ZWdvcnkuaWQgOiAnJyxcbiAgICAgICAgICAgIHpvbmVJZDogZW50aXR5LnpvbmUgPyBlbnRpdHkuem9uZS5pZCA6ICcnLFxuICAgICAgICAgICAgY3VzdG9tZXJHcm91cElkOiBlbnRpdHkuY3VzdG9tZXJHcm91cCA/IGVudGl0eS5jdXN0b21lckdyb3VwLmlkIDogJycsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==