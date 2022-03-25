import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomFieldConfig } from '@vendure/admin-ui/core';
export declare class OrderCustomFieldsCardComponent implements OnInit {
    private formBuilder;
    customFieldsConfig: CustomFieldConfig[];
    customFieldValues: {
        [name: string]: any;
    };
    updateClick: EventEmitter<any>;
    customFieldForm: FormGroup;
    editable: boolean;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    onUpdateClick(): void;
}
