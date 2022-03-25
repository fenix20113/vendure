import { EventEmitter } from '@angular/core';
import { SearchProducts } from '@vendure/admin-ui/core';
export declare class ProductSearchInputComponent {
    facetValueResults: SearchProducts.FacetValues[];
    searchTermChange: EventEmitter<string>;
    facetValueChange: EventEmitter<string[]>;
    private selectComponent;
    private lastTerm;
    private lastFacetValueIds;
    setSearchTerm(term: string | null): void;
    setFacetValues(ids: string[]): void;
    filterFacetResults: (term: string, item: SearchProducts.FacetValues | {
        label: string;
    }) => boolean;
    onSelectChange(selectedItems: Array<SearchProducts.FacetValues | {
        label: string;
    }>): void;
    addTagFn(item: any): {
        label: any;
    };
    isSearchHeaderSelected(): boolean;
    private isFacetValueItem;
}
