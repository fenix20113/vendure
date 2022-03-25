import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../../data/providers/data.service';
export declare class TagSelectorComponent implements OnInit, ControlValueAccessor {
    private dataService;
    placeholder: string | undefined;
    allTags$: Observable<string[]>;
    onChange: (val: any) => void;
    onTouch: () => void;
    _value: string[];
    disabled: boolean;
    constructor(dataService: DataService);
    ngOnInit(): void;
    addTagFn(val: string): string;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(obj: unknown): void;
    valueChanged(event: string[]): void;
}
