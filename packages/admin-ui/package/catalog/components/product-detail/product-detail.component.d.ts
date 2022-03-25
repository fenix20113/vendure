import { Location } from '@angular/common';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset, BaseDetailComponent, CustomFieldConfig, DataService, FacetWithValues, GlobalFlag, LanguageCode, ModalService, NotificationService, ProductWithVariants, ServerConfigService, TaxCategory, UpdateProductOptionInput } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { ProductDetailService } from '../../providers/product-detail/product-detail.service';
import { CreateProductVariantsConfig } from '../generate-product-variants/generate-product-variants.component';
import { VariantAssetChange } from '../product-variants-list/product-variants-list.component';
export declare type TabName = 'details' | 'variants';
export interface VariantFormValue {
    id: string;
    enabled: boolean;
    sku: string;
    name: string;
    price: number;
    priceWithTax: number;
    taxCategoryId: string;
    stockOnHand: number;
    useGlobalOutOfStockThreshold: boolean;
    outOfStockThreshold: number;
    trackInventory: GlobalFlag;
    facetValueIds: string[];
    customFields?: any;
}
export interface SelectedAssets {
    assets?: Asset[];
    featuredAsset?: Asset;
}
export declare class ProductDetailComponent extends BaseDetailComponent<ProductWithVariants.Fragment> implements OnInit, OnDestroy {
    private productDetailService;
    private formBuilder;
    private modalService;
    private notificationService;
    protected dataService: DataService;
    private location;
    private changeDetector;
    activeTab$: Observable<TabName>;
    product$: Observable<ProductWithVariants.Fragment>;
    variants$: Observable<ProductWithVariants.Variants[]>;
    taxCategories$: Observable<TaxCategory.Fragment[]>;
    customFields: CustomFieldConfig[];
    customVariantFields: CustomFieldConfig[];
    customOptionGroupFields: CustomFieldConfig[];
    customOptionFields: CustomFieldConfig[];
    detailForm: FormGroup;
    filterInput: FormControl;
    assetChanges: SelectedAssets;
    variantAssetChanges: {
        [variantId: string]: SelectedAssets;
    };
    productChannels$: Observable<ProductWithVariants.Channels[]>;
    facetValues$: Observable<ProductWithVariants.FacetValues[]>;
    facets$: Observable<FacetWithValues.Fragment[]>;
    selectedVariantIds: string[];
    variantDisplayMode: 'card' | 'table';
    createVariantsConfig: CreateProductVariantsConfig;
    channelPriceIncludesTax$: Observable<boolean>;
    constructor(route: ActivatedRoute, router: Router, serverConfigService: ServerConfigService, productDetailService: ProductDetailService, formBuilder: FormBuilder, modalService: ModalService, notificationService: NotificationService, dataService: DataService, location: Location, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    navigateToTab(tabName: TabName): void;
    isDefaultChannel(channelCode: string): boolean;
    assignToChannel(): void;
    removeFromChannel(channelId: string): void;
    assignVariantToChannel(variant: ProductWithVariants.Variants): import("rxjs").Subscription;
    removeVariantFromChannel({ channelId, variant, }: {
        channelId: string;
        variant: ProductWithVariants.Variants;
    }): void;
    customFieldIsSet(name: string): boolean;
    assetsChanged(): boolean;
    variantAssetsChanged(): boolean;
    variantAssetChange(event: VariantAssetChange): void;
    /**
     * If creating a new product, automatically generate the slug based on the product name.
     */
    updateSlug(nameValue: string): void;
    selectProductFacetValue(): void;
    updateProductOption(input: UpdateProductOptionInput & {
        autoUpdate: boolean;
    }): void;
    removeProductFacetValue(facetValueId: string): void;
    /**
     * Opens a dialog to select FacetValues to apply to the select ProductVariants.
     */
    selectVariantFacetValue(selectedVariantIds: string[]): void;
    variantsToCreateAreValid(): boolean;
    private displayFacetValueModal;
    create(): void;
    save(): void;
    canDeactivate(): boolean;
    /**
     * Sets the values of the form on changes to the product or current language.
     */
    protected setFormValues(product: ProductWithVariants.Fragment, languageCode: LanguageCode): void;
    /**
     * Given a product and the value of the detailForm, this method creates an updated copy of the product which
     * can then be persisted to the API.
     */
    private getUpdatedProduct;
    /**
     * Given an array of product variants and the values from the detailForm, this method creates an new array
     * which can be persisted to the API.
     */
    private getUpdatedProductVariants;
    private getProductFormGroup;
    /**
     * The server may alter the slug value in order to normalize and ensure uniqueness upon saving.
     */
    private updateSlugAfterSave;
}
