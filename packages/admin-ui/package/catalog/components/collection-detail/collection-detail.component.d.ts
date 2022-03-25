import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset, BaseDetailComponent, Collection, ConfigurableOperation, ConfigurableOperationDefinition, CustomFieldConfig, DataService, LanguageCode, ModalService, NotificationService, Permission, ServerConfigService } from '@vendure/admin-ui/core';
import { CollectionContentsComponent } from '../collection-contents/collection-contents.component';
export declare class CollectionDetailComponent extends BaseDetailComponent<Collection.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    private modalService;
    customFields: CustomFieldConfig[];
    detailForm: FormGroup;
    assetChanges: {
        assets?: Asset[];
        featuredAsset?: Asset;
    };
    filters: ConfigurableOperation[];
    allFilters: ConfigurableOperationDefinition[];
    readonly updatePermission: Permission[];
    contentsComponent: CollectionContentsComponent;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService, modalService: ModalService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getFilterDefinition(filter: ConfigurableOperation): ConfigurableOperationDefinition | undefined;
    customFieldIsSet(name: string): boolean;
    assetsChanged(): boolean;
    /**
     * If creating a new Collection, automatically generate the slug based on the collection name.
     */
    updateSlug(nameValue: string): void;
    addFilter(collectionFilter: ConfigurableOperation): void;
    removeFilter(collectionFilter: ConfigurableOperation): void;
    create(): void;
    save(): void;
    canDeactivate(): boolean;
    /**
     * Sets the values of the form on changes to the category or current language.
     */
    protected setFormValues(entity: Collection.Fragment, languageCode: LanguageCode): void;
    /**
     * Given a category and the value of the form, this method creates an updated copy of the category which
     * can then be persisted to the API.
     */
    private getUpdatedCollection;
    /**
     * Maps an array of conditions or actions to the input format expected by the GraphQL API.
     */
    private mapOperationsToInputs;
}
