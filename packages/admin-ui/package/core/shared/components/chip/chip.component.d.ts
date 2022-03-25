import { EventEmitter } from '@angular/core';
/**
 * A chip component for displaying a label with an optional action icon.
 */
export declare class ChipComponent {
    icon: string;
    invert: boolean;
    /**
     * If set, the chip will have an auto-generated background
     * color based on the string value passed in.
     */
    colorFrom: string;
    colorType: 'error' | 'success' | 'warning';
    iconClick: EventEmitter<MouseEvent>;
}
