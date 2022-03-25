import { CollectionFilter } from './collection-filter';
/**
 * Filters for ProductVariants having the given facetValueIds (including parent Product)
 */
export declare const facetValueCollectionFilter: CollectionFilter<{
    facetValueIds: {
        type: "ID";
        list: true;
        ui: {
            component: "facet-value-form-input";
        };
    };
    containsAny: {
        type: "boolean";
    };
}>;
export declare const variantNameCollectionFilter: CollectionFilter<{
    operator: {
        type: "string";
        ui: {
            component: "select-form-input";
            options: {
                value: string;
            }[];
        };
    };
    term: {
        type: "string";
    };
}>;
export declare const defaultCollectionFilters: (CollectionFilter<{
    facetValueIds: {
        type: "ID";
        list: true;
        ui: {
            component: "facet-value-form-input";
        };
    };
    containsAny: {
        type: "boolean";
    };
}> | CollectionFilter<{
    operator: {
        type: "string";
        ui: {
            component: "select-form-input";
            options: {
                value: string;
            }[];
        };
    };
    term: {
        type: "string";
    };
}>)[];
