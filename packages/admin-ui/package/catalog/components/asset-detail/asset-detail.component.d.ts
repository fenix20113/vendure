import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, CustomFieldConfig, GetAsset, LanguageCode } from '@vendure/admin-ui/core';
import { DataService, NotificationService, ServerConfigService } from '@vendure/admin-ui/core';
export declare class AssetDetailComponent extends BaseDetailComponent<GetAsset.Asset> implements OnInit, OnDestroy {
    private notificationService;
    protected dataService: DataService;
    private formBuilder;
    detailForm: FormGroup;
    customFields: CustomFieldConfig[];
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, notificationService: NotificationService, dataService: DataService, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onAssetChange(event: {
        id: string;
        name: string;
        tags: string[];
    }): void;
    save(): void;
    protected setFormValues(entity: GetAsset.Asset, languageCode: LanguageCode): void;
}
