import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef, ChangeDetectorRef, ViewChild, ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Output, SkipSelf, Optional, forwardRef, HostBinding, NgModule } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BaseDetailComponent, ServerConfigService, NotificationService, DataService, BaseListComponent, SortOrder, LogicalOperator, DeletionResult, ModalService, Permission, findTranslation, getConfigArgValue, createUpdatedTranslatable, encodeConfigArgValue, FacetValueSelectorComponent, flattenFacetValues, SingleSearchSelectionModelFactory, JobState, JobQueueService, getDefaultUiLanguage, BaseEntityResolver, AssetType, createResolveData, CanDeactivateDetailGuard, detailBreadcrumb, AssetPickerDialogComponent, AssetPreviewDialogComponent, GlobalFlag, SharedModule } from '@vendure/admin-ui/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { map, debounceTime, takeUntil, finalize, switchMap, startWith, distinctUntilChanged, tap, take, mergeMap, shareReplay, mapTo, withLatestFrom, delay, filter } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, EMPTY, Subject, of, forkJoin, throwError, from, merge } from 'rxjs';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { notNullOrUndefined, generateAllCombinations } from '@vendure/common/lib/shared-utils';
import { Location } from '@angular/common';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
import { unique } from '@vendure/common/lib/unique';
import { __awaiter } from 'tslib';
import { SELECTION_MODEL_FACTORY } from '@ng-select/ng-select';
import { pick } from '@vendure/common/lib/pick';
import { moveItemInArray, CdkDropListGroup, CdkDropList } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';

class AssetDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, notificationService, dataService, formBuilder) {
        super(route, router, serverConfigService, dataService);
        this.notificationService = notificationService;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.detailForm = new FormGroup({});
        this.customFields = this.getCustomFieldConfig('Asset');
    }
    ngOnInit() {
        this.detailForm = new FormGroup({
            name: new FormControl(''),
            tags: new FormControl([]),
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    onAssetChange(event) {
        var _a, _b;
        (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(event.name);
        (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(event.tags);
        this.detailForm.markAsDirty();
    }
    save() {
        this.dataService.product
            .updateAsset({
            id: this.id,
            name: this.detailForm.value.name,
            tags: this.detailForm.value.tags,
            customFields: this.detailForm.value.customFields,
        })
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-update-success'), { entity: 'Asset' });
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Asset',
            });
        });
    }
    setFormValues(entity, languageCode) {
        var _a, _b;
        (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(entity.name);
        (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(entity.tags);
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get('customFields');
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = entity.customFields[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
    }
}
AssetDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-detail\"></vdr-action-bar-items>\n        <button\n            *vdrIfPermissions=\"['UpdateCatalog', 'UpdateAsset']\"\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<vdr-asset-preview\n    [asset]=\"entity$ | async\"\n    [editable]=\"true\"\n    [customFields]=\"customFields\"\n    [customFieldsForm]=\"detailForm.get('customFields')\"\n    (assetChange)=\"onAssetChange($event)\"\n></vdr-asset-preview>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;height:100%}"]
            },] }
];
AssetDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: NotificationService },
    { type: DataService },
    { type: FormBuilder }
];

class AssetListComponent extends BaseListComponent {
    constructor(notificationService, modalService, dataService, router, route) {
        super(router, route);
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchTerm$ = new BehaviorSubject(undefined);
        this.filterByTags$ = new BehaviorSubject(undefined);
        this.uploading = false;
        super.setQueryFn((...args) => this.dataService.product.getAssetList(...args), data => data.assets, (skip, take) => {
            var _a;
            const searchTerm = this.searchTerm$.value;
            const tags = (_a = this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(t => t.value);
            return {
                options: Object.assign(Object.assign({ skip,
                    take }, (searchTerm
                    ? {
                        filter: {
                            name: { contains: searchTerm },
                        },
                    }
                    : {})), { sort: {
                        createdAt: SortOrder.DESC,
                    }, tags, tagsOperator: LogicalOperator.AND }),
            };
        }, { take: 25, skip: 0 });
    }
    ngOnInit() {
        super.ngOnInit();
        this.paginationConfig$ = combineLatest(this.itemsPerPage$, this.currentPage$, this.totalItems$).pipe(map(([itemsPerPage, currentPage, totalItems]) => ({ itemsPerPage, currentPage, totalItems })));
        this.searchTerm$.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe(() => this.refresh());
        this.filterByTags$.pipe(takeUntil(this.destroy$)).subscribe(() => this.refresh());
        this.allTags$ = this.dataService.product.getTagList().mapStream(data => data.tags.items);
    }
    filesSelected(files) {
        if (files.length) {
            this.uploading = true;
            this.dataService.product
                .createAssets(files)
                .pipe(finalize(() => (this.uploading = false)))
                .subscribe(({ createAssets }) => {
                let successCount = 0;
                for (const result of createAssets) {
                    switch (result.__typename) {
                        case 'Asset':
                            successCount++;
                            break;
                        case 'MimeTypeError':
                            this.notificationService.error(result.message);
                            break;
                    }
                }
                if (0 < successCount) {
                    super.refresh();
                    this.notificationService.success(marker('asset.notify-create-assets-success'), {
                        count: successCount,
                    });
                }
            });
        }
    }
    deleteAssets(assets) {
        this.showModalAndDelete(assets.map(a => a.id))
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(assets.map(a => a.id), response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Assets',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Assets',
            });
        });
    }
    showModalAndDelete(assetIds, message) {
        return this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-assets'),
            translationVars: {
                count: assetIds.length,
            },
            body: message,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.product.deleteAssets(assetIds, !!message) : EMPTY)), map(res => res.deleteAssets));
    }
}
AssetListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <vdr-asset-search-input\n            class=\"pr4 mt1\"\n            [tags]=\"allTags$ | async\"\n            (searchTermChange)=\"searchTerm$.next($event)\"\n            (tagsChange)=\"filterByTags$.next($event)\"\n        ></vdr-asset-search-input>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-list\"></vdr-action-bar-items>\n        <vdr-asset-file-input\n            (selectFiles)=\"filesSelected($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".content-area\"\n        ></vdr-asset-file-input>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-asset-gallery\n    [assets]=\"(items$ | async)! | paginate: (paginationConfig$ | async) || {}\"\n    [multiSelect]=\"true\"\n    [canDelete]=\"['DeleteCatalog', 'DeleteAsset'] | hasPermission\"\n    (deleteAssets)=\"deleteAssets($event)\"\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        (itemsPerPageChange)=\"setItemsPerPage($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"currentPage$ | async\"\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        [totalItems]=\"totalItems$ | async\"\n        (pageChange)=\"setPageNumber($event)\"\n    ></vdr-pagination-controls>\n</div>\n",
                styles: [":host{display:flex;flex-direction:column;height:100%}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}.search-input{margin-top:6px;min-width:300px}"]
            },] }
];
AssetListComponent.ctorParameters = () => [
    { type: NotificationService },
    { type: ModalService },
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute }
];

class CollectionContentsComponent {
    constructor(route, router, dataService) {
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.filterTermControl = new FormControl('');
        this.collectionIdChange$ = new BehaviorSubject('');
        this.refresh$ = new BehaviorSubject(true);
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.contentsCurrentPage$ = this.route.paramMap.pipe(map(qpm => qpm.get('contentsPage')), map(page => (!page ? 1 : +page)), startWith(1), distinctUntilChanged());
        this.contentsItemsPerPage$ = this.route.paramMap.pipe(map(qpm => qpm.get('contentsPerPage')), map(perPage => (!perPage ? 10 : +perPage)), startWith(10), distinctUntilChanged());
        const filterTerm$ = this.filterTermControl.valueChanges.pipe(debounceTime(250), tap(() => this.setContentsPageNumber(1)), startWith(''));
        const collection$ = combineLatest(this.collectionIdChange$, this.contentsCurrentPage$, this.contentsItemsPerPage$, filterTerm$, this.refresh$).pipe(takeUntil(this.destroy$), switchMap(([id, currentPage, itemsPerPage, filterTerm]) => {
            const take = itemsPerPage;
            const skip = (currentPage - 1) * itemsPerPage;
            if (id) {
                return this.dataService.collection
                    .getCollectionContents(id, take, skip, filterTerm)
                    .mapSingle(data => data.collection);
            }
            else {
                return of(null);
            }
        }));
        this.contents$ = collection$.pipe(map(result => (result ? result.productVariants.items : [])));
        this.contentsTotalItems$ = collection$.pipe(map(result => (result ? result.productVariants.totalItems : 0)));
    }
    ngOnChanges(changes) {
        if ('collectionId' in changes) {
            this.collectionIdChange$.next(changes.collectionId.currentValue);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setContentsPageNumber(page) {
        this.setParam('contentsPage', page);
    }
    setContentsItemsPerPage(perPage) {
        this.setParam('contentsPerPage', perPage);
    }
    refresh() {
        this.refresh$.next(true);
    }
    setParam(key, value) {
        this.router.navigate(['./', Object.assign(Object.assign({}, this.route.snapshot.params), { [key]: value })], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
}
CollectionContentsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-contents',
                template: "<div class=\"contents-header\">\n    <div class=\"header-title-row\">\n        <ng-container\n            *ngTemplateOutlet=\"headerTemplate; context: { $implicit: contentsTotalItems$ | async }\"\n        ></ng-container>\n    </div>\n    <input\n        type=\"text\"\n        [placeholder]=\"'catalog.filter-by-name' | translate\"\n        [formControl]=\"filterTermControl\"\n    />\n</div>\n<vdr-data-table\n    [items]=\"contents$ | async\"\n    [itemsPerPage]=\"contentsItemsPerPage$ | async\"\n    [totalItems]=\"contentsTotalItems$ | async\"\n    [currentPage]=\"contentsCurrentPage$ | async\"\n    (pageChange)=\"setContentsPageNumber($event)\"\n    (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n>\n    <ng-template let-variant=\"item\">\n        <td class=\"left align-middle\">{{ variant.name }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['/catalog/products', variant.productId, { tab: 'variants' }]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".contents-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:1;border-bottom:1px solid var(--color-component-border-200)}.contents-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.contents-header .clr-input{width:100%}:host ::ng-deep table{margin-top:-1px}"]
            },] }
];
CollectionContentsComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: DataService }
];
CollectionContentsComponent.propDecorators = {
    collectionId: [{ type: Input }],
    headerTemplate: [{ type: ContentChild, args: [TemplateRef, { static: true },] }]
};

class CollectionDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService, modalService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.assetChanges = {};
        this.filters = [];
        this.allFilters = [];
        this.updatePermission = [Permission.UpdateCatalog, Permission.UpdateCollection];
        this.customFields = this.getCustomFieldConfig('Collection');
        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
            slug: '',
            description: '',
            visible: false,
            filters: this.formBuilder.array([]),
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.dataService.collection.getCollectionFilters().single$.subscribe(res => {
            this.allFilters = res.collectionFilters;
        });
    }
    ngOnDestroy() {
        this.destroy();
    }
    getFilterDefinition(filter) {
        return this.allFilters.find(f => f.code === filter.code);
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['customFields', name]);
    }
    assetsChanged() {
        return !!Object.values(this.assetChanges).length;
    }
    /**
     * If creating a new Collection, automatically generate the slug based on the collection name.
     */
    updateSlug(nameValue) {
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1))
            .subscribe(([entity, languageCode]) => {
            const slugControl = this.detailForm.get(['slug']);
            const currentTranslation = findTranslation(entity, languageCode);
            const currentSlugIsEmpty = !currentTranslation || !currentTranslation.slug;
            if (slugControl && slugControl.pristine && currentSlugIsEmpty) {
                slugControl.setValue(normalizeString(`${nameValue}`, '-'));
            }
        });
    }
    addFilter(collectionFilter) {
        const filtersArray = this.detailForm.get('filters');
        const index = filtersArray.value.findIndex(o => o.code === collectionFilter.code);
        if (index === -1) {
            const argsHash = collectionFilter.args.reduce((output, arg) => (Object.assign(Object.assign({}, output), { [arg.name]: getConfigArgValue(arg.value) })), {});
            filtersArray.push(this.formBuilder.control({
                code: collectionFilter.code,
                args: argsHash,
            }));
            this.filters.push({
                code: collectionFilter.code,
                args: collectionFilter.args.map(a => ({ name: a.name, value: getConfigArgValue(a.value) })),
            });
        }
    }
    removeFilter(collectionFilter) {
        const filtersArray = this.detailForm.get('filters');
        const index = filtersArray.value.findIndex(o => o.code === collectionFilter.code);
        if (index !== -1) {
            filtersArray.removeAt(index);
            this.filters.splice(index, 1);
        }
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1), mergeMap(([category, languageCode]) => {
            const input = this.getUpdatedCollection(category, this.detailForm, languageCode);
            const parentId = this.route.snapshot.paramMap.get('parentId');
            if (parentId) {
                input.parentId = parentId;
            }
            return this.dataService.collection.createCollection(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'Collection',
            });
            this.assetChanges = {};
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createCollection.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'Collection',
            });
        });
    }
    save() {
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1), mergeMap(([category, languageCode]) => {
            const input = this.getUpdatedCollection(category, this.detailForm, languageCode);
            return this.dataService.collection.updateCollection(input);
        }))
            .subscribe(() => {
            this.assetChanges = {};
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'Collection',
            });
            this.contentsComponent.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Collection',
            });
        });
    }
    canDeactivate() {
        return super.canDeactivate() && !this.assetChanges.assets && !this.assetChanges.featuredAsset;
    }
    /**
     * Sets the values of the form on changes to the category or current language.
     */
    setFormValues(entity, languageCode) {
        const currentTranslation = findTranslation(entity, languageCode);
        this.detailForm.patchValue({
            name: currentTranslation ? currentTranslation.name : '',
            slug: currentTranslation ? currentTranslation.slug : '',
            description: currentTranslation ? currentTranslation.description : '',
            visible: !entity.isPrivate,
        });
        entity.filters.forEach(f => this.addFilter(f));
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get(['customFields']);
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = fieldDef.type === 'localeString'
                    ? currentTranslation.customFields[key]
                    : entity.customFields[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
    }
    /**
     * Given a category and the value of the form, this method creates an updated copy of the category which
     * can then be persisted to the API.
     */
    getUpdatedCollection(category, form, languageCode) {
        var _a, _b;
        const updatedCategory = createUpdatedTranslatable({
            translatable: category,
            updatedFields: form.value,
            customFieldConfig: this.customFields,
            languageCode,
            defaultTranslation: {
                languageCode,
                name: category.name || '',
                slug: category.slug || '',
                description: category.description || '',
            },
        });
        return Object.assign(Object.assign({}, updatedCategory), { assetIds: (_a = this.assetChanges.assets) === null || _a === void 0 ? void 0 : _a.map(a => a.id), featuredAssetId: (_b = this.assetChanges.featuredAsset) === null || _b === void 0 ? void 0 : _b.id, isPrivate: !form.value.visible, filters: this.mapOperationsToInputs(this.filters, this.detailForm.value.filters) });
    }
    /**
     * Maps an array of conditions or actions to the input format expected by the GraphQL API.
     */
    mapOperationsToInputs(operations, formValueOperations) {
        return operations.map((o, i) => {
            return {
                code: o.code,
                arguments: Object.values(formValueOperations[i].args).map((value, j) => ({
                    name: o.args[j].name,
                    value: encodeConfigArgValue(value),
                })),
            };
        });
    }
}
CollectionDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"collection-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"(detailForm.invalid || detailForm.pristine) && !assetsChanged()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as category\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col\">\n            <vdr-form-field [label]=\"'catalog.visibility' | translate\" for=\"visibility\">\n                <clr-toggle-wrapper>\n                    <input\n                        type=\"checkbox\"\n                        clrToggle\n                        formControlName=\"visible\"\n                        id=\"visibility\"\n                        [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    />\n                    <label class=\"visible-toggle\">\n                        <ng-container *ngIf=\"detailForm.value.visible; else private\">{{ 'catalog.public' | translate }}</ng-container>\n                        <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n                    </label>\n                </clr-toggle-wrapper>\n            </vdr-form-field>\n            <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n                <input\n                    id=\"name\"\n                    type=\"text\"\n                    formControlName=\"name\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                    (input)=\"updateSlug($event.target.value)\"\n                />\n            </vdr-form-field>\n            <vdr-form-field\n                [label]=\"'catalog.slug' | translate\"\n                for=\"slug\"\n                [errors]=\"{ pattern: ('catalog.slug-pattern-error' | translate) }\"\n            >\n                <input\n                    id=\"slug\"\n                    type=\"text\"\n                    formControlName=\"slug\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                    pattern=\"[a-z0-9_-]+\"\n                />\n            </vdr-form-field>\n            <vdr-rich-text-editor\n                formControlName=\"description\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                [label]=\"'common.description' | translate\"\n            ></vdr-rich-text-editor>\n\n            <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                <label>{{ 'common.custom-fields' | translate }}</label>\n                <ng-container *ngFor=\"let customField of customFields\">\n                    <vdr-custom-field-control\n                        *ngIf=\"customFieldIsSet(customField.name)\"\n                        entityName=\"Collection\"\n                        [customFieldsFormGroup]=\"detailForm.get(['customFields'])\"\n                        [customField]=\"customField\"\n                    ></vdr-custom-field-control>\n                </ng-container>\n            </section>\n        </div>\n        <div class=\"clr-col-md-auto\">\n            <vdr-product-assets\n                [assets]=\"category.assets\"\n                [featuredAsset]=\"category.featuredAsset\"\n                (change)=\"assetChanges = $event\"\n            ></vdr-product-assets>\n        </div>\n    </div>\n    <div class=\"clr-row\" formArrayName=\"filters\">\n        <div class=\"clr-col\">\n            <label>{{ 'catalog.filters' | translate }}</label>\n            <ng-container *ngFor=\"let filter of filters; index as i\">\n                <vdr-configurable-input\n                    (remove)=\"removeFilter($event)\"\n                    [operation]=\"filter\"\n                    [operationDefinition]=\"getFilterDefinition(filter)\"\n                    [formControlName]=\"i\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                ></vdr-configurable-input>\n            </ng-container>\n\n            <div *vdrIfPermissions=\"updatePermission\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-condition' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let filter of allFilters\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"addFilter(filter)\"\n                        >\n                            {{ filter.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\">\n            <vdr-collection-contents [collectionId]=\"id\" #collectionContents>\n                <ng-template let-count>\n                    <div class=\"contents-title\">\n                        {{ 'catalog.collection-contents' | translate }} ({{\n                            'common.results-count' | translate: { count: count }\n                        }})\n                    </div>\n                </ng-template>\n            </vdr-collection-contents>\n        </div>\n    </div>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".visible-toggle{margin-top:-3px!important}"]
            },] }
];
CollectionDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService },
    { type: ModalService }
];
CollectionDetailComponent.propDecorators = {
    contentsComponent: [{ type: ViewChild, args: ['collectionContents',] }]
};

class CollectionListComponent {
    constructor(dataService, notificationService, modalService, router, route) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.router = router;
        this.route = route;
        this.expandAll = false;
    }
    ngOnInit() {
        this.queryResult = this.dataService.collection.getCollections(1000, 0).refetchOnChannelChange();
        this.items$ = this.queryResult.mapStream(data => data.collections.items).pipe(shareReplay(1));
        this.activeCollectionId$ = this.route.paramMap.pipe(map(pm => pm.get('contents')), distinctUntilChanged());
        this.activeCollectionTitle$ = combineLatest(this.activeCollectionId$, this.items$).pipe(map(([id, collections]) => {
            if (id) {
                const match = collections.find(c => c.id === id);
                return match ? match.name : '';
            }
            return '';
        }));
    }
    ngOnDestroy() {
        this.queryResult.completed$.next();
    }
    onRearrange(event) {
        this.dataService.collection.moveCollection([event]).subscribe({
            next: () => {
                this.notificationService.success(marker('common.notify-saved-changes'));
                this.refresh();
            },
            error: err => {
                this.notificationService.error(marker('common.notify-save-changes-error'));
            },
        });
    }
    deleteCollection(id) {
        this.items$
            .pipe(take(1), map(items => -1 < items.findIndex(i => i.parent && i.parent.id === id)), switchMap(hasChildren => {
            return this.modalService.dialog({
                title: marker('catalog.confirm-delete-collection'),
                body: hasChildren
                    ? marker('catalog.confirm-delete-collection-and-children-body')
                    : undefined,
                buttons: [
                    { type: 'secondary', label: marker('common.cancel') },
                    { type: 'danger', label: marker('common.delete'), returnValue: true },
                ],
            });
        }), switchMap(response => (response ? this.dataService.collection.deleteCollection(id) : EMPTY)))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Collection',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Collection',
            });
        });
    }
    closeContents() {
        const params = Object.assign({}, this.route.snapshot.params);
        delete params.contents;
        this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
    refresh() {
        this.queryResult.ref.refetch();
    }
}
CollectionListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <clr-checkbox-wrapper class=\"expand-all-toggle ml3\">\n            <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"expandAll\" />\n            <label>{{ 'catalog.expand-all-collections' | translate }}</label>\n        </clr-checkbox-wrapper>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"collection-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" *vdrIfPermissions=\"['CreateCatalog', 'CreateCollection']\" [routerLink]=\"['./create']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-collection' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"collection-wrapper\">\n    <vdr-collection-tree\n        [collections]=\"items$ | async\"\n        [activeCollectionId]=\"activeCollectionId$ | async\"\n        [expandAll]=\"expandAll\"\n        (rearrange)=\"onRearrange($event)\"\n        (deleteCollection)=\"deleteCollection($event)\"\n    ></vdr-collection-tree>\n\n    <div class=\"collection-contents\" [class.expanded]=\"activeCollectionId$ | async\">\n        <vdr-collection-contents [collectionId]=\"activeCollectionId$ | async\">\n            <ng-template let-count>\n                <div class=\"collection-title\">\n                    {{ activeCollectionTitle$ | async }} ({{\n                        'common.results-count' | translate: { count: count }\n                    }})\n                </div>\n                <button type=\"button\" class=\"close-button\" (click)=\"closeContents()\">\n                    <clr-icon shape=\"close\"></clr-icon>\n                </button>\n            </ng-template>\n        </vdr-collection-contents>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:flex;flex-direction:column}.expand-all-toggle{display:block;margin-top:14px}.collection-wrapper{display:flex;height:calc(100% - 50px)}.collection-wrapper vdr-collection-tree{flex:1;height:100%;overflow:auto}.collection-wrapper .collection-contents{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.collection-wrapper .collection-contents.expanded{width:30vw;visibility:visible;opacity:1;padding-left:12px}.collection-wrapper .collection-contents .close-button{margin:0;background:none;border:none;cursor:pointer}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}"]
            },] }
];
CollectionListComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: Router },
    { type: ActivatedRoute }
];

class FacetDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService, modalService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.updatePermission = [Permission.UpdateCatalog, Permission.UpdateFacet];
        this.customFields = this.getCustomFieldConfig('Facet');
        this.customValueFields = this.getCustomFieldConfig('FacetValue');
        this.detailForm = this.formBuilder.group({
            facet: this.formBuilder.group({
                code: ['', Validators.required],
                name: '',
                visible: true,
                customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
            }),
            values: this.formBuilder.array([]),
        });
    }
    ngOnInit() {
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    updateCode(currentCode, nameValue) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['facet', 'code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    updateValueCode(currentCode, nameValue, index) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['values', index, 'code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['facet', 'customFields', name]);
    }
    customValueFieldIsSet(index, name) {
        return !!this.detailForm.get(['values', index, 'customFields', name]);
    }
    getValuesFormArray() {
        return this.detailForm.get('values');
    }
    addFacetValue() {
        const valuesFormArray = this.detailForm.get('values');
        if (valuesFormArray) {
            valuesFormArray.insert(valuesFormArray.length, this.formBuilder.group({
                id: '',
                name: ['', Validators.required],
                code: '',
            }));
            this.values.push({ name: '', code: '' });
        }
    }
    create() {
        const facetForm = this.detailForm.get('facet');
        if (!facetForm || !facetForm.dirty) {
            return;
        }
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1), mergeMap(([facet, languageCode]) => {
            const newFacet = this.getUpdatedFacet(facet, facetForm, languageCode);
            return this.dataService.facet.createFacet(newFacet);
        }), switchMap(data => this.dataService.facet.getAllFacets().single$.pipe(mapTo(data))))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-create-success'), { entity: 'Facet' });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createFacet.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'Facet',
            });
        });
    }
    save() {
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1), mergeMap(([facet, languageCode]) => {
            const facetGroup = this.detailForm.get('facet');
            const updateOperations = [];
            if (facetGroup && facetGroup.dirty) {
                const newFacet = this.getUpdatedFacet(facet, facetGroup, languageCode);
                if (newFacet) {
                    updateOperations.push(this.dataService.facet.updateFacet(newFacet));
                }
            }
            const valuesArray = this.detailForm.get('values');
            if (valuesArray && valuesArray.dirty) {
                const newValues = valuesArray.controls
                    .filter(c => !c.value.id)
                    .map(c => ({
                    facetId: facet.id,
                    code: c.value.code,
                    translations: [{ name: c.value.name, languageCode }],
                }));
                if (newValues.length) {
                    updateOperations.push(this.dataService.facet
                        .createFacetValues(newValues)
                        .pipe(switchMap(() => this.dataService.facet.getFacet(this.id).single$)));
                }
                const updatedValues = this.getUpdatedFacetValues(facet, valuesArray, languageCode);
                if (updatedValues.length) {
                    updateOperations.push(this.dataService.facet.updateFacetValues(updatedValues));
                }
            }
            return forkJoin(updateOperations);
        }), switchMap(() => this.dataService.facet.getAllFacets().single$))
            .subscribe(() => {
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.notificationService.success(marker('common.notify-update-success'), { entity: 'Facet' });
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Facet',
            });
        });
    }
    deleteFacetValue(facetValueId, index) {
        if (!facetValueId) {
            // deleting a newly-added (not persisted) FacetValue
            const valuesFormArray = this.detailForm.get('values');
            if (valuesFormArray) {
                valuesFormArray.removeAt(index);
            }
            this.values.splice(index, 1);
            return;
        }
        this.showModalAndDelete(facetValueId)
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(facetValueId, response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }), switchMap(deleted => (deleted ? this.dataService.facet.getFacet(this.id).single$ : [])))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'FacetValue',
            });
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'FacetValue',
            });
        });
    }
    showModalAndDelete(facetValueId, message) {
        return this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-facet-value'),
            body: message,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(result => result ? this.dataService.facet.deleteFacetValues([facetValueId], !!message) : EMPTY), map(result => result.deleteFacetValues[0]));
    }
    /**
     * Sets the values of the form on changes to the facet or current language.
     */
    setFormValues(facet, languageCode) {
        var _a;
        const currentTranslation = findTranslation(facet, languageCode);
        this.detailForm.patchValue({
            facet: {
                code: facet.code,
                visible: !facet.isPrivate,
                name: (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '',
            },
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get(['facet', 'customFields']);
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = fieldDef.type === 'localeString'
                    ? currentTranslation.customFields[key]
                    : facet.customFields[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
        const currentValuesFormArray = this.detailForm.get('values');
        this.values = [...facet.values];
        facet.values.forEach((value, i) => {
            const valueTranslation = findTranslation(value, languageCode);
            const group = {
                id: value.id,
                code: value.code,
                name: valueTranslation ? valueTranslation.name : '',
            };
            const valueControl = currentValuesFormArray.at(i);
            if (valueControl) {
                valueControl.setValue(group);
            }
            else {
                currentValuesFormArray.insert(i, this.formBuilder.group(group));
            }
            if (this.customValueFields.length) {
                let customValueFieldsGroup = this.detailForm.get(['values', i, 'customFields']);
                if (!customValueFieldsGroup) {
                    customValueFieldsGroup = new FormGroup({});
                    this.detailForm.get(['values', i]).addControl('customFields', customValueFieldsGroup);
                }
                if (customValueFieldsGroup) {
                    for (const fieldDef of this.customValueFields) {
                        const key = fieldDef.name;
                        const fieldValue = fieldDef.type === 'localeString'
                            ? valueTranslation.customFields[key]
                            : value.customFields[key];
                        const control = customValueFieldsGroup.get(key);
                        if (control) {
                            control.setValue(fieldValue);
                        }
                        else {
                            customValueFieldsGroup.addControl(key, new FormControl(fieldValue));
                        }
                    }
                }
            }
        });
    }
    /**
     * Given a facet and the value of the detailForm, this method creates an updated copy of the facet which
     * can then be persisted to the API.
     */
    getUpdatedFacet(facet, facetFormGroup, languageCode) {
        const input = createUpdatedTranslatable({
            translatable: facet,
            updatedFields: facetFormGroup.value,
            customFieldConfig: this.customFields,
            languageCode,
            defaultTranslation: {
                languageCode,
                name: facet.name || '',
            },
        });
        input.isPrivate = !facetFormGroup.value.visible;
        return input;
    }
    /**
     * Given an array of facet values and the values from the detailForm, this method creates an new array
     * which can be persisted to the API.
     */
    getUpdatedFacetValues(facet, valuesFormArray, languageCode) {
        const dirtyValues = facet.values.filter((v, i) => {
            const formRow = valuesFormArray.get(i.toString());
            return formRow && formRow.dirty && formRow.value.id;
        });
        const dirtyValueValues = valuesFormArray.controls
            .filter(c => c.dirty && c.value.id)
            .map(c => c.value);
        if (dirtyValues.length !== dirtyValueValues.length) {
            throw new Error(marker(`error.facet-value-form-values-do-not-match`));
        }
        return dirtyValues
            .map((value, i) => {
            return createUpdatedTranslatable({
                translatable: value,
                updatedFields: dirtyValueValues[i],
                customFieldConfig: this.customValueFields,
                languageCode,
                defaultTranslation: {
                    languageCode,
                    name: '',
                },
            });
        })
            .filter(notNullOrUndefined);
    }
}
FacetDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as facet\">\n    <section class=\"form-block\" formGroupName=\"facet\">\n        <vdr-form-field [label]=\"'catalog.visibility' | translate\" for=\"visibility\">\n            <clr-toggle-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrToggle\n                    [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    formControlName=\"visible\"\n                    id=\"visibility\"\n                />\n                <label class=\"visible-toggle\">\n                    <ng-container *ngIf=\"detailForm.value.facet.visible; else private\">{{ 'catalog.public' | translate }}</ng-container>\n                    <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n                </label>\n            </clr-toggle-wrapper>\n        </vdr-form-field>\n        <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n            <input\n                id=\"name\"\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (input)=\"updateCode(facet.code, $event.target.value)\"\n            />\n        </vdr-form-field>\n        <vdr-form-field\n            [label]=\"'common.code' | translate\"\n            for=\"code\"\n            [readOnlyToggle]=\"updatePermission | hasPermission\"\n        >\n            <input\n                id=\"code\"\n                type=\"text\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"code\"\n            />\n        </vdr-form-field>\n\n        <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n            <label>{{ 'common.custom-fields' | translate }}</label>\n            <ng-container *ngFor=\"let customField of customFields\">\n                <vdr-custom-field-control\n                    *ngIf=\"customFieldIsSet(customField.name)\"\n                    entityName=\"Facet\"\n                    [customFieldsFormGroup]=\"detailForm.get(['facet', 'customFields'])\"\n                    [customField]=\"customField\"\n                ></vdr-custom-field-control>\n            </ng-container>\n        </section>\n    </section>\n\n    <section class=\"form-block\" *ngIf=\"!(isNew$ | async)\">\n        <label>{{ 'catalog.facet-values' | translate }}</label>\n\n        <table class=\"facet-values-list table\" formArrayName=\"values\" *ngIf=\"0 < getValuesFormArray().length\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'common.name' | translate }}</th>\n                    <th>{{ 'common.code' | translate }}</th>\n                    <ng-container *ngFor=\"let customField of customValueFields\">\n                        <th>{{ customField.name }}</th>\n                    </ng-container>\n                    <th></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr\n                    class=\"facet-value\"\n                    *ngFor=\"let value of values; let i = index\"\n                    [formGroupName]=\"i\"\n                >\n                    <td class=\"align-middle\">\n                        <vdr-entity-info [entity]=\"value\"></vdr-entity-info>\n                    </td>\n                    <td class=\"align-middle\">\n                        <input\n                            type=\"text\"\n                            formControlName=\"name\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            (input)=\"updateValueCode(facet.values[i]?.code, $event.target.value, i)\"\n                        />\n                    </td>\n                    <td class=\"align-middle\"><input type=\"text\" formControlName=\"code\" readonly /></td>\n                    <ng-container *ngFor=\"let customField of customValueFields\">\n                        <td class=\"align-middle\">\n                            <vdr-custom-field-control\n                                *ngIf=\"customValueFieldIsSet(i, customField.name)\"\n                                entityName=\"FacetValue\"\n                                [showLabel]=\"false\"\n                                [customFieldsFormGroup]=\"detailForm.get(['values', i, 'customFields'])\"\n                                [customField]=\"customField\"\n                            ></vdr-custom-field-control>\n                        </td>\n                    </ng-container>\n                    <td class=\"align-middle\">\n                        <vdr-dropdown>\n                            <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                                {{ 'common.actions' | translate }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    type=\"button\"\n                                    class=\"delete-button\"\n                                    (click)=\"deleteFacetValue(facet.values[i]?.id, i)\"\n                                    [disabled]=\"!(updatePermission | hasPermission)\"\n                                    vdrDropdownItem\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'common.delete' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div>\n            <button\n                type=\"button\"\n                class=\"btn btn-secondary\"\n                *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n                (click)=\"addFacetValue()\"\n            >\n                <clr-icon shape=\"add\"></clr-icon>\n                {{ 'catalog.add-facet-value' | translate }}\n            </button>\n        </div>\n    </section>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".visible-toggle{margin-top:-3px!important}"]
            },] }
];
FacetDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService },
    { type: ModalService }
];

class FacetListComponent extends BaseListComponent {
    constructor(dataService, modalService, notificationService, router, route) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.initialLimit = 3;
        this.displayLimit = {};
        super.setQueryFn((...args) => this.dataService.facet.getFacets(...args).refetchOnChannelChange(), data => data.facets);
    }
    toggleDisplayLimit(facet) {
        if (this.displayLimit[facet.id] === facet.values.length) {
            this.displayLimit[facet.id] = this.initialLimit;
        }
        else {
            this.displayLimit[facet.id] = facet.values.length;
        }
    }
    deleteFacet(facetValueId) {
        this.showModalAndDelete(facetValueId)
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(facetValueId, response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }), 
        // Refresh the cached facets to reflect the changes
        switchMap(() => this.dataService.facet.getAllFacets().single$))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'FacetValue',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'FacetValue',
            });
        });
    }
    showModalAndDelete(facetId, message) {
        return this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-facet'),
            body: message,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.facet.deleteFacet(facetId, !!message) : EMPTY)), map(res => res.deleteFacet));
    }
}
FacetListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\"\n           *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n           [routerLink]=\"['./create']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-facet' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'catalog.values' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'catalog.visibility' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-facet=\"item\">\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">{{ facet.code }}</td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">{{ facet.name }}</td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-facet-value-chip\n                *ngFor=\"let value of facet.values | slice: 0:displayLimit[facet.id] || 3\"\n                [facetValue]=\"value\"\n                [removable]=\"false\"\n                [displayFacetName]=\"false\"\n            ></vdr-facet-value-chip>\n            <button\n                class=\"btn btn-sm btn-secondary btn-icon\"\n                *ngIf=\"facet.values.length > initialLimit\"\n                (click)=\"toggleDisplayLimit(facet)\"\n            >\n                <ng-container *ngIf=\"(displayLimit[facet.id] || 0) < facet.values.length; else collapse\">\n                    <clr-icon shape=\"plus\"></clr-icon>\n                    {{ facet.values.length - initialLimit }}\n                </ng-container>\n                <ng-template #collapse>\n                    <clr-icon shape=\"minus\"></clr-icon>\n                </ng-template>\n            </button>\n        </td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-chip>\n                <ng-container *ngIf=\"!facet.isPrivate; else private\">{{ 'catalog.public' | translate }}</ng-container>\n                <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n            </vdr-chip>\n        </td>\n        <td class=\"right align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', facet.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteFacet(facet.id)\"\n                        [disabled]=\"!(['DeleteCatalog', 'DeleteFacet'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: ["td.private{background-color:var(--color-component-bg-200)}"]
            },] }
];
FacetListComponent.ctorParameters = () => [
    { type: DataService },
    { type: ModalService },
    { type: NotificationService },
    { type: Router },
    { type: ActivatedRoute }
];

/**
 * @description
 * Like String.prototype.replace(), but replaces the last instance
 * rather than the first.
 */
function replaceLast(target, search, replace) {
    if (!target) {
        return '';
    }
    const lastIndex = target.lastIndexOf(search);
    if (lastIndex === -1) {
        return target;
    }
    const head = target.substr(0, lastIndex);
    const tail = target.substr(lastIndex).replace(search, replace);
    return head + tail;
}

/**
 * Handles the logic for making the API calls to perform CRUD operations on a Product and its related
 * entities. This logic was extracted out of the component because it became too large and hard to follow.
 */
class ProductDetailService {
    constructor(dataService) {
        this.dataService = dataService;
    }
    getFacets() {
        return this.dataService.facet.getAllFacets().mapSingle(data => data.facets.items);
    }
    getTaxCategories() {
        return this.dataService.settings
            .getTaxCategories()
            .mapSingle(data => data.taxCategories)
            .pipe(shareReplay(1));
    }
    createProductWithVariants(input, createVariantsConfig, languageCode) {
        const createProduct$ = this.dataService.product.createProduct(input);
        const nonEmptyOptionGroups = createVariantsConfig.groups.filter(g => 0 < g.values.length);
        const createOptionGroups$ = this.createProductOptionGroups(nonEmptyOptionGroups, languageCode);
        return forkJoin(createProduct$, createOptionGroups$).pipe(mergeMap(([{ createProduct }, optionGroups]) => {
            const addOptionsToProduct$ = optionGroups.length
                ? forkJoin(optionGroups.map(optionGroup => {
                    return this.dataService.product.addOptionGroupToProduct({
                        productId: createProduct.id,
                        optionGroupId: optionGroup.id,
                    });
                }))
                : of([]);
            return addOptionsToProduct$.pipe(map(() => {
                return { createProduct, optionGroups };
            }));
        }), mergeMap(({ createProduct, optionGroups }) => {
            const variants = createVariantsConfig.variants.map(v => {
                const optionIds = optionGroups.length
                    ? v.optionValues.map((optionName, index) => {
                        const option = optionGroups[index].options.find(o => o.name === optionName);
                        if (!option) {
                            throw new Error(`Could not find a matching ProductOption "${optionName}" when creating variant`);
                        }
                        return option.id;
                    })
                    : [];
                return Object.assign(Object.assign({}, v), { optionIds });
            });
            const options = optionGroups.map(og => og.options).reduce((flat, o) => [...flat, ...o], []);
            return this.createProductVariants(createProduct, variants, options, languageCode);
        }));
    }
    createProductOptionGroups(groups, languageCode) {
        return groups.length
            ? forkJoin(groups.map(c => {
                return this.dataService.product
                    .createProductOptionGroups({
                    code: normalizeString(c.name, '-'),
                    translations: [{ languageCode, name: c.name }],
                    options: c.values.map(v => ({
                        code: normalizeString(v, '-'),
                        translations: [{ languageCode, name: v }],
                    })),
                })
                    .pipe(map(data => data.createProductOptionGroup));
            }))
            : of([]);
    }
    createProductVariants(product, variantData, options, languageCode) {
        const variants = variantData.map(v => {
            const name = options.length
                ? `${product.name} ${v.optionIds
                    .map(id => options.find(o => o.id === id))
                    .filter(notNullOrUndefined)
                    .map(o => o.name)
                    .join(' ')}`
                : product.name;
            return {
                productId: product.id,
                price: v.price,
                sku: v.sku,
                stockOnHand: v.stock,
                translations: [
                    {
                        languageCode,
                        name,
                    },
                ],
                optionIds: v.optionIds,
            };
        });
        return this.dataService.product.createProductVariants(variants).pipe(map(({ createProductVariants }) => ({
            createProductVariants,
            productId: product.id,
        })));
    }
    updateProduct(updateOptions) {
        var _a, _b, _c;
        const { product, languageCode, autoUpdate, productInput, variantsInput } = updateOptions;
        const updateOperations = [];
        const updateVariantsInput = variantsInput || [];
        if (productInput) {
            updateOperations.push(this.dataService.product.updateProduct(productInput));
            const productOldName = (_a = findTranslation(product, languageCode)) === null || _a === void 0 ? void 0 : _a.name;
            const productNewName = (_b = findTranslation(productInput, languageCode)) === null || _b === void 0 ? void 0 : _b.name;
            if (productOldName && productNewName && autoUpdate) {
                for (const variant of product.variants) {
                    const currentVariantName = ((_c = findTranslation(variant, languageCode)) === null || _c === void 0 ? void 0 : _c.name) || '';
                    let variantInput;
                    const existingVariantInput = updateVariantsInput.find(i => i.id === variant.id);
                    if (existingVariantInput) {
                        variantInput = existingVariantInput;
                    }
                    else {
                        variantInput = {
                            id: variant.id,
                            translations: [{ languageCode, name: currentVariantName }],
                        };
                        updateVariantsInput.push(variantInput);
                    }
                    const variantTranslation = findTranslation(variantInput, languageCode);
                    if (variantTranslation) {
                        variantTranslation.name = replaceLast(variantTranslation.name, productOldName, productNewName);
                    }
                }
            }
        }
        if (updateVariantsInput.length) {
            updateOperations.push(this.dataService.product.updateProductVariants(updateVariantsInput));
        }
        return forkJoin(updateOperations);
    }
    updateProductOption(input, product, languageCode) {
        var _a, _b, _c;
        let updateProductVariantNames$ = of([]);
        if (input.autoUpdate) {
            // Update any ProductVariants' names which include the option name
            let oldOptionName;
            const newOptionName = (_a = findTranslation(input, languageCode)) === null || _a === void 0 ? void 0 : _a.name;
            if (!newOptionName) {
                updateProductVariantNames$ = of([]);
            }
            const variantsToUpdate = [];
            for (const variant of product.variants) {
                if (variant.options.map(o => o.id).includes(input.id)) {
                    if (!oldOptionName) {
                        oldOptionName = (_b = findTranslation(variant.options.find(o => o.id === input.id), languageCode)) === null || _b === void 0 ? void 0 : _b.name;
                    }
                    const variantName = ((_c = findTranslation(variant, languageCode)) === null || _c === void 0 ? void 0 : _c.name) || '';
                    if (oldOptionName && newOptionName && variantName.includes(oldOptionName)) {
                        variantsToUpdate.push({
                            id: variant.id,
                            translations: [
                                {
                                    languageCode,
                                    name: replaceLast(variantName, oldOptionName, newOptionName),
                                },
                            ],
                        });
                    }
                }
            }
            if (variantsToUpdate.length) {
                updateProductVariantNames$ = this.dataService.product.updateProductVariants(variantsToUpdate);
            }
        }
        return this.dataService.product
            .updateProductOption(input)
            .pipe(mergeMap(() => updateProductVariantNames$));
    }
    deleteProductVariant(id, productId) {
        return this.dataService.product.deleteProductVariant(id).pipe(switchMap(result => {
            if (result.deleteProductVariant.result === DeletionResult.DELETED) {
                return this.dataService.product.getProduct(productId).single$;
            }
            else {
                return throwError(result.deleteProductVariant.message);
            }
        }));
    }
}
ProductDetailService.ɵprov = ɵɵdefineInjectable({ factory: function ProductDetailService_Factory() { return new ProductDetailService(ɵɵinject(DataService)); }, token: ProductDetailService, providedIn: "root" });
ProductDetailService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProductDetailService.ctorParameters = () => [
    { type: DataService }
];

class ApplyFacetDialogComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.selectedValues = [];
    }
    ngAfterViewInit() {
        setTimeout(() => this.selector.focus(), 0);
    }
    selectValues() {
        this.resolveWith(this.selectedValues);
    }
    cancel() {
        this.resolveWith();
    }
}
ApplyFacetDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-apply-facet-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'catalog.add-facets' | translate }}</ng-template>\n\n<vdr-facet-value-selector\n    [facets]=\"facets\"\n    (selectedValuesChange)=\"selectedValues = $event\"\n></vdr-facet-value-selector>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"selectValues()\"\n        [disabled]=\"selectedValues.length === 0\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.add-facets' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ApplyFacetDialogComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
ApplyFacetDialogComponent.propDecorators = {
    selector: [{ type: ViewChild, args: [FacetValueSelectorComponent,] }]
};

class AssignProductsToChannelDialogComponent {
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.priceFactorControl = new FormControl(1);
        this.selectedChannelIdControl = new FormControl();
    }
    get isProductVariantMode() {
        return this.productVariantIds != null;
    }
    ngOnInit() {
        const activeChannelId$ = this.dataService.client
            .userStatus()
            .mapSingle(({ userStatus }) => userStatus.activeChannelId);
        const allChannels$ = this.dataService.settings.getChannels().mapSingle(data => data.channels);
        combineLatest(activeChannelId$, allChannels$).subscribe(([activeChannelId, channels]) => {
            // tslint:disable-next-line:no-non-null-assertion
            this.currentChannel = channels.find(c => c.id === activeChannelId);
            this.availableChannels = channels;
        });
        this.selectedChannelIdControl.valueChanges.subscribe(ids => {
            this.selectChannel(ids);
        });
        this.variantsPreview$ = combineLatest(from(this.getTopVariants(10)), this.priceFactorControl.valueChanges.pipe(startWith(1))).pipe(map(([variants, factor]) => {
            return variants.map(v => ({
                id: v.id,
                name: v.name,
                price: v.price,
                pricePreview: v.price * +factor,
            }));
        }));
    }
    selectChannel(channelIds) {
        this.selectedChannel = this.availableChannels.find(c => c.id === channelIds[0]);
    }
    assign() {
        const selectedChannel = this.selectedChannel;
        if (selectedChannel) {
            if (!this.isProductVariantMode) {
                this.dataService.product
                    .assignProductsToChannel({
                    channelId: selectedChannel.id,
                    productIds: this.productIds,
                    priceFactor: +this.priceFactorControl.value,
                })
                    .subscribe(() => {
                    this.notificationService.success(marker('catalog.assign-product-to-channel-success'), {
                        channel: selectedChannel.code,
                    });
                    this.resolveWith(true);
                });
            }
            else if (this.productVariantIds) {
                this.dataService.product
                    .assignVariantsToChannel({
                    channelId: selectedChannel.id,
                    productVariantIds: this.productVariantIds,
                    priceFactor: +this.priceFactorControl.value,
                })
                    .subscribe(() => {
                    this.notificationService.success(marker('catalog.assign-variant-to-channel-success'), {
                        channel: selectedChannel.code,
                    });
                    this.resolveWith(true);
                });
            }
        }
    }
    cancel() {
        this.resolveWith();
    }
    getTopVariants(take) {
        return __awaiter(this, void 0, void 0, function* () {
            const variants = [];
            for (let i = 0; i < this.productIds.length && variants.length < take; i++) {
                const productVariants = yield this.dataService.product
                    .getProduct(this.productIds[i])
                    .mapSingle(({ product }) => {
                    const _variants = product ? product.variants : [];
                    return _variants.filter(v => { var _a; return this.isProductVariantMode ? (_a = this.productVariantIds) === null || _a === void 0 ? void 0 : _a.includes(v.id) : true; });
                })
                    .toPromise();
                variants.push(...(productVariants || []));
            }
            return variants.slice(0, take);
        });
    }
}
AssignProductsToChannelDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-assign-products-to-channel-dialog',
                template: "<ng-template vdrDialogTitle>\n    <ng-container *ngIf=\"isProductVariantMode; else productModeTitle\">{{\n        'catalog.assign-variants-to-channel' | translate\n    }}</ng-container>\n    <ng-template #productModeTitle>{{ 'catalog.assign-products-to-channel' | translate }}</ng-template>\n</ng-template>\n\n<div class=\"flex\">\n    <clr-input-container>\n        <label>{{ 'common.channel' | translate }}</label>\n        <vdr-channel-assignment-control\n            clrInput\n            [multiple]=\"false\"\n            [includeDefaultChannel]=\"false\"\n            [disableChannelIds]=\"currentChannelIds\"\n            [formControl]=\"selectedChannelIdControl\"\n        ></vdr-channel-assignment-control>\n    </clr-input-container>\n    <div class=\"flex-spacer\"></div>\n    <clr-input-container>\n        <label>{{ 'catalog.price-conversion-factor' | translate }}</label>\n        <input clrInput type=\"number\" min=\"0\" max=\"99999\" [formControl]=\"priceFactorControl\" />\n    </clr-input-container>\n</div>\n\n<div class=\"channel-price-preview\">\n    <label class=\"clr-control-label\">{{ 'catalog.channel-price-preview' | translate }}</label>\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th>{{ 'common.name' | translate }}</th>\n                <th>\n                    {{\n                        'catalog.price-in-channel'\n                            | translate: { channel: currentChannel?.code | channelCodeToLabel | translate }\n                    }}\n                </th>\n                <th>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n                        {{ 'catalog.price-in-channel' | translate: { channel: selectedChannel?.code } }}\n                    </ng-template>\n                    <ng-template #noSelection>\n                        {{ 'catalog.no-channel-selected' | translate }}\n                    </ng-template>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let row of variantsPreview$ | async\">\n                <td>{{ row.name }}</td>\n                <td>{{ row.price | localeCurrency: currentChannel?.currencyCode }}</td>\n                <td>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noChannelSelected\">\n                        {{ row.pricePreview | localeCurrency: selectedChannel?.currencyCode }}\n                    </ng-template>\n                    <ng-template #noChannelSelected> - </ng-template>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"assign()\" [disabled]=\"!selectedChannel\" class=\"btn btn-primary\">\n        <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n            {{ 'catalog.assign-to-named-channel' | translate: { channelCode: selectedChannel?.code } }}\n        </ng-template>\n        <ng-template #noSelection>\n            {{ 'catalog.no-channel-selected' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["vdr-channel-assignment-control{min-width:200px}.channel-price-preview{margin-top:24px}.channel-price-preview table.table{margin-top:6px}"]
            },] }
];
AssignProductsToChannelDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];

