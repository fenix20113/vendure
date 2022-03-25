import { FormGroup } from '@angular/forms';
import { CustomFieldConfig, GetAvailableCountries } from '../../../common/generated-types';
export declare class AddressFormComponent {
    customFields: CustomFieldConfig;
    formGroup: FormGroup;
    availableCountries: GetAvailableCountries.Items[];
}
