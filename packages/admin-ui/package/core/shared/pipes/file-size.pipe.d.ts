import { PipeTransform } from '@angular/core';
/**
 * Formats a number into a human-readable file size string.
 */
export declare class FileSizePipe implements PipeTransform {
    transform(value: number, useSiUnits?: boolean): any;
}
