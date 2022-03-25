import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../../common/component-registry-types';
import { RelationCustomFieldConfig } from '../../../common/generated-types';
export declare class RelationFormInputComponent implements FormInputComponent {
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: RelationCustomFieldConfig;
}
