import { ViewContainerRef } from '@angular/core';
/**
 * The OverlayHostService is used to get a reference to the ViewConainerRef of the
 * OverlayHost component, so that other components may insert components & elements
 * into the DOM at that point.
 */
export declare class OverlayHostService {
    private hostView;
    private promiseResolveFns;
    /**
     * Used to pass in the ViewContainerRed from the OverlayHost component.
     * Should not be used by any other component.
     */
    registerHostView(viewContainerRef: ViewContainerRef): void;
    /**
     * Returns a promise which resolves to the ViewContainerRef of the OverlayHost
     * component. This can then be used to insert components and elements into the
     * DOM at that point.
     */
    getHostView(): Promise<ViewContainerRef>;
    private resolveHostView;
}
