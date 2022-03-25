import { EventEmitter, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductSelectorSearch } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
export declare class ProductSelectorComponent implements OnInit {
    private dataService;
    searchInput$: Subject<string>;
    searchLoading: boolean;
    searchResults$: Observable<ProductSelectorSearch.Items[]>;
    productSelected: EventEmitter<{
        __typename?: "SearchResult" | undefined;
    } & Pick<import("../../../common/generated-types").SearchResult, "sku" | "productVariantId" | "productVariantName"> & {
        productAsset?: ({
            __typename?: "SearchResultAsset" | undefined;
        } & Pick<import("../../../common/generated-types").SearchResultAsset, "id" | "preview"> & {
            focalPoint?: ({
                __typename?: "Coordinate" | undefined;
            } & Pick<import("../../../common/generated-types").Coordinate, "x" | "y">) | null | undefined;
        }) | null | undefined;
        price: {
            __typename?: "PriceRange" | undefined;
        } | ({
            __typename?: "SinglePrice" | undefined;
        } & Pick<import("../../../common/generated-types").SinglePrice, "value">);
        priceWithTax: {
            __typename?: "PriceRange" | undefined;
        } | ({
            __typename?: "SinglePrice" | undefined;
        } & Pick<import("../../../common/generated-types").SinglePrice, "value">);
    }>;
    private ngSelect;
    constructor(dataService: DataService);
    ngOnInit(): void;
    private initSearchResults;
    selectResult(product?: ProductSelectorSearch.Items): void;
}
