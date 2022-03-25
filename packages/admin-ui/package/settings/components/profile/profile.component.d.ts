import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator, BaseDetailComponent, CustomFieldConfig, DataService, GetActiveAdministrator, LanguageCode, NotificationService, ServerConfigService } from '@vendure/admin-ui/core';
export declare class ProfileComponent extends BaseDetailComponent<GetActiveAdministrator.ActiveAdministrator> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    customFields: CustomFieldConfig[];
    detailForm: FormGroup;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    customFieldIsSet(name: string): boolean;
    save(): void;
    protected setFormValues(administrator: Administrator, languageCode: LanguageCode): void;
}
