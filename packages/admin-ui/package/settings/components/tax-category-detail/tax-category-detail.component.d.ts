import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, Permission } from '@vendure/admin-ui/core';
import { LanguageCode, TaxCategory } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class TaxCategoryDetailComponent extends BaseDetailComponent<TaxCategory.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    taxCategory$: Observable<TaxCategory.Fragment>;
    detailForm: FormGroup;
    readonly updatePermission: Permission[];
    private taxCondition;
    private taxAction;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    saveButtonEnabled(): boolean;
    create(): void;
    save(): void;
    /**
     * Update the form values when the entity changes.
     */
    protected setFormValues(entity: TaxCategory.Fragment, languageCode: LanguageCode): void;
}
