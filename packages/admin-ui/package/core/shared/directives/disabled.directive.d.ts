import { FormControlDirective, FormControlName } from '@angular/forms';
/**
 * Allows declarative binding to the "disabled" property of a reactive form
 * control.
 */
export declare class DisabledDirective {
    private formControlName;
    private formControl;
    set disabled(val: boolean);
    constructor(formControlName: FormControlName, formControl: FormControlDirective);
}
