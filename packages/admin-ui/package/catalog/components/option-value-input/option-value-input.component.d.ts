import { ChangeDetectorRef, ElementRef, Provider } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const OPTION_VALUE_INPUT_VALUE_ACCESSOR: Provider;
export declare class OptionValueInputComponent implements ControlValueAccessor {
    private changeDetector;
    groupName: string;
    textArea: ElementRef<HTMLTextAreaElement>;
    options: Array<{
        name: string;
        locked: boolean;
    }>;
    disabled: boolean;
    input: string;
    isFocussed: boolean;
    lastSelected: boolean;
    onChangeFn: (value: any) => void;
    onTouchFn: (value: any) => void;
    constructor(changeDetector: ChangeDetectorRef);
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(obj: any): void;
    focus(): void;
    removeOption(option: {
        name: string;
        locked: boolean;
    }): void;
    handleKey(event: KeyboardEvent): void;
    handleBlur(): void;
    private addOptionValue;
    private parseInputIntoOptions;
    private removeLastOption;
}
