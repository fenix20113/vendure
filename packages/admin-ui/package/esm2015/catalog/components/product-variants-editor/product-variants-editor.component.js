import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataService, getDefaultUiLanguage, ModalService, NotificationService, } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { pick } from '@vendure/common/lib/pick';
import { generateAllCombinations, notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { EMPTY, forkJoin, of } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProductDetailService } from '../../providers/product-detail/product-detail.service';
export class GeneratedVariant {
    constructor(config) {
        for (const key of Object.keys(config)) {
            this[key] = config[key];
        }
    }
}
export class ProductVariantsEditorComponent {
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
            ? _('catalog.default-variant')
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
            title: _('catalog.confirm-delete-product-variant'),
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response ? this.productDetailService.deleteProductVariant(id, this.product.id) : EMPTY), switchMap(() => this.reFetchProduct(null)))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'ProductVariant',
            });
            this.initOptionsAndVariants();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
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
                this.notificationService.success(_('catalog.created-new-variants-success'), {
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
                title: _('catalog.confirm-adding-options-delete-default-title'),
                body: _('catalog.confirm-adding-options-delete-default-body'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('catalog.delete-default-variant'), returnValue: true },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50cy1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jYXRhbG9nL3NyYy9jb21wb25lbnRzL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFJSCxXQUFXLEVBRVgsb0JBQW9CLEVBR3BCLFlBQVksRUFDWixtQkFBbUIsR0FFdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFFN0YsTUFBTSxPQUFPLGdCQUFnQjtJQVV6QixZQUFZLE1BQWlDO1FBQ3pDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcs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QUFFLENBQTBCO1FBQzFFLFNBQVMsY0FBYyxDQUFDLENBQTBCO1lBQzlDLE9BQU8sQ0FBQztpQkFDSCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUNoQixJQUFJLEVBQUU7aUJBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFFRCxPQUFPLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7O1lBelZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2Qyw0OUpBQXVEO2dCQUV2RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTzs7YUFDbkQ7OztZQTdDUSxjQUFjO1lBTW5CLFdBQVc7WUFlTixvQkFBb0I7WUFUekIsbUJBQW1CO1lBRG5CLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQ3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwLFxuICAgIENyZWF0ZVByb2R1Y3RPcHRpb25JbnB1dCxcbiAgICBDdXJyZW5jeUNvZGUsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgRGVhY3RpdmF0ZUF3YXJlLFxuICAgIGdldERlZmF1bHRVaUxhbmd1YWdlLFxuICAgIEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucyxcbiAgICBMYW5ndWFnZUNvZGUsXG4gICAgTW9kYWxTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgUHJvZHVjdE9wdGlvbkdyb3VwV2l0aE9wdGlvbnNGcmFnbWVudCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBub3JtYWxpemVTdHJpbmcgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL25vcm1hbGl6ZS1zdHJpbmcnO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvcGljayc7XG5pbXBvcnQgeyBnZW5lcmF0ZUFsbENvbWJpbmF0aW9ucywgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgRU1QVFksIGZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFByb2R1Y3REZXRhaWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb2R1Y3QtZGV0YWlsL3Byb2R1Y3QtZGV0YWlsLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVkVmFyaWFudCB7XG4gICAgaXNEZWZhdWx0OiBib29sZWFuO1xuICAgIG9wdGlvbnM6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBpZD86IHN0cmluZyB9PjtcbiAgICBwcm9kdWN0VmFyaWFudElkPzogc3RyaW5nO1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgZXhpc3Rpbmc6IGJvb2xlYW47XG4gICAgc2t1OiBzdHJpbmc7XG4gICAgcHJpY2U6IG51bWJlcjtcbiAgICBzdG9jazogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBQYXJ0aWFsPEdlbmVyYXRlZFZhcmlhbnQ+KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGNvbmZpZykpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IGNvbmZpZ1trZXldO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1wcm9kdWN0LXZhcmlhbnRzLWVkaXRvcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9kdWN0LXZhcmlhbnRzLWVkaXRvci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFZhcmlhbnRzRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEZWFjdGl2YXRlQXdhcmUge1xuICAgIGZvcm1WYWx1ZUNoYW5nZWQgPSBmYWxzZTtcbiAgICBnZW5lcmF0ZWRWYXJpYW50czogR2VuZXJhdGVkVmFyaWFudFtdID0gW107XG4gICAgb3B0aW9uR3JvdXBzOiBBcnJheTx7XG4gICAgICAgIGlkPzogc3RyaW5nO1xuICAgICAgICBpc05ldzogYm9vbGVhbjtcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICB2YWx1ZXM6IEFycmF5PHtcbiAgICAgICAgICAgIGlkPzogc3RyaW5nO1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgbG9ja2VkOiBib29sZWFuO1xuICAgICAgICB9PjtcbiAgICB9PjtcbiAgICBwcm9kdWN0OiBHZXRQcm9kdWN0VmFyaWFudE9wdGlvbnMuUHJvZHVjdDtcbiAgICBjdXJyZW5jeUNvZGU6IEN1cnJlbmN5Q29kZTtcbiAgICBwcml2YXRlIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwcm9kdWN0RGV0YWlsU2VydmljZTogUHJvZHVjdERldGFpbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0T3B0aW9uc0FuZFZhcmlhbnRzKCk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2VDb2RlID1cbiAgICAgICAgICAgICh0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgnbGFuZycpIGFzIExhbmd1YWdlQ29kZSkgfHwgZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UoKTtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5nZXRBY3RpdmVDaGFubmVsKCkuc2luZ2xlJC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbmN5Q29kZSA9IGRhdGEuYWN0aXZlQ2hhbm5lbC5jdXJyZW5jeUNvZGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRm9ybUNoYW5nZWQodmFyaWFudEluZm86IEdlbmVyYXRlZFZhcmlhbnQpIHtcbiAgICAgICAgdGhpcy5mb3JtVmFsdWVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgdmFyaWFudEluZm8uZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgY2FuRGVhY3RpdmF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmZvcm1WYWx1ZUNoYW5nZWQ7XG4gICAgfVxuXG4gICAgZ2V0VmFyaWFudHNUb0FkZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkVmFyaWFudHMuZmlsdGVyKHYgPT4gIXYuZXhpc3RpbmcgJiYgdi5lbmFibGVkKTtcbiAgICB9XG5cbiAgICBnZXRWYXJpYW50TmFtZSh2YXJpYW50OiBHZW5lcmF0ZWRWYXJpYW50KSB7XG4gICAgICAgIHJldHVybiB2YXJpYW50Lm9wdGlvbnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IF8oJ2NhdGFsb2cuZGVmYXVsdC12YXJpYW50JylcbiAgICAgICAgICAgIDogdmFyaWFudC5vcHRpb25zLm1hcChvID0+IG8ubmFtZSkuam9pbignICcpO1xuICAgIH1cblxuICAgIGFkZE9wdGlvbigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25Hcm91cHMucHVzaCh7XG4gICAgICAgICAgICBpc05ldzogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVWYXJpYW50cygpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5vcHRpb25Hcm91cHMubWFwKGcgPT4gZy52YWx1ZXMpO1xuICAgICAgICBjb25zdCBwcmV2aW91c1ZhcmlhbnRzID0gdGhpcy5nZW5lcmF0ZWRWYXJpYW50cztcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkVmFyaWFudEZhY3RvcnkgPSAoXG4gICAgICAgICAgICBpc0RlZmF1bHQ6IGJvb2xlYW4sXG4gICAgICAgICAgICBvcHRpb25zOiBHZW5lcmF0ZWRWYXJpYW50WydvcHRpb25zJ10sXG4gICAgICAgICAgICBleGlzdGluZ1ZhcmlhbnQ/OiBHZXRQcm9kdWN0VmFyaWFudE9wdGlvbnMuVmFyaWFudHMsXG4gICAgICAgICk6IEdlbmVyYXRlZFZhcmlhbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5nZXRWYXJpYW50UHJvdG90eXBlKG9wdGlvbnMsIHByZXZpb3VzVmFyaWFudHMpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0ZWRWYXJpYW50KHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBleGlzdGluZzogISFleGlzdGluZ1ZhcmlhbnQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnRJZDogZXhpc3RpbmdWYXJpYW50Py5pZCxcbiAgICAgICAgICAgICAgICBpc0RlZmF1bHQsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICAgICBwcmljZTogZXhpc3RpbmdWYXJpYW50Py5wcmljZSA/PyBwcm90b3R5cGUucHJpY2UsXG4gICAgICAgICAgICAgICAgc2t1OiBleGlzdGluZ1ZhcmlhbnQ/LnNrdSA/PyBwcm90b3R5cGUuc2t1LFxuICAgICAgICAgICAgICAgIHN0b2NrOiBleGlzdGluZ1ZhcmlhbnQ/LnN0b2NrT25IYW5kID8/IHByb3RvdHlwZS5zdG9jayxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdlbmVyYXRlZFZhcmlhbnRzID0gZ3JvdXBzLmxlbmd0aFxuICAgICAgICAgICAgPyBnZW5lcmF0ZUFsbENvbWJpbmF0aW9ucyhncm91cHMpLm1hcChvcHRpb25zID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVmFyaWFudCA9IHRoaXMucHJvZHVjdC52YXJpYW50cy5maW5kKHYgPT5cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNBcmVFcXVhbCh2Lm9wdGlvbnMsIG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZWRWYXJpYW50RmFjdG9yeShmYWxzZSwgb3B0aW9ucywgZXhpc3RpbmdWYXJpYW50KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogW2dlbmVyYXRlZFZhcmlhbnRGYWN0b3J5KHRydWUsIFtdLCB0aGlzLnByb2R1Y3QudmFyaWFudHNbMF0pXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG9uZSBvZiB0aGUgZXhpc3RpbmcgdmFyaWFudHMgdG8gYmFzZSB0aGUgbmV3bHktZ2VuZXJhdGVkIHZhcmlhbnQnc1xuICAgICAqIGRldGFpbHMgb2ZmLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFyaWFudFByb3RvdHlwZShcbiAgICAgICAgb3B0aW9uczogR2VuZXJhdGVkVmFyaWFudFsnb3B0aW9ucyddLFxuICAgICAgICBwcmV2aW91c1ZhcmlhbnRzOiBHZW5lcmF0ZWRWYXJpYW50W10sXG4gICAgKTogUGljazxHZW5lcmF0ZWRWYXJpYW50LCAnc2t1JyB8ICdwcmljZScgfCAnc3RvY2snPiB7XG4gICAgICAgIGNvbnN0IHZhcmlhbnRzV2l0aFNpbWlsYXJPcHRpb25zID0gcHJldmlvdXNWYXJpYW50cy5maWx0ZXIodiA9PlxuICAgICAgICAgICAgb3B0aW9ucy5tYXAobyA9PiBvLm5hbWUpLmZpbHRlcihuYW1lID0+IHYub3B0aW9ucy5tYXAobyA9PiBvLm5hbWUpLmluY2x1ZGVzKG5hbWUpKSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHZhcmlhbnRzV2l0aFNpbWlsYXJPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBpY2socHJldmlvdXNWYXJpYW50c1swXSwgWydza3UnLCAncHJpY2UnLCAnc3RvY2snXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNrdTogJycsXG4gICAgICAgICAgICBwcmljZTogMCxcbiAgICAgICAgICAgIHN0b2NrOiAwLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRlbGV0ZVZhcmlhbnQoaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2NhdGFsb2cuY29uZmlybS1kZWxldGUtcHJvZHVjdC12YXJpYW50JyksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ2RhbmdlcicsIGxhYmVsOiBfKCdjb21tb24uZGVsZXRlJyksIHJldHVyblZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzcG9uc2UgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPyB0aGlzLnByb2R1Y3REZXRhaWxTZXJ2aWNlLmRlbGV0ZVByb2R1Y3RWYXJpYW50KGlkLCB0aGlzLnByb2R1Y3QuaWQpIDogRU1QVFksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5yZUZldGNoUHJvZHVjdChudWxsKSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdQcm9kdWN0VmFyaWFudCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zQW5kVmFyaWFudHMoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdQcm9kdWN0VmFyaWFudCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGNvbnN0IG5ld09wdGlvbkdyb3VwcyA9IHRoaXMub3B0aW9uR3JvdXBzXG4gICAgICAgICAgICAuZmlsdGVyKG9nID0+IG9nLmlzTmV3KVxuICAgICAgICAgICAgLm1hcChvZyA9PiAoe1xuICAgICAgICAgICAgICAgIG5hbWU6IG9nLm5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLmNvbmZpcm1EZWxldGlvbk9mRGVmYXVsdCgpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoKSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxTZXJ2aWNlLmNyZWF0ZVByb2R1Y3RPcHRpb25Hcm91cHMobmV3T3B0aW9uR3JvdXBzLCB0aGlzLmxhbmd1YWdlQ29kZSksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChjcmVhdGVkT3B0aW9uR3JvdXBzID0+IHRoaXMuYWRkT3B0aW9uR3JvdXBzVG9Qcm9kdWN0KGNyZWF0ZWRPcHRpb25Hcm91cHMpKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChjcmVhdGVkT3B0aW9uR3JvdXBzID0+IHRoaXMuYWRkTmV3T3B0aW9uc1RvR3JvdXBzKGNyZWF0ZWRPcHRpb25Hcm91cHMpKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChncm91cHNJZHMgPT4gdGhpcy5mZXRjaE9wdGlvbkdyb3Vwcyhncm91cHNJZHMpKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChncm91cHMgPT4gdGhpcy5jcmVhdGVOZXdQcm9kdWN0VmFyaWFudHMoZ3JvdXBzKSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAocmVzID0+IHRoaXMuZGVsZXRlRGVmYXVsdFZhcmlhbnQocmVzLmNyZWF0ZVByb2R1Y3RWYXJpYW50cykpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKHZhcmlhbnRzID0+IHRoaXMucmVGZXRjaFByb2R1Y3QodmFyaWFudHMpKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG5leHQ6IHZhcmlhbnRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtVmFsdWVDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NhdGFsb2cuY3JlYXRlZC1uZXctdmFyaWFudHMtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogdmFyaWFudHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9uc0FuZFZhcmlhbnRzKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlybURlbGV0aW9uT2ZEZWZhdWx0KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAodGhpcy5oYXNPbmx5RGVmYXVsdFZhcmlhbnQodGhpcy5wcm9kdWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdjYXRhbG9nLmNvbmZpcm0tYWRkaW5nLW9wdGlvbnMtZGVsZXRlLWRlZmF1bHQtdGl0bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogXygnY2F0YWxvZy5jb25maXJtLWFkZGluZy1vcHRpb25zLWRlbGV0ZS1kZWZhdWx0LWJvZHknKSxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NhdGFsb2cuZGVsZXRlLWRlZmF1bHQtdmFyaWFudCcpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzID09PSB0cnVlID8gb2YodHJ1ZSkgOiBFTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFzT25seURlZmF1bHRWYXJpYW50KHByb2R1Y3Q6IEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucy5Qcm9kdWN0KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBwcm9kdWN0LnZhcmlhbnRzLmxlbmd0aCA9PT0gMSAmJiBwcm9kdWN0Lm9wdGlvbkdyb3Vwcy5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRPcHRpb25Hcm91cHNUb1Byb2R1Y3QoXG4gICAgICAgIGNyZWF0ZWRPcHRpb25Hcm91cHM6IENyZWF0ZVByb2R1Y3RPcHRpb25Hcm91cC5DcmVhdGVQcm9kdWN0T3B0aW9uR3JvdXBbXSxcbiAgICApOiBPYnNlcnZhYmxlPENyZWF0ZVByb2R1Y3RPcHRpb25Hcm91cC5DcmVhdGVQcm9kdWN0T3B0aW9uR3JvdXBbXT4ge1xuICAgICAgICBpZiAoY3JlYXRlZE9wdGlvbkdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihcbiAgICAgICAgICAgICAgICBjcmVhdGVkT3B0aW9uR3JvdXBzLm1hcChvcHRpb25Hcm91cCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3QuYWRkT3B0aW9uR3JvdXBUb1Byb2R1Y3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiB0aGlzLnByb2R1Y3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25Hcm91cElkOiBvcHRpb25Hcm91cC5pZCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApLnBpcGUobWFwKCgpID0+IGNyZWF0ZWRPcHRpb25Hcm91cHMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZE5ld09wdGlvbnNUb0dyb3VwcyhcbiAgICAgICAgY3JlYXRlZE9wdGlvbkdyb3VwczogQ3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwLkNyZWF0ZVByb2R1Y3RPcHRpb25Hcm91cFtdLFxuICAgICk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICAgICAgY29uc3QgbmV3T3B0aW9uczogQ3JlYXRlUHJvZHVjdE9wdGlvbklucHV0W10gPSB0aGlzLm9wdGlvbkdyb3Vwc1xuICAgICAgICAgICAgLm1hcChvZyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3JlYXRlZEdyb3VwID0gY3JlYXRlZE9wdGlvbkdyb3Vwcy5maW5kKGNvZyA9PiBjb2cubmFtZSA9PT0gb2cubmFtZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE9wdGlvbkdyb3VwSWQgPSBjcmVhdGVkR3JvdXAgPyBjcmVhdGVkR3JvdXAuaWQgOiBvZy5pZDtcbiAgICAgICAgICAgICAgICBpZiAoIXByb2R1Y3RPcHRpb25Hcm91cElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGdldCBhIHByb2R1Y3RPcHRpb25Hcm91cElkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvZy52YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih2ID0+ICF2LmxvY2tlZClcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh2ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0T3B0aW9uR3JvdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IG5vcm1hbGl6ZVN0cmluZyh2Lm5hbWUsICctJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbnM6IFt7IG5hbWU6IHYubmFtZSwgbGFuZ3VhZ2VDb2RlOiB0aGlzLmxhbmd1YWdlQ29kZSB9XSxcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGZsYXQsIG9wdGlvbnMpID0+IFsuLi5mbGF0LCAuLi5vcHRpb25zXSwgW10pO1xuXG4gICAgICAgIGNvbnN0IGFsbEdyb3VwSWRzID0gW1xuICAgICAgICAgICAgLi4uY3JlYXRlZE9wdGlvbkdyb3Vwcy5tYXAoZyA9PiBnLmlkKSxcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9uR3JvdXBzLm1hcChnID0+IGcuaWQpLmZpbHRlcihub3ROdWxsT3JVbmRlZmluZWQpLFxuICAgICAgICBdO1xuXG4gICAgICAgIGlmIChuZXdPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKG5ld09wdGlvbnMubWFwKGlucHV0ID0+IHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5hZGRPcHRpb25Ub0dyb3VwKGlucHV0KSkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKCgpID0+IGFsbEdyb3VwSWRzKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YoYWxsR3JvdXBJZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaE9wdGlvbkdyb3Vwcyhncm91cHNJZHM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxQcm9kdWN0T3B0aW9uR3JvdXBXaXRoT3B0aW9uc0ZyYWdtZW50W10+IHtcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKFxuICAgICAgICAgICAgZ3JvdXBzSWRzLm1hcChpZCA9PlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdE9wdGlvbkdyb3VwKGlkKVxuICAgICAgICAgICAgICAgICAgICAubWFwU2luZ2xlKGRhdGEgPT4gZGF0YS5wcm9kdWN0T3B0aW9uR3JvdXApXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKGZpbHRlcihub3ROdWxsT3JVbmRlZmluZWQpKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVOZXdQcm9kdWN0VmFyaWFudHMoZ3JvdXBzOiBQcm9kdWN0T3B0aW9uR3JvdXBXaXRoT3B0aW9uc0ZyYWdtZW50W10pIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGdyb3Vwc1xuICAgICAgICAgICAgLmZpbHRlcihub3ROdWxsT3JVbmRlZmluZWQpXG4gICAgICAgICAgICAubWFwKG9nID0+IG9nLm9wdGlvbnMpXG4gICAgICAgICAgICAucmVkdWNlKChmbGF0LCBvKSA9PiBbLi4uZmxhdCwgLi4ub10sIFtdKTtcbiAgICAgICAgY29uc3QgdmFyaWFudHMgPSB0aGlzLmdlbmVyYXRlZFZhcmlhbnRzXG4gICAgICAgICAgICAuZmlsdGVyKHYgPT4gdi5lbmFibGVkICYmICF2LmV4aXN0aW5nKVxuICAgICAgICAgICAgLm1hcCh2ID0+ICh7XG4gICAgICAgICAgICAgICAgcHJpY2U6IHYucHJpY2UsXG4gICAgICAgICAgICAgICAgc2t1OiB2LnNrdSxcbiAgICAgICAgICAgICAgICBzdG9jazogdi5zdG9jayxcbiAgICAgICAgICAgICAgICBvcHRpb25JZHM6IHYub3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAubWFwKG5hbWUgPT4gb3B0aW9ucy5maW5kKG8gPT4gby5uYW1lID09PSBuYW1lLm5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgLm1hcChvID0+IG8uaWQpLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0RGV0YWlsU2VydmljZS5jcmVhdGVQcm9kdWN0VmFyaWFudHMoXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3QsXG4gICAgICAgICAgICB2YXJpYW50cyxcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlQ29kZSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlbGV0ZURlZmF1bHRWYXJpYW50PFQ+KGlucHV0OiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGlmICh0aGlzLmhhc09ubHlEZWZhdWx0VmFyaWFudCh0aGlzLnByb2R1Y3QpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVmYXVsdCBzaW5nbGUgcHJvZHVjdCB2YXJpYW50IGhhcyBiZWVuIHJlcGxhY2VkIGJ5IG11bHRpcGxlIHZhcmlhbnRzLFxuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSBvcmlnaW5hbCBkZWZhdWx0IHZhcmlhbnQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZVByb2R1Y3RWYXJpYW50KHRoaXMucHJvZHVjdC52YXJpYW50c1swXS5pZClcbiAgICAgICAgICAgICAgICAucGlwZShtYXAoKCkgPT4gaW5wdXQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihpbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlRmV0Y2hQcm9kdWN0PFQ+KGlucHV0OiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIC8vIFJlLWZldGNoIHRoZSBQcm9kdWN0IHRvIGZvcmNlIGFuIHVwZGF0ZSB0byB0aGUgdmlldy5cbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgnaWQnKTtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0LmdldFByb2R1Y3QoaWQpLnNpbmdsZSQucGlwZShtYXAoKCkgPT4gaW5wdXQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihpbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0T3B0aW9uc0FuZFZhcmlhbnRzKCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIC5nZXRQcm9kdWN0VmFyaWFudHNPcHRpb25zKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KCdpZCcpISlcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIC5tYXBTaW5nbGUoKHsgcHJvZHVjdCB9KSA9PiBwcm9kdWN0ISlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0ID0gcDtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkdyb3VwcyA9IHAub3B0aW9uR3JvdXBzLm1hcChvZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogb2cuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc05ldzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvZy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBvZy5vcHRpb25zLm1hcChvID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG8uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogby5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlVmFyaWFudHMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3B0aW9uc0FyZUVxdWFsKGE6IEFycmF5PHsgbmFtZTogc3RyaW5nIH0+LCBiOiBBcnJheTx7IG5hbWU6IHN0cmluZyB9Pik6IGJvb2xlYW4ge1xuICAgICAgICBmdW5jdGlvbiB0b09wdGlvblN0cmluZyhvOiBBcnJheTx7IG5hbWU6IHN0cmluZyB9Pikge1xuICAgICAgICAgICAgcmV0dXJuIG9cbiAgICAgICAgICAgICAgICAubWFwKHggPT4geC5uYW1lKVxuICAgICAgICAgICAgICAgIC5zb3J0KClcbiAgICAgICAgICAgICAgICAuam9pbignfCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvT3B0aW9uU3RyaW5nKGEpID09PSB0b09wdGlvblN0cmluZyhiKTtcbiAgICB9XG59XG4iXX0=