import { Dialog } from '@vendure/admin-ui/core';
export declare class OrderStateSelectDialogComponent implements Dialog<string> {
    resolveWith: (result?: string) => void;
    nextStates: string[];
    message: string;
    cancellable: boolean;
    selectedState: string;
    select(): void;
    cancel(): void;
}
