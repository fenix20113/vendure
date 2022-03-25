import { EventEmitter } from '@angular/core';
/**
 * A simple, stateless toggle button for indicating selection.
 */
export declare class SelectToggleComponent {
    size: 'small' | 'large';
    selected: boolean;
    disabled: boolean;
    label: string | undefined;
    selectedChange: EventEmitter<boolean>;
}
