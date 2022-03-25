import { Pipe } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
export class StateI18nTokenPipe {
    constructor() {
        this.stateI18nTokens = {
            Created: _('state.created'),
            AddingItems: _('state.adding-items'),
            ArrangingPayment: _('state.arranging-payment'),
            PaymentAuthorized: _('state.payment-authorized'),
            PaymentSettled: _('state.payment-settled'),
            PartiallyShipped: _('state.partially-shipped'),
            Shipped: _('state.shipped'),
            PartiallyDelivered: _('state.partially-delivered'),
            Authorized: _('state.authorized'),
            Delivered: _('state.delivered'),
            Cancelled: _('state.cancelled'),
            Pending: _('state.pending'),
            Settled: _('state.settled'),
            Failed: _('state.failed'),
            Error: _('state.error'),
            Declined: _('state.declined'),
            Modifying: _('state.modifying'),
            ArrangingAdditionalPayment: _('state.arranging-additional-payment'),
        };
    }
    transform(value) {
        if (typeof value === 'string' && value.length) {
            const defaultStateToken = this.stateI18nTokens[value];
            if (defaultStateToken) {
                return defaultStateToken;
            }
            return ('state.' +
                value
                    .replace(/([a-z])([A-Z])/g, '$1-$2')
                    .replace(/ +/g, '-')
                    .toLowerCase());
        }
        return value;
    }
}
StateI18nTokenPipe.decorators = [
    { type: Pipe, args: [{
                name: 'stateI18nToken',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtaTE4bi10b2tlbi5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvcGlwZXMvc3RhdGUtaTE4bi10b2tlbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFLdEUsTUFBTSxPQUFPLGtCQUFrQjtJQUgvQjtRQUlxQixvQkFBZSxHQUFHO1lBQy9CLE9BQU8sRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDO1lBQzNCLFdBQVcsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUM7WUFDcEMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QixDQUFDO1lBQzlDLGlCQUFpQixFQUFFLENBQUMsQ0FBQywwQkFBMEIsQ0FBQztZQUNoRCxjQUFjLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO1lBQzFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztZQUM5QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQztZQUMzQixrQkFBa0IsRUFBRSxDQUFDLENBQUMsMkJBQTJCLENBQUM7WUFDbEQsVUFBVSxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztZQUNqQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQy9CLFNBQVMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDL0IsT0FBTyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDM0IsT0FBTyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDM0IsTUFBTSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDekIsS0FBSyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDdkIsUUFBUSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM3QixTQUFTLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQy9CLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQztTQUN0RSxDQUFDO0lBZU4sQ0FBQztJQWRHLFNBQVMsQ0FBb0IsS0FBUTtRQUNqQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzNDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFZLENBQUMsQ0FBQztZQUM3RCxJQUFJLGlCQUFpQixFQUFFO2dCQUNuQixPQUFPLGlCQUFpQixDQUFDO2FBQzVCO1lBQ0QsT0FBTyxDQUFDLFFBQVE7Z0JBQ1osS0FBSztxQkFDQSxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDO3FCQUNuQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztxQkFDbkIsV0FBVyxFQUFFLENBQVEsQ0FBQztTQUNsQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7OztZQXJDSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGdCQUFnQjthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdzdGF0ZUkxOG5Ub2tlbicsXG59KVxuZXhwb3J0IGNsYXNzIFN0YXRlSTE4blRva2VuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc3RhdGVJMThuVG9rZW5zID0ge1xuICAgICAgICBDcmVhdGVkOiBfKCdzdGF0ZS5jcmVhdGVkJyksXG4gICAgICAgIEFkZGluZ0l0ZW1zOiBfKCdzdGF0ZS5hZGRpbmctaXRlbXMnKSxcbiAgICAgICAgQXJyYW5naW5nUGF5bWVudDogXygnc3RhdGUuYXJyYW5naW5nLXBheW1lbnQnKSxcbiAgICAgICAgUGF5bWVudEF1dGhvcml6ZWQ6IF8oJ3N0YXRlLnBheW1lbnQtYXV0aG9yaXplZCcpLFxuICAgICAgICBQYXltZW50U2V0dGxlZDogXygnc3RhdGUucGF5bWVudC1zZXR0bGVkJyksXG4gICAgICAgIFBhcnRpYWxseVNoaXBwZWQ6IF8oJ3N0YXRlLnBhcnRpYWxseS1zaGlwcGVkJyksXG4gICAgICAgIFNoaXBwZWQ6IF8oJ3N0YXRlLnNoaXBwZWQnKSxcbiAgICAgICAgUGFydGlhbGx5RGVsaXZlcmVkOiBfKCdzdGF0ZS5wYXJ0aWFsbHktZGVsaXZlcmVkJyksXG4gICAgICAgIEF1dGhvcml6ZWQ6IF8oJ3N0YXRlLmF1dGhvcml6ZWQnKSxcbiAgICAgICAgRGVsaXZlcmVkOiBfKCdzdGF0ZS5kZWxpdmVyZWQnKSxcbiAgICAgICAgQ2FuY2VsbGVkOiBfKCdzdGF0ZS5jYW5jZWxsZWQnKSxcbiAgICAgICAgUGVuZGluZzogXygnc3RhdGUucGVuZGluZycpLFxuICAgICAgICBTZXR0bGVkOiBfKCdzdGF0ZS5zZXR0bGVkJyksXG4gICAgICAgIEZhaWxlZDogXygnc3RhdGUuZmFpbGVkJyksXG4gICAgICAgIEVycm9yOiBfKCdzdGF0ZS5lcnJvcicpLFxuICAgICAgICBEZWNsaW5lZDogXygnc3RhdGUuZGVjbGluZWQnKSxcbiAgICAgICAgTW9kaWZ5aW5nOiBfKCdzdGF0ZS5tb2RpZnlpbmcnKSxcbiAgICAgICAgQXJyYW5naW5nQWRkaXRpb25hbFBheW1lbnQ6IF8oJ3N0YXRlLmFycmFuZ2luZy1hZGRpdGlvbmFsLXBheW1lbnQnKSxcbiAgICB9O1xuICAgIHRyYW5zZm9ybTxUIGV4dGVuZHMgdW5rbm93bj4odmFsdWU6IFQpOiBUIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0U3RhdGVUb2tlbiA9IHRoaXMuc3RhdGVJMThuVG9rZW5zW3ZhbHVlIGFzIGFueV07XG4gICAgICAgICAgICBpZiAoZGVmYXVsdFN0YXRlVG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFN0YXRlVG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKCdzdGF0ZS4nICtcbiAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyArL2csICctJylcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkpIGFzIGFueTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuIl19