import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent, InputComponentConfig } from '../../../common/component-registry-types';
import { GetProductVariant, ProductSelectorSearch } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
export declare class ProductSelectorFormInputComponent implements FormInputComponent, OnInit {
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly isListInput = true;
    readonly: boolean;
    formControl: FormControl;
    config: InputComponentConfig;
    selection$: Observable<GetProductVariant.ProductVariant[]>;
    constructor(dataService: DataService);
    ngOnInit(): void;
    addProductVariant(product: ProductSelectorSearch.Items): void;
    removeProductVariant(id: string): void;
}
