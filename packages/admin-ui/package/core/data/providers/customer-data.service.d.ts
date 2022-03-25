import { CreateAddressInput, CreateCustomerGroupInput, CreateCustomerInput, CustomerGroupListOptions, CustomerListOptions, HistoryEntryListOptions, OrderListOptions, UpdateAddressInput, UpdateCustomerGroupInput, UpdateCustomerInput, UpdateCustomerNoteInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class CustomerDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getCustomerList(take?: number, skip?: number, filterTerm?: string): import("../query-result").QueryResult<import("../../common/generated-types").GetCustomerListQuery, import("../../common/generated-types").Exact<{
        options?: CustomerListOptions | null | undefined;
    }>>;
    getCustomer(id: string, orderListOptions?: OrderListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetCustomerQuery, import("../../common/generated-types").Exact<{
        id: string;
        orderListOptions?: OrderListOptions | null | undefined;
    }>>;
    createCustomer(input: CreateCustomerInput, password?: string): import("rxjs").Observable<import("../../common/generated-types").CreateCustomerMutation>;
    updateCustomer(input: UpdateCustomerInput): import("rxjs").Observable<import("../../common/generated-types").UpdateCustomerMutation>;
    deleteCustomer(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteCustomerMutation>;
    createCustomerAddress(customerId: string, input: CreateAddressInput): import("rxjs").Observable<import("../../common/generated-types").CreateCustomerAddressMutation>;
    updateCustomerAddress(input: UpdateAddressInput): import("rxjs").Observable<import("../../common/generated-types").UpdateCustomerAddressMutation>;
    createCustomerGroup(input: CreateCustomerGroupInput): import("rxjs").Observable<import("../../common/generated-types").CreateCustomerGroupMutation>;
    updateCustomerGroup(input: UpdateCustomerGroupInput): import("rxjs").Observable<import("../../common/generated-types").UpdateCustomerGroupMutation>;
    deleteCustomerGroup(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteCustomerGroupMutation>;
    getCustomerGroupList(options?: CustomerGroupListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetCustomerGroupsQuery, import("../../common/generated-types").Exact<{
        options?: CustomerGroupListOptions | null | undefined;
    }>>;
    getCustomerGroupWithCustomers(id: string, options: CustomerListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetCustomerGroupWithCustomersQuery, import("../../common/generated-types").Exact<{
        id: string;
        options?: CustomerListOptions | null | undefined;
    }>>;
    addCustomersToGroup(groupId: string, customerIds: string[]): import("rxjs").Observable<import("../../common/generated-types").AddCustomersToGroupMutation>;
    removeCustomersFromGroup(groupId: string, customerIds: string[]): import("rxjs").Observable<import("../../common/generated-types").RemoveCustomersFromGroupMutation>;
    getCustomerHistory(id: string, options?: HistoryEntryListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetCustomerHistoryQuery, import("../../common/generated-types").Exact<{
        id: string;
        options?: HistoryEntryListOptions | null | undefined;
    }>>;
    addNoteToCustomer(customerId: string, note: string): import("rxjs").Observable<import("../../common/generated-types").AddNoteToCustomerMutation>;
    updateCustomerNote(input: UpdateCustomerNoteInput): import("rxjs").Observable<import("../../common/generated-types").UpdateCustomerNoteMutation>;
    deleteCustomerNote(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteCustomerNoteMutation>;
}
