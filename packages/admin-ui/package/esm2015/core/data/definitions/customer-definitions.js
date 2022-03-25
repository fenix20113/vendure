import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from './shared-definitions';
export const ADDRESS_FRAGMENT = gql `
    fragment Address on Address {
        id
        createdAt
        updatedAt
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
            id
            code
            name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
    }
`;
export const CUSTOMER_FRAGMENT = gql `
    fragment Customer on Customer {
        id
        createdAt
        updatedAt
        title
        firstName
        lastName
        phoneNumber
        emailAddress
        user {
            id
            identifier
            verified
            lastLogin
        }
        addresses {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
export const GET_CUSTOMER_LIST = gql `
    query GetCustomerList($options: CustomerListOptions) {
        customers(options: $options) {
            items {
                id
                createdAt
                updatedAt
                title
                firstName
                lastName
                emailAddress
                user {
                    id
                    verified
                }
            }
            totalItems
        }
    }
`;
export const GET_CUSTOMER = gql `
    query GetCustomer($id: ID!, $orderListOptions: OrderListOptions) {
        customer(id: $id) {
            ...Customer
            groups {
                id
                name
            }
            orders(options: $orderListOptions) {
                items {
                    id
                    code
                    state
                    total
                    currencyCode
                    updatedAt
                }
                totalItems
            }
        }
    }
    ${CUSTOMER_FRAGMENT}
