import { ChangeDetectorRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFieldConfig, Dialog, GetAvailableCountries } from '@vendure/admin-ui/core';
export declare class AddressDetailDialogComponent implements Dialog<FormGroup>, OnInit {
    private changeDetector;
    addressForm: FormGroup;
    customFields: CustomFieldConfig;
    availableCountries: GetAvailableCountries.Items[];
    resolveWith: (result?: FormGroup) => void;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    cancel(): void;
    save(): void;
}
