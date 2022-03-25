import { EventEmitter } from '@angular/core';
import { Customer, GetCustomerHistory, HistoryEntry, HistoryEntryType, TimelineDisplayType } from '@vendure/admin-ui/core';
export declare class CustomerHistoryComponent {
    customer: Customer.Fragment;
    history: GetCustomerHistory.Items[];
    addNote: EventEmitter<{
        note: string;
    }>;
    updateNote: EventEmitter<HistoryEntry>;
    deleteNote: EventEmitter<HistoryEntry>;
    note: string;
    readonly type: typeof HistoryEntryType;
    getDisplayType(entry: GetCustomerHistory.Items): TimelineDisplayType;
    getTimelineIcon(entry: GetCustomerHistory.Items): string | [string, string] | undefined;
    isFeatured(entry: GetCustomerHistory.Items): boolean;
    getName(entry: GetCustomerHistory.Items): string;
    addNoteToCustomer(): void;
}
