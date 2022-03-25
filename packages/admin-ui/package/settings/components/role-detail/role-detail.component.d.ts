import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, DataService, LanguageCode, NotificationService, PermissionDefinition, Role, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class RoleDetailComponent extends BaseDetailComponent<Role> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    role$: Observable<Role>;
    detailForm: FormGroup;
    permissionDefinitions: PermissionDefinition[];
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateCode(nameValue: string): void;
    setPermission(change: {
        permission: string;
        value: boolean;
    }): void;
    create(): void;
    save(): void;
    protected setFormValues(role: Role, languageCode: LanguageCode): void;
}
