import { SearchResponse } from '@vendure/common/lib/generated-types';
import { Omit } from '@vendure/common/lib/omit';
import { FacetValue } from '../../../entity';
export declare class SearchResolver {
    search(...args: any): Promise<Omit<SearchResponse, 'facetValues'>>;
    facetValues(...args: any[]): Promise<Array<{
        facetValue: FacetValue;
        count: number;
    }>>;
    reindex(...args: any[]): Promise<any>;
}
