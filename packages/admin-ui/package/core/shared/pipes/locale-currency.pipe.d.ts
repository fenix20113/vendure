import { ChangeDetectorRef, PipeTransform } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
export declare class LocaleCurrencyPipe extends LocaleBasePipe implements PipeTransform {
    constructor(dataService?: DataService, changeDetectorRef?: ChangeDetectorRef);
    transform(value: unknown, ...args: unknown[]): string | unknown;
}
