import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent, InputComponentConfig } from '../../../common/component-registry-types';
export declare class PasswordFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: InputComponentConfig;
}