class ProductDetailComponent extends BaseDetailComponent {
    constructor(route, router, serverConfigService, productDetailService, formBuilder, modalService, notificationService, dataService, location, changeDetector) {
        super(route, router, serverConfigService, dataService);
        this.productDetailService = productDetailService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.dataService = dataService;
        this.location = location;
        this.changeDetector = changeDetector;
        this.filterInput = new FormControl('');
        this.assetChanges = {};
        this.variantAssetChanges = {};
        this.selectedVariantIds = [];
        this.variantDisplayMode = 'card';
        this.createVariantsConfig = { groups: [], variants: [] };
        this.customFields = this.getCustomFieldConfig('Product');
        this.customVariantFields = this.getCustomFieldConfig('ProductVariant');
        this.customOptionGroupFields = this.getCustomFieldConfig('ProductOptionGroup');
        this.customOptionFields = this.getCustomFieldConfig('ProductOption');
        this.detailForm = this.formBuilder.group({
            product: this.formBuilder.group({
                enabled: true,
                name: ['', Validators.required],
                autoUpdateVariantNames: true,
                slug: '',
                description: '',
                facetValueIds: [[]],
                customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
            }),
            variants: this.formBuilder.array([]),
        });
    }
    ngOnInit() {
        this.init();
        this.product$ = this.entity$;
        const variants$ = this.product$.pipe(map(product => product.variants));
        const filterTerm$ = this.filterInput.valueChanges.pipe(startWith(''), debounceTime(50), shareReplay());
        this.variants$ = combineLatest(variants$, filterTerm$).pipe(map(([variants, term]) => {
            return term
                ? variants.filter(v => {
                    const lcTerm = term.toLocaleLowerCase();
                    return (v.name.toLocaleLowerCase().includes(term) ||
                        v.sku.toLocaleLowerCase().includes(term));
                })
                : variants;
        }));
        this.taxCategories$ = this.productDetailService.getTaxCategories().pipe(takeUntil(this.destroy$));
        this.activeTab$ = this.route.paramMap.pipe(map(qpm => qpm.get('tab')));
        // FacetValues are provided initially by the nested array of the
        // Product entity, but once a fetch to get all Facets is made (as when
        // opening the FacetValue selector modal), then these additional values
        // are concatenated onto the initial array.
        this.facets$ = this.productDetailService.getFacets();
        const productFacetValues$ = this.product$.pipe(map(product => product.facetValues));
        const allFacetValues$ = this.facets$.pipe(map(flattenFacetValues));
        const productGroup = this.getProductFormGroup();
        const formFacetValueIdChanges$ = productGroup.valueChanges.pipe(map(val => val.facetValueIds), distinctUntilChanged());
        const formChangeFacetValues$ = combineLatest(formFacetValueIdChanges$, productFacetValues$, allFacetValues$).pipe(map(([ids, productFacetValues, allFacetValues]) => {
            const combined = [...productFacetValues, ...allFacetValues];
            return ids.map(id => combined.find(fv => fv.id === id)).filter(notNullOrUndefined);
        }));
        this.facetValues$ = merge(productFacetValues$, formChangeFacetValues$);
        this.productChannels$ = this.product$.pipe(map(p => p.channels));
        this.channelPriceIncludesTax$ = this.dataService.settings
            .getActiveChannel('cache-first')
            .refetchOnChannelChange()
            .mapStream(data => data.activeChannel.pricesIncludeTax)
            .pipe(shareReplay(1));
    }
    ngOnDestroy() {
        this.destroy();
    }
    navigateToTab(tabName) {
        this.location.replaceState(this.router
            .createUrlTree(['./', Object.assign(Object.assign({}, this.route.snapshot.params), { tab: tabName })], {
            queryParamsHandling: 'merge',
            relativeTo: this.route,
        })
            .toString());
    }
    isDefaultChannel(channelCode) {
        return channelCode === DEFAULT_CHANNEL_CODE;
    }
    assignToChannel() {
        this.productChannels$
            .pipe(take(1), switchMap(channels => {
            return this.modalService.fromComponent(AssignProductsToChannelDialogComponent, {
                size: 'lg',
                locals: {
                    productIds: [this.id],
                    currentChannelIds: channels.map(c => c.id),
                },
            });
        }))
            .subscribe();
    }
    removeFromChannel(channelId) {
        this.modalService
            .dialog({
            title: marker('catalog.remove-product-from-channel'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('catalog.remove-from-channel'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response
            ? this.dataService.product.removeProductsFromChannel({
                channelId,
                productIds: [this.id],
            })
            : EMPTY))
            .subscribe(() => {
            this.notificationService.success(marker('catalog.notify-remove-product-from-channel-success'));
        }, err => {
            this.notificationService.error(marker('catalog.notify-remove-product-from-channel-error'));
        });
    }
    assignVariantToChannel(variant) {
        return this.modalService
            .fromComponent(AssignProductsToChannelDialogComponent, {
            size: 'lg',
            locals: {
                productIds: [this.id],
                productVariantIds: [variant.id],
                currentChannelIds: variant.channels.map(c => c.id),
            },
        })
            .subscribe();
    }
    removeVariantFromChannel({ channelId, variant, }) {
        this.modalService
            .dialog({
            title: marker('catalog.remove-product-variant-from-channel'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('catalog.remove-from-channel'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response
            ? this.dataService.product.removeVariantsFromChannel({
                channelId,
                productVariantIds: [variant.id],
            })
            : EMPTY))
            .subscribe(() => {
            this.notificationService.success(marker('catalog.notify-remove-variant-from-channel-success'));
        }, err => {
            this.notificationService.error(marker('catalog.notify-remove-variant-from-channel-error'));
        });
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['product', 'customFields', name]);
    }
    assetsChanged() {
        return !!Object.values(this.assetChanges).length;
    }
    variantAssetsChanged() {
        return !!Object.keys(this.variantAssetChanges).length;
    }
    variantAssetChange(event) {
        this.variantAssetChanges[event.variantId] = event;
    }
    /**
     * If creating a new product, automatically generate the slug based on the product name.
     */
    updateSlug(nameValue) {
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1))
            .subscribe(([entity, languageCode]) => {
            const slugControl = this.detailForm.get(['product', 'slug']);
            const currentTranslation = findTranslation(entity, languageCode);
            const currentSlugIsEmpty = !currentTranslation || !currentTranslation.slug;
            if (slugControl && slugControl.pristine && currentSlugIsEmpty) {
                slugControl.setValue(normalizeString(`${nameValue}`, '-'));
            }
        });
    }
    selectProductFacetValue() {
        this.displayFacetValueModal().subscribe(facetValueIds => {
            if (facetValueIds) {
                const productGroup = this.getProductFormGroup();
                const currentFacetValueIds = productGroup.value.facetValueIds;
                productGroup.patchValue({
                    facetValueIds: unique([...currentFacetValueIds, ...facetValueIds]),
                });
                productGroup.markAsDirty();
            }
        });
    }
    updateProductOption(input) {
        combineLatest(this.product$, this.languageCode$)
            .pipe(take(1), mergeMap(([product, languageCode]) => this.productDetailService.updateProductOption(input, product, languageCode)))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'ProductOption',
            });
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'ProductOption',
            });
        });
    }
    removeProductFacetValue(facetValueId) {
        const productGroup = this.getProductFormGroup();
        const currentFacetValueIds = productGroup.value.facetValueIds;
        productGroup.patchValue({
            facetValueIds: currentFacetValueIds.filter(id => id !== facetValueId),
        });
        productGroup.markAsDirty();
    }
    /**
     * Opens a dialog to select FacetValues to apply to the select ProductVariants.
     */
    selectVariantFacetValue(selectedVariantIds) {
        this.displayFacetValueModal()
            .pipe(withLatestFrom(this.variants$))
            .subscribe(([facetValueIds, variants]) => {
            if (facetValueIds) {
                for (const variantId of selectedVariantIds) {
                    const index = variants.findIndex(v => v.id === variantId);
                    const variant = variants[index];
                    const existingFacetValueIds = variant ? variant.facetValues.map(fv => fv.id) : [];
                    const variantFormGroup = this.detailForm.get(['variants', index]);
                    if (variantFormGroup) {
                        variantFormGroup.patchValue({
                            facetValueIds: unique([...existingFacetValueIds, ...facetValueIds]),
                        });
                        variantFormGroup.markAsDirty();
                    }
                }
                this.changeDetector.markForCheck();
            }
        });
    }
    variantsToCreateAreValid() {
        return (0 < this.createVariantsConfig.variants.length &&
            this.createVariantsConfig.variants.every(v => {
                return v.sku !== '';
            }));
    }
    displayFacetValueModal() {
        return this.productDetailService.getFacets().pipe(mergeMap(facets => this.modalService.fromComponent(ApplyFacetDialogComponent, {
            size: 'md',
            closable: true,
            locals: { facets },
        })), map(facetValues => facetValues && facetValues.map(v => v.id)));
    }
    create() {
        const productGroup = this.getProductFormGroup();
        if (!productGroup.dirty) {
            return;
        }
        combineLatest(this.product$, this.languageCode$)
            .pipe(take(1), mergeMap(([product, languageCode]) => {
            const newProduct = this.getUpdatedProduct(product, productGroup, languageCode);
            return this.productDetailService.createProductWithVariants(newProduct, this.createVariantsConfig, languageCode);
        }))
            .subscribe(({ createProductVariants, productId }) => {
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'Product',
            });
            this.assetChanges = {};
            this.variantAssetChanges = {};
            this.detailForm.markAsPristine();
            this.router.navigate(['../', productId], { relativeTo: this.route });
        }, err => {
            // tslint:disable-next-line:no-console
            console.error(err);
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'Product',
            });
        });
    }
    save() {
        combineLatest(this.product$, this.languageCode$, this.channelPriceIncludesTax$)
            .pipe(take(1), mergeMap(([product, languageCode, priceIncludesTax]) => {
            var _a, _b;
            const productGroup = this.getProductFormGroup();
            let productInput;
            let variantsInput;
            if (productGroup.dirty || this.assetsChanged()) {
                productInput = this.getUpdatedProduct(product, productGroup, languageCode);
            }
            const variantsArray = this.detailForm.get('variants');
            if ((variantsArray && variantsArray.dirty) || this.variantAssetsChanged()) {
                variantsInput = this.getUpdatedProductVariants(product, variantsArray, languageCode, priceIncludesTax);
            }
            return this.productDetailService.updateProduct({
                product,
                languageCode,
                autoUpdate: (_b = (_a = this.detailForm.get(['product', 'autoUpdateVariantNames'])) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : false,
                productInput,
                variantsInput,
            });
        }))
            .subscribe(result => {
            this.updateSlugAfterSave(result);
            this.detailForm.markAsPristine();
            this.assetChanges = {};
            this.variantAssetChanges = {};
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'Product',
            });
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Product',
            });
        });
    }
    canDeactivate() {
        return super.canDeactivate() && !this.assetChanges.assets && !this.assetChanges.featuredAsset;
    }
    /**
     * Sets the values of the form on changes to the product or current language.
     */
    setFormValues(product, languageCode) {
        const currentTranslation = findTranslation(product, languageCode);
        this.detailForm.patchValue({
            product: {
                enabled: product.enabled,
                name: currentTranslation ? currentTranslation.name : '',
                slug: currentTranslation ? currentTranslation.slug : '',
                description: currentTranslation ? currentTranslation.description : '',
                facetValueIds: product.facetValues.map(fv => fv.id),
            },
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get(['product', 'customFields']);
            const cfCurrentTranslation = (currentTranslation && currentTranslation.customFields) || {};
            const cfProduct = product.customFields || {};
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = fieldDef.type === 'localeString' ? cfCurrentTranslation[key] : cfProduct[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
        const variantsFormArray = this.detailForm.get('variants');
        product.variants.forEach((variant, i) => {
            const variantTranslation = findTranslation(variant, languageCode);
            const facetValueIds = variant.facetValues.map(fv => fv.id);
            const group = {
                id: variant.id,
                enabled: variant.enabled,
                sku: variant.sku,
                name: variantTranslation ? variantTranslation.name : '',
                price: variant.price,
                priceWithTax: variant.priceWithTax,
                taxCategoryId: variant.taxCategory.id,
                stockOnHand: variant.stockOnHand,
                useGlobalOutOfStockThreshold: variant.useGlobalOutOfStockThreshold,
                outOfStockThreshold: variant.outOfStockThreshold,
                trackInventory: variant.trackInventory,
                facetValueIds,
            };
            let variantFormGroup = variantsFormArray.at(i);
            if (variantFormGroup) {
                variantFormGroup.patchValue(group);
            }
            else {
                variantFormGroup = this.formBuilder.group(Object.assign(Object.assign({}, group), { facetValueIds: this.formBuilder.control(facetValueIds) }));
                variantsFormArray.insert(i, variantFormGroup);
            }
            if (this.customVariantFields.length) {
                let customFieldsGroup = variantFormGroup.get(['customFields']);
                if (!customFieldsGroup) {
                    customFieldsGroup = this.formBuilder.group(this.customVariantFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {}));
                    variantFormGroup.addControl('customFields', customFieldsGroup);
                }
                for (const fieldDef of this.customVariantFields) {
                    const key = fieldDef.name;
                    const value = fieldDef.type === 'localeString'
                        ? variantTranslation.customFields[key]
                        : variant.customFields[key];
                    const control = customFieldsGroup.get(key);
                    if (control) {
                        control.patchValue(value);
                    }
                }
            }
        });
    }
    /**
     * Given a product and the value of the detailForm, this method creates an updated copy of the product which
     * can then be persisted to the API.
     */
    getUpdatedProduct(product, productFormGroup, languageCode) {
        var _a, _b;
        const updatedProduct = createUpdatedTranslatable({
            translatable: product,
            updatedFields: productFormGroup.value,
            customFieldConfig: this.customFields,
            languageCode,
            defaultTranslation: {
                languageCode,
                name: product.name || '',
                slug: product.slug || '',
                description: product.description || '',
            },
        });
        return Object.assign(Object.assign({}, updatedProduct), { assetIds: (_a = this.assetChanges.assets) === null || _a === void 0 ? void 0 : _a.map(a => a.id), featuredAssetId: (_b = this.assetChanges.featuredAsset) === null || _b === void 0 ? void 0 : _b.id, facetValueIds: productFormGroup.value.facetValueIds });
    }
    /**
     * Given an array of product variants and the values from the detailForm, this method creates an new array
     * which can be persisted to the API.
     */
    getUpdatedProductVariants(product, variantsFormArray, languageCode, priceIncludesTax) {
        const dirtyVariants = product.variants.filter((v, i) => {
            const formRow = variantsFormArray.get(i.toString());
            return formRow && formRow.dirty;
        });
        const dirtyVariantValues = variantsFormArray.controls.filter(c => c.dirty).map(c => c.value);
        if (dirtyVariants.length !== dirtyVariantValues.length) {
            throw new Error(marker(`error.product-variant-form-values-do-not-match`));
        }
        return dirtyVariants
            .map((variant, i) => {
            var _a, _b;
            const formValue = dirtyVariantValues[i];
            const result = createUpdatedTranslatable({
                translatable: variant,
                updatedFields: formValue,
                customFieldConfig: this.customVariantFields,
                languageCode,
                defaultTranslation: {
                    languageCode,
                    name: '',
                },
            });
            result.taxCategoryId = formValue.taxCategoryId;
            result.facetValueIds = formValue.facetValueIds;
            result.price = priceIncludesTax ? formValue.priceWithTax : formValue.price;
            const assetChanges = this.variantAssetChanges[variant.id];
            if (assetChanges) {
                result.featuredAssetId = (_a = assetChanges.featuredAsset) === null || _a === void 0 ? void 0 : _a.id;
                result.assetIds = (_b = assetChanges.assets) === null || _b === void 0 ? void 0 : _b.map(a => a.id);
            }
            return result;
        })
            .filter(notNullOrUndefined);
    }
    getProductFormGroup() {
        return this.detailForm.get('product');
    }
    /**
     * The server may alter the slug value in order to normalize and ensure uniqueness upon saving.
     */
    updateSlugAfterSave(results) {
        const firstResult = results[0];
        const slugControl = this.detailForm.get(['product', 'slug']);
        function isUpdateMutation(input) {
            return input.hasOwnProperty('updateProduct');
        }
        if (slugControl && isUpdateMutation(firstResult)) {
            slugControl.setValue(firstResult.updateProduct.slug, { emitEvent: false });
        }
    }
}
ProductDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-flex-row\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <clr-toggle-wrapper *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\">\n                <input\n                    type=\"checkbox\"\n                    clrToggle\n                    name=\"enabled\"\n                    [formControl]=\"detailForm.get(['product', 'enabled'])\"\n                />\n                <label>{{ 'common.enabled' | translate }}</label>\n            </clr-toggle-wrapper>\n        </div>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"product-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine || !variantsToCreateAreValid()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"\n                    (detailForm.invalid || detailForm.pristine) && !assetsChanged() && !variantAssetsChanged()\n                \"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form\n    class=\"form\"\n    [formGroup]=\"detailForm\"\n    *ngIf=\"product$ | async as product\"\n    (keydown.enter)=\"$event.preventDefault()\"\n>\n    <clr-tabs>\n        <clr-tab>\n            <button clrTabLink (click)=\"navigateToTab('details')\">\n                {{ 'catalog.product-details' | translate }}\n            </button>\n            <clr-tab-content *clrIfActive=\"(activeTab$ | async) === 'details'\">\n                <div class=\"clr-row\">\n                    <div class=\"clr-col\">\n                        <section class=\"form-block\" formGroupName=\"product\">\n                            <ng-container *vdrIfMultichannel>\n                                <vdr-form-item\n                                    [label]=\"'common.channels' | translate\"\n                                    *vdrIfDefaultChannelActive\n                                >\n                                    <div class=\"flex channel-assignment\">\n                                        <ng-container *ngFor=\"let channel of productChannels$ | async\">\n                                            <vdr-chip\n                                                *ngIf=\"!isDefaultChannel(channel.code)\"\n                                                icon=\"times-circle\"\n                                                (iconClick)=\"removeFromChannel(channel.id)\"\n                                            >\n                                                <vdr-channel-badge\n                                                    [channelCode]=\"channel.code\"\n                                                ></vdr-channel-badge>\n                                                {{ channel.code | channelCodeToLabel }}\n                                            </vdr-chip>\n                                        </ng-container>\n                                        <button class=\"btn btn-sm\" (click)=\"assignToChannel()\">\n                                            <clr-icon shape=\"layers\"></clr-icon>\n                                            {{ 'catalog.assign-to-channel' | translate }}\n                                        </button>\n                                    </div>\n                                </vdr-form-item>\n                            </ng-container>\n                            <vdr-form-field [label]=\"'catalog.product-name' | translate\" for=\"name\">\n                                <input\n                                    id=\"name\"\n                                    type=\"text\"\n                                    formControlName=\"name\"\n                                    [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                    (input)=\"updateSlug($event.target.value)\"\n                                />\n                            </vdr-form-field>\n                            <div\n                                class=\"auto-rename-wrapper\"\n                                [class.visible]=\"\n                                    (isNew$ | async) === false && detailForm.get(['product', 'name'])?.dirty\n                                \"\n                            >\n                                <clr-checkbox-wrapper>\n                                    <input\n                                        clrCheckbox\n                                        type=\"checkbox\"\n                                        id=\"auto-update\"\n                                        formControlName=\"autoUpdateVariantNames\"\n                                    />\n                                    <label>{{\n                                        'catalog.auto-update-product-variant-name' | translate\n                                    }}</label>\n                                </clr-checkbox-wrapper>\n                            </div>\n                            <vdr-form-field\n                                [label]=\"'catalog.slug' | translate\"\n                                for=\"slug\"\n                                [errors]=\"{ pattern: 'catalog.slug-pattern-error' | translate }\"\n                            >\n                                <input\n                                    id=\"slug\"\n                                    type=\"text\"\n                                    formControlName=\"slug\"\n                                    [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                    pattern=\"[a-z0-9_-]+\"\n                                />\n                            </vdr-form-field>\n                            <vdr-rich-text-editor\n                                formControlName=\"description\"\n                                [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                [label]=\"'common.description' | translate\"\n                            ></vdr-rich-text-editor>\n\n                            <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                                <label>{{ 'common.custom-fields' | translate }}</label>\n                                <ng-container *ngFor=\"let customField of customFields\">\n                                    <vdr-custom-field-control\n                                        *ngIf=\"customFieldIsSet(customField.name)\"\n                                        entityName=\"Product\"\n                                        [customFieldsFormGroup]=\"detailForm.get(['product', 'customFields'])\"\n                                        [customField]=\"customField\"\n                                        [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                    ></vdr-custom-field-control>\n                                </ng-container>\n                            </section>\n\n                            <div class=\"facets\">\n                                <vdr-facet-value-chip\n                                    *ngFor=\"let facetValue of facetValues$ | async\"\n                                    [facetValue]=\"facetValue\"\n                                    [removable]=\"['UpdateCatalog', 'UpdateProduct'] | hasPermission\"\n                                    (remove)=\"removeProductFacetValue(facetValue.id)\"\n                                ></vdr-facet-value-chip>\n                                <button\n                                    class=\"btn btn-sm btn-secondary\"\n                                    *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                                    (click)=\"selectProductFacetValue()\"\n                                >\n                                    <clr-icon shape=\"plus\"></clr-icon>\n                                    {{ 'catalog.add-facets' | translate }}\n                                </button>\n                            </div>\n                        </section>\n                    </div>\n                    <div class=\"clr-col-md-auto\">\n                        <vdr-product-assets\n                            [assets]=\"assetChanges.assets || product.assets\"\n                            [featuredAsset]=\"assetChanges.featuredAsset || product.featuredAsset\"\n                            (change)=\"assetChanges = $event\"\n                        ></vdr-product-assets>\n                    </div>\n                </div>\n\n                <div *ngIf=\"isNew$ | async\">\n                    <h4>{{ 'catalog.product-variants' | translate }}</h4>\n                    <vdr-generate-product-variants\n                        (variantsChange)=\"createVariantsConfig = $event\"\n                    ></vdr-generate-product-variants>\n                </div>\n            </clr-tab-content>\n        </clr-tab>\n        <clr-tab *ngIf=\"!(isNew$ | async)\">\n            <button clrTabLink (click)=\"navigateToTab('variants')\">\n                {{ 'catalog.product-variants' | translate }}\n            </button>\n            <clr-tab-content *clrIfActive=\"(activeTab$ | async) === 'variants'\">\n                <section class=\"form-block\">\n                    <div class=\"view-mode\">\n                        <div class=\"btn-group\">\n                            <button\n                                class=\"btn btn-secondary-outline\"\n                                (click)=\"variantDisplayMode = 'card'\"\n                                [class.btn-primary]=\"variantDisplayMode === 'card'\"\n                            >\n                                <clr-icon shape=\"list\"></clr-icon>\n                                {{ 'catalog.display-variant-cards' | translate }}\n                            </button>\n                            <button\n                                class=\"btn\"\n                                (click)=\"variantDisplayMode = 'table'\"\n                                [class.btn-primary]=\"variantDisplayMode === 'table'\"\n                            >\n                                <clr-icon shape=\"table\"></clr-icon>\n                                {{ 'catalog.display-variant-table' | translate }}\n                            </button>\n                        </div>\n                        <div class=\"variant-filter\">\n                            <input\n                                [formControl]=\"filterInput\"\n                                [placeholder]=\"'catalog.filter-by-name-or-sku' | translate\"\n                            />\n                            <button class=\"icon-button\" (click)=\"filterInput.setValue('')\">\n                                <clr-icon shape=\"times\"></clr-icon>\n                            </button>\n                        </div>\n                        <div class=\"flex-spacer\"></div>\n                        <a\n                            *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                            [routerLink]=\"['./', 'manage-variants']\"\n                            class=\"btn btn-secondary edit-variants-btn\"\n                        >\n                            <clr-icon shape=\"add-text\"></clr-icon>\n                            {{ 'catalog.manage-variants' | translate }}\n                        </a>\n                    </div>\n\n                    <vdr-product-variants-table\n                        *ngIf=\"variantDisplayMode === 'table'\"\n                        [variants]=\"variants$ | async\"\n                        [optionGroups]=\"product.optionGroups\"\n                        [channelPriceIncludesTax]=\"channelPriceIncludesTax$ | async\"\n                        [productVariantsFormArray]=\"detailForm.get('variants')\"\n                        [pendingAssetChanges]=\"variantAssetChanges\"\n                    ></vdr-product-variants-table>\n                    <vdr-product-variants-list\n                        *ngIf=\"variantDisplayMode === 'card'\"\n                        [variants]=\"variants$ | async\"\n                        [channelPriceIncludesTax]=\"channelPriceIncludesTax$ | async\"\n                        [facets]=\"facets$ | async\"\n                        [optionGroups]=\"product.optionGroups\"\n                        [productVariantsFormArray]=\"detailForm.get('variants')\"\n                        [taxCategories]=\"taxCategories$ | async\"\n                        [customFields]=\"customVariantFields\"\n                        [customOptionFields]=\"customOptionFields\"\n                        [activeLanguage]=\"languageCode$ | async\"\n                        [pendingAssetChanges]=\"variantAssetChanges\"\n                        (assignToChannel)=\"assignVariantToChannel($event)\"\n                        (removeFromChannel)=\"removeVariantFromChannel($event)\"\n                        (assetChange)=\"variantAssetChange($event)\"\n                        (updateProductOption)=\"updateProductOption($event)\"\n                        (selectionChange)=\"selectedVariantIds = $event\"\n                        (selectFacetValueClick)=\"selectVariantFacetValue($event)\"\n                    ></vdr-product-variants-list>\n                </section>\n            </clr-tab-content>\n        </clr-tab>\n    </clr-tabs>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host ::ng-deep trix-toolbar{top:24px}vdr-action-bar clr-toggle-wrapper{margin-top:12px}.variant-filter{flex:1;display:flex}.variant-filter input{flex:1;max-width:none;border-radius:3px 0 0 3px!important}.variant-filter .icon-button{border:1px solid var(--color-component-border-300);background-color:var(--color-component-bg-100);border-radius:0 3px 3px 0;border-left:none}.group-name{padding-right:6px}.view-mode{display:flex;justify-content:flex-end;align-items:center}.edit-variants-btn{margin-top:0}.channel-assignment{flex-wrap:wrap}.auto-rename-wrapper{overflow:hidden;max-height:0;padding-left:9.5rem;margin-bottom:0;transition:max-height .2s,margin-bottom .2s}.auto-rename-wrapper.visible{max-height:24px;margin-bottom:12px}"]
            },] }
];
ProductDetailComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: ServerConfigService },
    { type: ProductDetailService },
    { type: FormBuilder },
    { type: ModalService },
    { type: NotificationService },
    { type: DataService },
    { type: Location },
    { type: ChangeDetectorRef }
];

const ɵ0$1 = SingleSearchSelectionModelFactory;
class ProductSearchInputComponent {
    constructor() {
        this.searchTermChange = new EventEmitter();
        this.facetValueChange = new EventEmitter();
        this.lastTerm = '';
        this.lastFacetValueIds = [];
        this.filterFacetResults = (term, item) => {
            if (!this.isFacetValueItem(item)) {
                return false;
            }
            return (item.facetValue.name.toLowerCase().startsWith(term.toLowerCase()) ||
                item.facetValue.facet.name.toLowerCase().startsWith(term.toLowerCase()));
        };
        this.isFacetValueItem = (input) => {
            return typeof input === 'object' && !!input && input.hasOwnProperty('facetValue');
        };
    }
    setSearchTerm(term) {
        if (term) {
            this.selectComponent.select({ label: term, value: { label: term } });
        }
        else {
            const currentTerm = this.selectComponent.selectedItems.find(i => !this.isFacetValueItem(i.value));
            if (currentTerm) {
                this.selectComponent.unselect(currentTerm);
            }
        }
    }
    setFacetValues(ids) {
        const items = this.selectComponent.items;
        this.selectComponent.selectedItems.forEach(item => {
            if (this.isFacetValueItem(item.value) && !ids.includes(item.value.facetValue.id)) {
                this.selectComponent.unselect(item);
            }
        });
        ids.map(id => {
            return items.find(item => this.isFacetValueItem(item) && item.facetValue.id === id);
        })
            .filter(notNullOrUndefined)
            .forEach(item => {
            const isSelected = this.selectComponent.selectedItems.find(i => {
                const val = i.value;
                if (this.isFacetValueItem(val)) {
                    return val.facetValue.id === item.facetValue.id;
                }
                return false;
            });
            if (!isSelected) {
                this.selectComponent.select({ label: '', value: item });
            }
        });
    }
    onSelectChange(selectedItems) {
        if (!Array.isArray(selectedItems)) {
            selectedItems = [selectedItems];
        }
        const searchTermItem = selectedItems.find(item => !this.isFacetValueItem(item));
        const searchTerm = searchTermItem ? searchTermItem.label : '';
        const facetValueIds = selectedItems.filter(this.isFacetValueItem).map(i => i.facetValue.id);
        if (searchTerm !== this.lastTerm) {
            this.searchTermChange.emit(searchTerm);
            this.lastTerm = searchTerm;
        }
        if (this.lastFacetValueIds.join(',') !== facetValueIds.join(',')) {
            this.facetValueChange.emit(facetValueIds);
            this.lastFacetValueIds = facetValueIds;
        }
    }
    addTagFn(item) {
        return { label: item };
    }
    isSearchHeaderSelected() {
        return this.selectComponent.itemsList.markedIndex === -1;
    }
}
ProductSearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-search-input',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-product-name-or-code' | translate\"\n    [items]=\"facetValueResults\"\n    [searchFn]=\"filterFacetResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip\n                [facetValue]=\"item.facetValue\"\n                [removable]=\"true\"\n                (remove)=\"clear(item)\"\n            ></vdr-facet-value-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.facetValue\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip [facetValue]=\"item.facetValue\" [removable]=\"false\"></vdr-facet-value-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: SELECTION_MODEL_FACTORY, useValue: ɵ0$1 }],
                styles: [":host{margin-top:6px;display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;min-width:300px;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}"]
            },] }
];
ProductSearchInputComponent.propDecorators = {
    facetValueResults: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    facetValueChange: [{ type: Output }],
    selectComponent: [{ type: ViewChild, args: ['selectComponent', { static: true },] }]
};

class ProductListComponent extends BaseListComponent {
    constructor(dataService, modalService, notificationService, jobQueueService, router, route) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.jobQueueService = jobQueueService;
        this.searchTerm = '';
        this.facetValueIds = [];
        this.groupByProduct = true;
        super.setQueryFn((...args) => this.dataService.product.searchProducts(this.searchTerm, ...args).refetchOnChannelChange(), data => data.search, 
        // tslint:disable-next-line:no-shadowed-variable
        (skip, take) => ({
            input: {
                skip,
                take,
                term: this.searchTerm,
                facetValueIds: this.facetValueIds,
                facetValueOperator: LogicalOperator.AND,
                groupByProduct: this.groupByProduct,
            },
        }));
    }
    ngOnInit() {
        super.ngOnInit();
        this.facetValues$ = this.result$.pipe(map(data => data.search.facetValues));
        // this.facetValues$ = of([]);
        this.route.queryParamMap
            .pipe(map(qpm => qpm.get('q')), takeUntil(this.destroy$))
            .subscribe(term => {
            this.productSearchInput.setSearchTerm(term);
        });
        const fvids$ = this.route.queryParamMap.pipe(map(qpm => qpm.getAll('fvids')));
        fvids$.pipe(takeUntil(this.destroy$)).subscribe(ids => {
            this.productSearchInput.setFacetValues(ids);
        });
        this.facetValues$.pipe(take(1), delay(100), withLatestFrom(fvids$)).subscribe(([__, ids]) => {
            this.productSearchInput.setFacetValues(ids);
        });
    }
    setSearchTerm(term) {
        this.searchTerm = term;
        this.setQueryParam({ q: term || null, page: 1 });
        this.refresh();
    }
    setFacetValueIds(ids) {
        this.facetValueIds = ids;
        this.setQueryParam({ fvids: ids, page: 1 });
        this.refresh();
    }
    rebuildSearchIndex() {
        this.dataService.product.reindex().subscribe(({ reindex }) => {
            this.notificationService.info(marker('catalog.reindexing'));
            this.jobQueueService.addJob(reindex.id, job => {
                if (job.state === JobState.COMPLETED) {
                    const time = new Intl.NumberFormat().format(job.duration || 0);
                    this.notificationService.success(marker('catalog.reindex-successful'), {
                        count: job.result.indexedItemCount,
                        time,
                    });
                    this.refresh();
                }
                else {
                    this.notificationService.error(marker('catalog.reindex-error'));
                }
            });
        });
    }
    deleteProduct(productId) {
        this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-product'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => (response ? this.dataService.product.deleteProduct(productId) : EMPTY)), 
        // Short delay to allow the product to be removed from the search index before
        // refreshing.
        delay(500))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Product',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Product',
            });
        });
    }
}
ProductListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-products-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <div class=\"search-form\">\n            <vdr-product-search-input\n                #productSearchInputComponent\n                [facetValueResults]=\"facetValues$ | async\"\n                (searchTermChange)=\"setSearchTerm($event)\"\n                (facetValueChange)=\"setFacetValueIds($event)\"\n            ></vdr-product-search-input>\n            <vdr-dropdown class=\"search-settings-menu mr3\">\n                <button type=\"button\" class=\"icon-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"cog\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        (click)=\"rebuildSearchIndex()\"\n                        [disabled]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                    >\n                        {{ 'catalog.rebuild-search-index' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n        <clr-checkbox-wrapper>\n            <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"groupByProduct\" />\n            <label>{{ 'catalog.group-by-product' | translate }}</label>\n        </clr-checkbox-wrapper>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"product-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateCatalog', 'CreateProduct']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            <span class=\"full-label\">{{ 'catalog.create-new-product' | translate }}</span>\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <ng-template let-result=\"item\">\n        <td class=\"left align-middle\" [class.disabled]=\"!result.enabled\">\n            <div class=\"image-placeholder\">\n                <img\n                    *ngIf=\"\n                        groupByProduct\n                            ? result.productAsset\n                            : result.productVariantAsset || result.productAsset as asset;\n                        else imagePlaceholder\n                    \"\n                    [src]=\"asset | assetPreview:'tiny'\"\n                />\n                <ng-template #imagePlaceholder>\n                    <div class=\"placeholder\"><clr-icon shape=\"image\" size=\"48\"></clr-icon></div>\n                </ng-template>\n            </div>\n        </td>\n        <td class=\"left align-middle\" [class.disabled]=\"!result.enabled\">\n            {{ groupByProduct ? result.productName : result.productVariantName }}\n        </td>\n        <td class=\"align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-chip *ngIf=\"!result.enabled\">{{ 'common.disabled' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', result.productId]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteProduct(result.productId)\"\n                        [disabled]=\"!(['DeleteCatalog', 'DeleteProduct'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: [".image-placeholder{width:50px;height:50px;background-color:var(--color-component-bg-200)}.image-placeholder .placeholder{text-align:center;color:var(--color-grey-300)}.search-form{display:flex;align-items:center;width:100%;margin-bottom:6px}.search-input{min-width:300px}@media screen and (max-width:768px){.search-input{min-width:100px}}.search-settings-menu{margin:0 12px}td.disabled{background-color:var(--color-component-bg-200)}"]
            },] }
];
ProductListComponent.ctorParameters = () => [
    { type: DataService },
    { type: ModalService },
    { type: NotificationService },
    { type: JobQueueService },
    { type: Router },
    { type: ActivatedRoute }
];
ProductListComponent.propDecorators = {
    productSearchInput: [{ type: ViewChild, args: ['productSearchInputComponent', { static: true },] }]
};

class GeneratedVariant {
    constructor(config) {
        for (const key of Object.keys(config)) {
            this[key] = config[key];
        }
    }
}
class ProductVariantsEditorComponent {
    constructor(route, dataService, productDetailService, notificationService, modalService) {
        this.route = route;
        this.dataService = dataService;
        this.productDetailService = productDetailService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.formValueChanged = false;
        this.generatedVariants = [];
    }
    ngOnInit() {
        this.initOptionsAndVariants();
        this.languageCode =
            this.route.snapshot.paramMap.get('lang') || getDefaultUiLanguage();
        this.dataService.settings.getActiveChannel().single$.subscribe(data => {
            this.currencyCode = data.activeChannel.currencyCode;
        });
    }
    onFormChanged(variantInfo) {
        this.formValueChanged = true;
        variantInfo.enabled = true;
    }
    canDeactivate() {
        return !this.formValueChanged;
    }
    getVariantsToAdd() {
        return this.generatedVariants.filter(v => !v.existing && v.enabled);
    }
    getVariantName(variant) {
        return variant.options.length === 0
            ? marker('catalog.default-variant')
            : variant.options.map(o => o.name).join(' ');
    }
    addOption() {
        this.optionGroups.push({
            isNew: true,
            name: '',
            values: [],
        });
    }
    generateVariants() {
        const groups = this.optionGroups.map(g => g.values);
        const previousVariants = this.generatedVariants;
        const generatedVariantFactory = (isDefault, options, existingVariant) => {
            var _a, _b, _c;
            const prototype = this.getVariantPrototype(options, previousVariants);
            return new GeneratedVariant({
                enabled: false,
                existing: !!existingVariant,
                productVariantId: existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.id,
                isDefault,
                options,
                price: (_a = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.price) !== null && _a !== void 0 ? _a : prototype.price,
                sku: (_b = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.sku) !== null && _b !== void 0 ? _b : prototype.sku,
                stock: (_c = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.stockOnHand) !== null && _c !== void 0 ? _c : prototype.stock,
            });
        };
        this.generatedVariants = groups.length
            ? generateAllCombinations(groups).map(options => {
                const existingVariant = this.product.variants.find(v => this.optionsAreEqual(v.options, options));
                return generatedVariantFactory(false, options, existingVariant);
            })
            : [generatedVariantFactory(true, [], this.product.variants[0])];
    }
    /**
     * Returns one of the existing variants to base the newly-generated variant's
     * details off.
     */
    getVariantPrototype(options, previousVariants) {
        const variantsWithSimilarOptions = previousVariants.filter(v => options.map(o => o.name).filter(name => v.options.map(o => o.name).includes(name)));
        if (variantsWithSimilarOptions.length) {
            return pick(previousVariants[0], ['sku', 'price', 'stock']);
        }
        return {
            sku: '',
            price: 0,
            stock: 0,
        };
    }
    deleteVariant(id) {
        this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-product-variant'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response ? this.productDetailService.deleteProductVariant(id, this.product.id) : EMPTY), switchMap(() => this.reFetchProduct(null)))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'ProductVariant',
            });
            this.initOptionsAndVariants();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'ProductVariant',
            });
        });
    }
    save() {
        const newOptionGroups = this.optionGroups
            .filter(og => og.isNew)
            .map(og => ({
            name: og.name,
            values: [],
        }));
        this.confirmDeletionOfDefault()
            .pipe(mergeMap(() => this.productDetailService.createProductOptionGroups(newOptionGroups, this.languageCode)), mergeMap(createdOptionGroups => this.addOptionGroupsToProduct(createdOptionGroups)), mergeMap(createdOptionGroups => this.addNewOptionsToGroups(createdOptionGroups)), mergeMap(groupsIds => this.fetchOptionGroups(groupsIds)), mergeMap(groups => this.createNewProductVariants(groups)), mergeMap(res => this.deleteDefaultVariant(res.createProductVariants)), mergeMap(variants => this.reFetchProduct(variants)))
            .subscribe({
            next: variants => {
                this.formValueChanged = false;
                this.notificationService.success(marker('catalog.created-new-variants-success'), {
                    count: variants.length,
                });
                this.initOptionsAndVariants();
            },
        });
    }
    confirmDeletionOfDefault() {
        if (this.hasOnlyDefaultVariant(this.product)) {
            return this.modalService
                .dialog({
                title: marker('catalog.confirm-adding-options-delete-default-title'),
                body: marker('catalog.confirm-adding-options-delete-default-body'),
                buttons: [
                    { type: 'secondary', label: marker('common.cancel') },
                    { type: 'danger', label: marker('catalog.delete-default-variant'), returnValue: true },
                ],
            })
                .pipe(mergeMap(res => {
                return res === true ? of(true) : EMPTY;
            }));
        }
        else {
            return of(true);
        }
    }
    hasOnlyDefaultVariant(product) {
        return product.variants.length === 1 && product.optionGroups.length === 0;
    }
    addOptionGroupsToProduct(createdOptionGroups) {
        if (createdOptionGroups.length) {
            return forkJoin(createdOptionGroups.map(optionGroup => {
                return this.dataService.product.addOptionGroupToProduct({
                    productId: this.product.id,
                    optionGroupId: optionGroup.id,
                });
            })).pipe(map(() => createdOptionGroups));
        }
        else {
            return of([]);
        }
    }
    addNewOptionsToGroups(createdOptionGroups) {
        const newOptions = this.optionGroups
            .map(og => {
            const createdGroup = createdOptionGroups.find(cog => cog.name === og.name);
            const productOptionGroupId = createdGroup ? createdGroup.id : og.id;
            if (!productOptionGroupId) {
                throw new Error('Could not get a productOptionGroupId');
            }
            return og.values
                .filter(v => !v.locked)
                .map(v => ({
                productOptionGroupId,
                code: normalizeString(v.name, '-'),
                translations: [{ name: v.name, languageCode: this.languageCode }],
            }));
        })
            .reduce((flat, options) => [...flat, ...options], []);
        const allGroupIds = [
            ...createdOptionGroups.map(g => g.id),
            ...this.optionGroups.map(g => g.id).filter(notNullOrUndefined),
        ];
        if (newOptions.length) {
            return forkJoin(newOptions.map(input => this.dataService.product.addOptionToGroup(input))).pipe(map(() => allGroupIds));
        }
        else {
            return of(allGroupIds);
        }
    }
    fetchOptionGroups(groupsIds) {
        return forkJoin(groupsIds.map(id => this.dataService.product
            .getProductOptionGroup(id)
            .mapSingle(data => data.productOptionGroup)
            .pipe(filter(notNullOrUndefined))));
    }
    createNewProductVariants(groups) {
        const options = groups
            .filter(notNullOrUndefined)
            .map(og => og.options)
            .reduce((flat, o) => [...flat, ...o], []);
        const variants = this.generatedVariants
            .filter(v => v.enabled && !v.existing)
            .map(v => ({
            price: v.price,
            sku: v.sku,
            stock: v.stock,
            optionIds: v.options
                .map(name => options.find(o => o.name === name.name))
                .filter(notNullOrUndefined)
                .map(o => o.id),
        }));
        return this.productDetailService.createProductVariants(this.product, variants, options, this.languageCode);
    }
    deleteDefaultVariant(input) {
        if (this.hasOnlyDefaultVariant(this.product)) {
            // If the default single product variant has been replaced by multiple variants,
            // delete the original default variant.
            return this.dataService.product
                .deleteProductVariant(this.product.variants[0].id)
                .pipe(map(() => input));
        }
        else {
            return of(input);
        }
    }
    reFetchProduct(input) {
        // Re-fetch the Product to force an update to the view.
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            return this.dataService.product.getProduct(id).single$.pipe(map(() => input));
        }
        else {
            return of(input);
        }
    }
    initOptionsAndVariants() {
        this.dataService.product
            // tslint:disable-next-line:no-non-null-assertion
            .getProductVariantsOptions(this.route.snapshot.paramMap.get('id'))
            // tslint:disable-next-line:no-non-null-assertion
            .mapSingle(({ product }) => product)
            .subscribe(p => {
            this.product = p;
            this.optionGroups = p.optionGroups.map(og => {
                return {
                    id: og.id,
                    isNew: false,
                    name: og.name,
                    values: og.options.map(o => ({
                        id: o.id,
                        name: o.name,
                        locked: true,
                    })),
                };
            });
            this.generateVariants();
        });
    }
    optionsAreEqual(a, b) {
        function toOptionString(o) {
            return o
                .map(x => x.name)
                .sort()
                .join('|');
        }
        return toOptionString(a) === toOptionString(b);
    }
}
ProductVariantsEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-variants-editor',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"!formValueChanged || getVariantsToAdd().length === 0\"\n        >\n            {{ 'common.add-new-variants' | translate: { count: getVariantsToAdd().length } }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngFor=\"let group of optionGroups\" class=\"option-groups\">\n    <div class=\"name\">\n        <label>{{ 'catalog.option' | translate }}</label>\n        <input clrInput [(ngModel)]=\"group.name\" name=\"name\" [readonly]=\"!group.isNew\" />\n    </div>\n    <div class=\"values\">\n        <label>{{ 'catalog.option-values' | translate }}</label>\n        <vdr-option-value-input\n            #optionValueInputComponent\n            [(ngModel)]=\"group.values\"\n            (ngModelChange)=\"generateVariants()\"\n            [groupName]=\"group.name\"\n            [disabled]=\"group.name === ''\"\n        ></vdr-option-value-input>\n    </div>\n</div>\n<button\n    class=\"btn btn-primary-outline btn-sm\"\n    (click)=\"addOption()\"\n    *ngIf=\"product?.variants.length === 1 && product?.optionGroups.length === 0\"\n>\n    <clr-icon shape=\"plus\"></clr-icon>\n    {{ 'catalog.add-option' | translate }}\n</button>\n\n<div class=\"variants-preview\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th>{{ 'common.create' | translate }}</th>\n                <th>{{ 'catalog.variant' | translate }}</th>\n                <th>{{ 'catalog.sku' | translate }}</th>\n                <th>{{ 'catalog.price' | translate }}</th>\n                <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n                <th></th>\n            </tr>\n        </thead>\n        <tr *ngFor=\"let variant of generatedVariants\" [class.disabled]=\"!variant.enabled || variant.existing\">\n            <td>\n                <input\n                    type=\"checkbox\"\n                    *ngIf=\"!variant.existing\"\n                    [(ngModel)]=\"variant.enabled\"\n                    name=\"enabled\"\n                    clrCheckbox\n                    (ngModelChange)=\"formValueChanged = true\"\n                />\n            </td>\n            <td>\n                {{ getVariantName(variant) | translate }}\n            </td>\n            <td>\n                <clr-input-container *ngIf=\"!variant.existing\">\n                    <input\n                        clrInput\n                        type=\"text\"\n                        [(ngModel)]=\"variant.sku\"\n                        [placeholder]=\"'catalog.sku' | translate\"\n                        name=\"sku\"\n                        required\n                        (ngModelChange)=\"onFormChanged(variant)\"\n                    />\n                </clr-input-container>\n                <span *ngIf=\"variant.existing\">{{ variant.sku }}</span>\n            </td>\n            <td>\n                <clr-input-container *ngIf=\"!variant.existing\">\n                    <vdr-currency-input\n                        clrInput\n                        [(ngModel)]=\"variant.price\"\n                        name=\"price\"\n                        [currencyCode]=\"currencyCode\"\n                        (ngModelChange)=\"onFormChanged(variant)\"\n                    ></vdr-currency-input>\n                </clr-input-container>\n                <span *ngIf=\"variant.existing\">{{ variant.price | localeCurrency: currencyCode }}</span>\n            </td>\n            <td>\n                <clr-input-container *ngIf=\"!variant.existing\">\n                    <input\n                        clrInput\n                        type=\"number\"\n                        [(ngModel)]=\"variant.stock\"\n                        name=\"stock\"\n                        min=\"0\"\n                        step=\"1\"\n                        (ngModelChange)=\"onFormChanged(variant)\"\n                    />\n                </clr-input-container>\n                <span *ngIf=\"variant.existing\">{{ variant.stock }}</span>\n            </td>\n            <td>\n                <vdr-dropdown *ngIf=\"variant.productVariantId as productVariantId\">\n                    <button class=\"icon-button\" vdrDropdownTrigger>\n                        <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                        <button\n                            type=\"button\"\n                            class=\"delete-button\"\n                            (click)=\"deleteVariant(productVariantId)\"\n                            vdrDropdownItem\n                        >\n                            <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                            {{ 'common.delete' | translate }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </td>\n        </tr>\n    </table>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [".option-groups{display:flex}.option-groups:first-of-type{margin-top:24px}.values{flex:1;margin:0 6px}.variants-preview tr.disabled td{background-color:var(--color-component-bg-100);color:var(--color-grey-400)}"]
            },] }
];
ProductVariantsEditorComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: DataService },
    { type: ProductDetailService },
    { type: NotificationService },
    { type: ModalService }
];

class AssetResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Asset',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            type: AssetType.IMAGE,
            fileSize: 0,
            mimeType: '',
            width: 0,
            height: 0,
            source: '',
            preview: '',
            focalPoint: null,
        }, id => dataService.product.getAsset(id).mapStream(data => data.asset));
    }
}
AssetResolver.ɵprov = ɵɵdefineInjectable({ factory: function AssetResolver_Factory() { return new AssetResolver(ɵɵinject(Router), ɵɵinject(DataService)); }, token: AssetResolver, providedIn: "root" });
AssetResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AssetResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

class CollectionResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Collection',
            id: '',
            createdAt: '',
            updatedAt: '',
            languageCode: getDefaultUiLanguage(),
            name: '',
            slug: '',
            isPrivate: false,
            description: '',
            featuredAsset: null,
            assets: [],
            translations: [],
            filters: [],
            parent: {},
            children: null,
        }, id => dataService.collection.getCollection(id).mapStream(data => data.collection));
    }
}
CollectionResolver.ɵprov = ɵɵdefineInjectable({ factory: function CollectionResolver_Factory() { return new CollectionResolver(ɵɵinject(Router), ɵɵinject(DataService)); }, token: CollectionResolver, providedIn: "root" });
CollectionResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CollectionResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

class FacetResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Facet',
            id: '',
            createdAt: '',
            updatedAt: '',
            isPrivate: false,
            languageCode: getDefaultUiLanguage(),
            name: '',
            code: '',
            translations: [],
            values: [],
        }, (id) => dataService.facet.getFacet(id).mapStream((data) => data.facet));
    }
}
FacetResolver.ɵprov = ɵɵdefineInjectable({ factory: function FacetResolver_Factory() { return new FacetResolver(ɵɵinject(Router), ɵɵinject(DataService)); }, token: FacetResolver, providedIn: "root" });
FacetResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
FacetResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

class ProductResolver extends BaseEntityResolver {
    constructor(dataService, router) {
        super(router, {
            __typename: 'Product',
            id: '',
            createdAt: '',
            updatedAt: '',
            enabled: true,
            languageCode: getDefaultUiLanguage(),
            name: '',
            slug: '',
            featuredAsset: null,
            assets: [],
            description: '',
            translations: [],
            optionGroups: [],
            facetValues: [],
            variants: [],
            channels: [],
        }, (id) => dataService.product
            .getProduct(id)
            .refetchOnChannelChange()
            .mapStream((data) => data.product));
    }
}
ProductResolver.ɵprov = ɵɵdefineInjectable({ factory: function ProductResolver_Factory() { return new ProductResolver(ɵɵinject(DataService), ɵɵinject(Router)); }, token: ProductResolver, providedIn: "root" });
ProductResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProductResolver.ctorParameters = () => [
    { type: DataService },
    { type: Router }
];

class ProductVariantsResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Product',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            optionGroups: [],
            variants: [],
        }, id => dataService.product.getProductVariantsOptions(id).mapStream(data => data.product));
    }
}
ProductVariantsResolver.ɵprov = ɵɵdefineInjectable({ factory: function ProductVariantsResolver_Factory() { return new ProductVariantsResolver(ɵɵinject(Router), ɵɵinject(DataService)); }, token: ProductVariantsResolver, providedIn: "root" });
ProductVariantsResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProductVariantsResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

const ɵ0 = {
    breadcrumb: marker('breadcrumb.products'),
}, ɵ1 = {
    breadcrumb: productBreadcrumb,
}, ɵ2 = {
    breadcrumb: productVariantEditorBreadcrumb,
}, ɵ3 = {
    breadcrumb: marker('breadcrumb.facets'),
}, ɵ4 = {
    breadcrumb: facetBreadcrumb,
}, ɵ5 = {
    breadcrumb: marker('breadcrumb.collections'),
}, ɵ6 = {
    breadcrumb: collectionBreadcrumb,
}, ɵ7 = {
    breadcrumb: marker('breadcrumb.assets'),
}, ɵ8 = {
    breadcrumb: assetBreadcrumb,
};
const catalogRoutes = [
    {
        path: 'products',
        component: ProductListComponent,
        data: ɵ0,
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
        resolve: createResolveData(ProductResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ1,
    },
    {
        path: 'products/:id/manage-variants',
        component: ProductVariantsEditorComponent,
        resolve: createResolveData(ProductVariantsResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ2,
    },
    {
        path: 'facets',
        component: FacetListComponent,
        data: ɵ3,
    },
    {
        path: 'facets/:id',
        component: FacetDetailComponent,
        resolve: createResolveData(FacetResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ4,
    },
    {
        path: 'collections',
        component: CollectionListComponent,
        data: ɵ5,
    },
    {
        path: 'collections/:id',
        component: CollectionDetailComponent,
        resolve: createResolveData(CollectionResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ6,
    },
    {
        path: 'assets',
        component: AssetListComponent,
        data: ɵ7,
    },
    {
        path: 'assets/:id',
        component: AssetDetailComponent,
        resolve: createResolveData(AssetResolver),
        data: ɵ8,
    },
];
function productBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.products',
        getName: product => product.name,
        route: 'products',
    });
}
function productVariantEditorBreadcrumb(data, params) {
    return data.entity.pipe(map((entity) => {
        return [
            {
                label: marker('breadcrumb.products'),
                link: ['../', 'products'],
            },
            {
                label: `${entity.name}`,
                link: ['../', 'products', params.id, { tab: 'variants' }],
            },
            {
                label: marker('breadcrumb.manage-variants'),
                link: ['manage-variants'],
            },
        ];
    }));
}
function facetBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.facets',
        getName: facet => facet.name,
        route: 'facets',
    });
}
function collectionBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.collections',
        getName: collection => collection.name,
        route: 'collections',
    });
}
function assetBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.assets',
        getName: asset => asset.name,
        route: 'assets',
    });
}

/**
 * Builds a tree from an array of nodes which have a parent.
 * Based on https://stackoverflow.com/a/31247960/772859, modified to preserve ordering.
 */
function arrayToTree(nodes, currentState) {
    var _a, _b;
    const topLevelNodes = [];
    const mappedArr = {};
    const currentStateMap = treeToMap(currentState);
    // First map the nodes of the array to an object -> create a hash table.
    for (const node of nodes) {
        mappedArr[node.id] = Object.assign(Object.assign({}, node), { children: [] });
    }
    for (const id of nodes.map(n => n.id)) {
        if (mappedArr.hasOwnProperty(id)) {
            const mappedElem = mappedArr[id];
            mappedElem.expanded = (_b = (_a = currentStateMap.get(id)) === null || _a === void 0 ? void 0 : _a.expanded) !== null && _b !== void 0 ? _b : false;
            const parent = mappedElem.parent;
            if (!parent) {
                continue;
            }
            // If the element is not at the root level, add it to its parent array of children.
            const parentIsRoot = !mappedArr[parent.id];
            if (!parentIsRoot) {
                if (mappedArr[parent.id]) {
                    mappedArr[parent.id].children.push(mappedElem);
                }
                else {
                    mappedArr[parent.id] = { children: [mappedElem] };
                }
            }
            else {
                topLevelNodes.push(mappedElem);
            }
        }
    }
    // tslint:disable-next-line:no-non-null-assertion
    const rootId = topLevelNodes.length ? topLevelNodes[0].parent.id : undefined;
    return { id: rootId, children: topLevelNodes };
}
/**
 * Converts an existing tree (as generated by the arrayToTree function) into a flat
 * Map. This is used to persist certain states (e.g. `expanded`) when re-building the
 * tree.
 */
