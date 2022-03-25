import { OrderDetail } from '@vendure/admin-ui/core';
import { Dialog } from '@vendure/admin-ui/core';
export declare class SettleRefundDialogComponent implements Dialog<string> {
    resolveWith: (result?: string) => void;
    transactionId: string;
    refund: OrderDetail.Refunds;
    submit(): void;
    cancel(): void;
}
