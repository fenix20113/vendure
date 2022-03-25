import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent, InputComponentConfig } from '../../../common/component-registry-types';
import { FacetWithValues } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
export declare class FacetValueFormInputComponent implements FormInputComponent, OnInit {
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly isListInput = true;
    readonly: boolean;
    formControl: FormControl;
    facets$: Observable<FacetWithValues.Fragment[]>;
    config: InputComponentConfig;
    constructor(dataService: DataService);
    ngOnInit(): void;
}
