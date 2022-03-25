import { ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent } from '@vendure/admin-ui/core';
import { CustomFieldConfig, GlobalSettings, LanguageCode, Permission } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
export declare class GlobalSettingsComponent extends BaseDetailComponent<GlobalSettings> implements OnInit {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    detailForm: FormGroup;
    customFields: CustomFieldConfig[];
    languageCodes: LanguageCode[];
    readonly updatePermission: Permission[];
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    customFieldIsSet(name: string): boolean;
    save(): void;
    protected setFormValues(entity: GlobalSettings, languageCode: LanguageCode): void;
}
