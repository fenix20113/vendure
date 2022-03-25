import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, CustomFieldConfig, Permission } from '@vendure/admin-ui/core';
import { Channel, CurrencyCode, GetZones, LanguageCode } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class ChannelDetailComponent extends BaseDetailComponent<Channel.Fragment> implements OnInit, OnDestroy {
    protected serverConfigService: ServerConfigService;
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    customFields: CustomFieldConfig[];
    zones$: Observable<GetZones.Zones[]>;
    detailForm: FormGroup;
    currencyCodes: CurrencyCode[];
    availableLanguageCodes$: Observable<LanguageCode[]>;
    readonly updatePermission: Permission[];
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    customFieldIsSet(name: string): boolean;
    saveButtonEnabled(): boolean;
    create(): void;
    save(): void;
    /**
     * Update the form values when the entity changes.
     */
    protected setFormValues(entity: Channel.Fragment, languageCode: LanguageCode): void;
    private generateToken;
}
