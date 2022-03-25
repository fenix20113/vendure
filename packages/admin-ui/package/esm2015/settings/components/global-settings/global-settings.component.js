import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent } from '@vendure/admin-ui/core';
import { LanguageCode, Permission } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { switchMap, tap } from 'rxjs/operators';
export class GlobalSettingsComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.languageCodes = Object.values(LanguageCode);
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateGlobalSettings];
        this.customFields = this.getCustomFieldConfig('GlobalSettings');
        this.detailForm = this.formBuilder.group({
            availableLanguages: [''],
            trackInventory: false,
            outOfStockThreshold: [0, Validators.required],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.dataService.client.userStatus().single$.subscribe(({ userStatus }) => {
            if (!userStatus.permissions.includes(Permission.UpdateSettings)) {
                const languagesSelect = this.detailForm.get('availableLanguages');
                if (languagesSelect) {
                    languagesSelect.disable();
                }
            }
        });
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['customFields', name]);
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        this.dataService.settings
            .updateGlobalSettings(this.detailForm.value)
            .pipe(tap(({ updateGlobalSettings }) => {
            switch (updateGlobalSettings.__typename) {
                case 'GlobalSettings':
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success(_('common.notify-update-success'), {
                        entity: 'Settings',
                    });
                    break;
                case 'ChannelDefaultLanguageError':
                    this.notificationService.error(updateGlobalSettings.message);
            }
        }), switchMap(() => this.serverConfigService.refreshGlobalSettings()))
            .subscribe();
    }
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            availableLanguages: entity.availableLanguages,
            trackInventory: entity.trackInventory,
            outOfStockThreshold: entity.outOfStockThreshold,
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get('customFields');
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = entity.customFields[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
    }
}
GlobalSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-global-settings',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"global-settings-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            *vdrIfPermissions=\"updatePermission\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.available-languages' | translate\" for=\"availableLanguages\">\n        <ng-select\n            [items]=\"languageCodes\"\n            [addTag]=\"false\"\n            [hideSelected]=\"true\"\n            multiple=\"true\"\n            appendTo=\"body\"\n            formControlName=\"availableLanguages\"\n        >\n            <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                <span class=\"ng-value-icon left\" (click)=\"clear.call(null, item)\" aria-hidden=\"true\">\n                    \u00D7\n                </span>\n                <span class=\"ng-value-label\">{{ 'lang.' + item | translate }} ({{ item }})</span>\n            </ng-template>\n            <ng-template ng-option-tmp let-item=\"item\">\n                {{ 'lang.' + item | translate }} ({{ item }})\n            </ng-template>\n        </ng-select>\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'settings.global-out-of-stock-threshold' | translate\"\n        for=\"outOfStockThreshold\"\n        [tooltip]=\"'settings.global-out-of-stock-threshold-tooltip' | translate\"\n    >\n        <input\n            id=\"outOfStockThreshold\"\n            type=\"number\"\n            formControlName=\"outOfStockThreshold\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'settings.track-inventory-default' | translate\"\n        for=\"enabled\"\n        [tooltip]=\"'catalog.track-inventory-tooltip' | translate\"\n    >\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                name=\"enabled\"\n                formControlName=\"trackInventory\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <ng-container *ngFor=\"let customField of customFields\">\n            <vdr-custom-field-control\n                *ngIf=\"customFieldIsSet(customField.name)\"\n                entityName=\"GlobalSettings\"\n                [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n                [customField]=\"customField\"\n            ></vdr-custom-field-control>\n        </ng-container>\n    </section>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["::ng-deep ng-select .ng-arrow-wrapper .ng-arrow,::ng-deep ng-select .ng-select-container>span,::ng-deep ng-select .ng-value>span{margin:0!important}"]
            },] }
];
GlobalSettingsComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvZ2xvYmFsLXNldHRpbmdzL2dsb2JhbC1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQXFDLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVFoRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsbUJBQW1DO0lBTTVFLFlBQ0ksTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLG1CQUF3QyxFQUNoQyxjQUFpQyxFQUMvQixXQUF3QixFQUMxQixXQUF3QixFQUN4QixtQkFBd0M7UUFFaEQsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFML0MsbUJB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cEU7YUFDQSxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRVMsYUFBYSxDQUFDLE1BQXNCLEVBQUUsWUFBMEI7UUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDdkIsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLGtCQUFrQjtZQUM3QyxjQUFjLEVBQUUsTUFBTSxDQUFDLGNBQWM7WUFDckMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtTQUNsRCxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQzFCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFjLENBQUM7WUFFM0UsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUMxQixNQUFNLEtBQUssR0FBSSxNQUFjLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLElBQUksT0FBTyxFQUFFO29CQUNULE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzdCO2FBQ0o7U0FDSjtJQUNMLENBQUM7OztZQTdGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IseTdGQUErQztnQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFkd0IsTUFBTTtZQUF0QixjQUFjO1lBTWQsbUJBQW1CO1lBUk0saUJBQWlCO1lBTzFDLFdBQVc7WUFOWCxXQUFXO1lBS1gsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgQmFzZURldGFpbENvbXBvbmVudCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb25maWcsIEdsb2JhbFNldHRpbmdzLCBMYW5ndWFnZUNvZGUsIFBlcm1pc3Npb24gfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBTZXJ2ZXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZ2xvYmFsLXNldHRpbmdzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZ2xvYmFsLXNldHRpbmdzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9nbG9iYWwtc2V0dGluZ3MuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgR2xvYmFsU2V0dGluZ3NDb21wb25lbnQgZXh0ZW5kcyBCYXNlRGV0YWlsQ29tcG9uZW50PEdsb2JhbFNldHRpbmdzPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuICAgIGN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcbiAgICBsYW5ndWFnZUNvZGVzID0gT2JqZWN0LnZhbHVlcyhMYW5ndWFnZUNvZGUpO1xuICAgIHJlYWRvbmx5IHVwZGF0ZVBlcm1pc3Npb24gPSBbUGVybWlzc2lvbi5VcGRhdGVTZXR0aW5ncywgUGVybWlzc2lvbi5VcGRhdGVHbG9iYWxTZXR0aW5nc107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlLCByb3V0ZXIsIHNlcnZlckNvbmZpZ1NlcnZpY2UsIGRhdGFTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdHbG9iYWxTZXR0aW5ncycpO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIGF2YWlsYWJsZUxhbmd1YWdlczogWycnXSxcbiAgICAgICAgICAgIHRyYWNrSW52ZW50b3J5OiBmYWxzZSxcbiAgICAgICAgICAgIG91dE9mU3RvY2tUaHJlc2hvbGQ6IFswLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkczogdGhpcy5mb3JtQnVpbGRlci5ncm91cChcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcy5yZWR1Y2UoKGhhc2gsIGZpZWxkKSA9PiAoeyAuLi5oYXNoLCBbZmllbGQubmFtZV06ICcnIH0pLCB7fSksXG4gICAgICAgICAgICApLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVzZXJTdGF0dXMoKS5zaW5nbGUkLnN1YnNjcmliZSgoeyB1c2VyU3RhdHVzIH0pID0+IHtcbiAgICAgICAgICAgIGlmICghdXNlclN0YXR1cy5wZXJtaXNzaW9ucy5pbmNsdWRlcyhQZXJtaXNzaW9uLlVwZGF0ZVNldHRpbmdzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhbmd1YWdlc1NlbGVjdCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2F2YWlsYWJsZUxhbmd1YWdlcycpO1xuICAgICAgICAgICAgICAgIGlmIChsYW5ndWFnZXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VzU2VsZWN0LmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGN1c3RvbUZpZWxkSXNTZXQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZGV0YWlsRm9ybS5nZXQoWydjdXN0b21GaWVsZHMnLCBuYW1lXSk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldGFpbEZvcm0uZGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3NcbiAgICAgICAgICAgIC51cGRhdGVHbG9iYWxTZXR0aW5ncyh0aGlzLmRldGFpbEZvcm0udmFsdWUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKHsgdXBkYXRlR2xvYmFsU2V0dGluZ3MgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHVwZGF0ZUdsb2JhbFNldHRpbmdzLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0dsb2JhbFNldHRpbmdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdTZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdDaGFubmVsRGVmYXVsdExhbmd1YWdlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcih1cGRhdGVHbG9iYWxTZXR0aW5ncy5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnNlcnZlckNvbmZpZ1NlcnZpY2UucmVmcmVzaEdsb2JhbFNldHRpbmdzKCkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRGb3JtVmFsdWVzKGVudGl0eTogR2xvYmFsU2V0dGluZ3MsIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgICAgICAgIGF2YWlsYWJsZUxhbmd1YWdlczogZW50aXR5LmF2YWlsYWJsZUxhbmd1YWdlcyxcbiAgICAgICAgICAgIHRyYWNrSW52ZW50b3J5OiBlbnRpdHkudHJhY2tJbnZlbnRvcnksXG4gICAgICAgICAgICBvdXRPZlN0b2NrVGhyZXNob2xkOiBlbnRpdHkub3V0T2ZTdG9ja1RocmVzaG9sZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkc0dyb3VwID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnY3VzdG9tRmllbGRzJykgYXMgRm9ybUdyb3VwO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkRGVmIG9mIHRoaXMuY3VzdG9tRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChlbnRpdHkgYXMgYW55KS5jdXN0b21GaWVsZHNba2V5XTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gY3VzdG9tRmllbGRzR3JvdXAuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbC5wYXRjaFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=