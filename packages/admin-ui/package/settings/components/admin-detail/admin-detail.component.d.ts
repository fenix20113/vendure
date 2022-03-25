import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, CustomFieldConfig, PermissionDefinition } from '@vendure/admin-ui/core';
import { Administrator, GetAdministrator, LanguageCode, Permission, Role } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export interface PermissionsByChannel {
    channelId: string;
    channelCode: string;
    permissions: {
        [K in Permission]: boolean;
    };
}
export declare class AdminDetailComponent extends BaseDetailComponent<GetAdministrator.Administrator> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    customFields: CustomFieldConfig[];
    administrator$: Observable<GetAdministrator.Administrator>;
    permissionDefinitions: PermissionDefinition[];
    allRoles$: Observable<Role.Fragment[]>;
    selectedRoles: Role.Fragment[];
    detailForm: FormGroup;
    selectedRolePermissions: {
        [channelId: string]: PermissionsByChannel;
    };
    selectedChannelId: string | null;
    getAvailableChannels(): PermissionsByChannel[];
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    customFieldIsSet(name: string): boolean;
    rolesChanged(roles: Role[]): void;
    getPermissionsForSelectedChannel(): string[];
    create(): void;
    save(): void;
    protected setFormValues(administrator: Administrator, languageCode: LanguageCode): void;
    private buildPermissionsMap;
}
