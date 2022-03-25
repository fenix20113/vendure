import { Dialog } from '@vendure/admin-ui/core';
export declare class CustomerGroupDetailDialogComponent implements Dialog<string> {
    group: {
        id?: string;
        name: string;
    };
    resolveWith: (result?: string) => void;
    cancel(): void;
    save(): void;
}
