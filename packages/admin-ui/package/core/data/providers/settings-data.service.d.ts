import { FetchPolicy, WatchQueryFetchPolicy } from '@apollo/client/core';
import { CreateChannelInput, CreateCountryInput, CreatePaymentMethodInput, CreateTaxCategoryInput, CreateTaxRateInput, CreateZoneInput, JobListOptions, UpdateChannelInput, UpdateCountryInput, UpdateGlobalSettingsInput, UpdatePaymentMethodInput, UpdateTaxCategoryInput, UpdateTaxRateInput, UpdateZoneInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class SettingsDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getCountries(take?: number, skip?: number, filterTerm?: string): import("../query-result").QueryResult<import("../../common/generated-types").GetCountryListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").CountryListOptions | null | undefined;
    }>>;
    getAvailableCountries(): import("../query-result").QueryResult<import("../../common/generated-types").GetAvailableCountriesQuery, Record<string, any>>;
    getCountry(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetCountryQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createCountry(input: CreateCountryInput): import("rxjs").Observable<import("../../common/generated-types").CreateCountryMutation>;
    updateCountry(input: UpdateCountryInput): import("rxjs").Observable<import("../../common/generated-types").UpdateCountryMutation>;
    deleteCountry(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteCountryMutation>;
    getZones(): import("../query-result").QueryResult<import("../../common/generated-types").GetZonesQuery, Record<string, any>>;
    getZone(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetZoneQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createZone(input: CreateZoneInput): import("rxjs").Observable<import("../../common/generated-types").CreateZoneMutation>;
    updateZone(input: UpdateZoneInput): import("rxjs").Observable<import("../../common/generated-types").UpdateZoneMutation>;
    deleteZone(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteZoneMutation>;
    addMembersToZone(zoneId: string, memberIds: string[]): import("rxjs").Observable<import("../../common/generated-types").AddMembersToZoneMutation>;
    removeMembersFromZone(zoneId: string, memberIds: string[]): import("rxjs").Observable<import("../../common/generated-types").RemoveMembersFromZoneMutation>;
    getTaxCategories(): import("../query-result").QueryResult<import("../../common/generated-types").GetTaxCategoriesQuery, Record<string, any>>;
    getTaxCategory(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetTaxCategoryQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createTaxCategory(input: CreateTaxCategoryInput): import("rxjs").Observable<import("../../common/generated-types").CreateTaxCategoryMutation>;
    updateTaxCategory(input: UpdateTaxCategoryInput): import("rxjs").Observable<import("../../common/generated-types").UpdateTaxCategoryMutation>;
    deleteTaxCategory(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteTaxCategoryMutation>;
    getTaxRates(take?: number, skip?: number, fetchPolicy?: FetchPolicy): import("../query-result").QueryResult<import("../../common/generated-types").GetTaxRateListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").TaxRateListOptions | null | undefined;
    }>>;
    getTaxRate(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetTaxRateQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createTaxRate(input: CreateTaxRateInput): import("rxjs").Observable<import("../../common/generated-types").CreateTaxRateMutation>;
    updateTaxRate(input: UpdateTaxRateInput): import("rxjs").Observable<import("../../common/generated-types").UpdateTaxRateMutation>;
    deleteTaxRate(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteTaxRateMutation>;
    getChannels(): import("../query-result").QueryResult<import("../../common/generated-types").GetChannelsQuery, Record<string, any>>;
    getChannel(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetChannelQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getActiveChannel(fetchPolicy?: FetchPolicy): import("../query-result").QueryResult<import("../../common/generated-types").GetActiveChannelQuery, import("../../common/generated-types").Exact<{
        [key: string]: never;
    }>>;
    createChannel(input: CreateChannelInput): import("rxjs").Observable<import("../../common/generated-types").CreateChannelMutation>;
    updateChannel(input: UpdateChannelInput): import("rxjs").Observable<import("../../common/generated-types").UpdateChannelMutation>;
    deleteChannel(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteChannelMutation>;
    getPaymentMethods(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetPaymentMethodListQuery, import("../../common/generated-types").Exact<{
        options: import("../../common/generated-types").PaymentMethodListOptions;
    }>>;
    getPaymentMethod(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetPaymentMethodQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createPaymentMethod(input: CreatePaymentMethodInput): import("rxjs").Observable<import("../../common/generated-types").CreatePaymentMethodMutation>;
    updatePaymentMethod(input: UpdatePaymentMethodInput): import("rxjs").Observable<import("../../common/generated-types").UpdatePaymentMethodMutation>;
    deletePaymentMethod(id: string, force: boolean): import("rxjs").Observable<import("../../common/generated-types").DeletePaymentMethodMutation>;
    getPaymentMethodOperations(): import("../query-result").QueryResult<import("../../common/generated-types").GetPaymentMethodOperationsQuery, Record<string, any>>;
    getGlobalSettings(fetchPolicy?: WatchQueryFetchPolicy): import("../query-result").QueryResult<import("../../common/generated-types").GetGlobalSettingsQuery, Record<string, any>>;
    updateGlobalSettings(input: UpdateGlobalSettingsInput): import("rxjs").Observable<import("../../common/generated-types").UpdateGlobalSettingsMutation>;
    getJob(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetJobInfoQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    pollJobs(ids: string[]): import("../query-result").QueryResult<import("../../common/generated-types").GetJobsByIdQuery, import("../../common/generated-types").Exact<{
        ids: string | string[];
    }>>;
    getAllJobs(options?: JobListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetAllJobsQuery, import("../../common/generated-types").Exact<{
        options?: JobListOptions | null | undefined;
    }>>;
    getJobQueues(): import("../query-result").QueryResult<import("../../common/generated-types").GetJobQueueListQuery, Record<string, any>>;
    getRunningJobs(): import("../query-result").QueryResult<import("../../common/generated-types").GetAllJobsQuery, import("../../common/generated-types").Exact<{
        options?: JobListOptions | null | undefined;
    }>>;
    cancelJob(id: string): import("rxjs").Observable<import("../../common/generated-types").CancelJobMutation>;
}