function treeToMap(tree) {
    const nodeMap = new Map();
    function visit(node) {
        nodeMap.set(node.id, node);
        node.children.forEach(visit);
    }
    if (tree) {
        visit(tree);
    }
    return nodeMap;
}

class CollectionTreeComponent {
    constructor() {
        this.expandAll = false;
        this.rearrange = new EventEmitter();
        this.deleteCollection = new EventEmitter();
    }
    ngOnChanges(changes) {
        if ('collections' in changes && this.collections) {
            this.collectionTree = arrayToTree(this.collections, this.collectionTree);
        }
    }
    onDrop(event) {
        const item = event.item.data;
        const newParent = event.container.data;
        const newParentId = newParent.id;
        if (newParentId == null) {
            throw new Error(`Could not determine the ID of the root Collection`);
        }
        this.rearrange.emit({
            collectionId: item.id,
            parentId: newParentId,
            index: event.currentIndex,
        });
    }
    onMove(event) {
        this.rearrange.emit(event);
    }
    onDelete(id) {
        this.deleteCollection.emit(id);
    }
    isRootNode(node) {
        return !node.hasOwnProperty('parent');
    }
}
CollectionTreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-tree',
                template: "<vdr-collection-tree-node\n    *ngIf=\"collectionTree\"\n    cdkDropListGroup\n    [expandAll]=\"expandAll\"\n    [collectionTree]=\"collectionTree\"\n    [activeCollectionId]=\"activeCollectionId\"\n></vdr-collection-tree-node>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CollectionTreeComponent.propDecorators = {
    collections: [{ type: Input }],
    activeCollectionId: [{ type: Input }],
    expandAll: [{ type: Input }],
    rearrange: [{ type: Output }],
    deleteCollection: [{ type: Output }]
};

class CollectionTreeNodeComponent {
    constructor(parent, root, dataService) {
        this.parent = parent;
        this.root = root;
        this.dataService = dataService;
        this.depth = 0;
        this.expandAll = false;
        if (parent) {
            this.depth = parent.depth + 1;
        }
    }
    ngOnInit() {
        this.parentName = this.collectionTree.name || '<root>';
        const permissions$ = this.dataService.client
            .userStatus()
            .mapStream(data => data.userStatus.permissions)
            .pipe(shareReplay(1));
        this.hasUpdatePermission$ = permissions$.pipe(map(perms => perms.includes(Permission.UpdateCatalog) || perms.includes(Permission.UpdateCollection)));
        this.hasDeletePermission$ = permissions$.pipe(map(perms => perms.includes(Permission.DeleteCatalog) || perms.includes(Permission.DeleteCollection)));
    }
    ngOnChanges(changes) {
        const expandAllChange = changes['expandAll'];
        if (expandAllChange) {
            if (expandAllChange.previousValue === true && expandAllChange.currentValue === false) {
                this.collectionTree.children.forEach(c => (c.expanded = false));
            }
        }
    }
    trackByFn(index, item) {
        return item.id;
    }
    getMoveListItems(collection) {
        const visit = (node, parentPath, output) => {
            if (node.id !== collection.id) {
                const path = parentPath.concat(node.name);
                const parentId = collection.parent && collection.parent.id;
                if (node.id !== parentId) {
                    output.push({ path: path.slice(1).join(' / ') || 'root', id: node.id });
                }
                node.children.forEach(child => visit(child, path, output));
            }
            return output;
        };
        return visit(this.root.collectionTree, [], []);
    }
    move(collection, parentId) {
        this.root.onMove({
            index: 0,
            parentId,
            collectionId: collection.id,
        });
    }
    moveUp(collection, currentIndex) {
        if (!collection.parent) {
            return;
        }
        this.root.onMove({
            index: currentIndex - 1,
            parentId: collection.parent.id,
            collectionId: collection.id,
        });
    }
    moveDown(collection, currentIndex) {
        if (!collection.parent) {
            return;
        }
        this.root.onMove({
            index: currentIndex + 1,
            parentId: collection.parent.id,
            collectionId: collection.id,
        });
    }
    drop(event) {
        moveItemInArray(this.collectionTree.children, event.previousIndex, event.currentIndex);
        this.root.onDrop(event);
    }
    delete(id) {
        this.root.onDelete(id);
    }
}
CollectionTreeNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-tree-node',
                template: "<div\n    cdkDropList\n    class=\"tree-node\"\n    #dropList\n    [cdkDropListData]=\"collectionTree\"\n    [cdkDropListDisabled]=\"!(hasUpdatePermission$ | async)\"\n    (cdkDropListDropped)=\"drop($event)\"\n>\n    <div\n        class=\"collection\"\n        [class.private]=\"collection.isPrivate\"\n        *ngFor=\"let collection of collectionTree.children; index as i; trackBy: trackByFn\"\n        cdkDrag\n        [cdkDragData]=\"collection\"\n    >\n        <div\n            class=\"collection-detail\"\n            [ngClass]=\"'depth-' + depth\"\n            [class.active]=\"collection.id === activeCollectionId\"\n        >\n            <div class=\"name\">\n                <button\n                    class=\"icon-button folder-button\"\n                    [disabled]=\"expandAll\"\n                    *ngIf=\"collection.children?.length; else folderSpacer\"\n                    (click)=\"collection.expanded = !collection.expanded\"\n                >\n                    <clr-icon shape=\"folder\" *ngIf=\"!collection.expanded && !expandAll\"></clr-icon>\n                    <clr-icon shape=\"folder-open\" *ngIf=\"collection.expanded || expandAll\"></clr-icon>\n                </button>\n                <ng-template #folderSpacer>\n                    <div class=\"folder-button-spacer\"></div>\n                </ng-template>\n                {{ collection.name }}\n            </div>\n            <div class=\"flex-spacer\"></div>\n            <vdr-chip *ngIf=\"collection.isPrivate\">{{ 'catalog.private' | translate }}</vdr-chip>\n            <a\n                class=\"btn btn-link btn-sm\"\n                [routerLink]=\"['./', { contents: collection.id }]\"\n                queryParamsHandling=\"preserve\"\n            >\n                <clr-icon shape=\"view-list\"></clr-icon>\n                {{ 'catalog.view-contents' | translate }}\n            </a>\n            <a class=\"btn btn-link btn-sm\" [routerLink]=\"['/catalog/collections/', collection.id]\">\n                <clr-icon shape=\"edit\"></clr-icon>\n                {{ 'common.edit' | translate }}\n            </a>\n            <div class=\"drag-handle\" cdkDragHandle *vdrIfPermissions=\"['UpdateCatalog', 'UpdateCollection']\">\n                <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n            </div>\n            <vdr-dropdown>\n                <button class=\"icon-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <a\n                        class=\"dropdown-item\"\n                        [routerLink]=\"['./', 'create', { parentId: collection.id }]\"\n                        *vdrIfPermissions=\"['CreateCatalog', 'CreateCollection']\"\n                    >\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'catalog.create-new-collection' | translate }}\n                    </a>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        [disabled]=\"i === 0 || !(hasUpdatePermission$ | async)\"\n                        (click)=\"moveUp(collection, i)\"\n                    >\n                        <clr-icon shape=\"caret up\"></clr-icon>\n                        {{ 'catalog.move-up' | translate }}\n                    </button>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        [disabled]=\"\n                            i === collectionTree.children.length - 1 || !(hasUpdatePermission$ | async)\n                        \"\n                        (click)=\"moveDown(collection, i)\"\n                    >\n                        <clr-icon shape=\"caret down\"></clr-icon>\n                        {{ 'catalog.move-down' | translate }}\n                    </button>\n                    <h4 class=\"dropdown-header\">{{ 'catalog.move-to' | translate }}</h4>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        *ngFor=\"let item of getMoveListItems(collection)\"\n                        (click)=\"move(collection, item.id)\"\n                        [disabled]=\"!(hasUpdatePermission$ | async)\"\n                    >\n                        <clr-icon shape=\"child-arrow\"></clr-icon>\n                        {{ item.path }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        class=\"button\"\n                        vdrDropdownItem\n                        (click)=\"delete(collection.id)\"\n                        [disabled]=\"!(hasDeletePermission$ | async)\"\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n        <vdr-collection-tree-node\n            *ngIf=\"collection.expanded || expandAll\"\n            [expandAll]=\"expandAll\"\n            [collectionTree]=\"collection\"\n            [activeCollectionId]=\"activeCollectionId\"\n        ></vdr-collection-tree-node>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.collection{background-color:var(--color-component-bg-100);font-size:.65rem;transition:transform .25s cubic-bezier(0,0,.2,1);margin-bottom:2px;border-left:2px solid transparent;transition:border-left-color .2s}.collection.private{background-color:var(--color-component-bg-200)}.collection .collection-detail{padding:6px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--color-component-border-100)}.collection .collection-detail.active{background-color:var(--clr-global-selection-color)}.collection .collection-detail.depth-1{padding-left:36px}.collection .collection-detail.depth-2{padding-left:60px}.collection .collection-detail.depth-3{padding-left:84px}.collection .collection-detail.depth-4{padding-left:108px}.collection .collection-detail .folder-button-spacer{display:inline-block;width:28px}.tree-node{display:block;background:var(--color-component-bg-100);overflow:hidden}.tree-node.cdk-drop-list-dragging>.collection{border-left-color:var(--color-primary-300)}.drag-placeholder{min-height:120px;background-color:var(--color-component-bg-300);transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating,.example-list.cdk-drop-list-dragging .tree-node:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
CollectionTreeNodeComponent.ctorParameters = () => [
    { type: CollectionTreeNodeComponent, decorators: [{ type: SkipSelf }, { type: Optional }] },
    { type: CollectionTreeComponent },
    { type: DataService }
];
CollectionTreeNodeComponent.propDecorators = {
    collectionTree: [{ type: Input }],
    activeCollectionId: [{ type: Input }],
    expandAll: [{ type: Input }]
};

const DEFAULT_VARIANT_CODE = '__DEFAULT_VARIANT__';
class GenerateProductVariantsComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.variantsChange = new EventEmitter();
        this.optionGroups = [];
        this.variantFormValues = {};
    }
    ngOnInit() {
        this.dataService.settings.getActiveChannel().single$.subscribe(data => {
            this.currencyCode = data.activeChannel.currencyCode;
        });
        this.generateVariants();
    }
    addOption() {
        this.optionGroups.push({ name: '', values: [] });
    }
    removeOption(name) {
        this.optionGroups = this.optionGroups.filter(g => g.name !== name);
        this.generateVariants();
    }
    generateVariants() {
        const totalValuesCount = this.optionGroups.reduce((sum, group) => sum + group.values.length, 0);
        const groups = totalValuesCount
            ? this.optionGroups.map(g => g.values.map(v => v.name))
            : [[DEFAULT_VARIANT_CODE]];
        this.variants = generateAllCombinations(groups).map(values => ({ id: values.join('|'), values }));
        this.variants.forEach(variant => {
            if (!this.variantFormValues[variant.id]) {
                this.variantFormValues[variant.id] = {
                    optionValues: variant.values,
                    enabled: true,
                    price: this.copyFromDefault(variant.id, 'price', 0),
                    sku: this.copyFromDefault(variant.id, 'sku', ''),
                    stock: this.copyFromDefault(variant.id, 'stock', 0),
                };
            }
        });
        this.onFormChange();
    }
    trackByFn(index, variant) {
        return variant.values.join('|');
    }
    handleEnter(event, optionValueInputComponent) {
        event.preventDefault();
        event.stopPropagation();
        optionValueInputComponent.focus();
    }
    onFormChange() {
        const variantsToCreate = this.variants.map(v => this.variantFormValues[v.id]).filter(v => v.enabled);
        this.variantsChange.emit({
            groups: this.optionGroups.map(og => ({ name: og.name, values: og.values.map(v => v.name) })),
            variants: variantsToCreate,
        });
    }
    copyFromDefault(variantId, prop, value) {
        return variantId !== DEFAULT_VARIANT_CODE
            ? this.variantFormValues[DEFAULT_VARIANT_CODE][prop]
            : value;
    }
}
GenerateProductVariantsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-generate-product-variants',
                template: "<div *ngFor=\"let group of optionGroups\" class=\"option-groups\">\n    <div class=\"name\">\n        <label>{{ 'catalog.option' | translate }}</label>\n        <input\n            placeholder=\"e.g. Size\"\n            clrInput\n            [(ngModel)]=\"group.name\"\n            name=\"name\"\n            required\n            (keydown.enter)=\"handleEnter($event, optionValueInputComponent)\"\n        />\n    </div>\n    <div class=\"values\">\n        <label>{{ 'catalog.option-values' | translate }}</label>\n        <vdr-option-value-input\n            #optionValueInputComponent\n            [(ngModel)]=\"group.values\"\n            (ngModelChange)=\"generateVariants()\"\n            [groupName]=\"group.name\"\n            [disabled]=\"group.name === ''\"\n        ></vdr-option-value-input>\n    </div>\n    <div class=\"remove-group\">\n        <button\n            class=\"btn btn-icon btn-warning-outline\"\n            [title]=\"'catalog.remove-option' | translate\"\n            (click)=\"removeOption(group.name)\"\n        >\n            <clr-icon shape=\"trash\"></clr-icon>\n        </button>\n    </div>\n</div>\n<button class=\"btn btn-primary-outline btn-sm\" (click)=\"addOption()\">\n    <clr-icon shape=\"plus\"></clr-icon>\n    {{ 'catalog.add-option' | translate }}\n</button>\n\n<div class=\"variants-preview\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th *ngIf=\"1 < variants.length\">{{ 'common.create' | translate }}</th>\n                <th *ngIf=\"1 < variants.length\">{{ 'catalog.variant' | translate }}</th>\n                <th>{{ 'catalog.sku' | translate }}</th>\n                <th>{{ 'catalog.price' | translate }}</th>\n                <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n            </tr>\n        </thead>\n        <tr\n            *ngFor=\"let variant of variants; trackBy: trackByFn\"\n            [class.disabled]=\"!variantFormValues[variant.id].enabled\"\n        >\n            <td *ngIf=\"1 < variants.length\">\n                <input\n                    type=\"checkbox\"\n                    (change)=\"onFormChange()\"\n                    [(ngModel)]=\"variantFormValues[variant.id].enabled\"\n                    clrCheckbox\n                />\n            </td>\n            <td *ngIf=\"1 < variants.length\">\n                {{ variant.values.join(' ') }}\n            </td>\n            <td>\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"text\"\n                        (change)=\"onFormChange()\"\n                        [(ngModel)]=\"variantFormValues[variant.id].sku\"\n                        [placeholder]=\"'catalog.sku' | translate\"\n                    />\n                </clr-input-container>\n            </td>\n            <td>\n                <clr-input-container>\n                    <vdr-currency-input\n                        clrInput\n                        [(ngModel)]=\"variantFormValues[variant.id].price\"\n                        (ngModelChange)=\"onFormChange()\"\n                        [currencyCode]=\"currencyCode\"\n                    ></vdr-currency-input>\n                </clr-input-container>\n            </td>\n            <td>\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"number\"\n                        [(ngModel)]=\"variantFormValues[variant.id].stock\"\n                        (change)=\"onFormChange()\"\n                        min=\"0\"\n                        step=\"1\"\n                    />\n                </clr-input-container>\n            </td>\n        </tr>\n    </table>\n</div>\n",
                styles: [":host{display:block;margin-bottom:120px}.option-groups{display:flex}.values{flex:1;margin:0 6px}.remove-group{padding-top:18px}.variants-preview tr.disabled td{background-color:var(--color-component-bg-100);color:var(--color-grey-400)}"]
            },] }
];
GenerateProductVariantsComponent.ctorParameters = () => [
    { type: DataService }
];
GenerateProductVariantsComponent.propDecorators = {
    variantsChange: [{ type: Output }]
};

const OPTION_VALUE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OptionValueInputComponent),
    multi: true,
};
class OptionValueInputComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.groupName = '';
        this.disabled = false;
        this.input = '';
        this.isFocussed = false;
        this.lastSelected = false;
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetector.markForCheck();
    }
    writeValue(obj) {
        this.options = obj || [];
    }
    focus() {
        this.textArea.nativeElement.focus();
    }
    removeOption(option) {
        if (!option.locked) {
            this.options = this.options.filter(o => o.name !== option.name);
            this.onChangeFn(this.options);
        }
    }
    handleKey(event) {
        switch (event.key) {
            case ',':
            case 'Enter':
                this.addOptionValue();
                event.preventDefault();
                break;
            case 'Backspace':
                if (this.lastSelected) {
                    this.removeLastOption();
                    this.lastSelected = false;
                }
                else if (this.input === '') {
                    this.lastSelected = true;
                }
                break;
            default:
                this.lastSelected = false;
        }
    }
    handleBlur() {
        this.isFocussed = false;
        this.addOptionValue();
    }
    addOptionValue() {
        this.options = unique([...this.options, ...this.parseInputIntoOptions(this.input)]);
        this.input = '';
        this.onChangeFn(this.options);
    }
    parseInputIntoOptions(input) {
        return input
            .split(/[,\n]/)
            .map(s => s.trim())
            .filter(s => s !== '')
            .map(s => ({ name: s, locked: false }));
    }
    removeLastOption() {
        if (!this.options[this.options.length - 1].locked) {
            this.options = this.options.slice(0, this.options.length - 1);
        }
    }
}
OptionValueInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-option-value-input',
                template: "<div class=\"input-wrapper\" [class.focus]=\"isFocussed\" (click)=\"textArea.focus()\">\n    <div class=\"chips\" *ngIf=\"0 < options.length\">\n        <vdr-chip\n            *ngFor=\"let option of options; last as isLast\"\n            [icon]=\"option.locked ? 'lock' : 'times'\"\n            [class.selected]=\"isLast && lastSelected\"\n            [class.locked]=\"option.locked\"\n            [colorFrom]=\"groupName\"\n            (iconClick)=\"removeOption(option)\"\n        >\n            {{ option.name }}\n        </vdr-chip>\n    </div>\n    <textarea\n        #textArea\n        (keyup)=\"handleKey($event)\"\n        (focus)=\"isFocussed = true\"\n        (blur)=\"handleBlur()\"\n        [(ngModel)]=\"input\"\n        [disabled]=\"disabled\"\n    ></textarea>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [OPTION_VALUE_INPUT_VALUE_ACCESSOR],
                styles: [".input-wrapper{background-color:#fff;border-radius:3px!important;border:1px solid var(--color-grey-300)!important;cursor:text}.input-wrapper.focus{border-color:var(--color-primary-500)!important;box-shadow:0 0 1px 1px var(--color-primary-100)}.input-wrapper .chips{padding:5px}.input-wrapper textarea{border:none;width:100%;height:24px;margin-top:3px;padding:0 6px}.input-wrapper textarea:focus{outline:none}.input-wrapper textarea:disabled{background-color:var(--color-component-bg-100)}vdr-chip ::ng-deep .wrapper{margin:0 3px}vdr-chip.locked{opacity:.8}vdr-chip.selected ::ng-deep .wrapper{border-color:var(--color-warning-500)!important;box-shadow:0 0 1px 1px var(--color-warning-400);opacity:.6}"]
            },] }
];
OptionValueInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OptionValueInputComponent.propDecorators = {
    groupName: [{ type: Input }],
    textArea: [{ type: ViewChild, args: ['textArea', { static: true },] }]
};

/**
 * A component which displays the Assets associated with a product, and allows assets to be removed and
 * added, and for the featured asset to be set.
 *
 * Note: rather complex code for drag drop is due to a limitation of the default CDK implementation
 * which is addressed by a work-around from here: https://github.com/angular/components/issues/13372#issuecomment-483998378
 */
