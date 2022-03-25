import { AddNoteToOrderInput, CancelOrderInput, FulfillOrderInput, HistoryEntryListOptions, ManualPaymentInput, ModifyOrderInput, OrderListOptions, RefundOrderInput, SettleRefundInput, UpdateOrderInput, UpdateOrderNoteInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class OrderDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getOrders(options?: OrderListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetOrderListQuery, import("../../common/generated-types").Exact<{
        options?: OrderListOptions | null | undefined;
    }>>;
    getOrder(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetOrderQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getOrderHistory(id: string, options?: HistoryEntryListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetOrderHistoryQuery, import("../../common/generated-types").Exact<{
        id: string;
        options?: HistoryEntryListOptions | null | undefined;
    }>>;
    settlePayment(id: string): import("rxjs").Observable<import("../../common/generated-types").SettlePaymentMutation>;
    transitionPaymentToState(id: string, state: string): import("rxjs").Observable<import("../../common/generated-types").TransitionPaymentToStateMutation>;
    createFulfillment(input: FulfillOrderInput): import("rxjs").Observable<import("../../common/generated-types").CreateFulfillmentMutation>;
    transitionFulfillmentToState(id: string, state: string): import("rxjs").Observable<import("../../common/generated-types").TransitionFulfillmentToStateMutation>;
    cancelOrder(input: CancelOrderInput): import("rxjs").Observable<import("../../common/generated-types").CancelOrderMutation>;
    refundOrder(input: RefundOrderInput): import("rxjs").Observable<import("../../common/generated-types").RefundOrderMutation>;
    settleRefund(input: SettleRefundInput, orderId: string): import("rxjs").Observable<import("../../common/generated-types").SettleRefundMutation>;
    addNoteToOrder(input: AddNoteToOrderInput): import("rxjs").Observable<import("../../common/generated-types").AddNoteToOrderMutation>;
    updateOrderNote(input: UpdateOrderNoteInput): import("rxjs").Observable<import("../../common/generated-types").UpdateOrderNoteMutation>;
    deleteOrderNote(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteOrderNoteMutation>;
    transitionToState(id: string, state: string): import("rxjs").Observable<import("../../common/generated-types").TransitionOrderToStateMutation>;
    updateOrderCustomFields(input: UpdateOrderInput): import("rxjs").Observable<import("../../common/generated-types").UpdateOrderCustomFieldsMutation>;
    getOrderSummary(start: Date, end: Date): import("../query-result").QueryResult<import("../../common/generated-types").GetOrderSummaryQuery, import("../../common/generated-types").Exact<{
        start: any;
        end: any;
    }>>;
    modifyOrder(input: ModifyOrderInput): import("rxjs").Observable<import("../../common/generated-types").ModifyOrderMutation>;
    addManualPaymentToOrder(input: ManualPaymentInput): import("rxjs").Observable<import("../../common/generated-types").AddManualPaymentMutation>;
}
