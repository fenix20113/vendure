import { ElementRef } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
export declare class DropdownTriggerDirective {
    private dropdown;
    private elementRef;
    constructor(dropdown: DropdownComponent, elementRef: ElementRef);
    onDropdownTriggerClick(event: any): void;
}
