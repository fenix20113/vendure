import { PipeTransform } from '@angular/core';
import { I18nService } from '../../providers/i18n/i18n.service';
/**
 * Converts a date into the format "3 minutes ago", "5 hours ago" etc.
 */
export declare class TimeAgoPipe implements PipeTransform {
    private i18nService;
    constructor(i18nService: I18nService);
    transform(value: string | Date, nowVal?: string | Date): string;
}
