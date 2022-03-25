import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CustomFieldConfig, DataService, FacetValue, FacetWithValues, GlobalFlag, LanguageCode, ModalService, Permission, ProductOptionFragment, ProductVariant, ProductWithVariants, TaxCategory, UpdateProductOptionInput } from '@vendure/admin-ui/core';
import { PaginationInstance } from 'ngx-pagination';
import { AssetChange } from '../product-assets/product-assets.component';
import { SelectedAssets } from '../product-detail/product-detail.component';
export interface VariantAssetChange extends AssetChange {
    variantId: string;
}
export declare class ProductVariantsListComponent implements OnChanges, OnInit, OnDestroy {
    private changeDetector;
    private modalService;
    private dataService;
    formArray: FormArray;
    variants: ProductWithVariants.Variants[];
    channelPriceIncludesTax: boolean;
    taxCategories: TaxCategory[];
    facets: FacetWithValues.Fragment[];
    optionGroups: ProductWithVariants.OptionGroups[];
    customFields: CustomFieldConfig[];
    customOptionFields: CustomFieldConfig[];
    activeLanguage: LanguageCode;
    pendingAssetChanges: {
        [variantId: string]: SelectedAssets;
    };
    assignToChannel: EventEmitter<{
        __typename?: "ProductVariant" | undefined;
    } & {
        __typename?: "ProductVariant" | undefined;
    } & Pick<ProductVariant, "id" | "createdAt" | "updatedAt" | "name" | "enabled" | "sku" | "price" | "currencyCode" | "languageCode" | "priceWithTax" | "stockOnHand" | "stockAllocated" | "trackInventory" | "outOfStockThreshold" | "useGlobalOutOfStockThreshold"> & {
        taxRateApplied: {
            __typename?: "TaxRate" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").TaxRate, "id" | "name" | "value">;
        taxCategory: {
            __typename?: "TaxCategory" | undefined;
        } & Pick<TaxCategory, "id" | "name">;
        options: ({
            __typename?: "ProductOption" | undefined;
        } & {
            __typename?: "ProductOption" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductOption, "id" | "name" | "code" | "languageCode" | "groupId"> & {
            translations: ({
                __typename?: "ProductOptionTranslation" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductOptionTranslation, "id" | "name" | "languageCode">)[];
        })[];
        facetValues: ({
            __typename?: "FacetValue" | undefined;
        } & Pick<FacetValue, "id" | "name" | "code"> & {
            facet: {
                __typename?: "Facet" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Facet, "id" | "name">;
        })[];
        featuredAsset?: ({
            __typename?: "Asset" | undefined;
        } & {
            __typename?: "Asset" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Asset, "id" | "createdAt" | "updatedAt" | "name" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
            focalPoint?: ({
                __typename?: "Coordinate" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Coordinate, "x" | "y">) | null | undefined;
        }) | null | undefined;
        assets: ({
            __typename?: "Asset" | undefined;
        } & {
            __typename?: "Asset" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Asset, "id" | "createdAt" | "updatedAt" | "name" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
            focalPoint?: ({
                __typename?: "Coordinate" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Coordinate, "x" | "y">) | null | undefined;
        })[];
        translations: ({
            __typename?: "ProductVariantTranslation" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductVariantTranslation, "id" | "name" | "languageCode">)[];
        channels: ({
            __typename?: "Channel" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Channel, "id" | "code">)[];
    }>;
    removeFromChannel: EventEmitter<{
        channelId: string;
        variant: ProductWithVariants.Variants;
    }>;
    assetChange: EventEmitter<VariantAssetChange>;
    selectionChange: EventEmitter<string[]>;
    selectFacetValueClick: EventEmitter<string[]>;
    updateProductOption: EventEmitter<UpdateProductOptionInput & {
        autoUpdate: boolean;
    }>;
    selectedVariantIds: string[];
    pagination: PaginationInstance;
    formGroupMap: Map<string, FormGroup>;
    GlobalFlag: typeof GlobalFlag;
    globalTrackInventory: boolean;
    globalOutOfStockThreshold: number;
    readonly updatePermission: Permission[];
    private facetValues;
    private subscription;
    constructor(changeDetector: ChangeDetectorRef, modalService: ModalService, dataService: DataService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    isDefaultChannel(channelCode: string): boolean;
    trackById(index: number, item: ProductWithVariants.Variants): string;
    inventoryIsNotTracked(formGroup: FormGroup): boolean;
    getTaxCategoryName(group: FormGroup): string;
    getSaleableStockLevel(variant: ProductWithVariants.Variants): number;
    areAllSelected(): boolean;
    onAssetChange(variantId: string, event: AssetChange): void;
    toggleSelectAll(): void;
    toggleSelectVariant(variantId: string): void;
    optionGroupName(optionGroupId: string): string | undefined;
    optionName(option: ProductOptionFragment): string;
    pendingFacetValues(variant: ProductWithVariants.Variants): import("../../../../../../package/core/vendure-admin-ui-core").FacetValueFragment[];
    existingFacetValues(variant: ProductWithVariants.Variants): ({
        __typename?: "FacetValue" | undefined;
    } & Pick<FacetValue, "id" | "name" | "code"> & {
        facet: {
            __typename?: "Facet" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Facet, "id" | "name">;
    })[];
    removeFacetValue(variant: ProductWithVariants.Variants, facetValueId: string): void;
    isVariantSelected(variantId: string): boolean;
    editOption(option: ProductVariant.Options): void;
    private buildFormGroupMap;
    private getFacetValueIds;
}
