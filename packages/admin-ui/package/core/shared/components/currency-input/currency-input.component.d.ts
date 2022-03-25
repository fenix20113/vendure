import { ChangeDetectorRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../../data/providers/data.service';
/**
 * A form input control which displays currency in decimal format, whilst working
 * with the integer cent value in the background.
 */
export declare class CurrencyInputComponent implements ControlValueAccessor, OnInit, OnChanges {
    private dataService;
    private changeDetectorRef;
    disabled: boolean;
    readonly: boolean;
    value: number;
    currencyCode: string;
    valueChange: EventEmitter<any>;
    prefix$: Observable<string>;
    suffix$: Observable<string>;
    onChange: (val: any) => void;
    onTouch: () => void;
    _decimalValue: string;
    private currencyCode$;
    constructor(dataService: DataService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    onInput(value: string): void;
    onFocus(): void;
    writeValue(value: any): void;
    private toNumericString;
}
