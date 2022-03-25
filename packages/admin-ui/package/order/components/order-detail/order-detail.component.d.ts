import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, CustomFieldConfig, DataService, GetOrderHistory, HistoryEntry, ModalService, NotificationService, Order, OrderDetail, OrderDetailFragment, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable, Subject } from 'rxjs';
import { OrderTransitionService } from '../../providers/order-transition.service';
export declare class OrderDetailComponent extends BaseDetailComponent<OrderDetail.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private notificationService;
    private modalService;
    private orderTransitionService;
    detailForm: FormGroup;
    history$: Observable<GetOrderHistory.Items[] | undefined>;
    nextStates$: Observable<string[]>;
    fetchHistory: Subject<void>;
    customFields: CustomFieldConfig[];
    orderLineCustomFields: CustomFieldConfig[];
    private readonly defaultStates;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, notificationService: NotificationService, modalService: ModalService, orderTransitionService: OrderTransitionService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    openStateDiagram(): void;
    transitionToState(state: string): void;
    manuallyTransitionToState(order: OrderDetailFragment): void;
    transitionToModifying(): void;
    updateCustomFields(customFieldsValue: any): void;
    getOrderAddressLines(orderAddress?: {
        [key: string]: string;
    }): string[];
    settlePayment(payment: OrderDetail.Payments): void;
    transitionPaymentState({ payment, state }: {
        payment: OrderDetail.Payments;
        state: string;
    }): void;
    canAddFulfillment(order: OrderDetail.Fragment): boolean;
    hasUnsettledModifications(order: OrderDetailFragment): boolean;
    getOutstandingModificationAmount(order: OrderDetailFragment): number;
    outstandingPaymentAmount(order: OrderDetailFragment): number;
    addManualPayment(order: OrderDetailFragment): void;
    fulfillOrder(): void;
    transitionFulfillment(id: string, state: string): void;
    cancelOrRefund(order: OrderDetail.Fragment): void;
    settleRefund(refund: OrderDetail.Refunds): void;
    addNote(event: {
        note: string;
        isPublic: boolean;
    }): void;
    updateNote(entry: HistoryEntry): void;
    deleteNote(entry: HistoryEntry): import("rxjs").Subscription;
    orderHasSettledPayments(order: OrderDetail.Fragment): boolean;
    private cancelOrder;
    private refundOrder;
    private refetchOrder;
    protected setFormValues(entity: Order.Fragment): void;
}
