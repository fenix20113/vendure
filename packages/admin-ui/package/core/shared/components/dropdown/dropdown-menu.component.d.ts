import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
export declare type DropdownPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
/**
 * A dropdown menu modelled on the Clarity Dropdown component (https://v1.clarity.design/dropdowns).
 *
 * This was created because the Clarity implementation (at this time) does not handle edge detection. Instead
 * we make use of the Angular CDK's Overlay module to manage the positioning.
 *
 * The API of this component (and its related Components & Directives) are based on the Clarity version,
 * albeit only a subset which is currently used in this application.
 */
export declare class DropdownMenuComponent implements AfterViewInit, OnInit, OnDestroy {
    private overlay;
    private viewContainerRef;
    private dropdown;
    private position;
    private menuTemplate;
    private menuPortal;
    private overlayRef;
    private backdropClickSub;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, dropdown: DropdownComponent);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private getPositionStrategy;
    /** Inverts an overlay position. */
    private invertPosition;
}
