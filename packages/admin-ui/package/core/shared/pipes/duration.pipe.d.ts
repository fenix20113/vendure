import { PipeTransform } from '@angular/core';
import { I18nService } from '../../providers/i18n/i18n.service';
/**
 * Displays a number of milliseconds in a more human-readable format,
 * e.g. "12ms", "33s", "2:03m"
 */
export declare class DurationPipe implements PipeTransform {
    private i18nService;
    constructor(i18nService: I18nService);
    transform(value: number): string;
}
