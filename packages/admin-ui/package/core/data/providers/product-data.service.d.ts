import { AddOptionGroupToProduct, AssignProductsToChannelInput, AssignProductVariantsToChannelInput, CreateProductInput, CreateProductOptionGroupInput, CreateProductOptionInput, CreateProductVariantInput, CreateTagInput, ProductListOptions, ProductVariantListOptions, RemoveOptionGroupFromProduct, RemoveProductsFromChannelInput, RemoveProductVariantsFromChannelInput, TagListOptions, UpdateAssetInput, UpdateProductInput, UpdateProductOptionInput, UpdateProductVariantInput, UpdateTagInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class ProductDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    searchProducts(term: string, take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").SearchProductsQuery, import("../../common/generated-types").Exact<{
        input: import("../../common/generated-types").SearchInput;
    }>>;
    productSelectorSearch(term: string, take: number): import("../query-result").QueryResult<import("../../common/generated-types").ProductSelectorSearchQuery, import("../../common/generated-types").Exact<{
        term: string;
        take: number;
    }>>;
    reindex(): import("rxjs").Observable<import("../../common/generated-types").ReindexMutation>;
    getProducts(options: ProductListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetProductListQuery, import("../../common/generated-types").Exact<{
        options?: ProductListOptions | null | undefined;
    }>>;
    getProduct(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductWithVariantsQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getProductSimple(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductSimpleQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getProductVariants(options: ProductVariantListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetProductVariantListQuery, import("../../common/generated-types").Exact<{
        options: ProductVariantListOptions;
    }>>;
    getProductVariant(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductVariantQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getProductVariantsOptions(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductVariantOptionsQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getProductOptionGroup(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductOptionGroupQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createProduct(product: CreateProductInput): import("rxjs").Observable<import("../../common/generated-types").CreateProductMutation>;
    updateProduct(product: UpdateProductInput): import("rxjs").Observable<import("../../common/generated-types").UpdateProductMutation>;
    deleteProduct(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteProductMutation>;
    createProductVariants(input: CreateProductVariantInput[]): import("rxjs").Observable<import("../../common/generated-types").CreateProductVariantsMutation>;
    updateProductVariants(variants: UpdateProductVariantInput[]): import("rxjs").Observable<import("../../common/generated-types").UpdateProductVariantsMutation>;
    deleteProductVariant(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteProductVariantMutation>;
    createProductOptionGroups(productOptionGroup: CreateProductOptionGroupInput): import("rxjs").Observable<import("../../common/generated-types").CreateProductOptionGroupMutation>;
    addOptionGroupToProduct(variables: AddOptionGroupToProduct.Variables): import("rxjs").Observable<import("../../common/generated-types").AddOptionGroupToProductMutation>;
    addOptionToGroup(input: CreateProductOptionInput): import("rxjs").Observable<import("../../common/generated-types").AddOptionToGroupMutation>;
    removeOptionGroupFromProduct(variables: RemoveOptionGroupFromProduct.Variables): import("rxjs").Observable<import("../../common/generated-types").RemoveOptionGroupFromProductMutation>;
    updateProductOption(input: UpdateProductOptionInput): import("rxjs").Observable<import("../../common/generated-types").UpdateProductOptionMutation>;
    getProductOptionGroups(filterTerm?: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductOptionGroupsQuery, import("../../common/generated-types").Exact<{
        filterTerm?: string | null | undefined;
    }>>;
    getAssetList(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetAssetListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").AssetListOptions | null | undefined;
    }>>;
    getAsset(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetAssetQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createAssets(files: File[]): import("rxjs").Observable<import("../../common/generated-types").CreateAssetsMutation>;
    updateAsset(input: UpdateAssetInput): import("rxjs").Observable<import("../../common/generated-types").UpdateAssetMutation>;
    deleteAssets(ids: string[], force: boolean): import("rxjs").Observable<import("../../common/generated-types").DeleteAssetsMutation>;
    assignProductsToChannel(input: AssignProductsToChannelInput): import("rxjs").Observable<import("../../common/generated-types").AssignProductsToChannelMutation>;
    removeProductsFromChannel(input: RemoveProductsFromChannelInput): import("rxjs").Observable<import("../../common/generated-types").RemoveProductsFromChannelMutation>;
    assignVariantsToChannel(input: AssignProductVariantsToChannelInput): import("rxjs").Observable<import("../../common/generated-types").AssignVariantsToChannelMutation>;
    removeVariantsFromChannel(input: RemoveProductVariantsFromChannelInput): import("rxjs").Observable<import("../../common/generated-types").RemoveVariantsFromChannelMutation>;
    getTag(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetTagQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getTagList(options?: TagListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetTagListQuery, import("../../common/generated-types").Exact<{
        options?: TagListOptions | null | undefined;
    }>>;
    createTag(input: CreateTagInput): import("rxjs").Observable<import("../../common/generated-types").CreateTagMutation>;
    updateTag(input: UpdateTagInput): import("rxjs").Observable<import("../../common/generated-types").UpdateTagMutation>;
    deleteTag(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteTagMutation>;
}
