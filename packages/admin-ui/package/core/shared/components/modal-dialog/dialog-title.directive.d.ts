import { OnInit, TemplateRef } from '@angular/core';
import { ModalDialogComponent } from './modal-dialog.component';
/**
 * A helper directive used to correctly embed the modal title in the {@link ModalDialogComponent}.
 */
export declare class DialogTitleDirective implements OnInit {
    private modal;
    private templateRef;
    constructor(modal: ModalDialogComponent<any>, templateRef: TemplateRef<any>);
    ngOnInit(): void;
}
