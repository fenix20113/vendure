import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
declare type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export declare class FormFieldControlDirective {
    private elementRef;
    formControlName: NgControl;
    constructor(elementRef: ElementRef<InputElement>, formControlName: NgControl);
    get valid(): boolean;
    get touched(): boolean;
    setReadOnly(value: boolean): void;
}
export {};
