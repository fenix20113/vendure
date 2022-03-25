import { CreateShippingMethodInput, TestEligibleShippingMethodsInput, TestShippingMethodInput, UpdateShippingMethodInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class ShippingMethodDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getShippingMethods(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetShippingMethodListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").ShippingMethodListOptions | null | undefined;
    }>>;
    getShippingMethod(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetShippingMethodQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getShippingMethodOperations(): import("../query-result").QueryResult<import("../../common/generated-types").GetShippingMethodOperationsQuery, Record<string, any>>;
    createShippingMethod(input: CreateShippingMethodInput): import("rxjs").Observable<import("../../common/generated-types").CreateShippingMethodMutation>;
    updateShippingMethod(input: UpdateShippingMethodInput): import("rxjs").Observable<import("../../common/generated-types").UpdateShippingMethodMutation>;
    deleteShippingMethod(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteShippingMethodMutation>;
    testShippingMethod(input: TestShippingMethodInput): import("../query-result").QueryResult<import("../../common/generated-types").TestShippingMethodQuery, import("../../common/generated-types").Exact<{
        input: TestShippingMethodInput;
    }>>;
    testEligibleShippingMethods(input: TestEligibleShippingMethodsInput): import("../query-result").QueryResult<import("../../common/generated-types").TestEligibleShippingMethodsQuery, import("../../common/generated-types").Exact<{
        input: TestEligibleShippingMethodsInput;
    }>>;
}
