import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, CustomerGroup, DataService, GetZones, LanguageCode, NotificationService, Permission, ServerConfigService, TaxCategory, TaxRate } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class TaxRateDetailComponent extends BaseDetailComponent<TaxRate.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    taxCategories$: Observable<TaxCategory.Fragment[]>;
    zones$: Observable<GetZones.Zones[]>;
    groups$: Observable<CustomerGroup[]>;
    detailForm: FormGroup;
    readonly updatePermission: Permission[];
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    saveButtonEnabled(): boolean;
    create(): void;
    save(): void;
    /**
     * Update the form values when the entity changes.
     */
    protected setFormValues(entity: TaxRate.Fragment, languageCode: LanguageCode): void;
}
