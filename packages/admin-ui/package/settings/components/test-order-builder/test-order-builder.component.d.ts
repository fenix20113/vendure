import { EventEmitter, OnInit } from '@angular/core';
import { CurrencyCode, DataService, LocalStorageService, ProductSelectorSearch } from '@vendure/admin-ui/core';
export interface TestOrderLine {
    id: string;
    name: string;
    preview: string;
    sku: string;
    unitPriceWithTax: number;
    quantity: number;
}
export declare class TestOrderBuilderComponent implements OnInit {
    private dataService;
    private localStorageService;
    orderLinesChange: EventEmitter<TestOrderLine[]>;
    lines: TestOrderLine[];
    currencyCode: CurrencyCode;
    get subTotal(): number;
    constructor(dataService: DataService, localStorageService: LocalStorageService);
    ngOnInit(): void;
    selectResult(result: ProductSelectorSearch.Items): void;
    private addToLines;
    updateQuantity(): void;
    removeLine(line: TestOrderLine): void;
    private persistToLocalStorage;
    private loadFromLocalStorage;
}
