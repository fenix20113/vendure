import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig, DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent } from '../../../common/component-registry-types';
import { CurrencyCode } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
export declare class CurrencyFormInputComponent implements FormInputComponent {
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    currencyCode$: Observable<CurrencyCode>;
    config: DefaultFormComponentConfig<'currency-form-input'>;
    constructor(dataService: DataService);
}