class ProductAssetsComponent {
    constructor(modalService, changeDetector, viewportRuler, collectionDetailComponent) {
        this.modalService = modalService;
        this.changeDetector = changeDetector;
        this.viewportRuler = viewportRuler;
        this.collectionDetailComponent = collectionDetailComponent;
        this.compact = false;
        this.change = new EventEmitter();
        this.assets = [];
        this.updateCollectionPermissions = [Permission.UpdateCatalog, Permission.UpdateCollection];
        this.updateProductPermissions = [Permission.UpdateCatalog, Permission.UpdateProduct];
        this.dropListEnterPredicate = (drag, drop) => {
            if (drop === this.placeholder) {
                return true;
            }
            if (drop !== this.activeContainer) {
                return false;
            }
            const phElement = this.placeholder.element.nativeElement;
            const sourceElement = drag.dropContainer.element.nativeElement;
            const dropElement = drop.element.nativeElement;
            const children = dropElement.parentElement && dropElement.parentElement.children;
            const dragIndex = __indexOf(children, this.source ? phElement : sourceElement);
            const dropIndex = __indexOf(children, dropElement);
            if (!this.source) {
                this.sourceIndex = dragIndex;
                this.source = drag.dropContainer;
                phElement.style.width = sourceElement.clientWidth + 'px';
                phElement.style.height = sourceElement.clientHeight + 'px';
                if (sourceElement.parentElement) {
                    sourceElement.parentElement.removeChild(sourceElement);
                }
            }
            this.targetIndex = dropIndex;
            this.target = drop;
            phElement.style.display = '';
            if (dropElement.parentElement) {
                dropElement.parentElement.insertBefore(phElement, dropIndex > dragIndex ? dropElement.nextSibling : dropElement);
            }
            this.placeholder._dropListRef.enter(drag._dragRef, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
            return false;
        };
    }
    set assetsSetter(val) {
        // create a new non-readonly array of assets
        this.assets = val.slice();
    }
    get updatePermissions() {
        if (this.collectionDetailComponent) {
            return this.updateCollectionPermissions;
        }
        else {
            return this.updateProductPermissions;
        }
    }
    ngAfterViewInit() {
        const phElement = this.placeholder.element.nativeElement;
        phElement.style.display = 'none';
        if (phElement.parentElement) {
            phElement.parentElement.removeChild(phElement);
        }
    }
    selectAssets() {
        this.modalService
            .fromComponent(AssetPickerDialogComponent, {
            size: 'xl',
        })
            .subscribe(result => {
            if (result && result.length) {
                this.assets = unique(this.assets.concat(result), 'id');
                if (!this.featuredAsset) {
                    this.featuredAsset = result[0];
                }
                this.emitChangeEvent(this.assets, this.featuredAsset);
                this.changeDetector.markForCheck();
            }
        });
    }
    setAsFeatured(asset) {
        this.featuredAsset = asset;
        this.emitChangeEvent(this.assets, asset);
    }
    isFeatured(asset) {
        return !!this.featuredAsset && this.featuredAsset.id === asset.id;
    }
    previewAsset(asset) {
        this.modalService
            .fromComponent(AssetPreviewDialogComponent, {
            size: 'xl',
            closable: true,
            locals: { asset },
        })
            .subscribe();
    }
    removeAsset(asset) {
        this.assets = this.assets.filter(a => a.id !== asset.id);
        if (this.featuredAsset && this.featuredAsset.id === asset.id) {
            this.featuredAsset = this.assets.length > 0 ? this.assets[0] : undefined;
        }
        this.emitChangeEvent(this.assets, this.featuredAsset);
    }
    emitChangeEvent(assets, featuredAsset) {
        this.change.emit({
            assets,
            featuredAsset,
        });
    }
    dragMoved(e) {
        const point = this.getPointerPositionOnPage(e.event);
        this.listGroup._items.forEach(dropList => {
            if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
                this.activeContainer = dropList;
                return;
            }
        });
    }
    dropListDropped() {
        if (!this.target || !this.source) {
            return;
        }
        const phElement = this.placeholder.element.nativeElement;
        // tslint:disable-next-line:no-non-null-assertion
        const parent = phElement.parentElement;
        phElement.style.display = 'none';
        parent.removeChild(phElement);
        parent.appendChild(phElement);
        parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);
        this.target = null;
        this.source = null;
        if (this.sourceIndex !== this.targetIndex) {
            moveItemInArray(this.assets, this.sourceIndex, this.targetIndex);
            this.emitChangeEvent(this.assets, this.featuredAsset);
        }
    }
    /** Determines the point of the page that was touched by the user. */
    getPointerPositionOnPage(event) {
        // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
        const point = __isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
        const scrollPosition = this.viewportRuler.getViewportScrollPosition();
        return {
            x: point.pageX - scrollPosition.left,
            y: point.pageY - scrollPosition.top,
        };
    }
}
ProductAssetsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-assets',
                template: "<div class=\"card\" *ngIf=\"!compact; else compactView\">\n    <div class=\"card-img\">\n        <div class=\"featured-asset\">\n            <img\n                *ngIf=\"featuredAsset\"\n                [src]=\"featuredAsset | assetPreview:'small'\"\n                (click)=\"previewAsset(featuredAsset)\"\n            />\n            <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-featured-asset' | translate }}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-block\"><ng-container *ngTemplateOutlet=\"assetList\"></ng-container></div>\n    <div class=\"card-footer\" *vdrIfPermissions=\"updatePermissions\">\n        <button class=\"btn\" (click)=\"selectAssets()\">\n            <clr-icon shape=\"attachment\"></clr-icon>\n            {{ 'asset.add-asset' | translate }}\n        </button>\n    </div>\n</div>\n\n<ng-template #compactView>\n    <div class=\"featured-asset compact\">\n        <img\n            *ngIf=\"featuredAsset\"\n            [src]=\"featuredAsset | assetPreview:'thumb'\"\n            (click)=\"previewAsset(featuredAsset)\"\n        />\n\n        <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\"><clr-icon shape=\"image\" size=\"150\"></clr-icon></div>\n    </div>\n    <ng-container *ngTemplateOutlet=\"assetList\"></ng-container>\n    <button\n        *vdrIfPermissions=\"updatePermissions\"\n        class=\"compact-select btn btn-icon btn-sm btn-block\"\n        [title]=\"'asset.add-asset' | translate\"\n        (click)=\"selectAssets()\"\n    >\n        <clr-icon shape=\"attachment\"></clr-icon>\n        {{ 'asset.add-asset' | translate }}\n    </button>\n</ng-template>\n\n<ng-template #assetList>\n    <div class=\"all-assets\" [class.compact]=\"compact\" cdkDropListGroup #dlg>\n        <div\n            cdkDropList\n            #dl\n            [cdkDropListDisabled]=\"!(updatePermissions | hasPermission)\"\n            [cdkDropListEnterPredicate]=\"dropListEnterPredicate\"\n            (cdkDropListDropped)=\"dropListDropped()\"\n        ></div>\n        <div\n            *ngFor=\"let asset of assets\"\n            cdkDropList\n            [cdkDropListDisabled]=\"!(updatePermissions | hasPermission)\"\n            [cdkDropListEnterPredicate]=\"dropListEnterPredicate\"\n            (cdkDropListDropped)=\"dropListDropped()\"\n        >\n            <vdr-dropdown cdkDrag (cdkDragMoved)=\"dragMoved($event)\">\n                <div\n                    class=\"asset-thumb\"\n                    vdrDropdownTrigger\n                    [class.featured]=\"isFeatured(asset)\"\n                    [title]=\"\"\n                    tabindex=\"0\"\n                >\n                    <img [src]=\"asset | assetPreview:'tiny'\" />\n                </div>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button type=\"button\" vdrDropdownItem (click)=\"previewAsset(asset)\">\n                        {{ 'asset.preview' | translate }}\n                    </button>\n                    <button\n                        type=\"button\"\n                        [disabled]=\"isFeatured(asset) || !(updatePermissions | hasPermission)\"\n                        vdrDropdownItem\n                        (click)=\"setAsFeatured(asset)\"\n                    >\n                        {{ 'asset.set-as-featured-asset' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        class=\"remove-asset\"\n                        vdrDropdownItem\n                        [disabled]=\"!(updatePermissions | hasPermission)\"\n                        (click)=\"removeAsset(asset)\"\n                    >\n                        {{ 'asset.remove-asset' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{width:340px;display:block}:host.compact{width:162px}.placeholder{text-align:center;color:var(--color-grey-300)}.featured-asset{text-align:center;background:var(--color-component-bg-200);padding:6px;cursor:pointer}.featured-asset.compact{width:100%;min-height:40px;position:relative;padding:6px}.featured-asset .compact-select{position:absolute;bottom:6px;right:6px;margin:0}.all-assets{display:flex;flex-wrap:wrap}.all-assets .asset-thumb{margin:3px;padding:0;border:2px solid var(--color-component-border-100);cursor:pointer}.all-assets .asset-thumb.featured{border-color:var(--color-primary-500)}.all-assets .remove-asset{color:var(--color-warning-500)}.all-assets.compact .asset-thumb{margin:1px;border-width:1px}.cdk-drag-preview{display:flex;align-items:center;justify-content:center;width:50px;background-color:var(--color-component-bg-100);opacity:.9;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:.8;width:60px;height:50px}.cdk-drag-placeholder .asset-thumb{background-color:var(--color-component-bg-300);height:100%;width:54px}.cdk-drag-placeholder img{display:none}.all-assets.compact .cdk-drag-placeholder,.all-assets.compact .cdk-drag-placeholder .asset-thumb{width:50px}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box:last-child{border:none}.all-assets.cdk-drop-list-dragging vdr-dropdown:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
ProductAssetsComponent.ctorParameters = () => [
    { type: ModalService },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: CollectionDetailComponent, decorators: [{ type: Optional }] }
];
ProductAssetsComponent.propDecorators = {
    assetsSetter: [{ type: Input, args: ['assets',] }],
    featuredAsset: [{ type: Input }],
    compact: [{ type: HostBinding, args: ['class.compact',] }, { type: Input }],
    change: [{ type: Output }],
    listGroup: [{ type: ViewChild, args: ['dlg', { static: false, read: CdkDropListGroup },] }],
    placeholder: [{ type: ViewChild, args: ['dl', { static: false, read: CdkDropList },] }]
};
function __indexOf(collection, node) {
    if (!collection) {
        return -1;
    }
    return Array.prototype.indexOf.call(collection, node);
}
/** Determines whether an event is a touch event. */
function __isTouchEvent(event) {
    return event.type.startsWith('touch');
}
function __isInsideDropListClientRect(dropList, x, y) {
    const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right;
}

class UpdateProductOptionDialogComponent {
    constructor() {
        this.updateVariantName = true;
        this.codeInputTouched = false;
    }
    ngOnInit() {
        var _a;
        const currentTranslation = this.productOption.translations.find(t => t.languageCode === this.activeLanguage);
        this.name = (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '';
        this.code = this.productOption.code;
        this.customFieldsForm = new FormGroup({});
        if (this.customFields) {
            const cfCurrentTranslation = (currentTranslation && currentTranslation.customFields) || {};
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = fieldDef.type === 'localeString'
                    ? cfCurrentTranslation[key]
                    : this.productOption.customFields[key];
                this.customFieldsForm.addControl(fieldDef.name, new FormControl(value));
            }
        }
    }
    update() {
        const result = createUpdatedTranslatable({
            translatable: this.productOption,
            languageCode: this.activeLanguage,
            updatedFields: {
                code: this.code,
                name: this.name,
                customFields: this.customFieldsForm.value,
            },
            customFieldConfig: this.customFields,
            defaultTranslation: {
                languageCode: this.activeLanguage,
                name: '',
            },
        });
        this.resolveWith(Object.assign(Object.assign({}, result), { autoUpdate: this.updateVariantName }));
    }
    cancel() {
        this.resolveWith();
    }
    updateCode(nameValue) {
        if (!this.codeInputTouched && !this.productOption.code) {
            this.code = normalizeString(nameValue, '-');
        }
    }
}
UpdateProductOptionDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-update-product-option-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'catalog.update-product-option' | translate }}</ng-template>\n<vdr-form-field [label]=\"'catalog.option-name' | translate\" for=\"name\">\n    <input\n        id=\"name\"\n        type=\"text\"\n        #nameInput=\"ngModel\"\n        [(ngModel)]=\"name\"\n        required\n        (input)=\"updateCode($event.target.value)\"\n    />\n</vdr-form-field>\n<vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n    <input id=\"code\" type=\"text\" #codeInput=\"ngModel\" required [(ngModel)]=\"code\" pattern=\"[a-z0-9_-]+\" />\n</vdr-form-field>\n<clr-checkbox-wrapper>\n    <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"updateVariantName\" />\n    <label>{{ 'catalog.auto-update-option-variant-name' | translate }}</label>\n</clr-checkbox-wrapper>\n<section *ngIf=\"customFields.length\">\n    <label>{{ 'common.custom-fields' | translate }}</label>\n    <ng-container *ngFor=\"let customField of customFields\">\n        <vdr-custom-field-control\n            *ngIf=\"customFieldsForm.get(customField.name)\"\n            entityName=\"ProductOption\"\n            [customFieldsFormGroup]=\"customFieldsForm\"\n            [customField]=\"customField\"\n            [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n        ></vdr-custom-field-control>\n    </ng-container>\n</section>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"update()\"\n        [disabled]=\"\n            nameInput.invalid ||\n            codeInput.invalid ||\n            (nameInput.pristine && codeInput.pristine && customFieldsForm.pristine)\n        \"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.update-product-option' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

