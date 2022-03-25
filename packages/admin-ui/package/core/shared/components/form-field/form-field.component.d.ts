import { OnInit } from '@angular/core';
import { FormFieldControlDirective } from './form-field-control.directive';
/**
 * A form field wrapper which handles the correct layout and validation error display for
 * a form control.
 */
export declare class FormFieldComponent implements OnInit {
    label: string;
    for: string;
    tooltip: string;
    /**
     * A map of error message codes (required, pattern etc.) to messages to display
     * when those errors are present.
     */
    errors: {
        [key: string]: string;
    };
    /**
     * If set to true, the input will be initially set to "readOnly", and an "edit" button
     * will be displayed which allows the field to be edited.
     */
    readOnlyToggle: boolean;
    formFieldControl: FormFieldControlDirective;
    isReadOnly: boolean;
    ngOnInit(): void;
    setReadOnly(value: boolean): void;
    getErrorMessage(): string | undefined;
}
