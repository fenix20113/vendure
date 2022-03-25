import { CreateCollectionInput, MoveCollectionInput, UpdateCollectionInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class CollectionDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getCollectionFilters(): import("../query-result").QueryResult<import("../../common/generated-types").GetCollectionFiltersQuery, Record<string, any>>;
    getCollections(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetCollectionListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").CollectionListOptions | null | undefined;
    }>>;
    getCollection(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetCollectionQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createCollection(input: CreateCollectionInput): import("rxjs").Observable<import("../../common/generated-types").CreateCollectionMutation>;
    updateCollection(input: UpdateCollectionInput): import("rxjs").Observable<import("../../common/generated-types").UpdateCollectionMutation>;
    moveCollection(inputs: MoveCollectionInput[]): import("rxjs").Observable<import("../../common/generated-types").MoveCollectionMutation[]>;
    deleteCollection(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteCollectionMutation>;
    getCollectionContents(id: string, take?: number, skip?: number, filterTerm?: string): import("../query-result").QueryResult<import("../../common/generated-types").GetCollectionContentsQuery, import("../../common/generated-types").Exact<{
        id: string;
        options?: import("../../common/generated-types").ProductVariantListOptions | null | undefined;
    }>>;
}
