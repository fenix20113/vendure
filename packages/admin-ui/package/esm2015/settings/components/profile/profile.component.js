import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, NotificationService, ServerConfigService, } from '@vendure/admin-ui/core';
import { mergeMap, take } from 'rxjs/operators';
export class ProfileComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.customFields = this.getCustomFieldConfig('Administrator');
        this.detailForm = this.formBuilder.group({
            emailAddress: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: [''],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['customFields', name]);
    }
    save() {
        this.entity$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const administrator = {
                emailAddress: formValue.emailAddress,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                password: formValue.password,
                customFields: formValue.customFields,
            };
            return this.dataService.administrator.updateActiveAdministrator(administrator);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Administrator',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Administrator',
            });
        });
    }
    setFormValues(administrator, languageCode) {
        this.detailForm.patchValue({
            emailAddress: administrator.emailAddress,
            firstName: administrator.firstName,
            lastName: administrator.lastName,
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get('customFields');
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = administrator.customFields[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
    }
}
ProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-profile',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'settings.email-address' | translate\" for=\"emailAddress\">\n        <input id=\"emailAddress\" type=\"text\" formControlName=\"emailAddress\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.first-name' | translate\" for=\"firstName\">\n        <input id=\"firstName\" type=\"text\" formControlName=\"firstName\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.last-name' | translate\" for=\"lastName\">\n        <input id=\"lastName\" type=\"text\" formControlName=\"lastName\" />\n    </vdr-form-field>\n    <vdr-form-field *ngIf=\"isNew$ | async\" [label]=\"'settings.password' | translate\" for=\"password\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.password' | translate\" for=\"password\" [readOnlyToggle]=\"true\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <ng-container *ngFor=\"let customField of customFields\">\n            <vdr-custom-field-control\n                *ngIf=\"customFieldIsSet(customField.name)\"\n                entityName=\"Administrator\"\n                [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n                [customField]=\"customField\"\n            ></vdr-custom-field-control>\n        </ng-container>\n    </section>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ProfileComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NldHRpbmdzL3NyYy9jb21wb25lbnRzL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUVILG1CQUFtQixFQUVuQixXQUFXLEVBR1gsbUJBQW1CLEVBQ25CLG1CQUFtQixHQUV0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRaEQsTUFBTSxPQUFPLGdCQUNULFNBQVEsbUJBQStEO0lBS3ZFLFlBQ0ksTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLG1CQUF3QyxFQUNoQyxjQUFpQyxFQUMvQixXQUF3QixFQUMxQixXQUF3QixFQUN4QixtQkFBd0M7UUFFaEQsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFML0MsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFHaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0Qs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SSxDQUFDLFlBQVksRUFBRTtnQkFDdEMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDMUIsTUFBTSxLQUFLLEdBQUksYUFBcUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7O1lBaEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIseW1FQUF1QztnQkFFdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFwQndCLE1BQU07WUFBdEIsY0FBYztZQVVuQixtQkFBbUI7WUFaVyxpQkFBaUI7WUFRL0MsV0FBVztZQVBOLFdBQVc7WUFVaEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEFkbWluaXN0cmF0b3IsXG4gICAgQmFzZURldGFpbENvbXBvbmVudCxcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBHZXRBY3RpdmVBZG1pbmlzdHJhdG9yLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgVXBkYXRlQWN0aXZlQWRtaW5pc3RyYXRvcklucHV0LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IG1lcmdlTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1wcm9maWxlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZmlsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZmlsZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBCYXNlRGV0YWlsQ29tcG9uZW50PEdldEFjdGl2ZUFkbWluaXN0cmF0b3IuQWN0aXZlQWRtaW5pc3RyYXRvcj5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG4gICAgICAgIHRoaXMuY3VzdG9tRmllbGRzID0gdGhpcy5nZXRDdXN0b21GaWVsZENvbmZpZygnQWRtaW5pc3RyYXRvcicpO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIGVtYWlsQWRkcmVzczogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJ10sXG4gICAgICAgICAgICBjdXN0b21GaWVsZHM6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMucmVkdWNlKChoYXNoLCBmaWVsZCkgPT4gKHsgLi4uaGFzaCwgW2ZpZWxkLm5hbWVdOiAnJyB9KSwge30pLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBjdXN0b21GaWVsZElzU2V0KG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmRldGFpbEZvcm0uZ2V0KFsnY3VzdG9tRmllbGRzJywgbmFtZV0pO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuZW50aXR5JFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoeyBpZCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRtaW5pc3RyYXRvcjogVXBkYXRlQWN0aXZlQWRtaW5pc3RyYXRvcklucHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWxBZGRyZXNzOiBmb3JtVmFsdWUuZW1haWxBZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmb3JtVmFsdWUuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGZvcm1WYWx1ZS5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBmb3JtVmFsdWUucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IGZvcm1WYWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmFkbWluaXN0cmF0b3IudXBkYXRlQWN0aXZlQWRtaW5pc3RyYXRvcihhZG1pbmlzdHJhdG9yKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQWRtaW5pc3RyYXRvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMoYWRtaW5pc3RyYXRvcjogQWRtaW5pc3RyYXRvciwgbGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgZW1haWxBZGRyZXNzOiBhZG1pbmlzdHJhdG9yLmVtYWlsQWRkcmVzcyxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogYWRtaW5pc3RyYXRvci5maXJzdE5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogYWRtaW5pc3RyYXRvci5sYXN0TmFtZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkc0dyb3VwID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnY3VzdG9tRmllbGRzJykgYXMgRm9ybUdyb3VwO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkRGVmIG9mIHRoaXMuY3VzdG9tRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChhZG1pbmlzdHJhdG9yIGFzIGFueSkuY3VzdG9tRmllbGRzW2tleV07XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGN1c3RvbUZpZWxkc0dyb3VwLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19