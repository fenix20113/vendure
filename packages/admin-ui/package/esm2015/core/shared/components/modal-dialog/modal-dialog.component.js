import { Component, } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * This component should only be instatiated dynamically by the ModalService. It should not be used
 * directly in templates. See {@link ModalService.fromComponent} method for more detail.
 */
export class ModalDialogComponent {
    constructor() {
        this.titleTemplateRef$ = new Subject();
        this.buttonsTemplateRef$ = new Subject();
    }
    /**
     * This callback is invoked when the childComponentType is instantiated in the
     * template by the {@link DialogComponentOutletComponent}.
     * Once we have the instance, we can set the resolveWith function and any
     * locals which were specified in the config.
     */
    onCreate(componentInstance) {
        componentInstance.resolveWith = (result) => {
            this.closeModal(result);
        };
        if (this.options && this.options.locals) {
            // tslint:disable-next-line
            for (const key in this.options.locals) {
                componentInstance[key] = this.options.locals[key];
            }
        }
    }
    /**
     * This should be called by the {@link DialogTitleDirective} only
     */
    registerTitleTemplate(titleTemplateRef) {
        this.titleTemplateRef$.next(titleTemplateRef);
    }
    /**
     * This should be called by the {@link DialogButtonsDirective} only
     */
    registerButtonsTemplate(buttonsTemplateRef) {
        this.buttonsTemplateRef$.next(buttonsTemplateRef);
    }
    /**
     * Called when the modal is closed by clicking the X or the mask.
     */
    modalOpenChange(status) {
        if (status === false) {
            this.closeModal();
        }
    }
}
ModalDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-modal-dialog',
                template: "<clr-modal\n    [clrModalOpen]=\"true\"\n    (clrModalOpenChange)=\"modalOpenChange($event)\"\n    [clrModalClosable]=\"options?.closable\"\n    [clrModalSize]=\"options?.size\"\n    [ngClass]=\"'modal-valign-' + (options?.verticalAlign || 'center')\"\n>\n    <h3 class=\"modal-title\"><ng-container *ngTemplateOutlet=\"(titleTemplateRef$ | async)\"></ng-container></h3>\n    <div class=\"modal-body\">\n        <vdr-dialog-component-outlet\n            [component]=\"childComponentType\"\n            (create)=\"onCreate($event)\"\n        ></vdr-dialog-component-outlet>\n    </div>\n    <div class=\"modal-footer\">\n        <ng-container *ngTemplateOutlet=\"(buttonsTemplateRef$ | async)\"></ng-container>\n    </div>\n</clr-modal>\n",
                styles: ["::ng-deep clr-modal.modal-valign-top .modal{justify-content:flex-start}::ng-deep clr-modal.modal-valign-bottom .modal{justify-content:flex-end}.modal-body{display:flex;flex-direction:column}"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvbW9kYWwtZGlhbG9nL21vZGFsLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsR0FRWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTTNDOzs7R0FHRztBQU1ILE1BQU0sT0FBTyxvQkFBb0I7SUFMakM7UUFRSSxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUNwRCx3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztJQTJDMUQsQ0FBQztJQXhDRzs7Ozs7T0FLRztJQUNILFFBQVEsQ0FBQyxpQkFBb0I7UUFDekIsaUJBQWlCLENBQUMsV0FBVyxHQUFHLENBQUMsTUFBWSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDckMsMkJBQTJCO1lBQzNCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ25DLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBZ0MsQ0FBQzthQUNwRjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUJBQXFCLENBQUMsZ0JBQWtDO1FBQ3BELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx1QkFBdUIsQ0FBQyxrQkFBb0M7UUFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWUsQ0FBQyxNQUFXO1FBQ3ZCLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDOzs7WUFuREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDZ1QkFBNEM7O2FBRS9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBRdWVyeUxpc3QsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVHlwZSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGlhbG9nLCBNb2RhbE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5cbmltcG9ydCB7IERpYWxvZ0J1dHRvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2RpYWxvZy1idXR0b25zLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgc2hvdWxkIG9ubHkgYmUgaW5zdGF0aWF0ZWQgZHluYW1pY2FsbHkgYnkgdGhlIE1vZGFsU2VydmljZS4gSXQgc2hvdWxkIG5vdCBiZSB1c2VkXG4gKiBkaXJlY3RseSBpbiB0ZW1wbGF0ZXMuIFNlZSB7QGxpbmsgTW9kYWxTZXJ2aWNlLmZyb21Db21wb25lbnR9IG1ldGhvZCBmb3IgbW9yZSBkZXRhaWwuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW1vZGFsLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbW9kYWwtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9nQ29tcG9uZW50PFQgZXh0ZW5kcyBEaWFsb2c8YW55Pj4ge1xuICAgIGNoaWxkQ29tcG9uZW50VHlwZTogVHlwZTxUPjtcbiAgICBjbG9zZU1vZGFsOiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xuICAgIHRpdGxlVGVtcGxhdGVSZWYkID0gbmV3IFN1YmplY3Q8VGVtcGxhdGVSZWY8YW55Pj4oKTtcbiAgICBidXR0b25zVGVtcGxhdGVSZWYkID0gbmV3IFN1YmplY3Q8VGVtcGxhdGVSZWY8YW55Pj4oKTtcbiAgICBvcHRpb25zPzogTW9kYWxPcHRpb25zPFQ+O1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBjYWxsYmFjayBpcyBpbnZva2VkIHdoZW4gdGhlIGNoaWxkQ29tcG9uZW50VHlwZSBpcyBpbnN0YW50aWF0ZWQgaW4gdGhlXG4gICAgICogdGVtcGxhdGUgYnkgdGhlIHtAbGluayBEaWFsb2dDb21wb25lbnRPdXRsZXRDb21wb25lbnR9LlxuICAgICAqIE9uY2Ugd2UgaGF2ZSB0aGUgaW5zdGFuY2UsIHdlIGNhbiBzZXQgdGhlIHJlc29sdmVXaXRoIGZ1bmN0aW9uIGFuZCBhbnlcbiAgICAgKiBsb2NhbHMgd2hpY2ggd2VyZSBzcGVjaWZpZWQgaW4gdGhlIGNvbmZpZy5cbiAgICAgKi9cbiAgICBvbkNyZWF0ZShjb21wb25lbnRJbnN0YW5jZTogVCkge1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5yZXNvbHZlV2l0aCA9IChyZXN1bHQ/OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbChyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sb2NhbHMpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5vcHRpb25zLmxvY2Fscykge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlW2tleV0gPSB0aGlzLm9wdGlvbnMubG9jYWxzW2tleV0gYXMgVFtFeHRyYWN0PGtleW9mIFQsIHN0cmluZz5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBzaG91bGQgYmUgY2FsbGVkIGJ5IHRoZSB7QGxpbmsgRGlhbG9nVGl0bGVEaXJlY3RpdmV9IG9ubHlcbiAgICAgKi9cbiAgICByZWdpc3RlclRpdGxlVGVtcGxhdGUodGl0bGVUZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLnRpdGxlVGVtcGxhdGVSZWYkLm5leHQodGl0bGVUZW1wbGF0ZVJlZik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBzaG91bGQgYmUgY2FsbGVkIGJ5IHRoZSB7QGxpbmsgRGlhbG9nQnV0dG9uc0RpcmVjdGl2ZX0gb25seVxuICAgICAqL1xuICAgIHJlZ2lzdGVyQnV0dG9uc1RlbXBsYXRlKGJ1dHRvbnNUZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLmJ1dHRvbnNUZW1wbGF0ZVJlZiQubmV4dChidXR0b25zVGVtcGxhdGVSZWYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBtb2RhbCBpcyBjbG9zZWQgYnkgY2xpY2tpbmcgdGhlIFggb3IgdGhlIG1hc2suXG4gICAgICovXG4gICAgbW9kYWxPcGVuQ2hhbmdlKHN0YXR1czogYW55KSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==