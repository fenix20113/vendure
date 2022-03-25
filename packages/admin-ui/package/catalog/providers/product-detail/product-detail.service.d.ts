import { CreateProductInput, DataService, FacetWithValues, LanguageCode, ProductWithVariants, UpdateProductInput, UpdateProductMutation, UpdateProductOptionInput, UpdateProductVariantInput, UpdateProductVariantsMutation } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { CreateProductVariantsConfig } from '../../components/generate-product-variants/generate-product-variants.component';
/**
 * Handles the logic for making the API calls to perform CRUD operations on a Product and its related
 * entities. This logic was extracted out of the component because it became too large and hard to follow.
 */
export declare class ProductDetailService {
    private dataService;
    constructor(dataService: DataService);
    getFacets(): Observable<FacetWithValues.Fragment[]>;
    getTaxCategories(): Observable<({
        __typename?: "TaxCategory" | undefined;
    } & {
        __typename?: "TaxCategory" | undefined;
    } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").TaxCategory, "id" | "createdAt" | "updatedAt" | "name" | "isDefault">)[]>;
    createProductWithVariants(input: CreateProductInput, createVariantsConfig: CreateProductVariantsConfig, languageCode: LanguageCode): Observable<{
        createProductVariants: import("../../../../../../package/core/vendure-admin-ui-core").Maybe<{
            __typename?: "ProductVariant" | undefined;
        } & {
            __typename?: "ProductVariant" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductVariant, "id" | "createdAt" | "updatedAt" | "name" | "enabled" | "sku" | "price" | "currencyCode" | "languageCode" | "priceWithTax" | "stockOnHand" | "stockAllocated" | "trackInventory" | "outOfStockThreshold" | "useGlobalOutOfStockThreshold"> & {
            taxRateApplied: {
                __typename?: "TaxRate" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").TaxRate, "id" | "name" | "value">;
            taxCategory: {
                __typename?: "TaxCategory" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").TaxCategory, "id" | "name">;
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
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").FacetValue, "id" | "name" | "code"> & {
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
        }>[];
        productId: string;
    }>;
    createProductOptionGroups(groups: Array<{
        name: string;
        values: string[];
    }>, languageCode: LanguageCode): Observable<({
        __typename?: "ProductOptionGroup" | undefined;
    } & {
        __typename?: "ProductOptionGroup" | undefined;
    } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductOptionGroup, "id" | "createdAt" | "updatedAt" | "name" | "code" | "languageCode"> & {
        translations: ({
            __typename?: "ProductOptionGroupTranslation" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductOptionGroupTranslation, "id" | "name">)[];
        options: ({
            __typename?: "ProductOption" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductOption, "id" | "name" | "code" | "languageCode"> & {
            translations: ({
                __typename?: "ProductOptionTranslation" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductOptionTranslation, "name">)[];
        })[];
    })[]>;
    createProductVariants(product: {
        name: string;
        id: string;
    }, variantData: Array<{
        price: number;
        sku: string;
        stock: number;
        optionIds: string[];
    }>, options: Array<{
        id: string;
        name: string;
    }>, languageCode: LanguageCode): Observable<{
        createProductVariants: import("../../../../../../package/core/vendure-admin-ui-core").Maybe<{
            __typename?: "ProductVariant" | undefined;
        } & {
            __typename?: "ProductVariant" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").ProductVariant, "id" | "createdAt" | "updatedAt" | "name" | "enabled" | "sku" | "price" | "currencyCode" | "languageCode" | "priceWithTax" | "stockOnHand" | "stockAllocated" | "trackInventory" | "outOfStockThreshold" | "useGlobalOutOfStockThreshold"> & {
            taxRateApplied: {
                __typename?: "TaxRate" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").TaxRate, "id" | "name" | "value">;
            taxCategory: {
                __typename?: "TaxCategory" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").TaxCategory, "id" | "name">;
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
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").FacetValue, "id" | "name" | "code"> & {
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
        }>[];
        productId: string;
    }>;
    updateProduct(updateOptions: {
        product: ProductWithVariants.Fragment;
        languageCode: LanguageCode;
        autoUpdate: boolean;
        productInput?: UpdateProductInput;
        variantsInput?: UpdateProductVariantInput[];
    }): Observable<(UpdateProductMutation | UpdateProductVariantsMutation)[]>;
    updateProductOption(input: UpdateProductOptionInput & {
        autoUpdate: boolean;
    }, product: ProductWithVariants.Fragment, languageCode: LanguageCode): Observable<any>;
    deleteProductVariant(id: string, productId: string): Observable<import("../../../../../../package/core/vendure-admin-ui-core").GetProductWithVariantsQuery>;
}
