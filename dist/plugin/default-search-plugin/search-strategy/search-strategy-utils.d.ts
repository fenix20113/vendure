import { CurrencyCode, SearchResult } from '@vendure/common/lib/generated-types';
import { ID } from '@vendure/common/lib/shared-types';
/**
 * Maps a raw database result to a SearchResult.
 */
export declare function mapToSearchResult(raw: any, currencyCode: CurrencyCode): SearchResult;
/**
 * Given the raw query results containing rows with a `facetValues` property line "1,2,1,2",
 * this function returns a map of FacetValue ids => count of how many times they occur.
 */
export declare function createFacetIdCountMap(facetValuesResult: Array<{
    facetValues: string;
}>): Map<ID, number>;
