import { ViewContainerRef } from '@angular/core';
import { OverlayHostService } from '../../providers/overlay-host/overlay-host.service';
/**
 * The OverlayHostComponent is a placeholder component which provides a location in the DOM into which overlay
 * elements (modals, notify notifications etc) may be injected dynamically.
 */
export declare class OverlayHostComponent {
    constructor(viewContainerRef: ViewContainerRef, overlayHostService: OverlayHostService);
}
