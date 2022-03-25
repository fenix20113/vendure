import { TemplateRef, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { Dialog, ModalOptions } from '../../../providers/modal/modal.service';
/**
 * This component should only be instatiated dynamically by the ModalService. It should not be used
 * directly in templates. See {@link ModalService.fromComponent} method for more detail.
 */
export declare class ModalDialogComponent<T extends Dialog<any>> {
    childComponentType: Type<T>;
    closeModal: (result?: any) => void;
    titleTemplateRef$: Subject<TemplateRef<any>>;
    buttonsTemplateRef$: Subject<TemplateRef<any>>;
    options?: ModalOptions<T>;
    /**
     * This callback is invoked when the childComponentType is instantiated in the
     * template by the {@link DialogComponentOutletComponent}.
     * Once we have the instance, we can set the resolveWith function and any
     * locals which were specified in the config.
     */
    onCreate(componentInstance: T): void;
    /**
     * This should be called by the {@link DialogTitleDirective} only
     */
    registerTitleTemplate(titleTemplateRef: TemplateRef<any>): void;
    /**
     * This should be called by the {@link DialogButtonsDirective} only
     */
    registerButtonsTemplate(buttonsTemplateRef: TemplateRef<any>): void;
    /**
     * Called when the modal is closed by clicking the X or the mask.
     */
    modalOpenChange(status: any): void;
}
