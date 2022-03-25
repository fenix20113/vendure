import { OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * A form input control which displays a number input with a percentage sign suffix.
 */
export declare class PercentageSuffixInputComponent implements ControlValueAccessor, OnChanges {
    disabled: boolean;
    readonly: boolean;
    value: number;
    onChange: (val: any) => void;
    onTouch: () => void;
    _value: number;
    ngOnChanges(changes: SimpleChanges): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    onInput(value: string | number): void;
    writeValue(value: any): void;
}
