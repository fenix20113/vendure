import { OnInit } from '@angular/core';
import { CancelOrderInput, Dialog, I18nService, OrderDetail, OrderDetailFragment, RefundOrderInput } from '@vendure/admin-ui/core';
declare type SelectionLine = {
    quantity: number;
    refund: boolean;
    cancel: boolean;
};
export declare class RefundOrderDialogComponent implements OnInit, Dialog<{
    cancel: CancelOrderInput;
    refund: RefundOrderInput;
}> {
    private i18nService;
    order: OrderDetailFragment;
    resolveWith: (result?: {
        cancel: CancelOrderInput;
        refund: RefundOrderInput;
    }) => void;
    reason: string;
    settledPayments: OrderDetail.Payments[];
    selectedPayment: OrderDetail.Payments;
    lineQuantities: {
        [lineId: string]: SelectionLine;
    };
    refundShipping: boolean;
    adjustment: number;
    reasons: string[];
    constructor(i18nService: I18nService);
    get refundTotal(): number;
    get settledPaymentsTotal(): number;
    lineCanBeRefundedOrCancelled(line: OrderDetail.Lines): boolean;
    ngOnInit(): void;
    handleZeroQuantity(line?: SelectionLine): void;
    isRefunding(): boolean;
    isCancelling(): boolean;
    canSubmit(): boolean;
    select(): void;
    cancel(): void;
    private getOrderLineInput;
}
export {};
