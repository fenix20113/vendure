import { OrderDetail } from '@vendure/admin-ui/core';
export declare class LineRefundsComponent {
    line: OrderDetail.Lines;
    payments: OrderDetail.Payments[];
    getRefundedCount(): number;
}
