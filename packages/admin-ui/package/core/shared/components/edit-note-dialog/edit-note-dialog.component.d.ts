import { Dialog } from '../../../providers/modal/modal.service';
export declare class EditNoteDialogComponent implements Dialog<{
    note: string;
    isPrivate?: boolean;
}> {
    displayPrivacyControls: boolean;
    noteIsPrivate: boolean;
    note: string;
    resolveWith: (result?: {
        note: string;
        isPrivate?: boolean;
    }) => void;
    confirm(): void;
    cancel(): void;
}
