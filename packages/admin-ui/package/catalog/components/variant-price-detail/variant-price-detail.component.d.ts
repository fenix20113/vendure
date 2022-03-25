import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class VariantPriceDetailComponent implements OnInit, OnChanges {
    private dataService;
    priceIncludesTax: boolean;
    price: number;
    currencyCode: string;
    taxCategoryId: string;
    grossPrice$: Observable<number>;
    taxRate$: Observable<number>;
    private priceChange$;
    private taxCategoryIdChange$;
    constructor(dataService: DataService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
