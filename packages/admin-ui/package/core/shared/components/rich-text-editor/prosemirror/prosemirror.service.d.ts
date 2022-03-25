import { EditorView } from 'prosemirror-view';
import { ModalService } from '../../../../providers/modal/modal.service';
export interface CreateEditorViewOptions {
    onTextInput: (content: string) => void;
    element: HTMLElement;
    isReadOnly: () => boolean;
}
export declare class ProsemirrorService {
    private modalService;
    editorView: EditorView;
    private mySchema;
    private enabled;
    constructor(modalService: ModalService);
    createEditorView(options: CreateEditorViewOptions): void;
    update(text: string): void;
    destroy(): void;
    setEnabled(enabled: boolean): void;
    private getStateFromText;
    private getTextFromState;
    private configurePlugins;
}
