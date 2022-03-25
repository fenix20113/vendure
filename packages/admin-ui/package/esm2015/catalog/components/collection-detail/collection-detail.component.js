import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, createUpdatedTranslatable, DataService, encodeConfigArgValue, findTranslation, getConfigArgValue, ModalService, NotificationService, Permission, ServerConfigService, } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { CollectionContentsComponent } from '../collection-contents/collection-contents.component';
export class CollectionDetailComponent extends BaseDetailComponent {
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
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'Collection',
            });
            this.assetChanges = {};
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createCollection.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
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
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Collection',
            });
            this.contentsComponent.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jYXRhbG9nL3NyYy9jb21wb25lbnRzL2NvbGxlY3Rpb24tZGV0YWlsL2NvbGxlY3Rpb24tZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBR1QsU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFFSCxtQkFBbUIsRUFNbkIseUJBQXlCLEVBRXpCLFdBQVcsRUFDWCxvQkFBb0IsRUFDcEIsZUFBZSxFQUNmLGlCQUFpQixFQUVqQixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLFVBQVUsRUFDVixtQkFBbUIsR0FFdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBUW5HLE1BQU0sT0FBTyx5QkFDVCxTQUFRLG1CQUF3QztJQVVoRCxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNyQixtQkFBd0MsRUFDaEMsY0FBaUMsRUFDL0IsV0FBd0IsRUFDMUIsV0FBd0IsRUFDeEIsbUJBQXdDLEVBQ3hDLFlB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QUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUNwQixLQUFLLEVBQUUsb0JBQW9CLENBQUMsS0FBSyxDQUFDO2lCQUNyQyxDQUFDLENBQUM7YUFDTixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUF4UUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDJ5TUFBaUQ7Z0JBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBbEN3QixNQUFNO1lBQXRCLGNBQWM7WUFvQm5CLG1CQUFtQjtZQTNCbkIsaUJBQWlCO1lBbUJqQixXQUFXO1lBYkssV0FBVztZQW1CM0IsbUJBQW1CO1lBRG5CLFlBQVk7OztnQ0EyQlgsU0FBUyxTQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBBc3NldCxcbiAgICBCYXNlRGV0YWlsQ29tcG9uZW50LFxuICAgIENvbGxlY3Rpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uLFxuICAgIENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQsXG4gICAgQ3JlYXRlQ29sbGVjdGlvbklucHV0LFxuICAgIGNyZWF0ZVVwZGF0ZWRUcmFuc2xhdGFibGUsXG4gICAgQ3VzdG9tRmllbGRDb25maWcsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgZW5jb2RlQ29uZmlnQXJnVmFsdWUsXG4gICAgZmluZFRyYW5zbGF0aW9uLFxuICAgIGdldENvbmZpZ0FyZ1ZhbHVlLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBQZXJtaXNzaW9uLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgVXBkYXRlQ29sbGVjdGlvbklucHV0LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IG5vcm1hbGl6ZVN0cmluZyB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvbm9ybWFsaXplLXN0cmluZyc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbnRlbnRzQ29tcG9uZW50IH0gZnJvbSAnLi4vY29sbGVjdGlvbi1jb250ZW50cy9jb2xsZWN0aW9uLWNvbnRlbnRzLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNvbGxlY3Rpb24tZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29sbGVjdGlvbi1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbGxlY3Rpb24tZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25EZXRhaWxDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8Q29sbGVjdGlvbi5GcmFnbWVudD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuICAgIGFzc2V0Q2hhbmdlczogeyBhc3NldHM/OiBBc3NldFtdOyBmZWF0dXJlZEFzc2V0PzogQXNzZXQgfSA9IHt9O1xuICAgIGZpbHRlcnM6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbltdID0gW107XG4gICAgYWxsRmlsdGVyczogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbltdID0gW107XG4gICAgcmVhZG9ubHkgdXBkYXRlUGVybWlzc2lvbiA9IFtQZXJtaXNzaW9uLlVwZGF0ZUNhdGFsb2csIFBlcm1pc3Npb24uVXBkYXRlQ29sbGVjdGlvbl07XG4gICAgQFZpZXdDaGlsZCgnY29sbGVjdGlvbkNvbnRlbnRzJykgY29udGVudHNDb21wb25lbnQ6IENvbGxlY3Rpb25Db250ZW50c0NvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGUsIHJvdXRlciwgc2VydmVyQ29uZmlnU2VydmljZSwgZGF0YVNlcnZpY2UpO1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRDb25maWcoJ0NvbGxlY3Rpb24nKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBuYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgc2x1ZzogJycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkoW10pLFxuICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLnJlZHVjZSgoaGFzaCwgZmllbGQpID0+ICh7IC4uLmhhc2gsIFtmaWVsZC5uYW1lXTogJycgfSksIHt9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jb2xsZWN0aW9uLmdldENvbGxlY3Rpb25GaWx0ZXJzKCkuc2luZ2xlJC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWxsRmlsdGVycyA9IHJlcy5jb2xsZWN0aW9uRmlsdGVycztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGdldEZpbHRlckRlZmluaXRpb24oZmlsdGVyOiBDb25maWd1cmFibGVPcGVyYXRpb24pOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsRmlsdGVycy5maW5kKGYgPT4gZi5jb2RlID09PSBmaWx0ZXIuY29kZSk7XG4gICAgfVxuXG4gICAgY3VzdG9tRmllbGRJc1NldChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5kZXRhaWxGb3JtLmdldChbJ2N1c3RvbUZpZWxkcycsIG5hbWVdKTtcbiAgICB9XG5cbiAgICBhc3NldHNDaGFuZ2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFPYmplY3QudmFsdWVzKHRoaXMuYXNzZXRDaGFuZ2VzKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgY3JlYXRpbmcgYSBuZXcgQ29sbGVjdGlvbiwgYXV0b21hdGljYWxseSBnZW5lcmF0ZSB0aGUgc2x1ZyBiYXNlZCBvbiB0aGUgY29sbGVjdGlvbiBuYW1lLlxuICAgICAqL1xuICAgIHVwZGF0ZVNsdWcobmFtZVZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLmVudGl0eSQsIHRoaXMubGFuZ3VhZ2VDb2RlJClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbZW50aXR5LCBsYW5ndWFnZUNvZGVdKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2x1Z0NvbnRyb2wgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KFsnc2x1ZyddKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VHJhbnNsYXRpb24gPSBmaW5kVHJhbnNsYXRpb24oZW50aXR5LCBsYW5ndWFnZUNvZGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTbHVnSXNFbXB0eSA9ICFjdXJyZW50VHJhbnNsYXRpb24gfHwgIWN1cnJlbnRUcmFuc2xhdGlvbi5zbHVnO1xuICAgICAgICAgICAgICAgIGlmIChzbHVnQ29udHJvbCAmJiBzbHVnQ29udHJvbC5wcmlzdGluZSAmJiBjdXJyZW50U2x1Z0lzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2x1Z0NvbnRyb2wuc2V0VmFsdWUobm9ybWFsaXplU3RyaW5nKGAke25hbWVWYWx1ZX1gLCAnLScpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRGaWx0ZXIoY29sbGVjdGlvbkZpbHRlcjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcnNBcnJheSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2ZpbHRlcnMnKSBhcyBGb3JtQXJyYXk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyc0FycmF5LnZhbHVlLmZpbmRJbmRleChvID0+IG8uY29kZSA9PT0gY29sbGVjdGlvbkZpbHRlci5jb2RlKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgYXJnc0hhc2ggPSBjb2xsZWN0aW9uRmlsdGVyLmFyZ3MucmVkdWNlKFxuICAgICAgICAgICAgICAgIChvdXRwdXQsIGFyZykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ub3V0cHV0LFxuICAgICAgICAgICAgICAgICAgICBbYXJnLm5hbWVdOiBnZXRDb25maWdBcmdWYWx1ZShhcmcudmFsdWUpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGZpbHRlcnNBcnJheS5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCh7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvbGxlY3Rpb25GaWx0ZXIuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgYXJnczogYXJnc0hhc2gsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IGNvbGxlY3Rpb25GaWx0ZXIuY29kZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBjb2xsZWN0aW9uRmlsdGVyLmFyZ3MubWFwKGEgPT4gKHsgbmFtZTogYS5uYW1lLCB2YWx1ZTogZ2V0Q29uZmlnQXJnVmFsdWUoYS52YWx1ZSkgfSkpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVGaWx0ZXIoY29sbGVjdGlvbkZpbHRlcjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcnNBcnJheSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2ZpbHRlcnMnKSBhcyBGb3JtQXJyYXk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyc0FycmF5LnZhbHVlLmZpbmRJbmRleChvID0+IG8uY29kZSA9PT0gY29sbGVjdGlvbkZpbHRlci5jb2RlKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgZmlsdGVyc0FycmF5LnJlbW92ZUF0KGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV0YWlsRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5lbnRpdHkkLCB0aGlzLmxhbmd1YWdlQ29kZSQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChbY2F0ZWdvcnksIGxhbmd1YWdlQ29kZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldFVwZGF0ZWRDb2xsZWN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGUsXG4gICAgICAgICAgICAgICAgICAgICkgYXMgQ3JlYXRlQ29sbGVjdGlvbklucHV0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KCdwYXJlbnRJZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudElkID0gcGFyZW50SWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuY29sbGVjdGlvbi5jcmVhdGVDb2xsZWN0aW9uKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2V0Q2hhbmdlcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCBkYXRhLmNyZWF0ZUNvbGxlY3Rpb24uaWRdLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5lbnRpdHkkLCB0aGlzLmxhbmd1YWdlQ29kZSQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChbY2F0ZWdvcnksIGxhbmd1YWdlQ29kZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldFVwZGF0ZWRDb2xsZWN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGUsXG4gICAgICAgICAgICAgICAgICAgICkgYXMgVXBkYXRlQ29sbGVjdGlvbklucHV0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jb2xsZWN0aW9uLnVwZGF0ZUNvbGxlY3Rpb24oaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRDaGFuZ2VzID0ge307XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0NvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50c0NvbXBvbmVudC5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGNhbkRlYWN0aXZhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBzdXBlci5jYW5EZWFjdGl2YXRlKCkgJiYgIXRoaXMuYXNzZXRDaGFuZ2VzLmFzc2V0cyAmJiAhdGhpcy5hc3NldENoYW5nZXMuZmVhdHVyZWRBc3NldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gb24gY2hhbmdlcyB0byB0aGUgY2F0ZWdvcnkgb3IgY3VycmVudCBsYW5ndWFnZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc2V0Rm9ybVZhbHVlcyhlbnRpdHk6IENvbGxlY3Rpb24uRnJhZ21lbnQsIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUcmFuc2xhdGlvbiA9IGZpbmRUcmFuc2xhdGlvbihlbnRpdHksIGxhbmd1YWdlQ29kZSk7XG5cbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgbmFtZTogY3VycmVudFRyYW5zbGF0aW9uID8gY3VycmVudFRyYW5zbGF0aW9uLm5hbWUgOiAnJyxcbiAgICAgICAgICAgIHNsdWc6IGN1cnJlbnRUcmFuc2xhdGlvbiA/IGN1cnJlbnRUcmFuc2xhdGlvbi5zbHVnIDogJycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogY3VycmVudFRyYW5zbGF0aW9uID8gY3VycmVudFRyYW5zbGF0aW9uLmRlc2NyaXB0aW9uIDogJycsXG4gICAgICAgICAgICB2aXNpYmxlOiAhZW50aXR5LmlzUHJpdmF0ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZW50aXR5LmZpbHRlcnMuZm9yRWFjaChmID0+IHRoaXMuYWRkRmlsdGVyKGYpKTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21GaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21GaWVsZHNHcm91cCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoWydjdXN0b21GaWVsZHMnXSkgYXMgRm9ybUdyb3VwO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkRGVmIG9mIHRoaXMuY3VzdG9tRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRGVmLnR5cGUgPT09ICdsb2NhbGVTdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChjdXJyZW50VHJhbnNsYXRpb24gYXMgYW55KS5jdXN0b21GaWVsZHNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoZW50aXR5IGFzIGFueSkuY3VzdG9tRmllbGRzW2tleV07XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGN1c3RvbUZpZWxkc0dyb3VwLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBjYXRlZ29yeSBhbmQgdGhlIHZhbHVlIG9mIHRoZSBmb3JtLCB0aGlzIG1ldGhvZCBjcmVhdGVzIGFuIHVwZGF0ZWQgY29weSBvZiB0aGUgY2F0ZWdvcnkgd2hpY2hcbiAgICAgKiBjYW4gdGhlbiBiZSBwZXJzaXN0ZWQgdG8gdGhlIEFQSS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFVwZGF0ZWRDb2xsZWN0aW9uKFxuICAgICAgICBjYXRlZ29yeTogQ29sbGVjdGlvbi5GcmFnbWVudCxcbiAgICAgICAgZm9ybTogRm9ybUdyb3VwLFxuICAgICAgICBsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSxcbiAgICApOiBDcmVhdGVDb2xsZWN0aW9uSW5wdXQgfCBVcGRhdGVDb2xsZWN0aW9uSW5wdXQge1xuICAgICAgICBjb25zdCB1cGRhdGVkQ2F0ZWdvcnkgPSBjcmVhdGVVcGRhdGVkVHJhbnNsYXRhYmxlKHtcbiAgICAgICAgICAgIHRyYW5zbGF0YWJsZTogY2F0ZWdvcnksXG4gICAgICAgICAgICB1cGRhdGVkRmllbGRzOiBmb3JtLnZhbHVlLFxuICAgICAgICAgICAgY3VzdG9tRmllbGRDb25maWc6IHRoaXMuY3VzdG9tRmllbGRzLFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgZGVmYXVsdFRyYW5zbGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGNhdGVnb3J5Lm5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgc2x1ZzogY2F0ZWdvcnkuc2x1ZyB8fCAnJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogY2F0ZWdvcnkuZGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnVwZGF0ZWRDYXRlZ29yeSxcbiAgICAgICAgICAgIGFzc2V0SWRzOiB0aGlzLmFzc2V0Q2hhbmdlcy5hc3NldHM/Lm1hcChhID0+IGEuaWQpLFxuICAgICAgICAgICAgZmVhdHVyZWRBc3NldElkOiB0aGlzLmFzc2V0Q2hhbmdlcy5mZWF0dXJlZEFzc2V0Py5pZCxcbiAgICAgICAgICAgIGlzUHJpdmF0ZTogIWZvcm0udmFsdWUudmlzaWJsZSxcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMubWFwT3BlcmF0aW9uc1RvSW5wdXRzKHRoaXMuZmlsdGVycywgdGhpcy5kZXRhaWxGb3JtLnZhbHVlLmZpbHRlcnMpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gYXJyYXkgb2YgY29uZGl0aW9ucyBvciBhY3Rpb25zIHRvIHRoZSBpbnB1dCBmb3JtYXQgZXhwZWN0ZWQgYnkgdGhlIEdyYXBoUUwgQVBJLlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFwT3BlcmF0aW9uc1RvSW5wdXRzKFxuICAgICAgICBvcGVyYXRpb25zOiBDb25maWd1cmFibGVPcGVyYXRpb25bXSxcbiAgICAgICAgZm9ybVZhbHVlT3BlcmF0aW9uczogYW55LFxuICAgICk6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbklucHV0W10ge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9ucy5tYXAoKG8sIGkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29kZTogby5jb2RlLFxuICAgICAgICAgICAgICAgIGFyZ3VtZW50czogT2JqZWN0LnZhbHVlcyhmb3JtVmFsdWVPcGVyYXRpb25zW2ldLmFyZ3MpLm1hcCgodmFsdWU6IGFueSwgaikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogby5hcmdzW2pdLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlbmNvZGVDb25maWdBcmdWYWx1ZSh2YWx1ZSksXG4gICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19