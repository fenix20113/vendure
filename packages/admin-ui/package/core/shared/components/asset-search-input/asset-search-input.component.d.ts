import { EventEmitter } from '@angular/core';
import { SearchProducts, TagFragment } from '../../../common/generated-types';
export declare class AssetSearchInputComponent {
    tags: TagFragment[];
    searchTermChange: EventEmitter<string>;
    tagsChange: EventEmitter<TagFragment[]>;
    private selectComponent;
    private lastTerm;
    private lastTagIds;
    setSearchTerm(term: string | null): void;
    setTags(tags: TagFragment[]): void;
    filterTagResults: (term: string, item: SearchProducts.FacetValues | {
        label: string;
    }) => boolean;
    onSelectChange(selectedItems: Array<TagFragment | {
        label: string;
    }>): void;
    isSearchHeaderSelected(): boolean;
    addTagFn(item: any): {
        label: any;
    };
    private isTag;
}
