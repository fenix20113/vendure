import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFieldConfig, LanguageCode, ProductVariant, UpdateProductOptionInput } from '@vendure/admin-ui/core';
import { Dialog } from '@vendure/admin-ui/core';
export declare class UpdateProductOptionDialogComponent implements Dialog<UpdateProductOptionInput & {
    autoUpdate: boolean;
}>, OnInit {
    resolveWith: (result?: UpdateProductOptionInput & {
        autoUpdate: boolean;
    }) => void;
    updateVariantName: boolean;
    productOption: ProductVariant.Options;
    activeLanguage: LanguageCode;
    name: string;
    code: string;
    customFields: CustomFieldConfig[];
    codeInputTouched: boolean;
    customFieldsForm: FormGroup;
    ngOnInit(): void;
    update(): void;
    cancel(): void;
    updateCode(nameValue: string): void;
}
