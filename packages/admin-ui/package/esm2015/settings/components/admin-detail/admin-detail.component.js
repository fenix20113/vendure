import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent } from '@vendure/admin-ui/core';
import { Permission, } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { CUSTOMER_ROLE_CODE } from '@vendure/common/lib/shared-constants';
import { mergeMap, take } from 'rxjs/operators';
export class AdminDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.selectedRoles = [];
        this.selectedRolePermissions = {};
        this.selectedChannelId = null;
        this.customFields = this.getCustomFieldConfig('Administrator');
        this.detailForm = this.formBuilder.group({
            emailAddress: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: [''],
            roles: [[]],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    getAvailableChannels() {
        return Object.values(this.selectedRolePermissions);
    }
    ngOnInit() {
        this.init();
        this.administrator$ = this.entity$;
        this.allRoles$ = this.dataService.administrator
            .getRoles(999)
            .mapStream(item => item.roles.items.filter(i => i.code !== CUSTOMER_ROLE_CODE));
        this.dataService.client.userStatus().single$.subscribe(({ userStatus }) => {
            if (!userStatus.permissions.includes(Permission.UpdateAdministrator)) {
                const rolesSelect = this.detailForm.get('roles');
                if (rolesSelect) {
                    rolesSelect.disable();
                }
            }
        });
        this.permissionDefinitions = this.serverConfigService.getPermissionDefinitions();
    }
    ngOnDestroy() {
        this.destroy();
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['customFields', name]);
    }
    rolesChanged(roles) {
        this.buildPermissionsMap();
    }
    getPermissionsForSelectedChannel() {
        function getActivePermissions(input) {
            return Object.entries(input)
                .filter(([permission, active]) => active)
                .map(([permission, active]) => permission);
        }
        if (this.selectedChannelId) {
            const selectedChannel = this.selectedRolePermissions[this.selectedChannelId];
            if (selectedChannel) {
                const permissionMap = this.selectedRolePermissions[this.selectedChannelId].permissions;
                return getActivePermissions(permissionMap);
            }
        }
        const channels = Object.values(this.selectedRolePermissions);
        if (0 < channels.length) {
            this.selectedChannelId = channels[0].channelId;
            return getActivePermissions(channels[0].permissions);
        }
        return [];
    }
    create() {
        const formValue = this.detailForm.value;
        const administrator = {
            emailAddress: formValue.emailAddress,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            password: formValue.password,
            customFields: formValue.customFields,
            roleIds: formValue.roles.map(role => role.id),
        };
        this.dataService.administrator.createAdministrator(administrator).subscribe(data => {
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'Administrator',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createAdministrator.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'Administrator',
            });
        });
    }
    save() {
        this.administrator$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const administrator = {
                id,
                emailAddress: formValue.emailAddress,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                password: formValue.password,
                customFields: formValue.customFields,
                roleIds: formValue.roles.map(role => role.id),
            };
            return this.dataService.administrator.updateAdministrator(administrator);
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
            roles: administrator.user.roles,
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
        const passwordControl = this.detailForm.get('password');
        if (passwordControl) {
            if (!administrator.id) {
                passwordControl.setValidators([Validators.required]);
            }
            else {
                passwordControl.setValidators([]);
            }
        }
        this.buildPermissionsMap();
    }
    buildPermissionsMap() {
        const permissionsControl = this.detailForm.get('roles');
        if (permissionsControl) {
            const roles = permissionsControl.value;
            const channelIdPermissionsMap = new Map();
            const channelIdCodeMap = new Map();
            for (const role of roles) {
                for (const channel of role.channels) {
                    const channelPermissions = channelIdPermissionsMap.get(channel.id);
                    const permissionSet = channelPermissions || new Set();
                    role.permissions.forEach(p => permissionSet.add(p));
                    channelIdPermissionsMap.set(channel.id, permissionSet);
                    channelIdCodeMap.set(channel.id, channel.code);
                }
            }
            this.selectedRolePermissions = {};
            for (const channelId of Array.from(channelIdPermissionsMap.keys())) {
                // tslint:disable-next-line:no-non-null-assertion
                const permissionSet = channelIdPermissionsMap.get(channelId);
                const permissionsHash = {};
                for (const def of this.serverConfigService.getPermissionDefinitions()) {
                    permissionsHash[def.name] = permissionSet.has(def.name);
                }
                this.selectedRolePermissions[channelId] = {
                    // tslint:disable:no-non-null-assertion
                    channelId,
                    channelCode: channelIdCodeMap.get(channelId),
                    permissions: permissionsHash,
                };
            }
        }
    }
}
AdminDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-admin-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdateAdministrator'\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'settings.email-address' | translate\" for=\"emailAddress\">\n        <input\n            id=\"emailAddress\"\n            type=\"text\"\n            formControlName=\"emailAddress\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.first-name' | translate\" for=\"firstName\">\n        <input\n            id=\"firstName\"\n            type=\"text\"\n            formControlName=\"firstName\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.last-name' | translate\" for=\"lastName\">\n        <input\n            id=\"lastName\"\n            type=\"text\"\n            formControlName=\"lastName\"\n            [readonly]=\"!('UpdateAdministrator' | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field *ngIf=\"isNew$ | async\" [label]=\"'settings.password' | translate\" for=\"password\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n    <vdr-form-field\n        *ngIf=\"!(isNew$ | async) && ('UpdateAdministrator' | hasPermission)\"\n        [label]=\"'settings.password' | translate\"\n        for=\"password\"\n        [readOnlyToggle]=\"true\"\n    >\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <ng-container *ngFor=\"let customField of customFields\">\n            <vdr-custom-field-control\n                *ngIf=\"customFieldIsSet(customField.name)\"\n                entityName=\"Administrator\"\n                [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n                [customField]=\"customField\"\n            ></vdr-custom-field-control>\n        </ng-container>\n    </section>\n    <label class=\"clr-control-label\">{{ 'settings.roles' | translate }}</label>\n    <ng-select\n        [items]=\"allRoles$ | async\"\n        [multiple]=\"true\"\n        [hideSelected]=\"true\"\n        formControlName=\"roles\"\n        (change)=\"rolesChanged($event)\"\n        bindLabel=\"description\"\n    ></ng-select>\n\n    <ul class=\"nav\" role=\"tablist\">\n        <li role=\"presentation\" class=\"nav-item\" *ngFor=\"let channel of getAvailableChannels()\">\n            <button\n                [id]=\"channel.channelId\"\n                (click)=\"selectedChannelId = channel.channelId\"\n                class=\"btn btn-link nav-link\"\n                [class.active]=\"selectedChannelId === channel.channelId\"\n                [attr.aria-selected]=\"selectedChannelId === channel.channelId\"\n                type=\"button\"\n            >\n                {{ channel.channelCode | channelCodeToLabel | translate }}\n            </button>\n        </li>\n    </ul>\n    <vdr-permission-grid\n        [activePermissions]=\"getPermissionsForSelectedChannel()\"\n        [permissionDefinitions]=\"permissionDefinitions\"\n        [readonly]=\"true\"\n    ></vdr-permission-grid>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
AdminDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvYWRtaW4tZGV0YWlsL2FkbWluLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUEyQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RHLE9BQU8sRUFLSCxVQUFVLEdBSWIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWNoRCxNQUFNLE9BQU8sb0JBQ1QsU0FBUSxtQkFBbUQ7SUFlM0QsWUFDSSxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsbUJBQXdDLEVBQ2hDLGNBQWlDLEVBQy9CLFdBQXdCLEVBQzFCLFdBQXdCLEVBQ3hCLG1CQUF3QztRQUVoRCxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFB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QUcsQ0FBQyxHQUFHLENBQUMsSUFBa0IsQ0FBQyxDQUFDO2lCQUN6RTtnQkFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLEdBQUc7b0JBQ3RDLHVDQUF1QztvQkFDdkMsU0FBUztvQkFDVCxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBRTtvQkFDN0MsV0FBVyxFQUFFLGVBQWU7aUJBRS9CLENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQzs7O1lBN05KLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qix1cUlBQTRDO2dCQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQS9Cd0IsTUFBTTtZQUF0QixjQUFjO1lBZWQsbUJBQW1CO1lBakJNLGlCQUFpQjtZQWdCMUMsV0FBVztZQWZYLFdBQVc7WUFjWCxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IEJhc2VEZXRhaWxDb21wb25lbnQsIEN1c3RvbUZpZWxkQ29uZmlnLCBQZXJtaXNzaW9uRGVmaW5pdGlvbiB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBZG1pbmlzdHJhdG9yLFxuICAgIENyZWF0ZUFkbWluaXN0cmF0b3JJbnB1dCxcbiAgICBHZXRBZG1pbmlzdHJhdG9yLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBQZXJtaXNzaW9uLFxuICAgIFJvbGUsXG4gICAgUm9sZUZyYWdtZW50LFxuICAgIFVwZGF0ZUFkbWluaXN0cmF0b3JJbnB1dCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgU2VydmVyQ29uZmlnU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgQ1VTVE9NRVJfUk9MRV9DT0RFIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtY29uc3RhbnRzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBlcm1pc3Npb25zQnlDaGFubmVsIHtcbiAgICBjaGFubmVsSWQ6IHN0cmluZztcbiAgICBjaGFubmVsQ29kZTogc3RyaW5nO1xuICAgIHBlcm1pc3Npb25zOiB7IFtLIGluIFBlcm1pc3Npb25dOiBib29sZWFuIH07XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFkbWluLWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FkbWluLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWRtaW4tZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluRGV0YWlsQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBCYXNlRGV0YWlsQ29tcG9uZW50PEdldEFkbWluaXN0cmF0b3IuQWRtaW5pc3RyYXRvcj5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgYWRtaW5pc3RyYXRvciQ6IE9ic2VydmFibGU8R2V0QWRtaW5pc3RyYXRvci5BZG1pbmlzdHJhdG9yPjtcbiAgICBwZXJtaXNzaW9uRGVmaW5pdGlvbnM6IFBlcm1pc3Npb25EZWZpbml0aW9uW107XG4gICAgYWxsUm9sZXMkOiBPYnNlcnZhYmxlPFJvbGUuRnJhZ21lbnRbXT47XG4gICAgc2VsZWN0ZWRSb2xlczogUm9sZS5GcmFnbWVudFtdID0gW107XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuICAgIHNlbGVjdGVkUm9sZVBlcm1pc3Npb25zOiB7IFtjaGFubmVsSWQ6IHN0cmluZ106IFBlcm1pc3Npb25zQnlDaGFubmVsIH0gPSB7fSBhcyBhbnk7XG4gICAgc2VsZWN0ZWRDaGFubmVsSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgZ2V0QXZhaWxhYmxlQ2hhbm5lbHMoKTogUGVybWlzc2lvbnNCeUNoYW5uZWxbXSB7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuc2VsZWN0ZWRSb2xlUGVybWlzc2lvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGUsIHJvdXRlciwgc2VydmVyQ29uZmlnU2VydmljZSwgZGF0YVNlcnZpY2UpO1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRDb25maWcoJ0FkbWluaXN0cmF0b3InKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBlbWFpbEFkZHJlc3M6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBmaXJzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBsYXN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBbJyddLFxuICAgICAgICAgICAgcm9sZXM6IFtbXV0sXG4gICAgICAgICAgICBjdXN0b21GaWVsZHM6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMucmVkdWNlKChoYXNoLCBmaWVsZCkgPT4gKHsgLi4uaGFzaCwgW2ZpZWxkLm5hbWVdOiAnJyB9KSwge30pLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLmFkbWluaXN0cmF0b3IkID0gdGhpcy5lbnRpdHkkO1xuICAgICAgICB0aGlzLmFsbFJvbGVzJCA9IHRoaXMuZGF0YVNlcnZpY2UuYWRtaW5pc3RyYXRvclxuICAgICAgICAgICAgLmdldFJvbGVzKDk5OSlcbiAgICAgICAgICAgIC5tYXBTdHJlYW0oaXRlbSA9PiBpdGVtLnJvbGVzLml0ZW1zLmZpbHRlcihpID0+IGkuY29kZSAhPT0gQ1VTVE9NRVJfUk9MRV9DT0RFKSk7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVzZXJTdGF0dXMoKS5zaW5nbGUkLnN1YnNjcmliZSgoeyB1c2VyU3RhdHVzIH0pID0+IHtcbiAgICAgICAgICAgIGlmICghdXNlclN0YXR1cy5wZXJtaXNzaW9ucy5pbmNsdWRlcyhQZXJtaXNzaW9uLlVwZGF0ZUFkbWluaXN0cmF0b3IpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9sZXNTZWxlY3QgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdyb2xlcycpO1xuICAgICAgICAgICAgICAgIGlmIChyb2xlc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICByb2xlc1NlbGVjdC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGVmaW5pdGlvbnMgPSB0aGlzLnNlcnZlckNvbmZpZ1NlcnZpY2UuZ2V0UGVybWlzc2lvbkRlZmluaXRpb25zKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGN1c3RvbUZpZWxkSXNTZXQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZGV0YWlsRm9ybS5nZXQoWydjdXN0b21GaWVsZHMnLCBuYW1lXSk7XG4gICAgfVxuXG4gICAgcm9sZXNDaGFuZ2VkKHJvbGVzOiBSb2xlW10pIHtcbiAgICAgICAgdGhpcy5idWlsZFBlcm1pc3Npb25zTWFwKCk7XG4gICAgfVxuXG4gICAgZ2V0UGVybWlzc2lvbnNGb3JTZWxlY3RlZENoYW5uZWwoKTogc3RyaW5nW10ge1xuICAgICAgICBmdW5jdGlvbiBnZXRBY3RpdmVQZXJtaXNzaW9ucyhpbnB1dDogUGVybWlzc2lvbnNCeUNoYW5uZWxbJ3Blcm1pc3Npb25zJ10pOiBzdHJpbmdbXSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoaW5wdXQpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW3Blcm1pc3Npb24sIGFjdGl2ZV0pID0+IGFjdGl2ZSlcbiAgICAgICAgICAgICAgICAubWFwKChbcGVybWlzc2lvbiwgYWN0aXZlXSkgPT4gcGVybWlzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hhbm5lbCA9IHRoaXMuc2VsZWN0ZWRSb2xlUGVybWlzc2lvbnNbdGhpcy5zZWxlY3RlZENoYW5uZWxJZF07XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRDaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvbk1hcCA9IHRoaXMuc2VsZWN0ZWRSb2xlUGVybWlzc2lvbnNbdGhpcy5zZWxlY3RlZENoYW5uZWxJZF0ucGVybWlzc2lvbnM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZVBlcm1pc3Npb25zKHBlcm1pc3Npb25NYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoYW5uZWxzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnNlbGVjdGVkUm9sZVBlcm1pc3Npb25zKTtcbiAgICAgICAgaWYgKDAgPCBjaGFubmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFubmVsSWQgPSBjaGFubmVsc1swXS5jaGFubmVsSWQ7XG4gICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlUGVybWlzc2lvbnMoY2hhbm5lbHNbMF0ucGVybWlzc2lvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgY29uc3QgYWRtaW5pc3RyYXRvcjogQ3JlYXRlQWRtaW5pc3RyYXRvcklucHV0ID0ge1xuICAgICAgICAgICAgZW1haWxBZGRyZXNzOiBmb3JtVmFsdWUuZW1haWxBZGRyZXNzLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiBmb3JtVmFsdWUuZmlyc3ROYW1lLFxuICAgICAgICAgICAgbGFzdE5hbWU6IGZvcm1WYWx1ZS5sYXN0TmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBmb3JtVmFsdWUucGFzc3dvcmQsXG4gICAgICAgICAgICBjdXN0b21GaWVsZHM6IGZvcm1WYWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICByb2xlSWRzOiBmb3JtVmFsdWUucm9sZXMubWFwKHJvbGUgPT4gcm9sZS5pZCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRtaW5pc3RyYXRvci5jcmVhdGVBZG1pbmlzdHJhdG9yKGFkbWluaXN0cmF0b3IpLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgZGF0YS5jcmVhdGVBZG1pbmlzdHJhdG9yLmlkXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQWRtaW5pc3RyYXRvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuYWRtaW5pc3RyYXRvciRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHsgaWQgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLmRldGFpbEZvcm0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkbWluaXN0cmF0b3I6IFVwZGF0ZUFkbWluaXN0cmF0b3JJbnB1dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWxBZGRyZXNzOiBmb3JtVmFsdWUuZW1haWxBZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmb3JtVmFsdWUuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGZvcm1WYWx1ZS5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBmb3JtVmFsdWUucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IGZvcm1WYWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlSWRzOiBmb3JtVmFsdWUucm9sZXMubWFwKHJvbGUgPT4gcm9sZS5pZCksXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmFkbWluaXN0cmF0b3IudXBkYXRlQWRtaW5pc3RyYXRvcihhZG1pbmlzdHJhdG9yKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQWRtaW5pc3RyYXRvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMoYWRtaW5pc3RyYXRvcjogQWRtaW5pc3RyYXRvciwgbGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgZW1haWxBZGRyZXNzOiBhZG1pbmlzdHJhdG9yLmVtYWlsQWRkcmVzcyxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogYWRtaW5pc3RyYXRvci5maXJzdE5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogYWRtaW5pc3RyYXRvci5sYXN0TmFtZSxcbiAgICAgICAgICAgIHJvbGVzOiBhZG1pbmlzdHJhdG9yLnVzZXIucm9sZXMsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5jdXN0b21GaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21GaWVsZHNHcm91cCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2N1c3RvbUZpZWxkcycpIGFzIEZvcm1Hcm91cDtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZERlZiBvZiB0aGlzLmN1c3RvbUZpZWxkcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGZpZWxkRGVmLm5hbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAoYWRtaW5pc3RyYXRvciBhcyBhbnkpLmN1c3RvbUZpZWxkc1trZXldO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBjdXN0b21GaWVsZHNHcm91cC5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sLnBhdGNoVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXNzd29yZENvbnRyb2wgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdwYXNzd29yZCcpO1xuICAgICAgICBpZiAocGFzc3dvcmRDb250cm9sKSB7XG4gICAgICAgICAgICBpZiAoIWFkbWluaXN0cmF0b3IuaWQpIHtcbiAgICAgICAgICAgICAgICBwYXNzd29yZENvbnRyb2wuc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXNzd29yZENvbnRyb2wuc2V0VmFsaWRhdG9ycyhbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWlsZFBlcm1pc3Npb25zTWFwKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZFBlcm1pc3Npb25zTWFwKCkge1xuICAgICAgICBjb25zdCBwZXJtaXNzaW9uc0NvbnRyb2wgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdyb2xlcycpO1xuICAgICAgICBpZiAocGVybWlzc2lvbnNDb250cm9sKSB7XG4gICAgICAgICAgICBjb25zdCByb2xlczogUm9sZUZyYWdtZW50W10gPSBwZXJtaXNzaW9uc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBjaGFubmVsSWRQZXJtaXNzaW9uc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBTZXQ8UGVybWlzc2lvbj4+KCk7XG4gICAgICAgICAgICBjb25zdCBjaGFubmVsSWRDb2RlTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCByb2xlIG9mIHJvbGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGFubmVsIG9mIHJvbGUuY2hhbm5lbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbm5lbFBlcm1pc3Npb25zID0gY2hhbm5lbElkUGVybWlzc2lvbnNNYXAuZ2V0KGNoYW5uZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtaXNzaW9uU2V0ID0gY2hhbm5lbFBlcm1pc3Npb25zIHx8IG5ldyBTZXQ8UGVybWlzc2lvbj4oKTtcblxuICAgICAgICAgICAgICAgICAgICByb2xlLnBlcm1pc3Npb25zLmZvckVhY2gocCA9PiBwZXJtaXNzaW9uU2V0LmFkZChwKSk7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxJZFBlcm1pc3Npb25zTWFwLnNldChjaGFubmVsLmlkLCBwZXJtaXNzaW9uU2V0KTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbElkQ29kZU1hcC5zZXQoY2hhbm5lbC5pZCwgY2hhbm5lbC5jb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb2xlUGVybWlzc2lvbnMgPSB7fSBhcyBhbnk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoYW5uZWxJZCBvZiBBcnJheS5mcm9tKGNoYW5uZWxJZFBlcm1pc3Npb25zTWFwLmtleXMoKSkpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvblNldCA9IGNoYW5uZWxJZFBlcm1pc3Npb25zTWFwLmdldChjaGFubmVsSWQpITtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJtaXNzaW9uc0hhc2g6IHsgW0sgaW4gUGVybWlzc2lvbl06IGJvb2xlYW4gfSA9IHt9IGFzIGFueTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRlZiBvZiB0aGlzLnNlcnZlckNvbmZpZ1NlcnZpY2UuZ2V0UGVybWlzc2lvbkRlZmluaXRpb25zKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnNIYXNoW2RlZi5uYW1lXSA9IHBlcm1pc3Npb25TZXQuaGFzKGRlZi5uYW1lIGFzIFBlcm1pc3Npb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9sZVBlcm1pc3Npb25zW2NoYW5uZWxJZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsSWQsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxDb2RlOiBjaGFubmVsSWRDb2RlTWFwLmdldChjaGFubmVsSWQpISxcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6IHBlcm1pc3Npb25zSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19