import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
export declare class BooleanFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'boolean-form-input'>;
}
