import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FacetValue, FacetWithValues } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
export declare type FacetValueSeletorItem = {
    name: string;
    facetName: string;
    id: string;
    value: FacetValue.Fragment;
};
export declare class FacetValueSelectorComponent implements OnInit, ControlValueAccessor {
    private dataService;
    selectedValuesChange: EventEmitter<import("../../../common/generated-types").FacetValueFragment[]>;
    facets: FacetWithValues.Fragment[];
    readonly: boolean;
    private ngSelect;
    facetValues: FacetValueSeletorItem[];
    onChangeFn: (val: any) => void;
    onTouchFn: () => void;
    disabled: boolean;
    value: string[];
    constructor(dataService: DataService);
    ngOnInit(): void;
    onChange(selected: FacetValueSeletorItem[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    focus(): void;
    writeValue(obj: string | FacetValue.Fragment[] | Array<string | number> | null): void;
    private toSelectorItem;
}
