import { OnDestroy, PipeTransform } from '@angular/core';
import { CustomFieldConfig, StringFieldOption } from '../../common/generated-types';
import { DataService } from '../../data/providers/data.service';
/**
 * Displays a localized label for a CustomField or StringFieldOption, falling back to the
 * name/value if none are defined.
 */
export declare class CustomFieldLabelPipe implements PipeTransform, OnDestroy {
    private dataService;
    private readonly subscription;
    private uiLanguageCode;
    constructor(dataService: DataService);
    transform(value: CustomFieldConfig | StringFieldOption): string;
    ngOnDestroy(): void;
    private isCustomFieldConfig;
}
