import { ElementRef } from '@angular/core';
export declare class DropdownComponent {
    private isOpen;
    private onOpenChangeCallbacks;
    trigger: ElementRef;
    manualToggle: boolean;
    onClick(): void;
    toggleOpen(): void;
    onOpenChange(callback: (isOpen: boolean) => void): void;
    setTriggerElement(elementRef: ElementRef): void;
}
