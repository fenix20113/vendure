import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, Country, DataService, LanguageCode, NotificationService, Permission, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class CountryDetailComponent extends BaseDetailComponent<Country.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    country$: Observable<Country.Fragment>;
    detailForm: FormGroup;
    readonly updatePermission: Permission[];
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    create(): void;
    save(): void;
    protected setFormValues(country: Country, languageCode: LanguageCode): void;
}
