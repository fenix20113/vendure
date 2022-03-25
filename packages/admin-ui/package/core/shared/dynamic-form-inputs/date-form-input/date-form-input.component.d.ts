import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
export declare class DateFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: DefaultFormComponentConfig<'date-form-input'>;
}
