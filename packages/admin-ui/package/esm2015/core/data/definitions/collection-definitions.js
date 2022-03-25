import { gql } from 'apollo-angular';
import { ASSET_FRAGMENT } from './product-definitions';
import { CONFIGURABLE_OPERATION_DEF_FRAGMENT, CONFIGURABLE_OPERATION_FRAGMENT } from './shared-definitions';
export const GET_COLLECTION_FILTERS = gql `
    query GetCollectionFilters {
        collectionFilters {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
export const COLLECTION_FRAGMENT = gql `
    fragment Collection on Collection {
        id
        createdAt
        updatedAt
        name
        slug
        description
        isPrivate
        languageCode
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        filters {
            ...ConfigurableOperation
        }
        translations {
            id
            languageCode
            name
            slug
            description
        }
        parent {
            id
            name
        }
        children {
            id
            name
        }
    }
    ${ASSET_FRAGMENT}
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
export const GET_COLLECTION_LIST = gql `
    query GetCollectionList($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                slug
                description
                isPrivate
                featuredAsset {
                    ...Asset
                }
                parent {
                    id
                }
            }
            totalItems
        }
    }
    ${ASSET_FRAGMENT}
`;
export const GET_COLLECTION = gql `
    query GetCollection($id: ID!) {
        collection(id: $id) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
export const CREATE_COLLECTION = gql `
    mutation CreateCollection($input: CreateCollectionInput!) {
        createCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
export const UPDATE_COLLECTION = gql `
    mutation UpdateCollection($input: UpdateCollectionInput!) {
        updateCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
export const MOVE_COLLECTION = gql `
    mutation MoveCollection($input: MoveCollectionInput!) {
        moveCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
export const DELETE_COLLECTION = gql `
    mutation DeleteCollection($id: ID!) {
        deleteCollection(id: $id) {
            result
            message
        }
    }
`;
export const GET_COLLECTION_CONTENTS = gql `
    query GetCollectionContents($id: ID!, $options: ProductVariantListOptions) {
        collection(id: $id) {
            id
            name
            productVariants(options: $options) {
                items {
                    id
                    productId
                    name
                }
                totalItems
            }
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1kZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9kZWZpbml0aW9ucy9jb2xsZWN0aW9uLWRlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLCtCQUErQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUcsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNbkMsbUNBQW1DO0NBQ3hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BbUNoQyxjQUFjO01BQ2QsK0JBQStCO0NBQ3BDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFtQmhDLGNBQWM7Q0FDbkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU0zQixtQkFBbUI7Q0FDeEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTTlCLG1CQUFtQjtDQUN4QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNOUIsbUJBQW1CO0NBQ3hCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNNUIsbUJBQW1CO0NBQ3hCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Q0FPbkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O0NBZXpDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmltcG9ydCB7IEFTU0VUX0ZSQUdNRU5UIH0gZnJvbSAnLi9wcm9kdWN0LWRlZmluaXRpb25zJztcbmltcG9ydCB7IENPTkZJR1VSQUJMRV9PUEVSQVRJT05fREVGX0ZSQUdNRU5ULCBDT05GSUdVUkFCTEVfT1BFUkFUSU9OX0ZSQUdNRU5UIH0gZnJvbSAnLi9zaGFyZWQtZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgR0VUX0NPTExFQ1RJT05fRklMVEVSUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRDb2xsZWN0aW9uRmlsdGVycyB7XG4gICAgICAgIGNvbGxlY3Rpb25GaWx0ZXJzIHtcbiAgICAgICAgICAgIC4uLkNvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZlxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09ORklHVVJBQkxFX09QRVJBVElPTl9ERUZfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ09MTEVDVElPTl9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBDb2xsZWN0aW9uIG9uIENvbGxlY3Rpb24ge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIG5hbWVcbiAgICAgICAgc2x1Z1xuICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICBpc1ByaXZhdGVcbiAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgLi4uQXNzZXRcbiAgICAgICAgfVxuICAgICAgICBhc3NldHMge1xuICAgICAgICAgICAgLi4uQXNzZXRcbiAgICAgICAgfVxuICAgICAgICBmaWx0ZXJzIHtcbiAgICAgICAgICAgIC4uLkNvbmZpZ3VyYWJsZU9wZXJhdGlvblxuICAgICAgICB9XG4gICAgICAgIHRyYW5zbGF0aW9ucyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBzbHVnXG4gICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICB9XG4gICAgICAgIHBhcmVudCB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgICAgIGNoaWxkcmVuIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtBU1NFVF9GUkFHTUVOVH1cbiAgICAke0NPTkZJR1VSQUJMRV9PUEVSQVRJT05fRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NPTExFQ1RJT05fTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRDb2xsZWN0aW9uTGlzdCgkb3B0aW9uczogQ29sbGVjdGlvbkxpc3RPcHRpb25zKSB7XG4gICAgICAgIGNvbGxlY3Rpb25zKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgc2x1Z1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgaXNQcml2YXRlXG4gICAgICAgICAgICAgICAgZmVhdHVyZWRBc3NldCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7QVNTRVRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NPTExFQ1RJT04gPSBncWxgXG4gICAgcXVlcnkgR2V0Q29sbGVjdGlvbigkaWQ6IElEISkge1xuICAgICAgICBjb2xsZWN0aW9uKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLkNvbGxlY3Rpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NPTExFQ1RJT05fRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX0NPTExFQ1RJT04gPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlQ29sbGVjdGlvbigkaW5wdXQ6IENyZWF0ZUNvbGxlY3Rpb25JbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlQ29sbGVjdGlvbihpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Db2xsZWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDT0xMRUNUSU9OX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DT0xMRUNUSU9OID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZUNvbGxlY3Rpb24oJGlucHV0OiBVcGRhdGVDb2xsZWN0aW9uSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUNvbGxlY3Rpb24oaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uQ29sbGVjdGlvblxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09MTEVDVElPTl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBNT1ZFX0NPTExFQ1RJT04gPSBncWxgXG4gICAgbXV0YXRpb24gTW92ZUNvbGxlY3Rpb24oJGlucHV0OiBNb3ZlQ29sbGVjdGlvbklucHV0ISkge1xuICAgICAgICBtb3ZlQ29sbGVjdGlvbihpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Db2xsZWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDT0xMRUNUSU9OX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9DT0xMRUNUSU9OID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUNvbGxlY3Rpb24oJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlQ29sbGVjdGlvbihpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ09MTEVDVElPTl9DT05URU5UUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRDb2xsZWN0aW9uQ29udGVudHMoJGlkOiBJRCEsICRvcHRpb25zOiBQcm9kdWN0VmFyaWFudExpc3RPcHRpb25zKSB7XG4gICAgICAgIGNvbGxlY3Rpb24oaWQ6ICRpZCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50cyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkXG4gICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcbiJdfQ==