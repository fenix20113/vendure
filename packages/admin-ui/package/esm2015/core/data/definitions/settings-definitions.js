import { gql } from 'apollo-angular';
import { CONFIGURABLE_OPERATION_DEF_FRAGMENT, CONFIGURABLE_OPERATION_FRAGMENT, ERROR_RESULT_FRAGMENT, } from './shared-definitions';
export const COUNTRY_FRAGMENT = gql `
    fragment Country on Country {
        id
        createdAt
        updatedAt
        code
        name
        enabled
        translations {
            id
            languageCode
            name
        }
    }
`;
export const GET_COUNTRY_LIST = gql `
    query GetCountryList($options: CountryListOptions) {
        countries(options: $options) {
            items {
                id
                code
                name
                enabled
            }
            totalItems
        }
    }
`;
export const GET_AVAILABLE_COUNTRIES = gql `
    query GetAvailableCountries {
        countries(options: { filter: { enabled: { eq: true } } }) {
            items {
                id
                code
                name
                enabled
            }
        }
    }
`;
export const GET_COUNTRY = gql `
    query GetCountry($id: ID!) {
        country(id: $id) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
export const CREATE_COUNTRY = gql `
    mutation CreateCountry($input: CreateCountryInput!) {
        createCountry(input: $input) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
export const UPDATE_COUNTRY = gql `
    mutation UpdateCountry($input: UpdateCountryInput!) {
        updateCountry(input: $input) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
export const DELETE_COUNTRY = gql `
    mutation DeleteCountry($id: ID!) {
        deleteCountry(id: $id) {
            result
            message
        }
    }
`;
export const ZONE_FRAGMENT = gql `
    fragment Zone on Zone {
        id
        name
        members {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
export const GET_ZONES = gql `
    query GetZones {
        zones {
            id
            createdAt
            updatedAt
            name
            members {
                createdAt
                updatedAt
                id
                name
                code
                enabled
            }
        }
    }
`;
export const GET_ZONE = gql `
    query GetZone($id: ID!) {
        zone(id: $id) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const CREATE_ZONE = gql `
    mutation CreateZone($input: CreateZoneInput!) {
        createZone(input: $input) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const UPDATE_ZONE = gql `
    mutation UpdateZone($input: UpdateZoneInput!) {
        updateZone(input: $input) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const DELETE_ZONE = gql `
    mutation DeleteZone($id: ID!) {
        deleteZone(id: $id) {
            message
            result
        }
    }
`;
export const ADD_MEMBERS_TO_ZONE = gql `
    mutation AddMembersToZone($zoneId: ID!, $memberIds: [ID!]!) {
        addMembersToZone(zoneId: $zoneId, memberIds: $memberIds) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const REMOVE_MEMBERS_FROM_ZONE = gql `
    mutation RemoveMembersFromZone($zoneId: ID!, $memberIds: [ID!]!) {
        removeMembersFromZone(zoneId: $zoneId, memberIds: $memberIds) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
export const TAX_CATEGORY_FRAGMENT = gql `
    fragment TaxCategory on TaxCategory {
        id
        createdAt
        updatedAt
        name
        isDefault
    }
`;
export const GET_TAX_CATEGORIES = gql `
    query GetTaxCategories {
        taxCategories {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
export const GET_TAX_CATEGORY = gql `
    query GetTaxCategory($id: ID!) {
        taxCategory(id: $id) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
export const CREATE_TAX_CATEGORY = gql `
    mutation CreateTaxCategory($input: CreateTaxCategoryInput!) {
        createTaxCategory(input: $input) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
export const UPDATE_TAX_CATEGORY = gql `
    mutation UpdateTaxCategory($input: UpdateTaxCategoryInput!) {
        updateTaxCategory(input: $input) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
export const DELETE_TAX_CATEGORY = gql `
    mutation DeleteTaxCategory($id: ID!) {
        deleteTaxCategory(id: $id) {
            result
            message
        }
    }
`;
export const TAX_RATE_FRAGMENT = gql `
    fragment TaxRate on TaxRate {
        id
        createdAt
        updatedAt
        name
        enabled
        value
        category {
            id
            name
        }
        zone {
            id
            name
        }
        customerGroup {
            id
            name
        }
    }
`;
export const GET_TAX_RATE_LIST = gql `
    query GetTaxRateList($options: TaxRateListOptions) {
        taxRates(options: $options) {
            items {
                ...TaxRate
            }
            totalItems
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
export const GET_TAX_RATE = gql `
    query GetTaxRate($id: ID!) {
        taxRate(id: $id) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
export const CREATE_TAX_RATE = gql `
    mutation CreateTaxRate($input: CreateTaxRateInput!) {
        createTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
export const UPDATE_TAX_RATE = gql `
    mutation UpdateTaxRate($input: UpdateTaxRateInput!) {
        updateTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
export const DELETE_TAX_RATE = gql `
    mutation DeleteTaxRate($id: ID!) {
        deleteTaxRate(id: $id) {
            result
            message
        }
    }
`;
export const CHANNEL_FRAGMENT = gql `
    fragment Channel on Channel {
        id
        createdAt
        updatedAt
        code
        token
        pricesIncludeTax
        currencyCode
        defaultLanguageCode
        defaultShippingZone {
            id
            name
        }
        defaultTaxZone {
            id
            name
        }
    }
`;
export const GET_CHANNELS = gql `
    query GetChannels {
        channels {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
export const GET_CHANNEL = gql `
    query GetChannel($id: ID!) {
        channel(id: $id) {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
export const GET_ACTIVE_CHANNEL = gql `
    query GetActiveChannel {
        activeChannel {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
export const CREATE_CHANNEL = gql `
    mutation CreateChannel($input: CreateChannelInput!) {
        createChannel(input: $input) {
            ...Channel
            ...ErrorResult
        }
    }
    ${CHANNEL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const UPDATE_CHANNEL = gql `
    mutation UpdateChannel($input: UpdateChannelInput!) {
        updateChannel(input: $input) {
            ...Channel
            ...ErrorResult
        }
    }
    ${CHANNEL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const DELETE_CHANNEL = gql `
    mutation DeleteChannel($id: ID!) {
        deleteChannel(id: $id) {
            result
            message
        }
    }
`;
export const PAYMENT_METHOD_FRAGMENT = gql `
    fragment PaymentMethod on PaymentMethod {
        id
        createdAt
        updatedAt
        name
        code
        description
        enabled
        checker {
            ...ConfigurableOperation
        }
        handler {
            ...ConfigurableOperation
        }
    }
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
export const GET_PAYMENT_METHOD_LIST = gql `
    query GetPaymentMethodList($options: PaymentMethodListOptions!) {
        paymentMethods(options: $options) {
            items {
                ...PaymentMethod
            }
            totalItems
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
export const GET_PAYMENT_METHOD_OPERATIONS = gql `
    query GetPaymentMethodOperations {
        paymentMethodEligibilityCheckers {
            ...ConfigurableOperationDef
        }
        paymentMethodHandlers {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
export const GET_PAYMENT_METHOD = gql `
    query GetPaymentMethod($id: ID!) {
        paymentMethod(id: $id) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
export const CREATE_PAYMENT_METHOD = gql `
    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
        createPaymentMethod(input: $input) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
export const UPDATE_PAYMENT_METHOD = gql `
    mutation UpdatePaymentMethod($input: UpdatePaymentMethodInput!) {
        updatePaymentMethod(input: $input) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
export const DELETE_PAYMENT_METHOD = gql `
    mutation DeletePaymentMethod($id: ID!, $force: Boolean) {
        deletePaymentMethod(id: $id, force: $force) {
            result
            message
        }
    }
`;
export const GLOBAL_SETTINGS_FRAGMENT = gql `
    fragment GlobalSettings on GlobalSettings {
        id
        availableLanguages
        trackInventory
        outOfStockThreshold
        serverConfig {
            permissions {
                name
                description
                assignable
            }
            orderProcess {
                name
            }
        }
    }
`;
export const GET_GLOBAL_SETTINGS = gql `
    query GetGlobalSettings {
        globalSettings {
            ...GlobalSettings
        }
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
`;
export const UPDATE_GLOBAL_SETTINGS = gql `
    mutation UpdateGlobalSettings($input: UpdateGlobalSettingsInput!) {
        updateGlobalSettings(input: $input) {
            ...GlobalSettings
            ...ErrorResult
        }
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const CUSTOM_FIELD_CONFIG_FRAGMENT = gql `
    fragment CustomFieldConfig on CustomField {
        name
        type
        list
        description {
            languageCode
            value
        }
        label {
            languageCode
            value
        }
        readonly
    }
`;
export const STRING_CUSTOM_FIELD_FRAGMENT = gql `
    fragment StringCustomField on StringCustomFieldConfig {
        ...CustomFieldConfig
        pattern
        options {
            label {
                languageCode
                value
            }
            value
        }
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const LOCALE_STRING_CUSTOM_FIELD_FRAGMENT = gql `
    fragment LocaleStringCustomField on LocaleStringCustomFieldConfig {
        ...CustomFieldConfig
        pattern
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const BOOLEAN_CUSTOM_FIELD_FRAGMENT = gql `
    fragment BooleanCustomField on BooleanCustomFieldConfig {
        ...CustomFieldConfig
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const INT_CUSTOM_FIELD_FRAGMENT = gql `
    fragment IntCustomField on IntCustomFieldConfig {
        ...CustomFieldConfig
        intMin: min
        intMax: max
        intStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const FLOAT_CUSTOM_FIELD_FRAGMENT = gql `
    fragment FloatCustomField on FloatCustomFieldConfig {
        ...CustomFieldConfig
        floatMin: min
        floatMax: max
        floatStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const DATE_TIME_CUSTOM_FIELD_FRAGMENT = gql `
    fragment DateTimeCustomField on DateTimeCustomFieldConfig {
        ...CustomFieldConfig
        datetimeMin: min
        datetimeMax: max
        datetimeStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const RELATION_CUSTOM_FIELD_FRAGMENT = gql `
    fragment RelationCustomField on RelationCustomFieldConfig {
        ...CustomFieldConfig
        entity
        scalarFields
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
export const ALL_CUSTOM_FIELDS_FRAGMENT = gql `
    fragment CustomFields on CustomField {
        ... on StringCustomFieldConfig {
            ...StringCustomField
        }
        ... on LocaleStringCustomFieldConfig {
            ...LocaleStringCustomField
        }
        ... on BooleanCustomFieldConfig {
            ...BooleanCustomField
        }
        ... on IntCustomFieldConfig {
            ...IntCustomField
        }
        ... on FloatCustomFieldConfig {
            ...FloatCustomField
        }
        ... on DateTimeCustomFieldConfig {
            ...DateTimeCustomField
        }
        ... on RelationCustomFieldConfig {
            ...RelationCustomField
        }
    }
    ${STRING_CUSTOM_FIELD_FRAGMENT}
    ${LOCALE_STRING_CUSTOM_FIELD_FRAGMENT}
    ${BOOLEAN_CUSTOM_FIELD_FRAGMENT}
    ${INT_CUSTOM_FIELD_FRAGMENT}
    ${FLOAT_CUSTOM_FIELD_FRAGMENT}
    ${DATE_TIME_CUSTOM_FIELD_FRAGMENT}
    ${RELATION_CUSTOM_FIELD_FRAGMENT}
`;
export const GET_SERVER_CONFIG = gql `
    query GetServerConfig {
        globalSettings {
            id
            serverConfig {
                orderProcess {
                    name
                    to
                }
                permittedAssetTypes
                permissions {
                    name
                    description
                    assignable
                }
                customFieldConfig {
                    Address {
                        ...CustomFields
                    }
                    Administrator {
                        ...CustomFields
                    }
                    Asset {
                        ...CustomFields
                    }
                    Channel {
                        ...CustomFields
                    }
                    Collection {
                        ...CustomFields
                    }
                    Customer {
                        ...CustomFields
                    }
                    Facet {
                        ...CustomFields
                    }
                    FacetValue {
                        ...CustomFields
                    }
                    Fulfillment {
                        ...CustomFields
                    }
                    GlobalSettings {
                        ...CustomFields
                    }
                    Order {
                        ...CustomFields
                    }
                    OrderLine {
                        ...CustomFields
                    }
                    Product {
                        ...CustomFields
                    }
                    ProductOption {
                        ...CustomFields
                    }
                    ProductOptionGroup {
                        ...CustomFields
                    }
                    ProductVariant {
                        ...CustomFields
                    }
                    ShippingMethod {
                        ...CustomFields
                    }
                    User {
                        ...CustomFields
                    }
                }
            }
        }
    }
    ${ALL_CUSTOM_FIELDS_FRAGMENT}
`;
export const JOB_INFO_FRAGMENT = gql `
    fragment JobInfo on Job {
        id
        createdAt
        startedAt
        settledAt
        queueName
        state
        isSettled
        progress
        duration
        data
        result
        error
    }
`;
export const GET_JOB_INFO = gql `
    query GetJobInfo($id: ID!) {
        job(jobId: $id) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const GET_JOBS_LIST = gql `
    query GetAllJobs($options: JobListOptions) {
        jobs(options: $options) {
            items {
                ...JobInfo
            }
            totalItems
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const GET_JOBS_BY_ID = gql `
    query GetJobsById($ids: [ID!]!) {
        jobsById(jobIds: $ids) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const GET_JOB_QUEUE_LIST = gql `
    query GetJobQueueList {
        jobQueues {
            name
            running
        }
    }
`;
export const CANCEL_JOB = gql `
    mutation CancelJob($id: ID!) {
        cancelJob(jobId: $id) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
export const REINDEX = gql `
    mutation Reindex {
        reindex {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGVmaW5pdGlvbnMvc2V0dGluZ3MtZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFDSCxtQ0FBbUMsRUFDbkMsK0JBQStCLEVBQy9CLHFCQUFxQixHQUN4QixNQUFNLHNCQUFzQixDQUFDO0FBRTlCLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Q0FjbEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0NBWWxDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0NBV3pDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNeEIsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNM0IsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNM0IsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBT2hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFBOzs7Ozs7OztNQVExQixnQkFBZ0I7Q0FDckIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaUIzQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1B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LGtCQUFrQixHQUFHLEdBQUcsQ0FBQTs7Ozs7OztDQU9wQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTXZCLGlCQUFpQjtDQUN0QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTXBCLGlCQUFpQjtDQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5pbXBvcnQge1xuICAgIENPTkZJR1VSQUJMRV9PUEVSQVRJT05fREVGX0ZSQUdNRU5ULFxuICAgIENPTkZJR1VSQUJMRV9PUEVSQVRJT05fRlJBR01FTlQsXG4gICAgRVJST1JfUkVTVUxUX0ZSQUdNRU5ULFxufSBmcm9tICcuL3NoYXJlZC1kZWZpbml0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBDT1VOVFJZX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IENvdW50cnkgb24gQ291bnRyeSB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgY29kZVxuICAgICAgICBuYW1lXG4gICAgICAgIGVuYWJsZWRcbiAgICAgICAgdHJhbnNsYXRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ09VTlRSWV9MSVNUID0gZ3FsYFxuICAgIHF1ZXJ5IEdldENvdW50cnlMaXN0KCRvcHRpb25zOiBDb3VudHJ5TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgY291bnRyaWVzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIGVuYWJsZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQVZBSUxBQkxFX0NPVU5UUklFUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRBdmFpbGFibGVDb3VudHJpZXMge1xuICAgICAgICBjb3VudHJpZXMob3B0aW9uczogeyBmaWx0ZXI6IHsgZW5hYmxlZDogeyBlcTogdHJ1ZSB9IH0gfSkge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICBlbmFibGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NPVU5UUlkgPSBncWxgXG4gICAgcXVlcnkgR2V0Q291bnRyeSgkaWQ6IElEISkge1xuICAgICAgICBjb3VudHJ5KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLkNvdW50cnlcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NPVU5UUllfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX0NPVU5UUlkgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlQ291bnRyeSgkaW5wdXQ6IENyZWF0ZUNvdW50cnlJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlQ291bnRyeShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Db3VudHJ5XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDT1VOVFJZX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DT1VOVFJZID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZUNvdW50cnkoJGlucHV0OiBVcGRhdGVDb3VudHJ5SW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUNvdW50cnkoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uQ291bnRyeVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09VTlRSWV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfQ09VTlRSWSA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVDb3VudHJ5KCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZUNvdW50cnkoaWQ6ICRpZCkge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgWk9ORV9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBab25lIG9uIFpvbmUge1xuICAgICAgICBpZFxuICAgICAgICBuYW1lXG4gICAgICAgIG1lbWJlcnMge1xuICAgICAgICAgICAgLi4uQ291bnRyeVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09VTlRSWV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfWk9ORVMgPSBncWxgXG4gICAgcXVlcnkgR2V0Wm9uZXMge1xuICAgICAgICB6b25lcyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIG1lbWJlcnMge1xuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICBlbmFibGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1pPTkUgPSBncWxgXG4gICAgcXVlcnkgR2V0Wm9uZSgkaWQ6IElEISkge1xuICAgICAgICB6b25lKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLlpvbmVcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1pPTkVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX1pPTkUgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlWm9uZSgkaW5wdXQ6IENyZWF0ZVpvbmVJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlWm9uZShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5ab25lXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtaT05FX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9aT05FID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVpvbmUoJGlucHV0OiBVcGRhdGVab25lSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVpvbmUoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uWm9uZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Wk9ORV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfWk9ORSA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVab25lKCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZVpvbmUoaWQ6ICRpZCkge1xuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQUREX01FTUJFUlNfVE9fWk9ORSA9IGdxbGBcbiAgICBtdXRhdGlvbiBBZGRNZW1iZXJzVG9ab25lKCR6b25lSWQ6IElEISwgJG1lbWJlcklkczogW0lEIV0hKSB7XG4gICAgICAgIGFkZE1lbWJlcnNUb1pvbmUoem9uZUlkOiAkem9uZUlkLCBtZW1iZXJJZHM6ICRtZW1iZXJJZHMpIHtcbiAgICAgICAgICAgIC4uLlpvbmVcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1pPTkVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFX01FTUJFUlNfRlJPTV9aT05FID0gZ3FsYFxuICAgIG11dGF0aW9uIFJlbW92ZU1lbWJlcnNGcm9tWm9uZSgkem9uZUlkOiBJRCEsICRtZW1iZXJJZHM6IFtJRCFdISkge1xuICAgICAgICByZW1vdmVNZW1iZXJzRnJvbVpvbmUoem9uZUlkOiAkem9uZUlkLCBtZW1iZXJJZHM6ICRtZW1iZXJJZHMpIHtcbiAgICAgICAgICAgIC4uLlpvbmVcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1pPTkVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVEFYX0NBVEVHT1JZX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IFRheENhdGVnb3J5IG9uIFRheENhdGVnb3J5IHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBuYW1lXG4gICAgICAgIGlzRGVmYXVsdFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfVEFYX0NBVEVHT1JJRVMgPSBncWxgXG4gICAgcXVlcnkgR2V0VGF4Q2F0ZWdvcmllcyB7XG4gICAgICAgIHRheENhdGVnb3JpZXMge1xuICAgICAgICAgICAgLi4uVGF4Q2F0ZWdvcnlcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1RBWF9DQVRFR09SWV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfVEFYX0NBVEVHT1JZID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFRheENhdGVnb3J5KCRpZDogSUQhKSB7XG4gICAgICAgIHRheENhdGVnb3J5KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLlRheENhdGVnb3J5XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQVhfQ0FURUdPUllfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX1RBWF9DQVRFR09SWSA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVUYXhDYXRlZ29yeSgkaW5wdXQ6IENyZWF0ZVRheENhdGVnb3J5SW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVRheENhdGVnb3J5KGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlRheENhdGVnb3J5XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQVhfQ0FURUdPUllfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX1RBWF9DQVRFR09SWSA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVUYXhDYXRlZ29yeSgkaW5wdXQ6IFVwZGF0ZVRheENhdGVnb3J5SW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVRheENhdGVnb3J5KGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlRheENhdGVnb3J5XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQVhfQ0FURUdPUllfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX1RBWF9DQVRFR09SWSA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVUYXhDYXRlZ29yeSgkaWQ6IElEISkge1xuICAgICAgICBkZWxldGVUYXhDYXRlZ29yeShpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUQVhfUkFURV9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBUYXhSYXRlIG9uIFRheFJhdGUge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIG5hbWVcbiAgICAgICAgZW5hYmxlZFxuICAgICAgICB2YWx1ZVxuICAgICAgICBjYXRlZ29yeSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgICAgIHpvbmUge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBjdXN0b21lckdyb3VwIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1RBWF9SQVRFX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0VGF4UmF0ZUxpc3QoJG9wdGlvbnM6IFRheFJhdGVMaXN0T3B0aW9ucykge1xuICAgICAgICB0YXhSYXRlcyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIC4uLlRheFJhdGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1RBWF9SQVRFX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9UQVhfUkFURSA9IGdxbGBcbiAgICBxdWVyeSBHZXRUYXhSYXRlKCRpZDogSUQhKSB7XG4gICAgICAgIHRheFJhdGUoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uVGF4UmF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7VEFYX1JBVEVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX1RBWF9SQVRFID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZVRheFJhdGUoJGlucHV0OiBDcmVhdGVUYXhSYXRlSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVRheFJhdGUoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uVGF4UmF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7VEFYX1JBVEVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX1RBWF9SQVRFID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVRheFJhdGUoJGlucHV0OiBVcGRhdGVUYXhSYXRlSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVRheFJhdGUoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uVGF4UmF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7VEFYX1JBVEVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX1RBWF9SQVRFID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVRheFJhdGUoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlVGF4UmF0ZShpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IENoYW5uZWwgb24gQ2hhbm5lbCB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgY29kZVxuICAgICAgICB0b2tlblxuICAgICAgICBwcmljZXNJbmNsdWRlVGF4XG4gICAgICAgIGN1cnJlbmN5Q29kZVxuICAgICAgICBkZWZhdWx0TGFuZ3VhZ2VDb2RlXG4gICAgICAgIGRlZmF1bHRTaGlwcGluZ1pvbmUge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0VGF4Wm9uZSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9DSEFOTkVMUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRDaGFubmVscyB7XG4gICAgICAgIGNoYW5uZWxzIHtcbiAgICAgICAgICAgIC4uLkNoYW5uZWxcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NIQU5ORUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NIQU5ORUwgPSBncWxgXG4gICAgcXVlcnkgR2V0Q2hhbm5lbCgkaWQ6IElEISkge1xuICAgICAgICBjaGFubmVsKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLkNoYW5uZWxcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NIQU5ORUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0FDVElWRV9DSEFOTkVMID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEFjdGl2ZUNoYW5uZWwge1xuICAgICAgICBhY3RpdmVDaGFubmVsIHtcbiAgICAgICAgICAgIC4uLkNoYW5uZWxcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NIQU5ORUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX0NIQU5ORUwgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlQ2hhbm5lbCgkaW5wdXQ6IENyZWF0ZUNoYW5uZWxJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlQ2hhbm5lbChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5DaGFubmVsXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q0hBTk5FTF9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVDaGFubmVsKCRpbnB1dDogVXBkYXRlQ2hhbm5lbElucHV0ISkge1xuICAgICAgICB1cGRhdGVDaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkNoYW5uZWxcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDSEFOTkVMX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9DSEFOTkVMID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUNoYW5uZWwoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlQ2hhbm5lbChpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQQVlNRU5UX01FVEhPRF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBQYXltZW50TWV0aG9kIG9uIFBheW1lbnRNZXRob2Qge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIG5hbWVcbiAgICAgICAgY29kZVxuICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICBlbmFibGVkXG4gICAgICAgIGNoZWNrZXIge1xuICAgICAgICAgICAgLi4uQ29uZmlndXJhYmxlT3BlcmF0aW9uXG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlciB7XG4gICAgICAgICAgICAuLi5Db25maWd1cmFibGVPcGVyYXRpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NPTkZJR1VSQUJMRV9PUEVSQVRJT05fRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1BBWU1FTlRfTUVUSE9EX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0UGF5bWVudE1ldGhvZExpc3QoJG9wdGlvbnM6IFBheW1lbnRNZXRob2RMaXN0T3B0aW9ucyEpIHtcbiAgICAgICAgcGF5bWVudE1ldGhvZHMob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAuLi5QYXltZW50TWV0aG9kXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQQVlNRU5UX01FVEhPRF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUEFZTUVOVF9NRVRIT0RfT1BFUkFUSU9OUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRQYXltZW50TWV0aG9kT3BlcmF0aW9ucyB7XG4gICAgICAgIHBheW1lbnRNZXRob2RFbGlnaWJpbGl0eUNoZWNrZXJzIHtcbiAgICAgICAgICAgIC4uLkNvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZlxuICAgICAgICB9XG4gICAgICAgIHBheW1lbnRNZXRob2RIYW5kbGVycyB7XG4gICAgICAgICAgICAuLi5Db25maWd1cmFibGVPcGVyYXRpb25EZWZcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NPTkZJR1VSQUJMRV9PUEVSQVRJT05fREVGX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9QQVlNRU5UX01FVEhPRCA9IGdxbGBcbiAgICBxdWVyeSBHZXRQYXltZW50TWV0aG9kKCRpZDogSUQhKSB7XG4gICAgICAgIHBheW1lbnRNZXRob2QoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uUGF5bWVudE1ldGhvZFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UEFZTUVOVF9NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX1BBWU1FTlRfTUVUSE9EID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZVBheW1lbnRNZXRob2QoJGlucHV0OiBDcmVhdGVQYXltZW50TWV0aG9kSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVBheW1lbnRNZXRob2QoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUGF5bWVudE1ldGhvZFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UEFZTUVOVF9NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX1BBWU1FTlRfTUVUSE9EID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVBheW1lbnRNZXRob2QoJGlucHV0OiBVcGRhdGVQYXltZW50TWV0aG9kSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVBheW1lbnRNZXRob2QoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUGF5bWVudE1ldGhvZFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UEFZTUVOVF9NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX1BBWU1FTlRfTUVUSE9EID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVBheW1lbnRNZXRob2QoJGlkOiBJRCEsICRmb3JjZTogQm9vbGVhbikge1xuICAgICAgICBkZWxldGVQYXltZW50TWV0aG9kKGlkOiAkaWQsIGZvcmNlOiAkZm9yY2UpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdMT0JBTF9TRVRUSU5HU19GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBHbG9iYWxTZXR0aW5ncyBvbiBHbG9iYWxTZXR0aW5ncyB7XG4gICAgICAgIGlkXG4gICAgICAgIGF2YWlsYWJsZUxhbmd1YWdlc1xuICAgICAgICB0cmFja0ludmVudG9yeVxuICAgICAgICBvdXRPZlN0b2NrVGhyZXNob2xkXG4gICAgICAgIHNlcnZlckNvbmZpZyB7XG4gICAgICAgICAgICBwZXJtaXNzaW9ucyB7XG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgYXNzaWduYWJsZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3JkZXJQcm9jZXNzIHtcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0dMT0JBTF9TRVRUSU5HUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRHbG9iYWxTZXR0aW5ncyB7XG4gICAgICAgIGdsb2JhbFNldHRpbmdzIHtcbiAgICAgICAgICAgIC4uLkdsb2JhbFNldHRpbmdzXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtHTE9CQUxfU0VUVElOR1NfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX0dMT0JBTF9TRVRUSU5HUyA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVHbG9iYWxTZXR0aW5ncygkaW5wdXQ6IFVwZGF0ZUdsb2JhbFNldHRpbmdzSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUdsb2JhbFNldHRpbmdzKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkdsb2JhbFNldHRpbmdzXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7R0xPQkFMX1NFVFRJTkdTX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9GSUVMRF9DT05GSUdfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgQ3VzdG9tRmllbGRDb25maWcgb24gQ3VzdG9tRmllbGQge1xuICAgICAgICBuYW1lXG4gICAgICAgIHR5cGVcbiAgICAgICAgbGlzdFxuICAgICAgICBkZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgbGFiZWwge1xuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHJlYWRvbmx5XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNUUklOR19DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgU3RyaW5nQ3VzdG9tRmllbGQgb24gU3RyaW5nQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAuLi5DdXN0b21GaWVsZENvbmZpZ1xuICAgICAgICBwYXR0ZXJuXG4gICAgICAgIG9wdGlvbnMge1xuICAgICAgICAgICAgbGFiZWwge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5leHBvcnQgY29uc3QgTE9DQUxFX1NUUklOR19DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgTG9jYWxlU3RyaW5nQ3VzdG9tRmllbGQgb24gTG9jYWxlU3RyaW5nQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAuLi5DdXN0b21GaWVsZENvbmZpZ1xuICAgICAgICBwYXR0ZXJuXG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5leHBvcnQgY29uc3QgQk9PTEVBTl9DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgQm9vbGVhbkN1c3RvbUZpZWxkIG9uIEJvb2xlYW5DdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgIC4uLkN1c3RvbUZpZWxkQ29uZmlnXG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5leHBvcnQgY29uc3QgSU5UX0NVU1RPTV9GSUVMRF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBJbnRDdXN0b21GaWVsZCBvbiBJbnRDdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgIC4uLkN1c3RvbUZpZWxkQ29uZmlnXG4gICAgICAgIGludE1pbjogbWluXG4gICAgICAgIGludE1heDogbWF4XG4gICAgICAgIGludFN0ZXA6IHN0ZXBcbiAgICB9XG4gICAgJHtDVVNUT01fRklFTERfQ09ORklHX0ZSQUdNRU5UfVxuYDtcbmV4cG9ydCBjb25zdCBGTE9BVF9DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgRmxvYXRDdXN0b21GaWVsZCBvbiBGbG9hdEN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgLi4uQ3VzdG9tRmllbGRDb25maWdcbiAgICAgICAgZmxvYXRNaW46IG1pblxuICAgICAgICBmbG9hdE1heDogbWF4XG4gICAgICAgIGZsb2F0U3RlcDogc3RlcFxuICAgIH1cbiAgICAke0NVU1RPTV9GSUVMRF9DT05GSUdfRlJBR01FTlR9XG5gO1xuZXhwb3J0IGNvbnN0IERBVEVfVElNRV9DVVNUT01fRklFTERfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgRGF0ZVRpbWVDdXN0b21GaWVsZCBvbiBEYXRlVGltZUN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgLi4uQ3VzdG9tRmllbGRDb25maWdcbiAgICAgICAgZGF0ZXRpbWVNaW46IG1pblxuICAgICAgICBkYXRldGltZU1heDogbWF4XG4gICAgICAgIGRhdGV0aW1lU3RlcDogc3RlcFxuICAgIH1cbiAgICAke0NVU1RPTV9GSUVMRF9DT05GSUdfRlJBR01FTlR9XG5gO1xuZXhwb3J0IGNvbnN0IFJFTEFUSU9OX0NVU1RPTV9GSUVMRF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBSZWxhdGlvbkN1c3RvbUZpZWxkIG9uIFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAuLi5DdXN0b21GaWVsZENvbmZpZ1xuICAgICAgICBlbnRpdHlcbiAgICAgICAgc2NhbGFyRmllbGRzXG4gICAgfVxuICAgICR7Q1VTVE9NX0ZJRUxEX0NPTkZJR19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBTExfQ1VTVE9NX0ZJRUxEU19GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBDdXN0b21GaWVsZHMgb24gQ3VzdG9tRmllbGQge1xuICAgICAgICAuLi4gb24gU3RyaW5nQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAgICAgLi4uU3RyaW5nQ3VzdG9tRmllbGRcbiAgICAgICAgfVxuICAgICAgICAuLi4gb24gTG9jYWxlU3RyaW5nQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAgICAgLi4uTG9jYWxlU3RyaW5nQ3VzdG9tRmllbGRcbiAgICAgICAgfVxuICAgICAgICAuLi4gb24gQm9vbGVhbkN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgICAgIC4uLkJvb2xlYW5DdXN0b21GaWVsZFxuICAgICAgICB9XG4gICAgICAgIC4uLiBvbiBJbnRDdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgICAgICAuLi5JbnRDdXN0b21GaWVsZFxuICAgICAgICB9XG4gICAgICAgIC4uLiBvbiBGbG9hdEN1c3RvbUZpZWxkQ29uZmlnIHtcbiAgICAgICAgICAgIC4uLkZsb2F0Q3VzdG9tRmllbGRcbiAgICAgICAgfVxuICAgICAgICAuLi4gb24gRGF0ZVRpbWVDdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgICAgICAuLi5EYXRlVGltZUN1c3RvbUZpZWxkXG4gICAgICAgIH1cbiAgICAgICAgLi4uIG9uIFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWcge1xuICAgICAgICAgICAgLi4uUmVsYXRpb25DdXN0b21GaWVsZFxuICAgICAgICB9XG4gICAgfVxuICAgICR7U1RSSU5HX0NVU1RPTV9GSUVMRF9GUkFHTUVOVH1cbiAgICAke0xPQ0FMRV9TVFJJTkdfQ1VTVE9NX0ZJRUxEX0ZSQUdNRU5UfVxuICAgICR7Qk9PTEVBTl9DVVNUT01fRklFTERfRlJBR01FTlR9XG4gICAgJHtJTlRfQ1VTVE9NX0ZJRUxEX0ZSQUdNRU5UfVxuICAgICR7RkxPQVRfQ1VTVE9NX0ZJRUxEX0ZSQUdNRU5UfVxuICAgICR7REFURV9USU1FX0NVU1RPTV9GSUVMRF9GUkFHTUVOVH1cbiAgICAke1JFTEFUSU9OX0NVU1RPTV9GSUVMRF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfU0VSVkVSX0NPTkZJRyA9IGdxbGBcbiAgICBxdWVyeSBHZXRTZXJ2ZXJDb25maWcge1xuICAgICAgICBnbG9iYWxTZXR0aW5ncyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgc2VydmVyQ29uZmlnIHtcbiAgICAgICAgICAgICAgICBvcmRlclByb2Nlc3Mge1xuICAgICAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgICAgIHRvXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBlcm1pdHRlZEFzc2V0VHlwZXNcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9ucyB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgYXNzaWduYWJsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgICAgICAgICAgICAgIEFkZHJlc3Mge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgQWRtaW5pc3RyYXRvciB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBBc3NldCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBDaGFubmVsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIENvbGxlY3Rpb24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgQ3VzdG9tZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgRmFjZXQge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgRmFjZXRWYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBGdWxmaWxsbWVudCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBHbG9iYWxTZXR0aW5ncyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBPcmRlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBPcmRlckxpbmUge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3VzdG9tRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgUHJvZHVjdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBQcm9kdWN0T3B0aW9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFByb2R1Y3RPcHRpb25Hcm91cCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBQcm9kdWN0VmFyaWFudCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBTaGlwcGluZ01ldGhvZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5DdXN0b21GaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBVc2VyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkN1c3RvbUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7QUxMX0NVU1RPTV9GSUVMRFNfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgSk9CX0lORk9fRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgSm9iSW5mbyBvbiBKb2Ige1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgc3RhcnRlZEF0XG4gICAgICAgIHNldHRsZWRBdFxuICAgICAgICBxdWV1ZU5hbWVcbiAgICAgICAgc3RhdGVcbiAgICAgICAgaXNTZXR0bGVkXG4gICAgICAgIHByb2dyZXNzXG4gICAgICAgIGR1cmF0aW9uXG4gICAgICAgIGRhdGFcbiAgICAgICAgcmVzdWx0XG4gICAgICAgIGVycm9yXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9KT0JfSU5GTyA9IGdxbGBcbiAgICBxdWVyeSBHZXRKb2JJbmZvKCRpZDogSUQhKSB7XG4gICAgICAgIGpvYihqb2JJZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5Kb2JJbmZvXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtKT0JfSU5GT19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfSk9CU19MSVNUID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEFsbEpvYnMoJG9wdGlvbnM6IEpvYkxpc3RPcHRpb25zKSB7XG4gICAgICAgIGpvYnMob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAuLi5Kb2JJbmZvXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtKT0JfSU5GT19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfSk9CU19CWV9JRCA9IGdxbGBcbiAgICBxdWVyeSBHZXRKb2JzQnlJZCgkaWRzOiBbSUQhXSEpIHtcbiAgICAgICAgam9ic0J5SWQoam9iSWRzOiAkaWRzKSB7XG4gICAgICAgICAgICAuLi5Kb2JJbmZvXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtKT0JfSU5GT19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfSk9CX1FVRVVFX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0Sm9iUXVldWVMaXN0IHtcbiAgICAgICAgam9iUXVldWVzIHtcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIHJ1bm5pbmdcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDQU5DRUxfSk9CID0gZ3FsYFxuICAgIG11dGF0aW9uIENhbmNlbEpvYigkaWQ6IElEISkge1xuICAgICAgICBjYW5jZWxKb2Ioam9iSWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uSm9iSW5mb1xuICAgICAgICB9XG4gICAgfVxuICAgICR7Sk9CX0lORk9fRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVJTkRFWCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZWluZGV4IHtcbiAgICAgICAgcmVpbmRleCB7XG4gICAgICAgICAgICAuLi5Kb2JJbmZvXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtKT0JfSU5GT19GUkFHTUVOVH1cbmA7XG4iXX0=