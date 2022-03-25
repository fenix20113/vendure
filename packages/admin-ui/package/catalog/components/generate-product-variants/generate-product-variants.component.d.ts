import { EventEmitter, OnInit } from '@angular/core';
import { CurrencyCode } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { OptionValueInputComponent } from '../option-value-input/option-value-input.component';
export declare type CreateVariantValues = {
    optionValues: string[];
    enabled: boolean;
    sku: string;
    price: number;
    stock: number;
};
export declare type CreateProductVariantsConfig = {
    groups: Array<{
        name: string;
        values: string[];
    }>;
    variants: CreateVariantValues[];
};
export declare class GenerateProductVariantsComponent implements OnInit {
    private dataService;
    variantsChange: EventEmitter<CreateProductVariantsConfig>;
    optionGroups: Array<{
        name: string;
        values: Array<{
            name: string;
            locked: boolean;
        }>;
    }>;
    currencyCode: CurrencyCode;
    variants: Array<{
        id: string;
        values: string[];
    }>;
    variantFormValues: {
        [id: string]: CreateVariantValues;
    };
    constructor(dataService: DataService);
    ngOnInit(): void;
    addOption(): void;
    removeOption(name: string): void;
    generateVariants(): void;
    trackByFn(index: number, variant: {
        name: string;
        values: string[];
    }): string;
    handleEnter(event: KeyboardEvent, optionValueInputComponent: OptionValueInputComponent): void;
    onFormChange(): void;
    private copyFromDefault;
}
