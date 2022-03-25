import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, NotificationService, ServerConfigService, } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { unique } from '@vendure/common/lib/unique';
import { mergeMap, take } from 'rxjs/operators';
export class RoleDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            description: ['', Validators.required],
            channelIds: [],
            permissions: [],
        });
    }
    ngOnInit() {
        this.init();
        this.role$ = this.entity$;
        this.permissionDefinitions = this.serverConfigService.getPermissionDefinitions();
    }
    ngOnDestroy() {
        this.destroy();
    }
    updateCode(nameValue) {
        const codeControl = this.detailForm.get(['code']);
        if (codeControl && codeControl.pristine) {
            codeControl.setValue(normalizeString(nameValue, '-'));
        }
    }
    setPermission(change) {
        const permissionsControl = this.detailForm.get('permissions');
        if (permissionsControl) {
            const currentPermissions = permissionsControl.value;
            const newValue = change.value === true
                ? unique([...currentPermissions, change.permission])
                : currentPermissions.filter(p => p !== change.permission);
            permissionsControl.setValue(newValue);
            permissionsControl.markAsDirty();
        }
    }
    create() {
        const formValue = this.detailForm.value;
        const role = formValue;
        this.dataService.administrator.createRole(role).subscribe(data => {
            this.notificationService.success(_('common.notify-create-success'), { entity: 'Role' });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createRole.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'Role',
            });
        });
    }
    save() {
        this.role$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const role = Object.assign({ id }, formValue);
            return this.dataService.administrator.updateRole(role);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-update-success'), { entity: 'Role' });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Role',
            });
        });
    }
    setFormValues(role, languageCode) {
        this.detailForm.patchValue({
            description: role.description,
            code: role.code,
            channelIds: role.channels.map(c => c.id),
            permissions: role.permissions,
        });
        // This was required to get the channel selector component to
        // correctly display its contents. A while spent debugging the root
        // cause did not yield a solution, therefore this next line.
        this.changeDetector.detectChanges();
    }
}
RoleDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-role-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"role-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdateAdministrator'\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.description' | translate\" for=\"description\">\n        <input\n            id=\"description\"\n            type=\"text\"\n            formControlName=\"description\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n            (input)=\"updateCode($event.target.value)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'common.code' | translate\"\n        for=\"code\"\n        [readOnlyToggle]=\"'UpdateAdministrator' | hasPermission\"\n    >\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.channel' | translate\">\n        <vdr-channel-assignment-control\n            formControlName=\"channelIds\"\n            [vdrDisabled]=\"!('UpdateAdministrator' | hasPermission)\"\n        ></vdr-channel-assignment-control>\n    </vdr-form-field>\n    <label>{{ 'settings.permissions' | translate }}</label>\n    <vdr-permission-grid\n        [permissionDefinitions]=\"permissionDefinitions\"\n        [activePermissions]=\"detailForm.get('permissions')?.value\"\n        (permissionChange)=\"setPermission($event)\"\n        [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n    ></vdr-permission-grid>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
RoleDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy9yb2xlLWRldGFpbC9yb2xlLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILG1CQUFtQixFQUVuQixXQUFXLEVBRVgsbUJBQW1CLEVBSW5CLG1CQUFtQixHQUV0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVFoRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsbUJBQXlCO0lBSTlELFlBQ0ksTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLG1CQUF3QyxFQUNoQyxjQUFpQyxFQUMvQixXQUF3QixFQUMxQixXQUF3QixFQUN4QixtQkFBd0M7UUFFaEQsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFML0MsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FB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VyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQ2hDLENBQUMsQ0FBQztRQUNILDZEQUE2RDtRQUM3RCxtRUFBbUU7UUFDbkUsNERBQTREO1FBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDeEMsQ0FBQzs7O1lBL0dKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixxM0VBQTJDO2dCQUUzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQXhCd0IsTUFBTTtZQUF0QixjQUFjO1lBV25CLG1CQUFtQjtZQWJXLGlCQUFpQjtZQU8vQyxXQUFXO1lBTk4sV0FBVztZQVFoQixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQmFzZURldGFpbENvbXBvbmVudCxcbiAgICBDcmVhdGVSb2xlSW5wdXQsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgTGFuZ3VhZ2VDb2RlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgUGVybWlzc2lvbixcbiAgICBQZXJtaXNzaW9uRGVmaW5pdGlvbixcbiAgICBSb2xlLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgVXBkYXRlUm9sZUlucHV0LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IG5vcm1hbGl6ZVN0cmluZyB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvbm9ybWFsaXplLXN0cmluZyc7XG5pbXBvcnQgeyB1bmlxdWUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3VuaXF1ZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcm9sZS1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yb2xlLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcm9sZS1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUm9sZURldGFpbENvbXBvbmVudCBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8Um9sZT4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgcm9sZSQ6IE9ic2VydmFibGU8Um9sZT47XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuICAgIHBlcm1pc3Npb25EZWZpbml0aW9uczogUGVybWlzc2lvbkRlZmluaXRpb25bXTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlLCByb3V0ZXIsIHNlcnZlckNvbmZpZ1NlcnZpY2UsIGRhdGFTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBjb2RlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBjaGFubmVsSWRzOiBbXSxcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLnJvbGUkID0gdGhpcy5lbnRpdHkkO1xuICAgICAgICB0aGlzLnBlcm1pc3Npb25EZWZpbml0aW9ucyA9IHRoaXMuc2VydmVyQ29uZmlnU2VydmljZS5nZXRQZXJtaXNzaW9uRGVmaW5pdGlvbnMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29kZShuYW1lVmFsdWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjb2RlQ29udHJvbCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoWydjb2RlJ10pO1xuICAgICAgICBpZiAoY29kZUNvbnRyb2wgJiYgY29kZUNvbnRyb2wucHJpc3RpbmUpIHtcbiAgICAgICAgICAgIGNvZGVDb250cm9sLnNldFZhbHVlKG5vcm1hbGl6ZVN0cmluZyhuYW1lVmFsdWUsICctJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UGVybWlzc2lvbihjaGFuZ2U6IHsgcGVybWlzc2lvbjogc3RyaW5nOyB2YWx1ZTogYm9vbGVhbiB9KSB7XG4gICAgICAgIGNvbnN0IHBlcm1pc3Npb25zQ29udHJvbCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ3Blcm1pc3Npb25zJyk7XG4gICAgICAgIGlmIChwZXJtaXNzaW9uc0NvbnRyb2wpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25zQ29udHJvbC52YWx1ZSBhcyBzdHJpbmdbXTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID1cbiAgICAgICAgICAgICAgICBjaGFuZ2UudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgPyB1bmlxdWUoWy4uLmN1cnJlbnRQZXJtaXNzaW9ucywgY2hhbmdlLnBlcm1pc3Npb25dKVxuICAgICAgICAgICAgICAgICAgICA6IGN1cnJlbnRQZXJtaXNzaW9ucy5maWx0ZXIocCA9PiBwICE9PSBjaGFuZ2UucGVybWlzc2lvbik7XG4gICAgICAgICAgICBwZXJtaXNzaW9uc0NvbnRyb2wuc2V0VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgcGVybWlzc2lvbnNDb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgY29uc3Qgcm9sZTogQ3JlYXRlUm9sZUlucHV0ID0gZm9ybVZhbHVlO1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkbWluaXN0cmF0b3IuY3JlYXRlUm9sZShyb2xlKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1zdWNjZXNzJyksIHsgZW50aXR5OiAnUm9sZScgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLycsIGRhdGEuY3JlYXRlUm9sZS5pZF0sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1JvbGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLnJvbGUkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh7IGlkIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb2xlOiBVcGRhdGVSb2xlSW5wdXQgPSB7IGlkLCAuLi5mb3JtVmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuYWRtaW5pc3RyYXRvci51cGRhdGVSb2xlKHJvbGUpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7IGVudGl0eTogJ1JvbGUnIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdSb2xlJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMocm9sZTogUm9sZSwgbGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IHJvbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBjb2RlOiByb2xlLmNvZGUsXG4gICAgICAgICAgICBjaGFubmVsSWRzOiByb2xlLmNoYW5uZWxzLm1hcChjID0+IGMuaWQpLFxuICAgICAgICAgICAgcGVybWlzc2lvbnM6IHJvbGUucGVybWlzc2lvbnMsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUaGlzIHdhcyByZXF1aXJlZCB0byBnZXQgdGhlIGNoYW5uZWwgc2VsZWN0b3IgY29tcG9uZW50IHRvXG4gICAgICAgIC8vIGNvcnJlY3RseSBkaXNwbGF5IGl0cyBjb250ZW50cy4gQSB3aGlsZSBzcGVudCBkZWJ1Z2dpbmcgdGhlIHJvb3RcbiAgICAgICAgLy8gY2F1c2UgZGlkIG5vdCB5aWVsZCBhIHNvbHV0aW9uLCB0aGVyZWZvcmUgdGhpcyBuZXh0IGxpbmUuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbn1cbiJdfQ==