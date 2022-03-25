import { OnInit } from '@angular/core';
import { CustomFieldConfig, Dialog, ModifyOrderInput, OrderDetail } from '@vendure/admin-ui/core';
export declare enum OrderEditResultType {
    Refund = 0,
    Payment = 1,
    PriceUnchanged = 2,
    Cancel = 3
}
interface OrderEditsRefundResult {
    result: OrderEditResultType.Refund;
    refundPaymentId: string;
    refundNote?: string;
}
interface OrderEditsPaymentResult {
    result: OrderEditResultType.Payment;
}
interface OrderEditsPriceUnchangedResult {
    result: OrderEditResultType.PriceUnchanged;
}
interface OrderEditsCancelResult {
    result: OrderEditResultType.Cancel;
}
declare type OrderEditResult = OrderEditsRefundResult | OrderEditsPaymentResult | OrderEditsPriceUnchangedResult | OrderEditsCancelResult;
export declare class OrderEditsPreviewDialogComponent implements OnInit, Dialog<OrderEditResult> {
    order: OrderDetail.Fragment;
    originalTotalWithTax: number;
    orderLineCustomFields: CustomFieldConfig[];
    modifyOrderInput: ModifyOrderInput;
    selectedPayment?: OrderDetail.Payments;
    refundNote: string;
    resolveWith: (result?: OrderEditResult) => void;
    get priceDifference(): number;
    ngOnInit(): void;
    cancel(): void;
    submit(): void;
}
export {};
