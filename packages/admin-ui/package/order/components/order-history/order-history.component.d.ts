import { EventEmitter } from '@angular/core';
import { GetOrderHistory, HistoryEntry, HistoryEntryType, OrderDetail, OrderDetailFragment, TimelineDisplayType } from '@vendure/admin-ui/core';
export declare class OrderHistoryComponent {
    order: OrderDetailFragment;
    history: GetOrderHistory.Items[];
    addNote: EventEmitter<{
        note: string;
        isPublic: boolean;
    }>;
    updateNote: EventEmitter<HistoryEntry>;
    deleteNote: EventEmitter<HistoryEntry>;
    note: string;
    noteIsPrivate: boolean;
    expanded: boolean;
    readonly type: typeof HistoryEntryType;
    getDisplayType(entry: GetOrderHistory.Items): TimelineDisplayType;
    getTimelineIcon(entry: GetOrderHistory.Items): string[] | "note" | "ban" | "credit-card" | "pencil" | "truck" | undefined;
    isFeatured(entry: GetOrderHistory.Items): boolean;
    getFulfillment(entry: GetOrderHistory.Items): OrderDetail.Fulfillments | undefined;
    getPayment(entry: GetOrderHistory.Items): OrderDetail.Payments | undefined;
    getCancelledItems(entry: GetOrderHistory.Items): Array<{
        name: string;
        quantity: number;
    }>;
    getModification(id: string): ({
        __typename?: "OrderModification" | undefined;
    } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").OrderModification, "id" | "createdAt" | "isSettled" | "priceChange" | "note"> & {
        payment?: ({
            __typename?: "Payment" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Payment, "id" | "amount">) | null | undefined;
        orderItems?: ({
            __typename?: "OrderItem" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").OrderItem, "id">)[] | null | undefined;
        refund?: ({
            __typename?: "Refund" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Refund, "id" | "total" | "paymentId">) | null | undefined;
        surcharges?: ({
            __typename?: "Surcharge" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Surcharge, "id">)[] | null | undefined;
    }) | undefined;
    getName(entry: GetOrderHistory.Items): string;
    addNoteToOrder(): void;
}
