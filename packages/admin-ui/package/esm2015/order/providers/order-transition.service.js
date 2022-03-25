import { Injectable } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataService, HistoryEntryType, I18nService, ModalService, NotificationService, SortOrder, } from '@vendure/admin-ui/core';
import { EMPTY } from 'rxjs';
import { catchError, delay, map, retryWhen, switchMap, take } from 'rxjs/operators';
import { OrderStateSelectDialogComponent } from '../components/order-state-select-dialog/order-state-select-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@vendure/admin-ui/core";
export class OrderTransitionService {
    constructor(dataService, modalService, notificationService, i18nService) {
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.i18nService = i18nService;
    }
    /**
     * Attempts to transition the Order to the last state it was in before it was transitioned
     * to the "Modifying" state. If this fails, a manual prompt is used.
     */
    transitionToPreModifyingState(orderId, nextStates) {
        return this.getPreModifyingState(orderId).pipe(switchMap(state => {
            const manualTransitionOptions = {
                orderId,
                nextStates,
                message: this.i18nService.translate(_('order.unable-to-transition-to-state-try-another'), { state }),
                cancellable: false,
                retry: 10,
            };
            if (state) {
                return this.transitionToStateOrThrow(orderId, state).pipe(catchError(err => this.manuallyTransitionToState(manualTransitionOptions)));
            }
            else {
                return this.manuallyTransitionToState(manualTransitionOptions);
            }
        }));
    }
    /**
     * Displays a modal for manually selecting the next state.
     */
    manuallyTransitionToState(options) {
        return this.modalService
            .fromComponent(OrderStateSelectDialogComponent, {
            locals: {
                nextStates: options.nextStates,
                cancellable: options.cancellable,
                message: options.message,
            },
            closable: false,
            size: 'md',
        })
            .pipe(switchMap(result => {
            if (result) {
                return this.transitionToStateOrThrow(options.orderId, result);
            }
            else {
                if (!options.cancellable) {
                    throw new Error(`An order state must be selected`);
                }
                else {
                    return EMPTY;
                }
            }
        }), retryWhen(errors => errors.pipe(delay(2000), take(options.retry))));
    }
    /**
     * Attempts to get the last state the Order was in before it was transitioned
     * to the "Modifying" state.
     */
    getPreModifyingState(orderId) {
        return this.dataService.order
            .getOrderHistory(orderId, {
            filter: {
                type: {
                    eq: HistoryEntryType.ORDER_STATE_TRANSITION,
                },
            },
            sort: {
                createdAt: SortOrder.DESC,
            },
        })
            .mapSingle(result => result.order)
            .pipe(map(result => {
            const item = result === null || result === void 0 ? void 0 : result.history.items.find(i => i.data.to === 'Modifying');
            if (item) {
                return item.data.from;
            }
            else {
                return;
            }
        }));
    }
    transitionToStateOrThrow(orderId, state) {
        return this.dataService.order.transitionToState(orderId, state).pipe(map(({ transitionOrderToState }) => {
            switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                case 'Order':
                    return transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.state;
                case 'OrderStateTransitionError':
                    this.notificationService.error(transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.transitionError);
                    throw new Error(transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.transitionError);
            }
        }));
    }
}
OrderTransitionService.ɵprov = i0.ɵɵdefineInjectable({ factory: function OrderTransitionService_Factory() { return new OrderTransitionService(i0.ɵɵinject(i1.DataService), i0.ɵɵinject(i1.ModalService), i0.ɵɵinject(i1.NotificationService), i0.ɵɵinject(i1.I18nService)); }, token: OrderTransitionService, providedIn: "root" });
OrderTransitionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
OrderTransitionService.ctorParameters = () => [
    { type: DataService },
    { type: ModalService },
    { type: NotificationService },
    { type: I18nService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItdHJhbnNpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvcHJvdmlkZXJzL29yZGVyLXRyYW5zaXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsU0FBUyxHQUNaLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQzs7O0FBSzlILE1BQU0sT0FBTyxzQkFBc0I7SUFDL0IsWUFDWSxXQUF3QixFQUN4QixZQUEwQixFQUMxQixtQkFBd0MsRUFDeEMsV0FBd0I7UUFIeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUNqQyxDQUFDO0lBRUo7OztPQUdHO0lBQ0gsNkJBQTZCLENBQUMsT0FBZSxFQUFFLFVBQW9CO1FBQy9ELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDMUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2QsTUFBTSx1QkFBdUIsR0FBRztnQkFD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QUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDaEUsR0FBRyxDQUFDLENBQUMsRUFBRSxzQkFBc0IsRUFBRSxFQUFFLEVBQUU7WUFDL0IsUUFBUSxzQkFBc0IsYUFBdEIsc0JBQXNCLHVCQUF0QixzQkFBc0IsQ0FBRSxVQUFVLEVBQUU7Z0JBQ3hDLEtBQUssT0FBTztvQkFDUixPQUFPLHNCQUFzQixhQUF0QixzQkFBc0IsdUJBQXRCLHNCQUFzQixDQUFFLEtBQUssQ0FBQztnQkFDekMsS0FBSywyQkFBMkI7b0JBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLGFBQXRCLHNCQUFzQix1QkFBdEIsc0JBQXNCLENBQUUsZUFBZSxDQUFDLENBQUM7b0JBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLGFBQXRCLHNCQUFzQix1QkFBdEIsc0JBQXNCLENBQUUsZUFBZSxDQUFDLENBQUM7YUFDaEU7UUFDTCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQzs7OztZQXBISixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQWRHLFdBQVc7WUFHWCxZQUFZO1lBQ1osbUJBQW1CO1lBRm5CLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIERhdGFTZXJ2aWNlLFxuICAgIEhpc3RvcnlFbnRyeVR5cGUsXG4gICAgSTE4blNlcnZpY2UsXG4gICAgTW9kYWxTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgU29ydE9yZGVyLFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBkZWxheSwgbWFwLCByZXRyeVdoZW4sIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgT3JkZXJTdGF0ZVNlbGVjdERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXItc3RhdGUtc2VsZWN0LWRpYWxvZy9vcmRlci1zdGF0ZS1zZWxlY3QtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyVHJhbnNpdGlvblNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGkxOG5TZXJ2aWNlOiBJMThuU2VydmljZSxcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byB0cmFuc2l0aW9uIHRoZSBPcmRlciB0byB0aGUgbGFzdCBzdGF0ZSBpdCB3YXMgaW4gYmVmb3JlIGl0IHdhcyB0cmFuc2l0aW9uZWRcbiAgICAgKiB0byB0aGUgXCJNb2RpZnlpbmdcIiBzdGF0ZS4gSWYgdGhpcyBmYWlscywgYSBtYW51YWwgcHJvbXB0IGlzIHVzZWQuXG4gICAgICovXG4gICAgdHJhbnNpdGlvblRvUHJlTW9kaWZ5aW5nU3RhdGUob3JkZXJJZDogc3RyaW5nLCBuZXh0U3RhdGVzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcmVNb2RpZnlpbmdTdGF0ZShvcmRlcklkKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYW51YWxUcmFuc2l0aW9uT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXRlcyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5pMThuU2VydmljZS50cmFuc2xhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBfKCdvcmRlci51bmFibGUtdG8tdHJhbnNpdGlvbi10by1zdGF0ZS10cnktYW5vdGhlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0ZSB9LFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHJldHJ5OiAxMCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uVG9TdGF0ZU9yVGhyb3cob3JkZXJJZCwgc3RhdGUpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKGVyciA9PiB0aGlzLm1hbnVhbGx5VHJhbnNpdGlvblRvU3RhdGUobWFudWFsVHJhbnNpdGlvbk9wdGlvbnMpKSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYW51YWxseVRyYW5zaXRpb25Ub1N0YXRlKG1hbnVhbFRyYW5zaXRpb25PcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyBhIG1vZGFsIGZvciBtYW51YWxseSBzZWxlY3RpbmcgdGhlIG5leHQgc3RhdGUuXG4gICAgICovXG4gICAgbWFudWFsbHlUcmFuc2l0aW9uVG9TdGF0ZShvcHRpb25zOiB7XG4gICAgICAgIG9yZGVySWQ6IHN0cmluZztcbiAgICAgICAgbmV4dFN0YXRlczogc3RyaW5nW107XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgY2FuY2VsbGFibGU6IGJvb2xlYW47XG4gICAgICAgIHJldHJ5OiBudW1iZXI7XG4gICAgfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KE9yZGVyU3RhdGVTZWxlY3REaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXRlczogb3B0aW9ucy5uZXh0U3RhdGVzLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYWJsZTogb3B0aW9ucy5jYW5jZWxsYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogb3B0aW9ucy5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xvc2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNpemU6ICdtZCcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb25Ub1N0YXRlT3JUaHJvdyhvcHRpb25zLm9yZGVySWQsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuY2FuY2VsbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFuIG9yZGVyIHN0YXRlIG11c3QgYmUgc2VsZWN0ZWRgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcmV0cnlXaGVuKGVycm9ycyA9PiBlcnJvcnMucGlwZShkZWxheSgyMDAwKSwgdGFrZShvcHRpb25zLnJldHJ5KSkpLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBnZXQgdGhlIGxhc3Qgc3RhdGUgdGhlIE9yZGVyIHdhcyBpbiBiZWZvcmUgaXQgd2FzIHRyYW5zaXRpb25lZFxuICAgICAqIHRvIHRoZSBcIk1vZGlmeWluZ1wiIHN0YXRlLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UHJlTW9kaWZ5aW5nU3RhdGUob3JkZXJJZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAuZ2V0T3JkZXJIaXN0b3J5KG9yZGVySWQsIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXE6IEhpc3RvcnlFbnRyeVR5cGUuT1JERVJfU1RBVEVfVFJBTlNJVElPTixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBTb3J0T3JkZXIuREVTQyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXBTaW5nbGUocmVzdWx0ID0+IHJlc3VsdC5vcmRlcilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gcmVzdWx0Py5oaXN0b3J5Lml0ZW1zLmZpbmQoaSA9PiBpLmRhdGEudG8gPT09ICdNb2RpZnlpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmRhdGEuZnJvbSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uVG9TdGF0ZU9yVGhyb3cob3JkZXJJZDogc3RyaW5nLCBzdGF0ZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLnRyYW5zaXRpb25Ub1N0YXRlKG9yZGVySWQsIHN0YXRlKS5waXBlKFxuICAgICAgICAgICAgbWFwKCh7IHRyYW5zaXRpb25PcmRlclRvU3RhdGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJhbnNpdGlvbk9yZGVyVG9TdGF0ZT8uX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdPcmRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbk9yZGVyVG9TdGF0ZT8uc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ09yZGVyU3RhdGVUcmFuc2l0aW9uRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHRyYW5zaXRpb25PcmRlclRvU3RhdGU/LnRyYW5zaXRpb25FcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodHJhbnNpdGlvbk9yZGVyVG9TdGF0ZT8udHJhbnNpdGlvbkVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=