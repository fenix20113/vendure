import { CreatePromotionInput, UpdatePromotionInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class PromotionDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getPromotions(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetPromotionListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").PromotionListOptions | null | undefined;
    }>>;
    getPromotion(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetPromotionQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getPromotionActionsAndConditions(): import("../query-result").QueryResult<import("../../common/generated-types").GetAdjustmentOperationsQuery, Record<string, any>>;
    createPromotion(input: CreatePromotionInput): import("rxjs").Observable<import("../../common/generated-types").CreatePromotionMutation>;
    updatePromotion(input: UpdatePromotionInput): import("rxjs").Observable<import("../../common/generated-types").UpdatePromotionMutation>;
    deletePromotion(id: string): import("rxjs").Observable<import("../../common/generated-types").DeletePromotionMutation>;
}
