import { ComponentFactoryResolver } from '@angular/core';
import { Type } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { OverlayHostService } from '../overlay-host/overlay-host.service';
/**
 * Any component intended to be used with the ModalService.fromComponent() method must implement
 * this interface.
 */
export interface Dialog<R = any> {
    /**
     * Function to be invoked in order to close the dialog when the action is complete.
     * The Observable returned from the .fromComponent() method will emit the value passed
     * to this method and then complete.
     */
    resolveWith: (result?: R) => void;
}
export interface DialogButtonConfig<T> {
    label: string;
    type: 'secondary' | 'primary' | 'danger';
    returnValue?: T;
}
/**
 * Configures a generic modal dialog.
 */
export interface DialogConfig<T> {
    title: string;
    body?: string;
    translationVars?: {
        [key: string]: string | number;
    };
    buttons: Array<DialogButtonConfig<T>>;
}
/**
 * Options to configure the behaviour of the modal.
 */
export interface ModalOptions<T> {
    /** Sets the width of the dialog */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Sets the vertical alignment of the dialog */
    verticalAlign?: 'top' | 'center' | 'bottom';
    /**
     * When true, the "x" icon is shown
     * and clicking it or the mask will close the dialog
     */
    closable?: boolean;
    /**
     * Values to be passed directly to the component.
     */
    locals?: Partial<T>;
}
/**
 * This service is responsible for instantiating a ModalDialog component and
 * embedding the specified component within.
 */
export declare class ModalService {
    private componentFactoryResolver;
    private overlayHostService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, overlayHostService: OverlayHostService);
    /**
     * Create a modal from a component. The component must implement the {@link Dialog} interface.
     * Additionally, the component should include templates for the title and the buttons to be
     * displayed in the modal dialog. See example:
     *
     * @example
     * ```
     * class MyDialog implements Dialog {
     *  resolveWith: (result?: any) => void;
     *
     *  okay() {
     *    doSomeWork().subscribe(result => {
     *      this.resolveWith(result);
     *    })
     *  }
     *
     *  cancel() {
     *    this.resolveWith(false);
     *  }
     * }
     * ```
     *
     * ```
     * <ng-template vdrDialogTitle>Title of the modal</ng-template>
     *
     * <p>
     *     My Content
     * </p>
     *
     * <ng-template vdrDialogButtons>
     *     <button type="button"
     *             class="btn"
     *             (click)="cancel()">Cancel</button>
     *     <button type="button"
     *             class="btn btn-primary"
     *             (click)="okay()">Okay</button>
     * </ng-template>
     * ```
     */
    fromComponent<T extends Dialog<any>, R>(component: Type<T> & Type<Dialog<R>>, options?: ModalOptions<T>): Observable<R | undefined>;
    /**
     * Displays a modal dialog with the provided title, body and buttons.
     */
    dialog<T>(config: DialogConfig<T>): Observable<T | undefined>;
}
