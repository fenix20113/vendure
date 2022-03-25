import { Dialog, DialogButtonConfig } from '../../../providers/modal/modal.service';
/**
 * Used by ModalService.dialog() to host a generic configurable modal dialog.
 */
export declare class SimpleDialogComponent implements Dialog<any> {
    resolveWith: (result?: any) => void;
    title: string;
    body: string;
    translationVars: {};
    buttons: Array<DialogButtonConfig<any>>;
}