`;
export const CREATE_CUSTOMER = gql `
    mutation CreateCustomer($input: CreateCustomerInput!, $password: String) {
        createCustomer(input: $input, password: $password) {
            ...Customer
            ...ErrorResult
        }
    }
    ${CUSTOMER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const UPDATE_CUSTOMER = gql `
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
        updateCustomer(input: $input) {
            ...Customer
            ...ErrorResult
        }
    }
    ${CUSTOMER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const DELETE_CUSTOMER = gql `
    mutation DeleteCustomer($id: ID!) {
        deleteCustomer(id: $id) {
            result
            message
        }
    }
`;
export const CREATE_CUSTOMER_ADDRESS = gql `
    mutation CreateCustomerAddress($customerId: ID!, $input: CreateAddressInput!) {
        createCustomerAddress(customerId: $customerId, input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
export const UPDATE_CUSTOMER_ADDRESS = gql `
    mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
        updateCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
export const CREATE_CUSTOMER_GROUP = gql `
    mutation CreateCustomerGroup($input: CreateCustomerGroupInput!) {
        createCustomerGroup(input: $input) {
            id
            createdAt
            updatedAt
            name
        }
    }
`;
export const UPDATE_CUSTOMER_GROUP = gql `
    mutation UpdateCustomerGroup($input: UpdateCustomerGroupInput!) {
        updateCustomerGroup(input: $input) {
            id
            createdAt
            updatedAt
            name
        }
    }
`;
export const DELETE_CUSTOMER_GROUP = gql `
    mutation DeleteCustomerGroup($id: ID!) {
        deleteCustomerGroup(id: $id) {
            result
            message
        }
    }
`;
export const GET_CUSTOMER_GROUPS = gql `
    query GetCustomerGroups($options: CustomerGroupListOptions) {
        customerGroups(options: $options) {
            items {
                id
                createdAt
                updatedAt
                name
            }
            totalItems
        }
    }
`;
export const GET_CUSTOMER_GROUP_WITH_CUSTOMERS = gql `
    query GetCustomerGroupWithCustomers($id: ID!, $options: CustomerListOptions) {
        customerGroup(id: $id) {
            id
            createdAt
            updatedAt
            name
            customers(options: $options) {
                items {
                    id
                    createdAt
                    updatedAt
                    emailAddress
                    firstName
                    lastName
                }
                totalItems
            }
        }
    }
`;
export const ADD_CUSTOMERS_TO_GROUP = gql `
    mutation AddCustomersToGroup($groupId: ID!, $customerIds: [ID!]!) {
        addCustomersToGroup(customerGroupId: $groupId, customerIds: $customerIds) {
            id
            createdAt
            updatedAt
            name
        }
    }
`;
export const REMOVE_CUSTOMERS_FROM_GROUP = gql `
    mutation RemoveCustomersFromGroup($groupId: ID!, $customerIds: [ID!]!) {
        removeCustomersFromGroup(customerGroupId: $groupId, customerIds: $customerIds) {
            id
            createdAt
            updatedAt
            name
        }
    }
`;
export const GET_CUSTOMER_HISTORY = gql `
    query GetCustomerHistory($id: ID!, $options: HistoryEntryListOptions) {
        customer(id: $id) {
            id
            history(options: $options) {
                totalItems
                items {
                    id
                    type
                    createdAt
                    isPublic
                    administrator {
                        id
                        firstName
                        lastName
                    }
                    data
                }
            }
        }
    }
`;
export const ADD_NOTE_TO_CUSTOMER = gql `
    mutation AddNoteToCustomer($input: AddNoteToCustomerInput!) {
        addNoteToCustomer(input: $input) {
            id
        }
    }
`;
export const UPDATE_CUSTOMER_NOTE = gql `
    mutation UpdateCustomerNote($input: UpdateCustomerNoteInput!) {
        updateCustomerNote(input: $input) {
            id
            data
            isPublic
        }
    }
`;
export const DELETE_CUSTOMER_NOTE = gql `
    mutation DeleteCustomerNote($id: ID!) {
        deleteCustomerNote(id: $id) {
            result
            message
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGVmaW5pdGlvbnMvY3VzdG9tZXItZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJsQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9COUIsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtQm5DLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFxQnpCLGlCQUFpQjtDQUN0QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQTs7Ozs7OztNQU81QixpQkFBaUI7TUFDakIscUJBQXFCO0NBQzFCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O01BTzVCLGlCQUFpQjtNQUNqQixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Q0FPakMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTXBDLGdCQUFnQjtDQUNyQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNcEMsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztDQVN2QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Q0FTdkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTs7Ozs7OztDQU92QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Q0FZckMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvQm5ELENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztDQVN4QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Q0FTN0MsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJ0QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Q0FNdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Q0FRdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7OztDQU90QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBFUlJPUl9SRVNVTFRfRlJBR01FTlQgfSBmcm9tICcuL3NoYXJlZC1kZWZpbml0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBBRERSRVNTX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IEFkZHJlc3Mgb24gQWRkcmVzcyB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgZnVsbE5hbWVcbiAgICAgICAgY29tcGFueVxuICAgICAgICBzdHJlZXRMaW5lMVxuICAgICAgICBzdHJlZXRMaW5lMlxuICAgICAgICBjaXR5XG4gICAgICAgIHByb3ZpbmNlXG4gICAgICAgIHBvc3RhbENvZGVcbiAgICAgICAgY291bnRyeSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgICAgIHBob25lTnVtYmVyXG4gICAgICAgIGRlZmF1bHRTaGlwcGluZ0FkZHJlc3NcbiAgICAgICAgZGVmYXVsdEJpbGxpbmdBZGRyZXNzXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IENVU1RPTUVSX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IEN1c3RvbWVyIG9uIEN1c3RvbWVyIHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICB0aXRsZVxuICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgcGhvbmVOdW1iZXJcbiAgICAgICAgZW1haWxBZGRyZXNzXG4gICAgICAgIHVzZXIge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGlkZW50aWZpZXJcbiAgICAgICAgICAgIHZlcmlmaWVkXG4gICAgICAgICAgICBsYXN0TG9naW5cbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzZXMge1xuICAgICAgICAgICAgLi4uQWRkcmVzc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7QUREUkVTU19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ1VTVE9NRVJfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRDdXN0b21lckxpc3QoJG9wdGlvbnM6IEN1c3RvbWVyTGlzdE9wdGlvbnMpIHtcbiAgICAgICAgY3VzdG9tZXJzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICB0aXRsZVxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZVxuICAgICAgICAgICAgICAgIGxhc3ROYW1lXG4gICAgICAgICAgICAgICAgZW1haWxBZGRyZXNzXG4gICAgICAgICAgICAgICAgdXNlciB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmaWVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9DVVNUT01FUiA9IGdxbGBcbiAgICBxdWVyeSBHZXRDdXN0b21lcigkaWQ6IElEISwgJG9yZGVyTGlzdE9wdGlvbnM6IE9yZGVyTGlzdE9wdGlvbnMpIHtcbiAgICAgICAgY3VzdG9tZXIoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uQ3VzdG9tZXJcbiAgICAgICAgICAgIGdyb3VwcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcmRlcnMob3B0aW9uczogJG9yZGVyTGlzdE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgdG90YWxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDVVNUT01FUl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfQ1VTVE9NRVIgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlQ3VzdG9tZXIoJGlucHV0OiBDcmVhdGVDdXN0b21lcklucHV0ISwgJHBhc3N3b3JkOiBTdHJpbmcpIHtcbiAgICAgICAgY3JlYXRlQ3VzdG9tZXIoaW5wdXQ6ICRpbnB1dCwgcGFzc3dvcmQ6ICRwYXNzd29yZCkge1xuICAgICAgICAgICAgLi4uQ3VzdG9tZXJcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDVVNUT01FUl9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfQ1VTVE9NRVIgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlQ3VzdG9tZXIoJGlucHV0OiBVcGRhdGVDdXN0b21lcklucHV0ISkge1xuICAgICAgICB1cGRhdGVDdXN0b21lcihpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5DdXN0b21lclxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NVU1RPTUVSX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9DVVNUT01FUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVDdXN0b21lcigkaWQ6IElEISkge1xuICAgICAgICBkZWxldGVDdXN0b21lcihpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfQ1VTVE9NRVJfQUREUkVTUyA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVDdXN0b21lckFkZHJlc3MoJGN1c3RvbWVySWQ6IElEISwgJGlucHV0OiBDcmVhdGVBZGRyZXNzSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZUN1c3RvbWVyQWRkcmVzcyhjdXN0b21lcklkOiAkY3VzdG9tZXJJZCwgaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uQWRkcmVzc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7QUREUkVTU19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfQ1VTVE9NRVJfQUREUkVTUyA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVDdXN0b21lckFkZHJlc3MoJGlucHV0OiBVcGRhdGVBZGRyZXNzSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUN1c3RvbWVyQWRkcmVzcyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5BZGRyZXNzXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtBRERSRVNTX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9DVVNUT01FUl9HUk9VUCA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVDdXN0b21lckdyb3VwKCRpbnB1dDogQ3JlYXRlQ3VzdG9tZXJHcm91cElucHV0ISkge1xuICAgICAgICBjcmVhdGVDdXN0b21lckdyb3VwKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DVVNUT01FUl9HUk9VUCA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVDdXN0b21lckdyb3VwKCRpbnB1dDogVXBkYXRlQ3VzdG9tZXJHcm91cElucHV0ISkge1xuICAgICAgICB1cGRhdGVDdXN0b21lckdyb3VwKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9DVVNUT01FUl9HUk9VUCA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVDdXN0b21lckdyb3VwKCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZUN1c3RvbWVyR3JvdXAoaWQ6ICRpZCkge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NVU1RPTUVSX0dST1VQUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRDdXN0b21lckdyb3Vwcygkb3B0aW9uczogQ3VzdG9tZXJHcm91cExpc3RPcHRpb25zKSB7XG4gICAgICAgIGN1c3RvbWVyR3JvdXBzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NVU1RPTUVSX0dST1VQX1dJVEhfQ1VTVE9NRVJTID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEN1c3RvbWVyR3JvdXBXaXRoQ3VzdG9tZXJzKCRpZDogSUQhLCAkb3B0aW9uczogQ3VzdG9tZXJMaXN0T3B0aW9ucykge1xuICAgICAgICBjdXN0b21lckdyb3VwKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgY3VzdG9tZXJzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEFERF9DVVNUT01FUlNfVE9fR1JPVVAgPSBncWxgXG4gICAgbXV0YXRpb24gQWRkQ3VzdG9tZXJzVG9Hcm91cCgkZ3JvdXBJZDogSUQhLCAkY3VzdG9tZXJJZHM6IFtJRCFdISkge1xuICAgICAgICBhZGRDdXN0b21lcnNUb0dyb3VwKGN1c3RvbWVyR3JvdXBJZDogJGdyb3VwSWQsIGN1c3RvbWVySWRzOiAkY3VzdG9tZXJJZHMpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFJFTU9WRV9DVVNUT01FUlNfRlJPTV9HUk9VUCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZW1vdmVDdXN0b21lcnNGcm9tR3JvdXAoJGdyb3VwSWQ6IElEISwgJGN1c3RvbWVySWRzOiBbSUQhXSEpIHtcbiAgICAgICAgcmVtb3ZlQ3VzdG9tZXJzRnJvbUdyb3VwKGN1c3RvbWVyR3JvdXBJZDogJGdyb3VwSWQsIGN1c3RvbWVySWRzOiAkY3VzdG9tZXJJZHMpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9DVVNUT01FUl9ISVNUT1JZID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEN1c3RvbWVySGlzdG9yeSgkaWQ6IElEISwgJG9wdGlvbnM6IEhpc3RvcnlFbnRyeUxpc3RPcHRpb25zKSB7XG4gICAgICAgIGN1c3RvbWVyKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBoaXN0b3J5KG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgaXNQdWJsaWNcbiAgICAgICAgICAgICAgICAgICAgYWRtaW5pc3RyYXRvciB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQUREX05PVEVfVE9fQ1VTVE9NRVIgPSBncWxgXG4gICAgbXV0YXRpb24gQWRkTm90ZVRvQ3VzdG9tZXIoJGlucHV0OiBBZGROb3RlVG9DdXN0b21lcklucHV0ISkge1xuICAgICAgICBhZGROb3RlVG9DdXN0b21lcihpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DVVNUT01FUl9OT1RFID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZUN1c3RvbWVyTm90ZSgkaW5wdXQ6IFVwZGF0ZUN1c3RvbWVyTm90ZUlucHV0ISkge1xuICAgICAgICB1cGRhdGVDdXN0b21lck5vdGUoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgIGlzUHVibGljXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX0NVU1RPTUVSX05PVEUgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlQ3VzdG9tZXJOb3RlKCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZUN1c3RvbWVyTm90ZShpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG4iXX0=