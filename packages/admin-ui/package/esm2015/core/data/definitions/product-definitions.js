import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from './shared-definitions';
export const ASSET_FRAGMENT = gql `
    fragment Asset on Asset {
        id
        createdAt
        updatedAt
        name
        fileSize
        mimeType
        type
        preview
        source
        width
        height
        focalPoint {
            x
            y
        }
    }
`;
export const TAG_FRAGMENT = gql `
    fragment Tag on Tag {
        id
        value
    }
`;
export const PRODUCT_OPTION_GROUP_FRAGMENT = gql `
    fragment ProductOptionGroup on ProductOptionGroup {
        id
        code
        languageCode
        name
        translations {
            id
            languageCode
            name
        }
    }
`;
export const PRODUCT_OPTION_FRAGMENT = gql `
    fragment ProductOption on ProductOption {
        id
        code
        languageCode
        name
        groupId
        translations {
            id
            languageCode
            name
        }
    }
`;
export const PRODUCT_VARIANT_FRAGMENT = gql `
    fragment ProductVariant on ProductVariant {
        id
        createdAt
        updatedAt
        enabled
        languageCode
        name
        price
        currencyCode
        priceWithTax
        stockOnHand
        stockAllocated
        trackInventory
        outOfStockThreshold
        useGlobalOutOfStockThreshold
        taxRateApplied {
            id
            name
            value
        }
        taxCategory {
            id
            name
        }
        sku
        options {
            ...ProductOption
        }
        facetValues {
            id
            code
            name
            facet {
                id
                name
            }
        }
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        translations {
            id
            languageCode
            name
        }
        channels {
            id
            code
        }
    }
    ${PRODUCT_OPTION_FRAGMENT}
    ${ASSET_FRAGMENT}
`;
export const PRODUCT_WITH_VARIANTS_FRAGMENT = gql `
    fragment ProductWithVariants on Product {
        id
        createdAt
        updatedAt
        enabled
        languageCode
        name
        slug
        description
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        translations {
            id
            languageCode
            name
            slug
            description
        }
        optionGroups {
            ...ProductOptionGroup
        }
        variants {
            ...ProductVariant
        }
        facetValues {
            id
            code
            name
            facet {
                id
                name
            }
        }
        channels {
            id
            code
        }
    }
    ${PRODUCT_OPTION_GROUP_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
    ${ASSET_FRAGMENT}
`;
export const PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT = gql `
    fragment ProductOptionGroupWithOptions on ProductOptionGroup {
        id
        createdAt
        updatedAt
        languageCode
        code
        name
        translations {
            id
            name
        }
        options {
            id
            languageCode
            name
            code
            translations {
                name
            }
        }
    }
`;
export const UPDATE_PRODUCT = gql `
    mutation UpdateProduct($input: UpdateProductInput!) {
        updateProduct(input: $input) {
            ...ProductWithVariants
        }
    }
    ${PRODUCT_WITH_VARIANTS_FRAGMENT}
`;
export const CREATE_PRODUCT = gql `
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
            ...ProductWithVariants
        }
    }
    ${PRODUCT_WITH_VARIANTS_FRAGMENT}
`;
export const DELETE_PRODUCT = gql `
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            result
            message
        }
    }
`;
export const CREATE_PRODUCT_VARIANTS = gql `
    mutation CreateProductVariants($input: [CreateProductVariantInput!]!) {
        createProductVariants(input: $input) {
            ...ProductVariant
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
`;
export const UPDATE_PRODUCT_VARIANTS = gql `
    mutation UpdateProductVariants($input: [UpdateProductVariantInput!]!) {
        updateProductVariants(input: $input) {
            ...ProductVariant
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
`;
export const CREATE_PRODUCT_OPTION_GROUP = gql `
    mutation CreateProductOptionGroup($input: CreateProductOptionGroupInput!) {
        createProductOptionGroup(input: $input) {
            ...ProductOptionGroupWithOptions
        }
    }
    ${PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT}
`;
export const GET_PRODUCT_OPTION_GROUP = gql `
    query GetProductOptionGroup($id: ID!) {
        productOptionGroup(id: $id) {
            ...ProductOptionGroupWithOptions
        }
    }
    ${PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT}
`;
export const ADD_OPTION_TO_GROUP = gql `
    mutation AddOptionToGroup($input: CreateProductOptionInput!) {
        createProductOption(input: $input) {
            id
            createdAt
            updatedAt
            name
            code
            groupId
        }
    }
`;
export const ADD_OPTION_GROUP_TO_PRODUCT = gql `
    mutation AddOptionGroupToProduct($productId: ID!, $optionGroupId: ID!) {
        addOptionGroupToProduct(productId: $productId, optionGroupId: $optionGroupId) {
            id
            createdAt
            updatedAt
            optionGroups {
                id
                createdAt
                updatedAt
                code
                options {
                    id
                    createdAt
                    updatedAt
                    code
                }
            }
        }
    }
`;
export const REMOVE_OPTION_GROUP_FROM_PRODUCT = gql `
    mutation RemoveOptionGroupFromProduct($productId: ID!, $optionGroupId: ID!) {
        removeOptionGroupFromProduct(productId: $productId, optionGroupId: $optionGroupId) {
            ... on Product {
                id
                createdAt
                updatedAt
                optionGroups {
                    id
                    createdAt
                    updatedAt
                    code
                    options {
                        id
                        createdAt
                        updatedAt
                        code
                    }
                }
            }
            ...ErrorResult
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
export const GET_PRODUCT_WITH_VARIANTS = gql `
    query GetProductWithVariants($id: ID!) {
        product(id: $id) {
            ...ProductWithVariants
        }
    }
    ${PRODUCT_WITH_VARIANTS_FRAGMENT}
`;
export const GET_PRODUCT_SIMPLE = gql `
    query GetProductSimple($id: ID!) {
        product(id: $id) {
            id
            name
            featuredAsset {
                ...Asset
            }
        }
    }
    ${ASSET_FRAGMENT}
`;
export const GET_PRODUCT_LIST = gql `
    query GetProductList($options: ProductListOptions) {
        products(options: $options) {
            items {
                id
                createdAt
                updatedAt
                enabled
                languageCode
                name
                slug
                featuredAsset {
                    id
                    createdAt
                    updatedAt
                    preview
                }
            }
            totalItems
        }
    }
`;
export const GET_PRODUCT_OPTION_GROUPS = gql `
    query GetProductOptionGroups($filterTerm: String) {
        productOptionGroups(filterTerm: $filterTerm) {
            id
            createdAt
            updatedAt
            languageCode
            code
            name
            options {
                id
                createdAt
                updatedAt
                languageCode
                code
                name
            }
        }
    }
`;
export const GET_ASSET_LIST = gql `
    query GetAssetList($options: AssetListOptions) {
        assets(options: $options) {
            items {
                ...Asset
                tags {
                    ...Tag
                }
            }
            totalItems
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
export const GET_ASSET = gql `
    query GetAsset($id: ID!) {
        asset(id: $id) {
            ...Asset
            tags {
                ...Tag
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
export const CREATE_ASSETS = gql `
    mutation CreateAssets($input: [CreateAssetInput!]!) {
        createAssets(input: $input) {
            ...Asset
            ... on Asset {
                tags {
                    ...Tag
                }
            }
            ... on ErrorResult {
                message
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
export const UPDATE_ASSET = gql `
    mutation UpdateAsset($input: UpdateAssetInput!) {
        updateAsset(input: $input) {
            ...Asset
            tags {
                ...Tag
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
export const DELETE_ASSETS = gql `
    mutation DeleteAssets($input: DeleteAssetsInput!) {
        deleteAssets(input: $input) {
            result
            message
        }
    }
`;
export const SEARCH_PRODUCTS = gql `
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            totalItems
            items {
                enabled
                productId
                productName
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                productVariantId
                productVariantName
                productVariantAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                sku
                channelIds
            }
            facetValues {
                count
                facetValue {
                    id
                    createdAt
                    updatedAt
                    name
                    facet {
                        id
                        createdAt
                        updatedAt
                        name
                    }
                }
            }
        }
    }
`;
export const PRODUCT_SELECTOR_SEARCH = gql `
    query ProductSelectorSearch($term: String!, $take: Int!) {
        search(input: { groupByProduct: false, term: $term, take: $take }) {
            items {
                productVariantId
                productVariantName
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                price {
                    ... on SinglePrice {
                        value
                    }
                }
                priceWithTax {
                    ... on SinglePrice {
                        value
                    }
                }
                sku
            }
        }
    }
`;
export const UPDATE_PRODUCT_OPTION = gql `
    mutation UpdateProductOption($input: UpdateProductOptionInput!) {
        updateProductOption(input: $input) {
            ...ProductOption
        }
    }
    ${PRODUCT_OPTION_FRAGMENT}
`;
export const DELETE_PRODUCT_VARIANT = gql `
    mutation DeleteProductVariant($id: ID!) {
        deleteProductVariant(id: $id) {
            result
            message
        }
    }
`;
export const GET_PRODUCT_VARIANT_OPTIONS = gql `
    query GetProductVariantOptions($id: ID!) {
        product(id: $id) {
            id
            createdAt
            updatedAt
            name
            optionGroups {
                id
                name
                code
                options {
                    ...ProductOption
                }
            }
            variants {
                id
                createdAt
                updatedAt
                enabled
                name
                sku
                price
                stockOnHand
                enabled
                options {
                    id
                    createdAt
                    updatedAt
                    name
                    code
                    groupId
                }
            }
        }
    }
    ${PRODUCT_OPTION_FRAGMENT}
`;
export const ASSIGN_PRODUCTS_TO_CHANNEL = gql `
    mutation AssignProductsToChannel($input: AssignProductsToChannelInput!) {
        assignProductsToChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
export const ASSIGN_VARIANTS_TO_CHANNEL = gql `
    mutation AssignVariantsToChannel($input: AssignProductVariantsToChannelInput!) {
        assignProductVariantsToChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
export const REMOVE_PRODUCTS_FROM_CHANNEL = gql `
    mutation RemoveProductsFromChannel($input: RemoveProductsFromChannelInput!) {
        removeProductsFromChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
export const REMOVE_VARIANTS_FROM_CHANNEL = gql `
    mutation RemoveVariantsFromChannel($input: RemoveProductVariantsFromChannelInput!) {
        removeProductVariantsFromChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
export const GET_PRODUCT_VARIANT = gql `
    query GetProductVariant($id: ID!) {
        productVariant(id: $id) {
            id
            name
            sku
            featuredAsset {
                id
                preview
                focalPoint {
                    x
                    y
                }
            }
            product {
                id
                featuredAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
            }
        }
    }
`;
export const GET_PRODUCT_VARIANT_LIST = gql `
    query GetProductVariantList($options: ProductVariantListOptions!) {
        productVariants(options: $options) {
            items {
                id
                name
                sku
                featuredAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                product {
                    id
                    featuredAsset {
                        id
                        preview
                        focalPoint {
                            x
                            y
                        }
                    }
                }
            }
            totalItems
        }
    }
`;
export const GET_TAG_LIST = gql `
    query GetTagList($options: TagListOptions) {
        tags(options: $options) {
            items {
                ...Tag
            }
            totalItems
        }
    }
    ${TAG_FRAGMENT}
`;
export const GET_TAG = gql `
    query GetTag($id: ID!) {
        tag(id: $id) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
export const CREATE_TAG = gql `
    mutation CreateTag($input: CreateTagInput!) {
        createTag(input: $input) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
export const UPDATE_TAG = gql `
    mutation UpdateTag($input: UpdateTagInput!) {
        updateTag(input: $input) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
export const DELETE_TAG = gql `
    mutation DeleteTag($id: ID!) {
        deleteTag(id: $id) {
            message
            result
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1kZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9kZWZpbml0aW9ucy9wcm9kdWN0LWRlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU3RCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQmhDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBOzs7OztDQUs5QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Q0FZL0MsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7OztDQWF6QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFzRHJDLHVCQUF1QjtNQUN2QixjQUFjO0NBQ25CLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUEyQzNDLDZCQUE2QjtNQUM3Qix3QkFBd0I7TUFDeEIsY0FBYztDQUNuQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sMENBQTBDLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0I1RCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTTNC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O0FBRUYsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7O0NBVTVDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Q0FVOUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7OztDQVU5QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EyQnJDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQThCMUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztNQVN6QixZQUFZO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNcEIsWUFBWTtDQUNqQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTXZCLFlBQVk7Q0FDakIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU12QixZQUFZO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBTzVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmltcG9ydCB7IEVSUk9SX1JFU1VMVF9GUkFHTUVOVCB9IGZyb20gJy4vc2hhcmVkLWRlZmluaXRpb25zJztcblxuZXhwb3J0IGNvbnN0IEFTU0VUX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IEFzc2V0IG9uIEFzc2V0IHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBuYW1lXG4gICAgICAgIGZpbGVTaXplXG4gICAgICAgIG1pbWVUeXBlXG4gICAgICAgIHR5cGVcbiAgICAgICAgcHJldmlld1xuICAgICAgICBzb3VyY2VcbiAgICAgICAgd2lkdGhcbiAgICAgICAgaGVpZ2h0XG4gICAgICAgIGZvY2FsUG9pbnQge1xuICAgICAgICAgICAgeFxuICAgICAgICAgICAgeVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFRBR19GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBUYWcgb24gVGFnIHtcbiAgICAgICAgaWRcbiAgICAgICAgdmFsdWVcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUFJPRFVDVF9PUFRJT05fR1JPVVBfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgUHJvZHVjdE9wdGlvbkdyb3VwIG9uIFByb2R1Y3RPcHRpb25Hcm91cCB7XG4gICAgICAgIGlkXG4gICAgICAgIGNvZGVcbiAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgIG5hbWVcbiAgICAgICAgdHJhbnNsYXRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQUk9EVUNUX09QVElPTl9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBQcm9kdWN0T3B0aW9uIG9uIFByb2R1Y3RPcHRpb24ge1xuICAgICAgICBpZFxuICAgICAgICBjb2RlXG4gICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICBuYW1lXG4gICAgICAgIGdyb3VwSWRcbiAgICAgICAgdHJhbnNsYXRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQUk9EVUNUX1ZBUklBTlRfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgUHJvZHVjdFZhcmlhbnQgb24gUHJvZHVjdFZhcmlhbnQge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIGVuYWJsZWRcbiAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgIG5hbWVcbiAgICAgICAgcHJpY2VcbiAgICAgICAgY3VycmVuY3lDb2RlXG4gICAgICAgIHByaWNlV2l0aFRheFxuICAgICAgICBzdG9ja09uSGFuZFxuICAgICAgICBzdG9ja0FsbG9jYXRlZFxuICAgICAgICB0cmFja0ludmVudG9yeVxuICAgICAgICBvdXRPZlN0b2NrVGhyZXNob2xkXG4gICAgICAgIHVzZUdsb2JhbE91dE9mU3RvY2tUaHJlc2hvbGRcbiAgICAgICAgdGF4UmF0ZUFwcGxpZWQge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgdGF4Q2F0ZWdvcnkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBza3VcbiAgICAgICAgb3B0aW9ucyB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0T3B0aW9uXG4gICAgICAgIH1cbiAgICAgICAgZmFjZXRWYWx1ZXMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIGZhY2V0IHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmZWF0dXJlZEFzc2V0IHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXRzIHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNsYXRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY29kZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9PUFRJT05fRlJBR01FTlR9XG4gICAgJHtBU1NFVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQUk9EVUNUX1dJVEhfVkFSSUFOVFNfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgUHJvZHVjdFdpdGhWYXJpYW50cyBvbiBQcm9kdWN0IHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBlbmFibGVkXG4gICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICBuYW1lXG4gICAgICAgIHNsdWdcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgZmVhdHVyZWRBc3NldCB7XG4gICAgICAgICAgICAuLi5Bc3NldFxuICAgICAgICB9XG4gICAgICAgIGFzc2V0cyB7XG4gICAgICAgICAgICAuLi5Bc3NldFxuICAgICAgICB9XG4gICAgICAgIHRyYW5zbGF0aW9ucyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBzbHVnXG4gICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbkdyb3VwcyB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0T3B0aW9uR3JvdXBcbiAgICAgICAgfVxuICAgICAgICB2YXJpYW50cyB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0VmFyaWFudFxuICAgICAgICB9XG4gICAgICAgIGZhY2V0VmFsdWVzIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBmYWNldCB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hhbm5lbHMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1BST0RVQ1RfT1BUSU9OX0dST1VQX0ZSQUdNRU5UfVxuICAgICR7UFJPRFVDVF9WQVJJQU5UX0ZSQUdNRU5UfVxuICAgICR7QVNTRVRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgUFJPRFVDVF9PUFRJT05fR1JPVVBfV0lUSF9PUFRJT05TX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IFByb2R1Y3RPcHRpb25Hcm91cFdpdGhPcHRpb25zIG9uIFByb2R1Y3RPcHRpb25Hcm91cCB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgIGNvZGVcbiAgICAgICAgbmFtZVxuICAgICAgICB0cmFuc2xhdGlvbnMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucyB7XG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9QUk9EVUNUID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVByb2R1Y3QoJGlucHV0OiBVcGRhdGVQcm9kdWN0SW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVByb2R1Y3QoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUHJvZHVjdFdpdGhWYXJpYW50c1xuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9XSVRIX1ZBUklBTlRTX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9QUk9EVUNUID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZVByb2R1Y3QoJGlucHV0OiBDcmVhdGVQcm9kdWN0SW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVByb2R1Y3QoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUHJvZHVjdFdpdGhWYXJpYW50c1xuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9XSVRIX1ZBUklBTlRTX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9QUk9EVUNUID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVByb2R1Y3QoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlUHJvZHVjdChpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfUFJPRFVDVF9WQVJJQU5UUyA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVQcm9kdWN0VmFyaWFudHMoJGlucHV0OiBbQ3JlYXRlUHJvZHVjdFZhcmlhbnRJbnB1dCFdISkge1xuICAgICAgICBjcmVhdGVQcm9kdWN0VmFyaWFudHMoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUHJvZHVjdFZhcmlhbnRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1BST0RVQ1RfVkFSSUFOVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfUFJPRFVDVF9WQVJJQU5UUyA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVQcm9kdWN0VmFyaWFudHMoJGlucHV0OiBbVXBkYXRlUHJvZHVjdFZhcmlhbnRJbnB1dCFdISkge1xuICAgICAgICB1cGRhdGVQcm9kdWN0VmFyaWFudHMoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUHJvZHVjdFZhcmlhbnRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1BST0RVQ1RfVkFSSUFOVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfUFJPRFVDVF9PUFRJT05fR1JPVVAgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwKCRpbnB1dDogQ3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVByb2R1Y3RPcHRpb25Hcm91cChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0T3B0aW9uR3JvdXBXaXRoT3B0aW9uc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9PUFRJT05fR1JPVVBfV0lUSF9PUFRJT05TX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9QUk9EVUNUX09QVElPTl9HUk9VUCA9IGdxbGBcbiAgICBxdWVyeSBHZXRQcm9kdWN0T3B0aW9uR3JvdXAoJGlkOiBJRCEpIHtcbiAgICAgICAgcHJvZHVjdE9wdGlvbkdyb3VwKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLlByb2R1Y3RPcHRpb25Hcm91cFdpdGhPcHRpb25zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQUk9EVUNUX09QVElPTl9HUk9VUF9XSVRIX09QVElPTlNfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQUREX09QVElPTl9UT19HUk9VUCA9IGdxbGBcbiAgICBtdXRhdGlvbiBBZGRPcHRpb25Ub0dyb3VwKCRpbnB1dDogQ3JlYXRlUHJvZHVjdE9wdGlvbklucHV0ISkge1xuICAgICAgICBjcmVhdGVQcm9kdWN0T3B0aW9uKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgZ3JvdXBJZFxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEFERF9PUFRJT05fR1JPVVBfVE9fUFJPRFVDVCA9IGdxbGBcbiAgICBtdXRhdGlvbiBBZGRPcHRpb25Hcm91cFRvUHJvZHVjdCgkcHJvZHVjdElkOiBJRCEsICRvcHRpb25Hcm91cElkOiBJRCEpIHtcbiAgICAgICAgYWRkT3B0aW9uR3JvdXBUb1Byb2R1Y3QocHJvZHVjdElkOiAkcHJvZHVjdElkLCBvcHRpb25Hcm91cElkOiAkb3B0aW9uR3JvdXBJZCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICBvcHRpb25Hcm91cHMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgICAgIG9wdGlvbnMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFX09QVElPTl9HUk9VUF9GUk9NX1BST0RVQ1QgPSBncWxgXG4gICAgbXV0YXRpb24gUmVtb3ZlT3B0aW9uR3JvdXBGcm9tUHJvZHVjdCgkcHJvZHVjdElkOiBJRCEsICRvcHRpb25Hcm91cElkOiBJRCEpIHtcbiAgICAgICAgcmVtb3ZlT3B0aW9uR3JvdXBGcm9tUHJvZHVjdChwcm9kdWN0SWQ6ICRwcm9kdWN0SWQsIG9wdGlvbkdyb3VwSWQ6ICRvcHRpb25Hcm91cElkKSB7XG4gICAgICAgICAgICAuLi4gb24gUHJvZHVjdCB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICBvcHRpb25Hcm91cHMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1BST0RVQ1RfV0lUSF9WQVJJQU5UUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRQcm9kdWN0V2l0aFZhcmlhbnRzKCRpZDogSUQhKSB7XG4gICAgICAgIHByb2R1Y3QoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uUHJvZHVjdFdpdGhWYXJpYW50c1xuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9XSVRIX1ZBUklBTlRTX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9QUk9EVUNUX1NJTVBMRSA9IGdxbGBcbiAgICBxdWVyeSBHZXRQcm9kdWN0U2ltcGxlKCRpZDogSUQhKSB7XG4gICAgICAgIHByb2R1Y3QoaWQ6ICRpZCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtBU1NFVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUFJPRFVDVF9MSVNUID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFByb2R1Y3RMaXN0KCRvcHRpb25zOiBQcm9kdWN0TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgcHJvZHVjdHMob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgIGVuYWJsZWRcbiAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgc2x1Z1xuICAgICAgICAgICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1BST0RVQ1RfT1BUSU9OX0dST1VQUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRQcm9kdWN0T3B0aW9uR3JvdXBzKCRmaWx0ZXJUZXJtOiBTdHJpbmcpIHtcbiAgICAgICAgcHJvZHVjdE9wdGlvbkdyb3VwcyhmaWx0ZXJUZXJtOiAkZmlsdGVyVGVybSkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIG9wdGlvbnMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQVNTRVRfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRBc3NldExpc3QoJG9wdGlvbnM6IEFzc2V0TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgYXNzZXRzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgLi4uQXNzZXRcbiAgICAgICAgICAgICAgICB0YWdzIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uVGFnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7QVNTRVRfRlJBR01FTlR9XG4gICAgJHtUQUdfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0FTU0VUID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEFzc2V0KCRpZDogSUQhKSB7XG4gICAgICAgIGFzc2V0KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgICAgICB0YWdzIHtcbiAgICAgICAgICAgICAgICAuLi5UYWdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0FTU0VUX0ZSQUdNRU5UfVxuICAgICR7VEFHX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9BU1NFVFMgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlQXNzZXRzKCRpbnB1dDogW0NyZWF0ZUFzc2V0SW5wdXQhXSEpIHtcbiAgICAgICAgY3JlYXRlQXNzZXRzKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgICAgICAuLi4gb24gQXNzZXQge1xuICAgICAgICAgICAgICAgIHRhZ3Mge1xuICAgICAgICAgICAgICAgICAgICAuLi5UYWdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuLi4gb24gRXJyb3JSZXN1bHQge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0FTU0VUX0ZSQUdNRU5UfVxuICAgICR7VEFHX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9BU1NFVCA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVBc3NldCgkaW5wdXQ6IFVwZGF0ZUFzc2V0SW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUFzc2V0KGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgICAgICB0YWdzIHtcbiAgICAgICAgICAgICAgICAuLi5UYWdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0FTU0VUX0ZSQUdNRU5UfVxuICAgICR7VEFHX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9BU1NFVFMgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlQXNzZXRzKCRpbnB1dDogRGVsZXRlQXNzZXRzSW5wdXQhKSB7XG4gICAgICAgIGRlbGV0ZUFzc2V0cyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTRUFSQ0hfUFJPRFVDVFMgPSBncWxgXG4gICAgcXVlcnkgU2VhcmNoUHJvZHVjdHMoJGlucHV0OiBTZWFyY2hJbnB1dCEpIHtcbiAgICAgICAgc2VhcmNoKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICBlbmFibGVkXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkXG4gICAgICAgICAgICAgICAgcHJvZHVjdE5hbWVcbiAgICAgICAgICAgICAgICBwcm9kdWN0QXNzZXQge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgIGZvY2FsUG9pbnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgeFxuICAgICAgICAgICAgICAgICAgICAgICAgeVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50SWRcbiAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudE5hbWVcbiAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudEFzc2V0IHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld1xuICAgICAgICAgICAgICAgICAgICBmb2NhbFBvaW50IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhcbiAgICAgICAgICAgICAgICAgICAgICAgIHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBza3VcbiAgICAgICAgICAgICAgICBjaGFubmVsSWRzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmYWNldFZhbHVlcyB7XG4gICAgICAgICAgICAgICAgY291bnRcbiAgICAgICAgICAgICAgICBmYWNldFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgICAgIGZhY2V0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFBST0RVQ1RfU0VMRUNUT1JfU0VBUkNIID0gZ3FsYFxuICAgIHF1ZXJ5IFByb2R1Y3RTZWxlY3RvclNlYXJjaCgkdGVybTogU3RyaW5nISwgJHRha2U6IEludCEpIHtcbiAgICAgICAgc2VhcmNoKGlucHV0OiB7IGdyb3VwQnlQcm9kdWN0OiBmYWxzZSwgdGVybTogJHRlcm0sIHRha2U6ICR0YWtlIH0pIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudElkXG4gICAgICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnROYW1lXG4gICAgICAgICAgICAgICAgcHJvZHVjdEFzc2V0IHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld1xuICAgICAgICAgICAgICAgICAgICBmb2NhbFBvaW50IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhcbiAgICAgICAgICAgICAgICAgICAgICAgIHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmljZSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLiBvbiBTaW5nbGVQcmljZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByaWNlV2l0aFRheCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLiBvbiBTaW5nbGVQcmljZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNrdVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9QUk9EVUNUX09QVElPTiA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVQcm9kdWN0T3B0aW9uKCRpbnB1dDogVXBkYXRlUHJvZHVjdE9wdGlvbklucHV0ISkge1xuICAgICAgICB1cGRhdGVQcm9kdWN0T3B0aW9uKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlByb2R1Y3RPcHRpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICAke1BST0RVQ1RfT1BUSU9OX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9QUk9EVUNUX1ZBUklBTlQgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlUHJvZHVjdFZhcmlhbnQoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlUHJvZHVjdFZhcmlhbnQoaWQ6ICRpZCkge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1BST0RVQ1RfVkFSSUFOVF9PUFRJT05TID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucygkaWQ6IElEISkge1xuICAgICAgICBwcm9kdWN0KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgb3B0aW9uR3JvdXBzIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgb3B0aW9ucyB7XG4gICAgICAgICAgICAgICAgICAgIC4uLlByb2R1Y3RPcHRpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXJpYW50cyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICBlbmFibGVkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHNrdVxuICAgICAgICAgICAgICAgIHByaWNlXG4gICAgICAgICAgICAgICAgc3RvY2tPbkhhbmRcbiAgICAgICAgICAgICAgICBlbmFibGVkXG4gICAgICAgICAgICAgICAgb3B0aW9ucyB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQUk9EVUNUX09QVElPTl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBU1NJR05fUFJPRFVDVFNfVE9fQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBBc3NpZ25Qcm9kdWN0c1RvQ2hhbm5lbCgkaW5wdXQ6IEFzc2lnblByb2R1Y3RzVG9DaGFubmVsSW5wdXQhKSB7XG4gICAgICAgIGFzc2lnblByb2R1Y3RzVG9DaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQVNTSUdOX1ZBUklBTlRTX1RPX0NIQU5ORUwgPSBncWxgXG4gICAgbXV0YXRpb24gQXNzaWduVmFyaWFudHNUb0NoYW5uZWwoJGlucHV0OiBBc3NpZ25Qcm9kdWN0VmFyaWFudHNUb0NoYW5uZWxJbnB1dCEpIHtcbiAgICAgICAgYXNzaWduUHJvZHVjdFZhcmlhbnRzVG9DaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFX1BST0RVQ1RTX0ZST01fQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZW1vdmVQcm9kdWN0c0Zyb21DaGFubmVsKCRpbnB1dDogUmVtb3ZlUHJvZHVjdHNGcm9tQ2hhbm5lbElucHV0ISkge1xuICAgICAgICByZW1vdmVQcm9kdWN0c0Zyb21DaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFX1ZBUklBTlRTX0ZST01fQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZW1vdmVWYXJpYW50c0Zyb21DaGFubmVsKCRpbnB1dDogUmVtb3ZlUHJvZHVjdFZhcmlhbnRzRnJvbUNoYW5uZWxJbnB1dCEpIHtcbiAgICAgICAgcmVtb3ZlUHJvZHVjdFZhcmlhbnRzRnJvbUNoYW5uZWwoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNoYW5uZWxzIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUFJPRFVDVF9WQVJJQU5UID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFByb2R1Y3RWYXJpYW50KCRpZDogSUQhKSB7XG4gICAgICAgIHByb2R1Y3RWYXJpYW50KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBza3VcbiAgICAgICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgcHJldmlld1xuICAgICAgICAgICAgICAgIGZvY2FsUG9pbnQge1xuICAgICAgICAgICAgICAgICAgICB4XG4gICAgICAgICAgICAgICAgICAgIHlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9kdWN0IHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgIGZvY2FsUG9pbnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgeFxuICAgICAgICAgICAgICAgICAgICAgICAgeVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9QUk9EVUNUX1ZBUklBTlRfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRQcm9kdWN0VmFyaWFudExpc3QoJG9wdGlvbnM6IFByb2R1Y3RWYXJpYW50TGlzdE9wdGlvbnMhKSB7XG4gICAgICAgIHByb2R1Y3RWYXJpYW50cyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHNrdVxuICAgICAgICAgICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgIGZvY2FsUG9pbnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgeFxuICAgICAgICAgICAgICAgICAgICAgICAgeVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb2R1Y3Qge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlZEFzc2V0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2NhbFBvaW50IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9UQUdfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRUYWdMaXN0KCRvcHRpb25zOiBUYWdMaXN0T3B0aW9ucykge1xuICAgICAgICB0YWdzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgLi4uVGFnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQUdfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1RBRyA9IGdxbGBcbiAgICBxdWVyeSBHZXRUYWcoJGlkOiBJRCEpIHtcbiAgICAgICAgdGFnKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLlRhZ1xuICAgICAgICB9XG4gICAgfVxuICAgICR7VEFHX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9UQUcgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlVGFnKCRpbnB1dDogQ3JlYXRlVGFnSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVRhZyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5UYWdcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1RBR19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfVEFHID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVRhZygkaW5wdXQ6IFVwZGF0ZVRhZ0lucHV0ISkge1xuICAgICAgICB1cGRhdGVUYWcoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uVGFnXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQUdfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX1RBRyA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVUYWcoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlVGFnKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuYDtcbiJdfQ==