import { EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { ConfigArg, ConfigArgDefinition, ConfigurableOperation, ConfigurableOperationDefinition } from '../../../common/generated-types';
/**
 * A form input which renders a card with the internal form fields of the given ConfigurableOperation.
 */
export declare class ConfigurableInputComponent implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
    operation?: ConfigurableOperation;
    operationDefinition?: ConfigurableOperationDefinition;
    readonly: boolean;
    removable: boolean;
    remove: EventEmitter<ConfigurableOperation>;
    argValues: {
        [name: string]: any;
    };
    onChange: (val: any) => void;
    onTouch: () => void;
    form: FormGroup;
    private subscription;
    interpolateDescription(): string;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
    trackByName(index: number, arg: ConfigArg): string;
    getArgDef(arg: ConfigArg): ConfigArgDefinition | undefined;
    private createForm;
    validate(c: AbstractControl): ValidationErrors | null;
}
