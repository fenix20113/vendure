import { Dialog } from '@vendure/admin-ui/core';
export declare class ZoneDetailDialogComponent implements Dialog<string> {
    zone: {
        id?: string;
        name: string;
    };
    resolveWith: (result?: string) => void;
    cancel(): void;
    save(): void;
}
