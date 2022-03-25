import { EventEmitter } from '@angular/core';
import { CurrencyCode } from '@vendure/admin-ui/core';
import { OrderDetail } from '@vendure/admin-ui/core';
export declare class OrderPaymentCardComponent {
    payment: OrderDetail.Payments;
    currencyCode: CurrencyCode;
    settlePayment: EventEmitter<{
        __typename?: "Payment" | undefined;
    } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Payment, "method" | "transactionId" | "metadata" | "id" | "createdAt" | "state" | "nextStates" | "amount" | "errorMessage"> & {
        refunds: ({
            __typename?: "Refund" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Refund, "method" | "transactionId" | "metadata" | "items" | "id" | "createdAt" | "state" | "total" | "adjustment" | "paymentId" | "reason"> & {
            orderItems: ({
                __typename?: "OrderItem" | undefined;
            } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").OrderItem, "id">)[];
        })[];
    }>;
    transitionPaymentState: EventEmitter<{
        payment: OrderDetail.Payments;
        state: string;
    }>;
    settleRefund: EventEmitter<{
        __typename?: "Refund" | undefined;
    } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Refund, "method" | "transactionId" | "metadata" | "items" | "id" | "createdAt" | "state" | "total" | "adjustment" | "paymentId" | "reason"> & {
        orderItems: ({
            __typename?: "OrderItem" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").OrderItem, "id">)[];
    }>;
    refundHasMetadata(refund?: OrderDetail.Refunds): boolean;
    nextOtherStates(): string[];
}
