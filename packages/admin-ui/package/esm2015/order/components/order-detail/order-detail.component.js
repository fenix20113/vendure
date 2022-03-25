import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, EditNoteDialogComponent, ModalService, NotificationService, ServerConfigService, SortOrder, } from '@vendure/admin-ui/core';
import { pick } from '@vendure/common/lib/pick';
import { summate } from '@vendure/common/lib/shared-utils';
import { EMPTY, merge, of, Subject } from 'rxjs';
import { map, mapTo, startWith, switchMap, take } from 'rxjs/operators';
import { OrderTransitionService } from '../../providers/order-transition.service';
import { AddManualPaymentDialogComponent } from '../add-manual-payment-dialog/add-manual-payment-dialog.component';
import { CancelOrderDialogComponent } from '../cancel-order-dialog/cancel-order-dialog.component';
import { FulfillOrderDialogComponent } from '../fulfill-order-dialog/fulfill-order-dialog.component';
import { OrderProcessGraphDialogComponent } from '../order-process-graph-dialog/order-process-graph-dialog.component';
import { RefundOrderDialogComponent } from '../refund-order-dialog/refund-order-dialog.component';
import { SettleRefundDialogComponent } from '../settle-refund-dialog/settle-refund-dialog.component';
export class OrderDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, notificationService, modalService, orderTransitionService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.orderTransitionService = orderTransitionService;
        this.detailForm = new FormGroup({});
        this.fetchHistory = new Subject();
        this.defaultStates = [
            'AddingItems',
            'ArrangingPayment',
            'PaymentAuthorized',
            'PaymentSettled',
            'PartiallyShipped',
            'Shipped',
            'PartiallyDelivered',
            'Delivered',
            'Cancelled',
            'Modifying',
            'ArrangingAdditionalPayment',
        ];
    }
    ngOnInit() {
        this.init();
        this.entity$.pipe(take(1)).subscribe(order => {
            if (order.state === 'Modifying') {
                this.router.navigate(['./', 'modify'], { relativeTo: this.route });
            }
        });
        this.customFields = this.getCustomFieldConfig('Order');
        this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
        this.history$ = this.fetchHistory.pipe(startWith(null), switchMap(() => {
            return this.dataService.order
                .getOrderHistory(this.id, {
                sort: {
                    createdAt: SortOrder.DESC,
                },
            })
                .mapStream(data => { var _a; return (_a = data.order) === null || _a === void 0 ? void 0 : _a.history.items; });
        }));
        this.nextStates$ = this.entity$.pipe(map(order => {
            const isInCustomState = !this.defaultStates.includes(order.state);
            return isInCustomState
                ? order.nextStates
                : order.nextStates.filter(s => !this.defaultStates.includes(s));
        }));
    }
    ngOnDestroy() {
        this.destroy();
    }
    openStateDiagram() {
        this.entity$
            .pipe(take(1), switchMap(order => this.modalService.fromComponent(OrderProcessGraphDialogComponent, {
            closable: true,
            locals: {
                activeState: order.state,
            },
        })))
            .subscribe();
    }
    transitionToState(state) {
        this.dataService.order.transitionToState(this.id, state).subscribe(({ transitionOrderToState }) => {
            switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                case 'Order':
                    this.notificationService.success(_('order.transitioned-to-state-success'), { state });
                    this.fetchHistory.next();
                    break;
                case 'OrderStateTransitionError':
                    this.notificationService.error(transitionOrderToState.transitionError);
            }
        });
    }
    manuallyTransitionToState(order) {
        this.orderTransitionService
            .manuallyTransitionToState({
            orderId: order.id,
            nextStates: order.nextStates,
            cancellable: true,
            message: _('order.manually-transition-to-state-message'),
            retry: 0,
        })
            .subscribe();
    }
    transitionToModifying() {
        this.dataService.order
            .transitionToState(this.id, 'Modifying')
            .subscribe(({ transitionOrderToState }) => {
            switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                case 'Order':
                    this.router.navigate(['./modify'], { relativeTo: this.route });
                    break;
                case 'OrderStateTransitionError':
                    this.notificationService.error(transitionOrderToState.transitionError);
            }
        });
    }
    updateCustomFields(customFieldsValue) {
        this.dataService.order
            .updateOrderCustomFields({
            id: this.id,
            customFields: customFieldsValue,
        })
            .subscribe(() => {
            this.notificationService.success(_('common.notify-update-success'), { entity: 'Order' });
        });
    }
    getOrderAddressLines(orderAddress) {
        if (!orderAddress) {
            return [];
        }
        return Object.values(orderAddress)
            .filter(val => val !== 'OrderAddress')
            .filter(line => !!line);
    }
    settlePayment(payment) {
        this.dataService.order.settlePayment(payment.id).subscribe(({ settlePayment }) => {
            switch (settlePayment.__typename) {
                case 'Payment':
                    if (settlePayment.state === 'Settled') {
                        this.notificationService.success(_('order.settle-payment-success'));
                    }
                    else {
                        this.notificationService.error(_('order.settle-payment-error'));
                    }
                    this.dataService.order.getOrder(this.id).single$.subscribe();
                    this.fetchHistory.next();
                    break;
                case 'OrderStateTransitionError':
                case 'PaymentStateTransitionError':
                case 'SettlePaymentError':
                    this.notificationService.error(settlePayment.message);
            }
        });
    }
    transitionPaymentState({ payment, state }) {
        this.dataService.order
            .transitionPaymentToState(payment.id, state)
            .subscribe(({ transitionPaymentToState }) => {
            switch (transitionPaymentToState.__typename) {
                case 'Payment':
                    this.notificationService.success(_('order.transitioned-payment-to-state-success'), {
                        state,
                    });
                    this.dataService.order.getOrder(this.id).single$.subscribe();
                    this.fetchHistory.next();
                    break;
                case 'PaymentStateTransitionError':
                    this.notificationService.error(transitionPaymentToState.message);
                    break;
            }
        });
    }
    canAddFulfillment(order) {
        const allItemsFulfilled = order.lines
            .reduce((items, line) => [...items, ...line.items], [])
            .every(item => !!item.fulfillment);
        return (!allItemsFulfilled &&
            !this.hasUnsettledModifications(order) &&
            this.outstandingPaymentAmount(order) === 0 &&
            (order.nextStates.includes('Shipped') ||
                order.nextStates.includes('PartiallyShipped') ||
                order.nextStates.includes('Delivered')));
    }
    hasUnsettledModifications(order) {
        return 0 < order.modifications.filter(m => !m.isSettled).length;
    }
    getOutstandingModificationAmount(order) {
        return summate(order.modifications.filter(m => !m.isSettled), 'priceChange');
    }
    outstandingPaymentAmount(order) {
        var _a, _b;
        const paymentIsValid = (p) => p.state !== 'Cancelled' && p.state !== 'Declined' && p.state !== 'Error';
        const validPayments = (_b = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(paymentIsValid).map(p => pick(p, ['amount']))) !== null && _b !== void 0 ? _b : [];
        const amountCovered = summate(validPayments, 'amount');
        return order.totalWithTax - amountCovered;
    }
    addManualPayment(order) {
        this.modalService
            .fromComponent(AddManualPaymentDialogComponent, {
            closable: true,
            locals: {
                outstandingAmount: this.outstandingPaymentAmount(order),
                currencyCode: order.currencyCode,
            },
        })
            .pipe(switchMap(result => {
            if (result) {
                return this.dataService.order.addManualPaymentToOrder({
                    orderId: this.id,
                    transactionId: result.transactionId,
                    method: result.method,
                    metadata: result.metadata || {},
                });
            }
            else {
                return EMPTY;
            }
        }), switchMap(({ addManualPaymentToOrder }) => {
            switch (addManualPaymentToOrder.__typename) {
                case 'Order':
                    this.notificationService.success(_('order.add-payment-to-order-success'));
                    return this.orderTransitionService.transitionToPreModifyingState(order.id, order.nextStates);
                case 'ManualPaymentStateError':
                    this.notificationService.error(addManualPaymentToOrder.message);
                    return EMPTY;
                default:
                    return EMPTY;
            }
        }))
            .subscribe(result => {
            if (result) {
                this.refetchOrder({ result });
            }
        });
    }
    fulfillOrder() {
        this.entity$
            .pipe(take(1), switchMap(order => {
            return this.modalService.fromComponent(FulfillOrderDialogComponent, {
                size: 'xl',
                locals: {
                    order,
                },
            });
        }), switchMap(input => {
            if (input) {
                return this.dataService.order.createFulfillment(input);
            }
            else {
                return of(undefined);
            }
        }), switchMap(result => this.refetchOrder(result).pipe(mapTo(result))))
            .subscribe(result => {
            if (result) {
                switch (result.addFulfillmentToOrder.__typename) {
                    case 'Fulfillment':
                        this.notificationService.success(_('order.create-fulfillment-success'));
                        break;
                    case 'EmptyOrderLineSelectionError':
                    case 'InsufficientStockOnHandError':
                    case 'ItemsAlreadyFulfilledError':
                        this.notificationService.error(result.addFulfillmentToOrder.message);
                        break;
                }
            }
        });
    }
    transitionFulfillment(id, state) {
        this.dataService.order
            .transitionFulfillmentToState(id, state)
            .pipe(switchMap(result => this.refetchOrder(result)))
            .subscribe(() => {
            this.notificationService.success(_('order.successfully-updated-fulfillment'));
        });
    }
    cancelOrRefund(order) {
        const isRefundable = this.orderHasSettledPayments(order);
        if (order.state === 'PaymentAuthorized' || order.active === true || !isRefundable) {
            this.cancelOrder(order);
        }
        else {
            this.refundOrder(order);
        }
    }
    settleRefund(refund) {
        this.modalService
            .fromComponent(SettleRefundDialogComponent, {
            size: 'md',
            locals: {
                refund,
            },
        })
            .pipe(switchMap(transactionId => {
            if (transactionId) {
                return this.dataService.order.settleRefund({
                    transactionId,
                    id: refund.id,
                }, this.id);
            }
            else {
                return of(undefined);
            }
        }))
            .subscribe(result => {
            if (result) {
                this.notificationService.success(_('order.settle-refund-success'));
            }
        });
    }
    addNote(event) {
        const { note, isPublic } = event;
        this.dataService.order
            .addNoteToOrder({
            id: this.id,
            note,
            isPublic,
        })
            .pipe(switchMap(result => this.refetchOrder(result)))
            .subscribe(result => {
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'Note',
            });
        });
    }
    updateNote(entry) {
        this.modalService
            .fromComponent(EditNoteDialogComponent, {
            closable: true,
            locals: {
                displayPrivacyControls: true,
                note: entry.data.note,
                noteIsPrivate: !entry.isPublic,
            },
        })
            .pipe(switchMap(result => {
            if (result) {
                return this.dataService.order.updateOrderNote({
                    noteId: entry.id,
                    isPublic: !result.isPrivate,
                    note: result.note,
                });
            }
            else {
                return EMPTY;
            }
        }))
            .subscribe(result => {
            this.fetchHistory.next();
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Note',
            });
        });
    }
    deleteNote(entry) {
        return this.modalService
            .dialog({
            title: _('common.confirm-delete-note'),
            body: entry.data.note,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.order.deleteOrderNote(entry.id) : EMPTY)))
            .subscribe(() => {
            this.fetchHistory.next();
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Note',
            });
        });
    }
    orderHasSettledPayments(order) {
        var _a;
        return !!((_a = order.payments) === null || _a === void 0 ? void 0 : _a.find(p => p.state === 'Settled'));
    }
    cancelOrder(order) {
        this.modalService
            .fromComponent(CancelOrderDialogComponent, {
            size: 'xl',
            locals: {
                order,
            },
        })
            .pipe(switchMap(input => {
            if (input) {
                return this.dataService.order.cancelOrder(input);
            }
            else {
                return of(undefined);
            }
        }), switchMap(result => this.refetchOrder(result)))
            .subscribe(result => {
            if (result) {
                this.notificationService.success(_('order.cancelled-order-success'));
            }
        });
    }
    refundOrder(order) {
        this.modalService
            .fromComponent(RefundOrderDialogComponent, {
            size: 'xl',
            locals: {
                order,
            },
        })
            .pipe(switchMap(input => {
            var _a;
            if (!input) {
                return of(undefined);
            }
            const operations = [];
            if (input.refund.lines.length) {
                operations.push(this.dataService.order
                    .refundOrder(input.refund)
                    .pipe(map(res => res.refundOrder)));
            }
            if ((_a = input.cancel.lines) === null || _a === void 0 ? void 0 : _a.length) {
                operations.push(this.dataService.order
                    .cancelOrder(input.cancel)
                    .pipe(map(res => res.cancelOrder)));
            }
            return merge(...operations);
        }))
            .subscribe(result => {
            if (result) {
                switch (result.__typename) {
                    case 'Order':
                        this.refetchOrder(result).subscribe();
                        this.notificationService.success(_('order.cancelled-order-success'));
                        break;
                    case 'Refund':
                        this.refetchOrder(result).subscribe();
                        if (result.state === 'Failed') {
                            this.notificationService.error(_('order.refund-order-failed'));
                        }
                        else {
                            this.notificationService.success(_('order.refund-order-success'));
                        }
                        break;
                    case 'QuantityTooGreatError':
                    case 'MultipleOrderError':
                    case 'OrderStateTransitionError':
                    case 'CancelActiveOrderError':
                    case 'EmptyOrderLineSelectionError':
                    case 'AlreadyRefundedError':
                    case 'NothingToRefundError':
                    case 'PaymentOrderMismatchError':
                    case 'RefundOrderStateError':
                    case 'RefundStateTransitionError':
                        this.notificationService.error(result.message);
                        break;
                }
            }
        });
    }
    refetchOrder(result) {
        this.fetchHistory.next();
        if (result) {
            return this.dataService.order.getOrder(this.id).single$;
        }
        else {
            return of(undefined);
        }
    }
    setFormValues(entity) {
        // empty
    }
}
OrderDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-detail',
                template: "<vdr-action-bar *ngIf=\"entity$ | async as order\">\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-order-state-label [state]=\"order.state\">\n                <button\n                    class=\"icon-button\"\n                    (click)=\"openStateDiagram()\"\n                    [title]=\"'order.order-state-diagram' | translate\"\n                >\n                    <clr-icon shape=\"list\"></clr-icon>\n                </button>\n            </vdr-order-state-label>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"order-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"\n                order.state === 'ArrangingAdditionalPayment' &&\n                (hasUnsettledModifications(order) || 0 < outstandingPaymentAmount(order))\n            \"\n            (click)=\"addManualPayment(order)\"\n        >\n            {{ 'order.add-payment-to-order' | translate }}\n            ({{ outstandingPaymentAmount(order) | localeCurrency: order.currencyCode }})\n        </button>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"order.state !== 'ArrangingAdditionalPayment' && 0 < outstandingPaymentAmount(order)\"\n            (click)=\"transitionToState('ArrangingAdditionalPayment')\"\n        >\n            {{ 'order.arrange-additional-payment' | translate }}\n        </button>\n        <button class=\"btn btn-primary\" (click)=\"fulfillOrder()\" [disabled]=\"!canAddFulfillment(order)\">\n            {{ 'order.fulfill-order' | translate }}\n        </button>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <ng-container *ngIf=\"order.nextStates.includes('Modifying')\">\n                    <button type=\"button\" class=\"btn\" vdrDropdownItem (click)=\"transitionToModifying()\">\n                        <clr-icon shape=\"pencil\"></clr-icon>\n                        {{ 'order.modify-order' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                </ng-container>\n                <button\n                    type=\"button\"\n                    class=\"btn\"\n                    vdrDropdownItem\n                    *ngIf=\"order.nextStates.includes('Cancelled')\"\n                    (click)=\"cancelOrRefund(order)\"\n                >\n                    <clr-icon shape=\"error-standard\" class=\"is-error\"></clr-icon>\n                    <ng-container *ngIf=\"orderHasSettledPayments(order); else cancelOnly\">\n                        {{ 'order.refund-and-cancel-order' | translate }}\n                    </ng-container>\n                    <ng-template #cancelOnly>\n                        {{ 'order.cancel-order' | translate }}\n                    </ng-template>\n                </button>\n\n                <ng-container *ngIf=\"(nextStates$ | async)?.length\">\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        *ngFor=\"let nextState of nextStates$ | async\"\n                        type=\"button\"\n                        class=\"btn\"\n                        vdrDropdownItem\n                        (click)=\"transitionToState(nextState)\"\n                    >\n                        <clr-icon shape=\"step-forward-2\"></clr-icon>\n                        {{\n                            'order.transition-to-state'\n                                | translate: { state: (nextState | stateI18nToken | translate) }\n                        }}\n                    </button>\n                </ng-container>\n                <div class=\"dropdown-divider\"></div>\n                <button type=\"button\" class=\"btn\" vdrDropdownItem (click)=\"manuallyTransitionToState(order)\">\n                    <clr-icon shape=\"step-forward-2\" class=\"is-warning\"></clr-icon>\n                    {{ 'order.manually-transition-to-state' | translate }}\n                </button>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngIf=\"entity$ | async as order\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col-lg-8\">\n            <vdr-order-table\n                [order]=\"order\"\n                [orderLineCustomFields]=\"orderLineCustomFields\"\n            ></vdr-order-table>\n            <h4>{{ 'order.tax-summary' | translate }}</h4>\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th>{{ 'common.description' | translate }}</th>\n                        <th>{{ 'order.tax-rate' | translate }}</th>\n                        <th>{{ 'order.tax-base' | translate }}</th>\n                        <th>{{ 'order.tax-total' | translate }}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let row of order.taxSummary\">\n                        <td>{{ row.description }}</td>\n                        <td>{{ row.taxRate / 100 | percent }}</td>\n                        <td>{{ row.taxBase | localeCurrency: order.currencyCode }}</td>\n                        <td>{{ row.taxTotal | localeCurrency: order.currencyCode }}</td>\n                    </tr>\n                </tbody>\n            </table>\n\n            <vdr-order-history\n                [order]=\"order\"\n                [history]=\"history$ | async\"\n                (addNote)=\"addNote($event)\"\n                (updateNote)=\"updateNote($event)\"\n                (deleteNote)=\"deleteNote($event)\"\n            ></vdr-order-history>\n        </div>\n        <div class=\"clr-col-lg-4 order-cards\">\n            <vdr-order-custom-fields-card\n                [customFieldsConfig]=\"customFields\"\n                [customFieldValues]=\"order.customFields\"\n                (updateClick)=\"updateCustomFields($event)\"\n            ></vdr-order-custom-fields-card>\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    {{ 'order.customer' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n                        <h6 *ngIf=\"getOrderAddressLines(order.shippingAddress).length\">\n                            {{ 'order.shipping-address' | translate }}\n                        </h6>\n                        <vdr-formatted-address [address]=\"order.shippingAddress\"></vdr-formatted-address>\n                        <h6 *ngIf=\"getOrderAddressLines(order.billingAddress).length\">\n                            {{ 'order.billing-address' | translate }}\n                        </h6>\n                        <vdr-formatted-address [address]=\"order.billingAddress\"></vdr-formatted-address>\n                    </div>\n                </div>\n            </div>\n            <ng-container *ngIf=\"order.payments && order.payments.length\">\n                <vdr-order-payment-card\n                    *ngFor=\"let payment of order.payments\"\n                    [currencyCode]=\"order.currencyCode\"\n                    [payment]=\"payment\"\n                    (settlePayment)=\"settlePayment($event)\"\n                    (transitionPaymentState)=\"transitionPaymentState($event)\"\n                    (settleRefund)=\"settleRefund($event)\"\n                ></vdr-order-payment-card>\n            </ng-container>\n            <ng-container *ngFor=\"let fulfillment of order.fulfillments\">\n                <vdr-fulfillment-card\n                    [fulfillment]=\"fulfillment\"\n                    [order]=\"order\"\n                    (transitionState)=\"transitionFulfillment(fulfillment.id, $event)\"\n                ></vdr-fulfillment-card>\n            </ng-container>\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".shipping-address{list-style-type:none;line-height:1.3em}.order-cards h6{margin-top:6px;color:var(--color-text-200)}"]
            },] }
];
OrderDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: OrderTransitionService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvb3JkZXItZGV0YWlsL29yZGVyLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQ0gsbUJBQW1CLEVBR25CLFdBQVcsRUFDWCx1QkFBdUIsRUFLdkIsWUFBWSxFQUNaLG1CQUFtQixFQU1uQixtQkFBbUIsRUFDbkIsU0FBUyxHQUNaLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hELE9BQU8sRUFBZSxPQUFPLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbEYsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDbkgsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbEcsT0FBTyxF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dUJBQXVCLENBQUM7b0JBQzdCLEtBQUssb0JBQW9CLENBQUM7b0JBQzFCLEtBQUssMkJBQTJCLENBQUM7b0JBQ2pDLEtBQUssd0JBQXdCLENBQUM7b0JBQzlCLEtBQUssOEJBQThCLENBQUM7b0JBQ3BDLEtBQUssc0JBQXNCLENBQUM7b0JBQzVCLEtBQUssc0JBQXNCLENBQUM7b0JBQzVCLEtBQUssMkJBQTJCLENBQUM7b0JBQ2pDLEtBQUssdUJBQXVCLENBQUM7b0JBQzdCLEtBQUssNEJBQTRCO3dCQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDL0MsTUFBTTtpQkFDYjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU8sWUFBWSxDQUFDLE1BQTBCO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxNQUFNLEVBQUU7WUFDUixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQzNEO2FBQU07WUFDSCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFUyxhQUFhLENBQUMsTUFBc0I7UUFDMUMsUUFBUTtJQUNaLENBQUM7OztZQTlnQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHlsUUFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBeEN3QixNQUFNO1lBQXRCLGNBQWM7WUFtQm5CLG1CQUFtQjtZQXJCVyxpQkFBaUI7WUFRL0MsV0FBVztZQU9YLG1CQUFtQjtZQURuQixZQUFZO1lBZVAsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQmFzZURldGFpbENvbXBvbmVudCxcbiAgICBDYW5jZWxPcmRlcixcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBFZGl0Tm90ZURpYWxvZ0NvbXBvbmVudCxcbiAgICBHZXRPcmRlckhpc3RvcnksXG4gICAgR2V0T3JkZXJRdWVyeSxcbiAgICBIaXN0b3J5RW50cnksXG4gICAgSGlzdG9yeUVudHJ5VHlwZSxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBPcmRlcixcbiAgICBPcmRlckRldGFpbCxcbiAgICBPcmRlckRldGFpbEZyYWdtZW50LFxuICAgIE9yZGVyTGluZUZyYWdtZW50LFxuICAgIFJlZnVuZE9yZGVyLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgU29ydE9yZGVyLFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3BpY2snO1xuaW1wb3J0IHsgYXNzZXJ0TmV2ZXIsIHN1bW1hdGUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5pbXBvcnQgeyBFTVBUWSwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1hcFRvLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgT3JkZXJUcmFuc2l0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9vcmRlci10cmFuc2l0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkTWFudWFsUGF5bWVudERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL2FkZC1tYW51YWwtcGF5bWVudC1kaWFsb2cvYWRkLW1hbnVhbC1wYXltZW50LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FuY2VsT3JkZXJEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9jYW5jZWwtb3JkZXItZGlhbG9nL2NhbmNlbC1vcmRlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEZ1bGZpbGxPcmRlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL2Z1bGZpbGwtb3JkZXItZGlhbG9nL2Z1bGZpbGwtb3JkZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlclByb2Nlc3NHcmFwaERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL29yZGVyLXByb2Nlc3MtZ3JhcGgtZGlhbG9nL29yZGVyLXByb2Nlc3MtZ3JhcGgtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWZ1bmRPcmRlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3JlZnVuZC1vcmRlci1kaWFsb2cvcmVmdW5kLW9yZGVyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2V0dGxlUmVmdW5kRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vc2V0dGxlLXJlZnVuZC1kaWFsb2cvc2V0dGxlLXJlZnVuZC1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItb3JkZXItZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXItZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9vcmRlci1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJEZXRhaWxDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8T3JkZXJEZXRhaWwuRnJhZ21lbnQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgZGV0YWlsRm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGhpc3RvcnkkOiBPYnNlcnZhYmxlPEdldE9yZGVySGlzdG9yeS5JdGVtc1tdIHwgdW5kZWZpbmVkPjtcbiAgICBuZXh0U3RhdGVzJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gICAgZmV0Y2hIaXN0b3J5ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgb3JkZXJMaW5lQ3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdFN0YXRlcyA9IFtcbiAgICAgICAgJ0FkZGluZ0l0ZW1zJyxcbiAgICAgICAgJ0FycmFuZ2luZ1BheW1lbnQnLFxuICAgICAgICAnUGF5bWVudEF1dGhvcml6ZWQnLFxuICAgICAgICAnUGF5bWVudFNldHRsZWQnLFxuICAgICAgICAnUGFydGlhbGx5U2hpcHBlZCcsXG4gICAgICAgICdTaGlwcGVkJyxcbiAgICAgICAgJ1BhcnRpYWxseURlbGl2ZXJlZCcsXG4gICAgICAgICdEZWxpdmVyZWQnLFxuICAgICAgICAnQ2FuY2VsbGVkJyxcbiAgICAgICAgJ01vZGlmeWluZycsXG4gICAgICAgICdBcnJhbmdpbmdBZGRpdGlvbmFsUGF5bWVudCcsXG4gICAgXTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBvcmRlclRyYW5zaXRpb25TZXJ2aWNlOiBPcmRlclRyYW5zaXRpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLmVudGl0eSQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUob3JkZXIgPT4ge1xuICAgICAgICAgICAgaWYgKG9yZGVyLnN0YXRlID09PSAnTW9kaWZ5aW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nLCAnbW9kaWZ5J10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY3VzdG9tRmllbGRzID0gdGhpcy5nZXRDdXN0b21GaWVsZENvbmZpZygnT3JkZXInKTtcbiAgICAgICAgdGhpcy5vcmRlckxpbmVDdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdPcmRlckxpbmUnKTtcbiAgICAgICAgdGhpcy5oaXN0b3J5JCA9IHRoaXMuZmV0Y2hIaXN0b3J5LnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRPcmRlckhpc3RvcnkodGhpcy5pZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogU29ydE9yZGVyLkRFU0MsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS5vcmRlcj8uaGlzdG9yeS5pdGVtcyk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5uZXh0U3RhdGVzJCA9IHRoaXMuZW50aXR5JC5waXBlKFxuICAgICAgICAgICAgbWFwKG9yZGVyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0luQ3VzdG9tU3RhdGUgPSAhdGhpcy5kZWZhdWx0U3RhdGVzLmluY2x1ZGVzKG9yZGVyLnN0YXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNJbkN1c3RvbVN0YXRlXG4gICAgICAgICAgICAgICAgICAgID8gb3JkZXIubmV4dFN0YXRlc1xuICAgICAgICAgICAgICAgICAgICA6IG9yZGVyLm5leHRTdGF0ZXMuZmlsdGVyKHMgPT4gIXRoaXMuZGVmYXVsdFN0YXRlcy5pbmNsdWRlcyhzKSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgb3BlblN0YXRlRGlhZ3JhbSgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHkkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChvcmRlciA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5mcm9tQ29tcG9uZW50KE9yZGVyUHJvY2Vzc0dyYXBoRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVN0YXRlOiBvcmRlci5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdHJhbnNpdGlvblRvU3RhdGUoc3RhdGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLnRyYW5zaXRpb25Ub1N0YXRlKHRoaXMuaWQsIHN0YXRlKS5zdWJzY3JpYmUoKHsgdHJhbnNpdGlvbk9yZGVyVG9TdGF0ZSB9KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRyYW5zaXRpb25PcmRlclRvU3RhdGU/Ll9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdPcmRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLnRyYW5zaXRpb25lZC10by1zdGF0ZS1zdWNjZXNzJyksIHsgc3RhdGUgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hIaXN0b3J5Lm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnT3JkZXJTdGF0ZVRyYW5zaXRpb25FcnJvcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcih0cmFuc2l0aW9uT3JkZXJUb1N0YXRlLnRyYW5zaXRpb25FcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1hbnVhbGx5VHJhbnNpdGlvblRvU3RhdGUob3JkZXI6IE9yZGVyRGV0YWlsRnJhZ21lbnQpIHtcbiAgICAgICAgdGhpcy5vcmRlclRyYW5zaXRpb25TZXJ2aWNlXG4gICAgICAgICAgICAubWFudWFsbHlUcmFuc2l0aW9uVG9TdGF0ZSh7XG4gICAgICAgICAgICAgICAgb3JkZXJJZDogb3JkZXIuaWQsXG4gICAgICAgICAgICAgICAgbmV4dFN0YXRlczogb3JkZXIubmV4dFN0YXRlcyxcbiAgICAgICAgICAgICAgICBjYW5jZWxsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBfKCdvcmRlci5tYW51YWxseS10cmFuc2l0aW9uLXRvLXN0YXRlLW1lc3NhZ2UnKSxcbiAgICAgICAgICAgICAgICByZXRyeTogMCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdHJhbnNpdGlvblRvTW9kaWZ5aW5nKCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAudHJhbnNpdGlvblRvU3RhdGUodGhpcy5pZCwgJ01vZGlmeWluZycpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh7IHRyYW5zaXRpb25PcmRlclRvU3RhdGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJhbnNpdGlvbk9yZGVyVG9TdGF0ZT8uX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdPcmRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4vbW9kaWZ5J10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcih0cmFuc2l0aW9uT3JkZXJUb1N0YXRlLnRyYW5zaXRpb25FcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VzdG9tRmllbGRzKGN1c3RvbUZpZWxkc1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgLnVwZGF0ZU9yZGVyQ3VzdG9tRmllbGRzKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IGN1c3RvbUZpZWxkc1ZhbHVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwgeyBlbnRpdHk6ICdPcmRlcicgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRPcmRlckFkZHJlc3NMaW5lcyhvcmRlckFkZHJlc3M/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoIW9yZGVyQWRkcmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKG9yZGVyQWRkcmVzcylcbiAgICAgICAgICAgIC5maWx0ZXIodmFsID0+IHZhbCAhPT0gJ09yZGVyQWRkcmVzcycpXG4gICAgICAgICAgICAuZmlsdGVyKGxpbmUgPT4gISFsaW5lKTtcbiAgICB9XG5cbiAgICBzZXR0bGVQYXltZW50KHBheW1lbnQ6IE9yZGVyRGV0YWlsLlBheW1lbnRzKSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuc2V0dGxlUGF5bWVudChwYXltZW50LmlkKS5zdWJzY3JpYmUoKHsgc2V0dGxlUGF5bWVudCB9KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNldHRsZVBheW1lbnQuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BheW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGxlUGF5bWVudC5zdGF0ZSA9PT0gJ1NldHRsZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdvcmRlci5zZXR0bGUtcGF5bWVudC1zdWNjZXNzJykpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ29yZGVyLnNldHRsZS1wYXltZW50LWVycm9yJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuZ2V0T3JkZXIodGhpcy5pZCkuc2luZ2xlJC5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaEhpc3RvcnkubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yJzpcbiAgICAgICAgICAgICAgICBjYXNlICdQYXltZW50U3RhdGVUcmFuc2l0aW9uRXJyb3InOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1NldHRsZVBheW1lbnRFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihzZXR0bGVQYXltZW50Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uUGF5bWVudFN0YXRlKHsgcGF5bWVudCwgc3RhdGUgfTogeyBwYXltZW50OiBPcmRlckRldGFpbC5QYXltZW50czsgc3RhdGU6IHN0cmluZyB9KSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXJcbiAgICAgICAgICAgIC50cmFuc2l0aW9uUGF5bWVudFRvU3RhdGUocGF5bWVudC5pZCwgc3RhdGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh7IHRyYW5zaXRpb25QYXltZW50VG9TdGF0ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cmFuc2l0aW9uUGF5bWVudFRvU3RhdGUuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdQYXltZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLnRyYW5zaXRpb25lZC1wYXltZW50LXRvLXN0YXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLmdldE9yZGVyKHRoaXMuaWQpLnNpbmdsZSQuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUGF5bWVudFN0YXRlVHJhbnNpdGlvbkVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcih0cmFuc2l0aW9uUGF5bWVudFRvU3RhdGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5BZGRGdWxmaWxsbWVudChvcmRlcjogT3JkZXJEZXRhaWwuRnJhZ21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgYWxsSXRlbXNGdWxmaWxsZWQgPSBvcmRlci5saW5lc1xuICAgICAgICAgICAgLnJlZHVjZSgoaXRlbXMsIGxpbmUpID0+IFsuLi5pdGVtcywgLi4ubGluZS5pdGVtc10sIFtdIGFzIE9yZGVyTGluZUZyYWdtZW50WydpdGVtcyddKVxuICAgICAgICAgICAgLmV2ZXJ5KGl0ZW0gPT4gISFpdGVtLmZ1bGZpbGxtZW50KTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICFhbGxJdGVtc0Z1bGZpbGxlZCAmJlxuICAgICAgICAgICAgIXRoaXMuaGFzVW5zZXR0bGVkTW9kaWZpY2F0aW9ucyhvcmRlcikgJiZcbiAgICAgICAgICAgIHRoaXMub3V0c3RhbmRpbmdQYXltZW50QW1vdW50KG9yZGVyKSA9PT0gMCAmJlxuICAgICAgICAgICAgKG9yZGVyLm5leHRTdGF0ZXMuaW5jbHVkZXMoJ1NoaXBwZWQnKSB8fFxuICAgICAgICAgICAgICAgIG9yZGVyLm5leHRTdGF0ZXMuaW5jbHVkZXMoJ1BhcnRpYWxseVNoaXBwZWQnKSB8fFxuICAgICAgICAgICAgICAgIG9yZGVyLm5leHRTdGF0ZXMuaW5jbHVkZXMoJ0RlbGl2ZXJlZCcpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGhhc1Vuc2V0dGxlZE1vZGlmaWNhdGlvbnMob3JkZXI6IE9yZGVyRGV0YWlsRnJhZ21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIDAgPCBvcmRlci5tb2RpZmljYXRpb25zLmZpbHRlcihtID0+ICFtLmlzU2V0dGxlZCkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldE91dHN0YW5kaW5nTW9kaWZpY2F0aW9uQW1vdW50KG9yZGVyOiBPcmRlckRldGFpbEZyYWdtZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHN1bW1hdGUoXG4gICAgICAgICAgICBvcmRlci5tb2RpZmljYXRpb25zLmZpbHRlcihtID0+ICFtLmlzU2V0dGxlZCksXG4gICAgICAgICAgICAncHJpY2VDaGFuZ2UnLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG91dHN0YW5kaW5nUGF5bWVudEFtb3VudChvcmRlcjogT3JkZXJEZXRhaWxGcmFnbWVudCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHBheW1lbnRJc1ZhbGlkID0gKHA6IE9yZGVyRGV0YWlsLlBheW1lbnRzKTogYm9vbGVhbiA9PlxuICAgICAgICAgICAgcC5zdGF0ZSAhPT0gJ0NhbmNlbGxlZCcgJiYgcC5zdGF0ZSAhPT0gJ0RlY2xpbmVkJyAmJiBwLnN0YXRlICE9PSAnRXJyb3InO1xuICAgICAgICBjb25zdCB2YWxpZFBheW1lbnRzID0gb3JkZXIucGF5bWVudHM/LmZpbHRlcihwYXltZW50SXNWYWxpZCkubWFwKHAgPT4gcGljayhwLCBbJ2Ftb3VudCddKSkgPz8gW107XG4gICAgICAgIGNvbnN0IGFtb3VudENvdmVyZWQgPSBzdW1tYXRlKHZhbGlkUGF5bWVudHMsICdhbW91bnQnKTtcbiAgICAgICAgcmV0dXJuIG9yZGVyLnRvdGFsV2l0aFRheCAtIGFtb3VudENvdmVyZWQ7XG4gICAgfVxuXG4gICAgYWRkTWFudWFsUGF5bWVudChvcmRlcjogT3JkZXJEZXRhaWxGcmFnbWVudCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoQWRkTWFudWFsUGF5bWVudERpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBvdXRzdGFuZGluZ0Ftb3VudDogdGhpcy5vdXRzdGFuZGluZ1BheW1lbnRBbW91bnQob3JkZXIpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGU6IG9yZGVyLmN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5vcmRlci5hZGRNYW51YWxQYXltZW50VG9PcmRlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJJZDogdGhpcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbklkOiByZXN1bHQudHJhbnNhY3Rpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHJlc3VsdC5tZXRob2QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IHJlc3VsdC5tZXRhZGF0YSB8fCB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCh7IGFkZE1hbnVhbFBheW1lbnRUb09yZGVyIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhZGRNYW51YWxQYXltZW50VG9PcmRlci5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdPcmRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnb3JkZXIuYWRkLXBheW1lbnQtdG8tb3JkZXItc3VjY2VzcycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcmRlclRyYW5zaXRpb25TZXJ2aWNlLnRyYW5zaXRpb25Ub1ByZU1vZGlmeWluZ1N0YXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIubmV4dFN0YXRlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnTWFudWFsUGF5bWVudFN0YXRlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihhZGRNYW51YWxQYXltZW50VG9PcmRlci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZldGNoT3JkZXIoeyByZXN1bHQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVsZmlsbE9yZGVyKCkge1xuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKG9yZGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLmZyb21Db21wb25lbnQoRnVsZmlsbE9yZGVyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoaW5wdXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLmNyZWF0ZUZ1bGZpbGxtZW50KGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHJlc3VsdCA9PiB0aGlzLnJlZmV0Y2hPcmRlcihyZXN1bHQpLnBpcGUobWFwVG8ocmVzdWx0KSkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXN1bHQuYWRkRnVsZmlsbG1lbnRUb09yZGVyLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bGZpbGxtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdvcmRlci5jcmVhdGUtZnVsZmlsbG1lbnQtc3VjY2VzcycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VtcHR5T3JkZXJMaW5lU2VsZWN0aW9uRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnSW5zdWZmaWNpZW50U3RvY2tPbkhhbmRFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdJdGVtc0FscmVhZHlGdWxmaWxsZWRFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHJlc3VsdC5hZGRGdWxmaWxsbWVudFRvT3JkZXIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uRnVsZmlsbG1lbnQoaWQ6IHN0cmluZywgc3RhdGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAudHJhbnNpdGlvbkZ1bGZpbGxtZW50VG9TdGF0ZShpZCwgc3RhdGUpXG4gICAgICAgICAgICAucGlwZShzd2l0Y2hNYXAocmVzdWx0ID0+IHRoaXMucmVmZXRjaE9yZGVyKHJlc3VsdCkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnb3JkZXIuc3VjY2Vzc2Z1bGx5LXVwZGF0ZWQtZnVsZmlsbG1lbnQnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5jZWxPclJlZnVuZChvcmRlcjogT3JkZXJEZXRhaWwuRnJhZ21lbnQpIHtcbiAgICAgICAgY29uc3QgaXNSZWZ1bmRhYmxlID0gdGhpcy5vcmRlckhhc1NldHRsZWRQYXltZW50cyhvcmRlcik7XG4gICAgICAgIGlmIChvcmRlci5zdGF0ZSA9PT0gJ1BheW1lbnRBdXRob3JpemVkJyB8fCBvcmRlci5hY3RpdmUgPT09IHRydWUgfHwgIWlzUmVmdW5kYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcihvcmRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZnVuZE9yZGVyKG9yZGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHRsZVJlZnVuZChyZWZ1bmQ6IE9yZGVyRGV0YWlsLlJlZnVuZHMpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KFNldHRsZVJlZnVuZERpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIHNpemU6ICdtZCcsXG4gICAgICAgICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlZnVuZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCh0cmFuc2FjdGlvbklkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zYWN0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLnNldHRsZVJlZnVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZWZ1bmQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgLy8gc3dpdGNoTWFwKHJlc3VsdCA9PiB0aGlzLnJlZmV0Y2hPcmRlcihyZXN1bHQpKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLnNldHRsZS1yZWZ1bmQtc3VjY2VzcycpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGROb3RlKGV2ZW50OiB7IG5vdGU6IHN0cmluZzsgaXNQdWJsaWM6IGJvb2xlYW4gfSkge1xuICAgICAgICBjb25zdCB7IG5vdGUsIGlzUHVibGljIH0gPSBldmVudDtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgLmFkZE5vdGVUb09yZGVyKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgICAgICBub3RlLFxuICAgICAgICAgICAgICAgIGlzUHVibGljLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKHN3aXRjaE1hcChyZXN1bHQgPT4gdGhpcy5yZWZldGNoT3JkZXIocmVzdWx0KSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ05vdGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlTm90ZShlbnRyeTogSGlzdG9yeUVudHJ5KSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChFZGl0Tm90ZURpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJpdmFjeUNvbnRyb2xzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBub3RlOiBlbnRyeS5kYXRhLm5vdGUsXG4gICAgICAgICAgICAgICAgICAgIG5vdGVJc1ByaXZhdGU6ICFlbnRyeS5pc1B1YmxpYyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5vcmRlci51cGRhdGVPcmRlck5vdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVJZDogZW50cnkuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQdWJsaWM6ICFyZXN1bHQuaXNQcml2YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGU6IHJlc3VsdC5ub3RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ05vdGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlTm90ZShlbnRyeTogSGlzdG9yeUVudHJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2NvbW1vbi5jb25maXJtLWRlbGV0ZS1ub3RlJyksXG4gICAgICAgICAgICAgICAgYm9keTogZW50cnkuZGF0YS5ub3RlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRlbGV0ZScpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoc3dpdGNoTWFwKHJlcyA9PiAocmVzID8gdGhpcy5kYXRhU2VydmljZS5vcmRlci5kZWxldGVPcmRlck5vdGUoZW50cnkuaWQpIDogRU1QVFkpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hIaXN0b3J5Lm5leHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnTm90ZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvcmRlckhhc1NldHRsZWRQYXltZW50cyhvcmRlcjogT3JkZXJEZXRhaWwuRnJhZ21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhb3JkZXIucGF5bWVudHM/LmZpbmQocCA9PiBwLnN0YXRlID09PSAnU2V0dGxlZCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuY2VsT3JkZXIob3JkZXI6IE9yZGVyRGV0YWlsLkZyYWdtZW50KSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChDYW5jZWxPcmRlckRpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIHNpemU6ICd4bCcsXG4gICAgICAgICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKGlucHV0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5vcmRlci5jYW5jZWxPcmRlcihpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXN1bHQgPT4gdGhpcy5yZWZldGNoT3JkZXIocmVzdWx0KSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdvcmRlci5jYW5jZWxsZWQtb3JkZXItc3VjY2VzcycpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnVuZE9yZGVyKG9yZGVyOiBPcmRlckRldGFpbC5GcmFnbWVudCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoUmVmdW5kT3JkZXJEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBvcmRlcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChpbnB1dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlcmF0aW9uczogQXJyYXk8XG4gICAgICAgICAgICAgICAgICAgICAgICBPYnNlcnZhYmxlPFJlZnVuZE9yZGVyLlJlZnVuZE9yZGVyIHwgQ2FuY2VsT3JkZXIuQ2FuY2VsT3JkZXI+XG4gICAgICAgICAgICAgICAgICAgID4gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnJlZnVuZC5saW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWZ1bmRPcmRlcihpbnB1dC5yZWZ1bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzLnJlZnVuZE9yZGVyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5jYW5jZWwubGluZXM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbmNlbE9yZGVyKGlucHV0LmNhbmNlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMuY2FuY2VsT3JkZXIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLm9wZXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXN1bHQuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnT3JkZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmZXRjaE9yZGVyKHJlc3VsdCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnb3JkZXIuY2FuY2VsbGVkLW9yZGVyLXN1Y2Nlc3MnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdSZWZ1bmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmZXRjaE9yZGVyKHJlc3VsdCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0ZSA9PT0gJ0ZhaWxlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ29yZGVyLnJlZnVuZC1vcmRlci1mYWlsZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnb3JkZXIucmVmdW5kLW9yZGVyLXN1Y2Nlc3MnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUXVhbnRpdHlUb29HcmVhdEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ011bHRpcGxlT3JkZXJFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0NhbmNlbEFjdGl2ZU9yZGVyRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnRW1wdHlPcmRlckxpbmVTZWxlY3Rpb25FcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBbHJlYWR5UmVmdW5kZWRFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdOb3RoaW5nVG9SZWZ1bmRFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdQYXltZW50T3JkZXJNaXNtYXRjaEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1JlZnVuZE9yZGVyU3RhdGVFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdSZWZ1bmRTdGF0ZVRyYW5zaXRpb25FcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmZXRjaE9yZGVyKHJlc3VsdDogb2JqZWN0IHwgdW5kZWZpbmVkKTogT2JzZXJ2YWJsZTxHZXRPcmRlclF1ZXJ5IHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHRoaXMuZmV0Y2hIaXN0b3J5Lm5leHQoKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuZ2V0T3JkZXIodGhpcy5pZCkuc2luZ2xlJDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMoZW50aXR5OiBPcmRlci5GcmFnbWVudCk6IHZvaWQge1xuICAgICAgICAvLyBlbXB0eVxuICAgIH1cbn1cbiJdfQ==