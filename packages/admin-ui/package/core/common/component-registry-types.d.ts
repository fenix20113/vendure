import { FormControl } from '@angular/forms';
export interface FormInputComponent<C = InputComponentConfig> {
    isListInput?: boolean;
    readonly: boolean;
    formControl: FormControl;
    config: C;
}
export declare type InputComponentConfig = {
    [prop: string]: any;
};
