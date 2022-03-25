import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
export declare class NumberFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'number-form-input'>;
}