class ProductVariantsListComponent {
    constructor(changeDetector, modalService, dataService) {
        this.changeDetector = changeDetector;
        this.modalService = modalService;
        this.dataService = dataService;
        this.assignToChannel = new EventEmitter();
        this.removeFromChannel = new EventEmitter();
        this.assetChange = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.selectFacetValueClick = new EventEmitter();
        this.updateProductOption = new EventEmitter();
        this.selectedVariantIds = [];
        this.pagination = {
            currentPage: 1,
            itemsPerPage: 10,
        };
        this.formGroupMap = new Map();
        this.GlobalFlag = GlobalFlag;
        this.updatePermission = [Permission.UpdateCatalog, Permission.UpdateProduct];
    }
    ngOnInit() {
        this.dataService.settings.getGlobalSettings('cache-first').single$.subscribe(({ globalSettings }) => {
            this.globalTrackInventory = globalSettings.trackInventory;
            this.globalOutOfStockThreshold = globalSettings.outOfStockThreshold;
            this.changeDetector.markForCheck();
        });
        this.subscription = this.formArray.valueChanges.subscribe(() => this.changeDetector.markForCheck());
        this.subscription.add(this.formArray.valueChanges
            .pipe(map(value => value.length), debounceTime(1), distinctUntilChanged())
            .subscribe(() => {
            this.buildFormGroupMap();
        }));
        this.buildFormGroupMap();
    }
    ngOnChanges(changes) {
        var _a, _b;
        if ('facets' in changes && !!changes['facets'].currentValue) {
            this.facetValues = flattenFacetValues(this.facets);
        }
        if ('variants' in changes) {
            if (((_a = changes['variants'].currentValue) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = changes['variants'].previousValue) === null || _b === void 0 ? void 0 : _b.length)) {
                this.pagination.currentPage = 1;
            }
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    isDefaultChannel(channelCode) {
        return channelCode === DEFAULT_CHANNEL_CODE;
    }
    trackById(index, item) {
        return item.id;
    }
    inventoryIsNotTracked(formGroup) {
        var _a;
        const trackInventory = (_a = formGroup.get('trackInventory')) === null || _a === void 0 ? void 0 : _a.value;
        return (trackInventory === GlobalFlag.FALSE ||
            (trackInventory === GlobalFlag.INHERIT && this.globalTrackInventory === false));
    }
    getTaxCategoryName(group) {
        const control = group.get(['taxCategoryId']);
        if (control && this.taxCategories) {
            const match = this.taxCategories.find(t => t.id === control.value);
            return match ? match.name : '';
        }
        return '';
    }
    getSaleableStockLevel(variant) {
        const effectiveOutOfStockThreshold = variant.useGlobalOutOfStockThreshold
            ? this.globalOutOfStockThreshold
            : variant.outOfStockThreshold;
        return variant.stockOnHand - variant.stockAllocated - effectiveOutOfStockThreshold;
    }
    areAllSelected() {
        return !!this.variants && this.selectedVariantIds.length === this.variants.length;
    }
    onAssetChange(variantId, event) {
        this.assetChange.emit(Object.assign({ variantId }, event));
        const index = this.variants.findIndex(v => v.id === variantId);
        this.formArray.at(index).markAsDirty();
    }
    toggleSelectAll() {
        if (this.areAllSelected()) {
            this.selectedVariantIds = [];
        }
        else {
            this.selectedVariantIds = this.variants.map(v => v.id);
        }
        this.selectionChange.emit(this.selectedVariantIds);
    }
    toggleSelectVariant(variantId) {
        const index = this.selectedVariantIds.indexOf(variantId);
        if (-1 < index) {
            this.selectedVariantIds.splice(index, 1);
        }
        else {
            this.selectedVariantIds.push(variantId);
        }
        this.selectionChange.emit(this.selectedVariantIds);
    }
    optionGroupName(optionGroupId) {
        var _a;
        const group = this.optionGroups.find(g => g.id === optionGroupId);
        if (group) {
            const translation = (_a = group === null || group === void 0 ? void 0 : group.translations.find(t => t.languageCode === this.activeLanguage)) !== null && _a !== void 0 ? _a : group.translations[0];
            return translation.name;
        }
    }
    optionName(option) {
        var _a;
        const translation = (_a = option.translations.find(t => t.languageCode === this.activeLanguage)) !== null && _a !== void 0 ? _a : option.translations[0];
        return translation.name;
    }
    pendingFacetValues(variant) {
        if (this.facets) {
            const formFacetValueIds = this.getFacetValueIds(variant.id);
            const variantFacetValueIds = variant.facetValues.map(fv => fv.id);
            return formFacetValueIds
                .filter(x => !variantFacetValueIds.includes(x))
                .map(id => this.facetValues.find(fv => fv.id === id))
                .filter(notNullOrUndefined);
        }
        else {
            return [];
        }
    }
    existingFacetValues(variant) {
        const formFacetValueIds = this.getFacetValueIds(variant.id);
        const intersection = [...formFacetValueIds].filter(x => variant.facetValues.map(fv => fv.id).includes(x));
        return intersection
            .map(id => variant.facetValues.find(fv => fv.id === id))
            .filter(notNullOrUndefined);
    }
    removeFacetValue(variant, facetValueId) {
        const formGroup = this.formGroupMap.get(variant.id);
        if (formGroup) {
            const newValue = formGroup.value.facetValueIds.filter(id => id !== facetValueId);
            formGroup.patchValue({
                facetValueIds: newValue,
            });
            formGroup.markAsDirty();
        }
    }
    isVariantSelected(variantId) {
        return -1 < this.selectedVariantIds.indexOf(variantId);
    }
    editOption(option) {
        this.modalService
            .fromComponent(UpdateProductOptionDialogComponent, {
            size: 'md',
            locals: {
                productOption: option,
                activeLanguage: this.activeLanguage,
                customFields: this.customOptionFields,
            },
        })
            .subscribe(result => {
            if (result) {
                this.updateProductOption.emit(result);
            }
        });
    }
    buildFormGroupMap() {
        this.formGroupMap.clear();
        for (const controlGroup of this.formArray.controls) {
            this.formGroupMap.set(controlGroup.value.id, controlGroup);
        }
        this.changeDetector.markForCheck();
    }
    getFacetValueIds(id) {
        var _a;
        const formValue = (_a = this.formGroupMap.get(id)) === null || _a === void 0 ? void 0 : _a.value;
        return formValue.facetValueIds;
    }
}
ProductVariantsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-variants-list',
                template: "<div class=\"variants-list\">\n    <div\n        class=\"variant-container card\"\n        *ngFor=\"let variant of variants | paginate: pagination; trackBy: trackById; let i = index\"\n        [class.disabled]=\"!formGroupMap.get(variant.id)?.get('enabled')?.value\"\n    >\n        <ng-container *ngIf=\"formGroupMap.get(variant.id) as formGroup\" [formGroup]=\"formGroup\">\n            <div class=\"card-block header-row\">\n                <div class=\"details\">\n                    <vdr-title-input class=\"sku\" [readonly]=\"!(updatePermission | hasPermission)\">\n                        <clr-input-container>\n                            <input\n                                clrInput\n                                type=\"text\"\n                                formControlName=\"sku\"\n                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                [placeholder]=\"'catalog.sku' | translate\"\n                            />\n                        </clr-input-container>\n                    </vdr-title-input>\n                    <vdr-title-input class=\"name\" [readonly]=\"!(updatePermission | hasPermission)\">\n                        <clr-input-container>\n                            <input\n                                clrInput\n                                type=\"text\"\n                                formControlName=\"name\"\n                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                [placeholder]=\"'common.name' | translate\"\n                            />\n                        </clr-input-container>\n                    </vdr-title-input>\n                </div>\n                <div class=\"right-controls\">\n                    <clr-toggle-wrapper *vdrIfPermissions=\"updatePermission\">\n                        <input type=\"checkbox\" clrToggle name=\"enabled\" formControlName=\"enabled\" />\n                        <label>{{ 'common.enabled' | translate }}</label>\n                    </clr-toggle-wrapper>\n                </div>\n            </div>\n            <div class=\"card-block\">\n                <div class=\"variant-body\">\n                    <div class=\"assets\">\n                        <vdr-product-assets\n                            [compact]=\"true\"\n                            [assets]=\"pendingAssetChanges[variant.id]?.assets || variant.assets\"\n                            [featuredAsset]=\"pendingAssetChanges[variant.id]?.featuredAsset || variant.featuredAsset\"\n                            (change)=\"onAssetChange(variant.id, $event)\"\n                        ></vdr-product-assets>\n                    </div>\n                    <div class=\"variant-form-inputs\">\n                        <div class=\"standard-fields\">\n                            <div class=\"variant-form-input-row\">\n                                <div class=\"tax-category\">\n                                    <clr-select-container\n                                        *vdrIfPermissions=\"updatePermission; else taxCategoryLabel\"\n                                    >\n                                        <label>{{ 'catalog.tax-category' | translate }}</label>\n                                        <select clrSelect name=\"options\" formControlName=\"taxCategoryId\">\n                                            <option\n                                                *ngFor=\"let taxCategory of taxCategories\"\n                                                [value]=\"taxCategory.id\"\n                                            >\n                                                {{ taxCategory.name }}\n                                            </option>\n                                        </select>\n                                    </clr-select-container>\n                                    <ng-template #taxCategoryLabel>\n                                        <label class=\"clr-control-label\">{{\n                                            'catalog.tax-category' | translate\n                                        }}</label>\n                                        <div class=\"tax-category-label\">\n                                            {{ getTaxCategoryName(formGroup) }}\n                                        </div>\n                                    </ng-template>\n                                </div>\n                                <div class=\"price\">\n                                    <clr-input-container>\n                                        <label>{{ 'catalog.price' | translate }}</label>\n                                        <vdr-currency-input\n                                            *ngIf=\"!channelPriceIncludesTax\"\n                                            clrInput\n                                            [currencyCode]=\"variant.currencyCode\"\n                                            [readonly]=\"!(updatePermission | hasPermission)\"\n                                            formControlName=\"price\"\n                                        ></vdr-currency-input>\n                                        <vdr-currency-input\n                                            *ngIf=\"channelPriceIncludesTax\"\n                                            clrInput\n                                            [currencyCode]=\"variant.currencyCode\"\n                                            [readonly]=\"!(updatePermission | hasPermission)\"\n                                            formControlName=\"priceWithTax\"\n                                        ></vdr-currency-input>\n                                    </clr-input-container>\n                                </div>\n                                <vdr-variant-price-detail\n                                    [price]=\"formGroup.get('price')!.value\"\n                                    [currencyCode]=\"variant.currencyCode\"\n                                    [priceIncludesTax]=\"channelPriceIncludesTax\"\n                                    [taxCategoryId]=\"formGroup.get('taxCategoryId')!.value\"\n                                ></vdr-variant-price-detail>\n                            </div>\n                            <div class=\"variant-form-input-row\">\n                                <clr-select-container *vdrIfPermissions=\"updatePermission\">\n                                    <label\n                                        >{{ 'catalog.track-inventory' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.track-inventory-tooltip' | translate\"\n                                        ></vdr-help-tooltip>\n                                    </label>\n                                    <select clrSelect name=\"options\" formControlName=\"trackInventory\">\n                                        <option [value]=\"GlobalFlag.TRUE\">\n                                            {{ 'catalog.track-inventory-true' | translate }}\n                                        </option>\n                                        <option [value]=\"GlobalFlag.FALSE\">\n                                            {{ 'catalog.track-inventory-false' | translate }}\n                                        </option>\n                                        <option [value]=\"GlobalFlag.INHERIT\">\n                                            {{ 'catalog.track-inventory-inherit' | translate }}\n                                        </option>\n                                    </select>\n                                </clr-select-container>\n                                <clr-input-container>\n                                    <label\n                                        >{{ 'catalog.stock-on-hand' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-on-hand-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <input\n                                        [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\"\n                                        clrInput\n                                        type=\"number\"\n                                        min=\"0\"\n                                        step=\"1\"\n                                        formControlName=\"stockOnHand\"\n                                        [readonly]=\"!(updatePermission | hasPermission)\"\n                                        [vdrDisabled]=\"inventoryIsNotTracked(formGroup)\"\n                                    />\n                                </clr-input-container>\n                                <div [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\">\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.stock-allocated' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-allocated-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"value\">\n                                        {{ variant.stockAllocated }}\n                                    </div>\n                                </div>\n                                <div [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\">\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.stock-saleable' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-saleable-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"value\">\n                                        {{ getSaleableStockLevel(variant) }}\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"variant-form-input-row\">\n                                <div\n                                    class=\"out-of-stock-threshold-wrapper\"\n                                    [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\"\n                                >\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.out-of-stock-threshold' | translate\n                                        }}<vdr-help-tooltip\n                                            [content]=\"'catalog.out-of-stock-threshold-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"flex\">\n                                        <clr-input-container>\n                                            <input\n                                                clrInput\n                                                type=\"number\"\n                                                [formControl]=\"formGroup.get('outOfStockThreshold')\"\n                                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                                [vdrDisabled]=\"\n                                                    formGroup.get('useGlobalOutOfStockThreshold')?.value !==\n                                                        false || inventoryIsNotTracked(formGroup)\n                                                \"\n                                            />\n                                        </clr-input-container>\n                                        <clr-toggle-wrapper>\n                                            <input\n                                                type=\"checkbox\"\n                                                clrToggle\n                                                name=\"useGlobalOutOfStockThreshold\"\n                                                formControlName=\"useGlobalOutOfStockThreshold\"\n                                                [vdrDisabled]=\"\n                                                    !(updatePermission | hasPermission) ||\n                                                    inventoryIsNotTracked(formGroup)\n                                                \"\n                                            />\n                                            <label\n                                                >{{ 'catalog.use-global-value' | translate }} ({{\n                                                    globalOutOfStockThreshold\n                                                }})</label\n                                            >\n                                        </clr-toggle-wrapper>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"custom-fields\">\n                            <div class=\"variant-form-input-row\">\n                                <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                                    <!--<label>{{ 'common.custom-fields' | translate }}</label>-->\n                                    <ng-container *ngFor=\"let customField of customFields\">\n                                        <vdr-custom-field-control\n                                            *ngIf=\"formGroup.get(['customFields', customField.name])\"\n                                            entityName=\"ProductVariant\"\n                                            [compact]=\"true\"\n                                            [customFieldsFormGroup]=\"formGroup.get('customFields')\"\n                                            [readonly]=\"!(updatePermission | hasPermission)\"\n                                            [customField]=\"customField\"\n                                        ></vdr-custom-field-control>\n                                    </ng-container>\n                                </section>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card-block\">\n                <div class=\"options-facets\">\n                    <vdr-entity-info [entity]=\"variant\"></vdr-entity-info>\n                    <div *ngIf=\"variant.options.length\">\n                        <div class=\"options\">\n                            <vdr-chip\n                                *ngFor=\"let option of variant.options | sort: 'groupId'\"\n                                [colorFrom]=\"optionGroupName(option.groupId)\"\n                                [invert]=\"true\"\n                                (iconClick)=\"editOption(option)\"\n                                [icon]=\"(updatePermission | hasPermission) && 'pencil'\"\n                            >\n                                <span class=\"option-group-name\">{{ optionGroupName(option.groupId) }}</span>\n                                {{ optionName(option) }}\n                            </vdr-chip>\n                        </div>\n                    </div>\n                    <div class=\"flex-spacer\"></div>\n                    <div class=\"facets\">\n                        <vdr-facet-value-chip\n                            *ngFor=\"let facetValue of existingFacetValues(variant)\"\n                            [facetValue]=\"facetValue\"\n                            [removable]=\"updatePermission | hasPermission\"\n                            (remove)=\"removeFacetValue(variant, facetValue.id)\"\n                        ></vdr-facet-value-chip>\n                        <vdr-facet-value-chip\n                            *ngFor=\"let facetValue of pendingFacetValues(variant)\"\n                            [facetValue]=\"facetValue\"\n                            [removable]=\"updatePermission | hasPermission\"\n                            (remove)=\"removeFacetValue(variant, facetValue.id)\"\n                        ></vdr-facet-value-chip>\n                        <button\n                            *vdrIfPermissions=\"updatePermission\"\n                            class=\"btn btn-sm btn-secondary\"\n                            (click)=\"selectFacetValueClick.emit([variant.id])\"\n                        >\n                            <clr-icon shape=\"plus\"></clr-icon>\n                            {{ 'catalog.add-facets' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <ng-container *vdrIfMultichannel>\n                <div class=\"card-block\" *vdrIfDefaultChannelActive>\n                    <div class=\"flex channel-assignment\">\n                        <ng-container *ngFor=\"let channel of variant.channels\">\n                            <vdr-chip\n                                *ngIf=\"!isDefaultChannel(channel.code)\"\n                                icon=\"times-circle\"\n                                [title]=\"'catalog.remove-from-channel' | translate\"\n                                (iconClick)=\"\n                                    removeFromChannel.emit({ channelId: channel.id, variant: variant })\n                                \"\n                            >\n                                <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                                {{ channel.code | channelCodeToLabel }}\n                            </vdr-chip>\n                        </ng-container>\n                        <button class=\"btn btn-sm\" (click)=\"assignToChannel.emit(variant)\">\n                            <clr-icon shape=\"layers\"></clr-icon>\n                            {{ 'catalog.assign-to-channel' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div class=\"table-footer\">\n        <vdr-items-per-page-controls [(itemsPerPage)]=\"pagination.itemsPerPage\"></vdr-items-per-page-controls>\n\n        <vdr-pagination-controls\n            [currentPage]=\"pagination.currentPage\"\n            [itemsPerPage]=\"pagination.itemsPerPage\"\n            (pageChange)=\"pagination.currentPage = $event\"\n        ></vdr-pagination-controls>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".with-selected{display:flex;min-height:52px;align-items:center;border:1px solid var(--color-component-border-100);border-radius:3px;padding:6px 18px}.with-selected>label,.with-selected vdr-select-toggle{margin-right:12px}.variant-container{transition:background-color .2s;min-height:330px}.variant-container.disabled{background-color:var(--color-component-bg-200)}.variant-container .header-row{display:flex;align-items:center;flex-wrap:wrap}.variant-container .variant-body{display:flex;flex-direction:column}@media screen and (min-width:768px){.variant-container .variant-body{flex-direction:row}}.variant-container .details{display:flex;flex-direction:column;flex:1;margin-right:12px}@media screen and (min-width:768px){.variant-container .details{flex-direction:row;height:36px}}.variant-container .details .name{flex:1}.variant-container .details .name ::ng-deep .clr-control-container{width:100%}.variant-container .details .name ::ng-deep .clr-control-container input.clr-input{min-width:100%}.variant-container .details .sku{width:160px;margin-right:20px;flex:0}.variant-container .details ::ng-deep .name input{min-width:300px}.variant-container .right-controls{display:flex}.variant-container .tax-category-label{margin-top:3px}.variant-container .variant-form-inputs{flex:1;display:flex;flex-direction:column}@media screen and (min-width:768px){.variant-container .variant-form-inputs{flex-direction:row}}.variant-container .variant-form-input-row{display:flex;flex-wrap:wrap}@media screen and (min-width:768px){.variant-container .variant-form-input-row{margin:0 6px 8px 24px}}.variant-container .variant-form-input-row>*{margin-right:24px;margin-bottom:24px}.variant-container .track-inventory-toggle{margin-top:22px}.variant-container .clr-form-control{margin-top:0}.variant-container .facets{display:flex;align-items:center}.variant-container .pricing{display:flex}.variant-container .pricing>div{margin-right:12px}.variant-container .option-group-name{color:var(--color-text-200);text-transform:uppercase;font-size:10px;margin-right:3px;height:11px}.variant-container .options-facets{display:flex;color:var(--color-grey-400)}.channel-assignment{justify-content:flex-end}.channel-assignment .btn{margin:6px 12px 6px 0}.out-of-stock-threshold-wrapper{display:flex;flex-direction:column}.out-of-stock-threshold-wrapper clr-toggle-wrapper{margin-left:24px}.inventory-untracked{opacity:.5}.table-footer{display:flex;align-items:baseline;justify-content:space-between;margin-top:6px}"]
            },] }
];
ProductVariantsListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ModalService },
    { type: DataService }
];
ProductVariantsListComponent.propDecorators = {
    formArray: [{ type: Input, args: ['productVariantsFormArray',] }],
    variants: [{ type: Input }],
    channelPriceIncludesTax: [{ type: Input }],
    taxCategories: [{ type: Input }],
    facets: [{ type: Input }],
    optionGroups: [{ type: Input }],
    customFields: [{ type: Input }],
    customOptionFields: [{ type: Input }],
    activeLanguage: [{ type: Input }],
    pendingAssetChanges: [{ type: Input }],
    assignToChannel: [{ type: Output }],
    removeFromChannel: [{ type: Output }],
    assetChange: [{ type: Output }],
    selectionChange: [{ type: Output }],
    selectFacetValueClick: [{ type: Output }],
    updateProductOption: [{ type: Output }]
};

class ProductVariantsTableComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.formGroupMap = new Map();
        this.updatePermission = [Permission.UpdateCatalog, Permission.UpdateProduct];
    }
    ngOnInit() {
        this.subscription = this.formArray.valueChanges
            .pipe(map(value => value.length), debounceTime(1), distinctUntilChanged())
            .subscribe(() => {
            this.buildFormGroupMap();
        });
        this.buildFormGroupMap();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    getFeaturedAsset(variant) {
        var _a;
        return ((_a = this.pendingAssetChanges[variant.id]) === null || _a === void 0 ? void 0 : _a.featuredAsset) || variant.featuredAsset;
    }
    optionGroupName(optionGroupId) {
        const group = this.optionGroups.find(g => g.id === optionGroupId);
        return group && group.name;
    }
    buildFormGroupMap() {
        this.formGroupMap.clear();
        for (const controlGroup of this.formArray.controls) {
            this.formGroupMap.set(controlGroup.value.id, controlGroup);
        }
        this.changeDetector.markForCheck();
    }
}
ProductVariantsTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-variants-table',
                template: "<vdr-data-table [items]=\"variants\">\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'catalog.sku' | translate }}</vdr-dt-column>\n    <ng-container *ngFor=\"let optionGroup of optionGroups | sort: 'id'\">\n        <vdr-dt-column>{{ optionGroup.name }}</vdr-dt-column>\n    </ng-container>\n    <vdr-dt-column>{{ 'catalog.price' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'catalog.stock-on-hand' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <ng-template let-variant=\"item\" let-i=\"index\">\n        <ng-container *ngIf=\"formGroupMap.get(variant.id) as formGroup\" [formGroup]=\"formGroup\">\n            <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <div class=\"card-img\">\n                    <div class=\"featured-asset\">\n                        <img\n                            *ngIf=\"getFeaturedAsset(variant) as featuredAsset; else placeholder\"\n                            [src]=\"featuredAsset | assetPreview: 'tiny'\"\n                        />\n                        <ng-template #placeholder>\n                            <div class=\"placeholder\">\n                                <clr-icon shape=\"image\" size=\"48\"></clr-icon>\n                            </div>\n                        </ng-template>\n                    </div>\n                </div>\n            </td>\n            <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"text\"\n                        formControlName=\"name\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                        [placeholder]=\"'common.name' | translate\"\n                    />\n                </clr-input-container>\n            </td>\n            <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"text\"\n                        formControlName=\"sku\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                        [placeholder]=\"'catalog.sku' | translate\"\n                    />\n                </clr-input-container>\n            </td>\n            <ng-container *ngFor=\"let option of variant.options | sort: 'groupId'\">\n                <td\n                    class=\"left align-middle\"\n                    [class.disabled]=\"!formGroup.get('enabled')!.value\"\n                    [style.color]=\"optionGroupName(option.groupId) | stringToColor\"\n                >\n                    {{ option.name }}\n                </td>\n            </ng-container>\n            <td class=\"left align-middle price\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-input-container>\n                    <vdr-currency-input\n                        *ngIf=\"!channelPriceIncludesTax\"\n                        clrInput\n                        [currencyCode]=\"variant.currencyCode\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                        formControlName=\"price\"\n                    ></vdr-currency-input>\n                    <vdr-currency-input\n                        *ngIf=\"channelPriceIncludesTax\"\n                        clrInput\n                        [currencyCode]=\"variant.currencyCode\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                        formControlName=\"priceWithTax\"\n                    ></vdr-currency-input>\n                </clr-input-container>\n            </td>\n            <td class=\"left align-middle stock\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"number\"\n                        min=\"0\"\n                        step=\"1\"\n                        formControlName=\"stockOnHand\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                    />\n                </clr-input-container>\n            </td>\n            <td class=\"left align-middle stock\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-toggle-wrapper>\n                    <input\n                        type=\"checkbox\"\n                        clrToggle\n                        name=\"enabled\"\n                        formControlName=\"enabled\"\n                        [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    />\n                </clr-toggle-wrapper>\n            </td>\n        </ng-container>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".placeholder{color:var(--color-grey-300)}.price input,.stock input{max-width:96px}td{transition:background-color .2s}td.disabled{background-color:var(--color-component-bg-200)}"]
            },] }
];
ProductVariantsTableComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
ProductVariantsTableComponent.propDecorators = {
    formArray: [{ type: Input, args: ['productVariantsFormArray',] }],
    variants: [{ type: Input }],
    channelPriceIncludesTax: [{ type: Input }],
    optionGroups: [{ type: Input }],
    pendingAssetChanges: [{ type: Input }]
};

class VariantPriceDetailComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.priceChange$ = new BehaviorSubject(0);
        this.taxCategoryIdChange$ = new BehaviorSubject('');
    }
    ngOnInit() {
        const taxRates$ = this.dataService.settings
            .getTaxRates(999, 0, 'cache-first')
            .mapStream(data => data.taxRates.items);
        const activeChannel$ = this.dataService.settings
            .getActiveChannel('cache-first')
            .refetchOnChannelChange()
            .mapStream(data => data.activeChannel);
        this.taxRate$ = combineLatest(activeChannel$, taxRates$, this.taxCategoryIdChange$).pipe(map(([channel, taxRates, taxCategoryId]) => {
            const defaultTaxZone = channel.defaultTaxZone;
            if (!defaultTaxZone) {
                return 0;
            }
            const applicableRate = taxRates.find(taxRate => taxRate.zone.id === defaultTaxZone.id && taxRate.category.id === taxCategoryId);
            if (!applicableRate) {
                return 0;
            }
            return applicableRate.value;
        }));
        this.grossPrice$ = combineLatest(this.taxRate$, this.priceChange$).pipe(map(([taxRate, price]) => {
            return Math.round(price * ((100 + taxRate) / 100));
        }));
    }
    ngOnChanges(changes) {
        if ('price' in changes) {
            this.priceChange$.next(changes.price.currentValue);
        }
        if ('taxCategoryId' in changes) {
            this.taxCategoryIdChange$.next(changes.taxCategoryId.currentValue);
        }
    }
}
VariantPriceDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-variant-price-detail',
                template: "<label class=\"clr-control-label\">{{ 'catalog.taxes' | translate }}</label>\n<div *ngIf=\"priceIncludesTax\" class=\"value\">\n    {{ 'catalog.price-includes-tax-at' | translate: { rate: taxRate$ | async } }}\n</div>\n<div *ngIf=\"!priceIncludesTax\" class=\"value\">\n    {{\n        'catalog.price-with-tax-in-default-zone'\n            | translate: { price: grossPrice$ | async | localeCurrency: currencyCode, rate: taxRate$ | async }\n    }}\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column}.value{margin-top:3px}"]
            },] }
];
VariantPriceDetailComponent.ctorParameters = () => [
    { type: DataService }
];
VariantPriceDetailComponent.propDecorators = {
    priceIncludesTax: [{ type: Input }],
    price: [{ type: Input }],
    currencyCode: [{ type: Input }],
    taxCategoryId: [{ type: Input }]
};

class CatalogModule {
}
CatalogModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(catalogRoutes)],
                exports: [],
                declarations: [
                    ProductListComponent,
                    ProductDetailComponent,
                    FacetListComponent,
                    FacetDetailComponent,
                    GenerateProductVariantsComponent,
                    ProductVariantsListComponent,
                    ApplyFacetDialogComponent,
                    AssetListComponent,
                    ProductAssetsComponent,
                    VariantPriceDetailComponent,
                    CollectionListComponent,
                    CollectionDetailComponent,
                    CollectionTreeComponent,
                    CollectionTreeNodeComponent,
                    CollectionContentsComponent,
                    ProductVariantsTableComponent,
                    ProductSearchInputComponent,
                    OptionValueInputComponent,
                    UpdateProductOptionDialogComponent,
                    ProductVariantsEditorComponent,
                    AssignProductsToChannelDialogComponent,
                    AssetDetailComponent,
                ],
            },] }
];

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { ApplyFacetDialogComponent, AssetDetailComponent, AssetListComponent, AssetResolver, AssignProductsToChannelDialogComponent, CatalogModule, CollectionContentsComponent, CollectionDetailComponent, CollectionListComponent, CollectionResolver, CollectionTreeComponent, CollectionTreeNodeComponent, FacetDetailComponent, FacetListComponent, FacetResolver, GenerateProductVariantsComponent, GeneratedVariant, OPTION_VALUE_INPUT_VALUE_ACCESSOR, OptionValueInputComponent, ProductAssetsComponent, ProductDetailComponent, ProductDetailService, ProductListComponent, ProductResolver, ProductSearchInputComponent, ProductVariantsEditorComponent, ProductVariantsListComponent, ProductVariantsResolver, ProductVariantsTableComponent, UpdateProductOptionDialogComponent, VariantPriceDetailComponent, arrayToTree, assetBreadcrumb, catalogRoutes, collectionBreadcrumb, facetBreadcrumb, productBreadcrumb, productVariantEditorBreadcrumb, replaceLast, ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
//# sourceMappingURL=vendure-admin-ui-catalog.js.map
