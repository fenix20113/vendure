import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { I18nService } from '@vendure/admin-ui/core';
export class CancelOrderDialogComponent {
    constructor(i18nService) {
        this.i18nService = i18nService;
        this.lineQuantities = {};
        this.reasons = [_('order.cancel-reason-customer-request'), _('order.cancel-reason-not-available')];
        this.reasons = this.reasons.map(r => this.i18nService.translate(r));
    }
    get selectionCount() {
        return Object.values(this.lineQuantities).reduce((sum, n) => sum + n, 0);
    }
    ngOnInit() {
        this.lineQuantities = this.order.lines.reduce((result, line) => {
            return Object.assign(Object.assign({}, result), { [line.id]: 0 });
        }, {});
    }
    select() {
        this.resolveWith({
            orderId: this.order.id,
            lines: this.getLineInputs(),
            reason: this.reason,
        });
    }
    cancel() {
        this.resolveWith();
    }
    getLineInputs() {
        if (this.order.active) {
            return;
        }
        return Object.entries(this.lineQuantities)
            .map(([orderLineId, quantity]) => ({
            orderLineId,
            quantity,
        }))
            .filter(l => 0 < l.quantity);
    }
}
CancelOrderDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-cancel-order-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.cancel-order' | translate }}</ng-template>\n\n<div class=\"fulfillment-wrapper\">\n    <div class=\"order-lines\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'order.product-name' | translate }}</th>\n                    <th>{{ 'order.product-sku' | translate }}</th>\n                    <th>{{ 'order.quantity' | translate }}</th>\n                    <th>{{ 'order.unit-price' | translate }}</th>\n                    <th>{{ 'order.cancel' | translate }}</th>\n                </tr>\n            </thead>\n            <tr\n                *ngFor=\"let line of order.lines\"\n                class=\"order-line\"\n                [class.is-cancelled]=\"line.quantity === 0\"\n            >\n                <td class=\"align-middle thumb\">\n                    <img [src]=\"line.featuredAsset | assetPreview:'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle quantity\">{{ line.quantity }}</td>\n                <td class=\"align-middle quantity\">\n                    {{ line.unitPriceWithTax | localeCurrency: order.currencyCode }}\n                </td>\n                <td class=\"align-middle fulfil\">\n                    <input\n                        *ngIf=\"line.quantity > 0 && !order.active; else nonEditable\"\n                        [(ngModel)]=\"lineQuantities[line.id]\"\n                        type=\"number\"\n                        [max]=\"line.quantity\"\n                        min=\"0\"\n                    />\n                    <ng-template #nonEditable>{{ line.quantity }}</ng-template>\n                </td>\n            </tr>\n        </table>\n    </div>\n    <div class=\"cancellation-details\">\n        <label class=\"clr-control-label\">{{ 'order.cancellation-reason' | translate }}</label>\n        <ng-select\n            [items]=\"reasons\"\n            bindLabel=\"name\"\n            autofocus\n            bindValue=\"id\"\n            [addTag]=\"true\"\n            [(ngModel)]=\"reason\"\n        ></ng-select>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"!reason || (!order.active && selectionCount === 0)\"\n        class=\"btn btn-primary\"\n    >\n        <ng-container *ngIf=\"!order.active\">\n            {{ 'order.cancel-selected-items' | translate }}\n        </ng-container>\n        <ng-container *ngIf=\"order.active\">\n            {{ 'order.cancel-order' | translate }}\n        </ng-container>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:flex;min-height:64vh}.fulfillment-wrapper{flex:1}@media screen and (min-width:768px){.fulfillment-wrapper{display:flex;flex-direction:row}}@media screen and (min-width:768px){.fulfillment-wrapper .cancellation-details{margin-top:0;margin-left:24px;width:250px}}.fulfillment-wrapper .order-lines{flex:1;overflow-y:auto}.fulfillment-wrapper .order-lines table{margin-top:0}.fulfillment-wrapper tr.ignore{color:var(--color-grey-300)}.fulfillment-wrapper .is-cancelled td{text-decoration:line-through;background-color:var(--color-component-bg-200)}"]
            },] }
];
CancelOrderDialogComponent.ctorParameters = () => [
    { type: I18nService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLW9yZGVyLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL2NhbmNlbC1vcmRlci1kaWFsb2cvY2FuY2VsLW9yZGVyLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBNEIsV0FBVyxFQUF1QyxNQUFNLHdCQUF3QixDQUFDO0FBUXBILE1BQU0sT0FBTywwQkFBMEI7SUFXbkMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFQNUMsbUJBQWMsR0FBaUMsRUFBRSxDQUFDO1FBQ2xELFlBQU8sR0FBYSxDQUFDLENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUM7UUFPcEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQU5ELElBQUksY0FBYztRQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBTUQsUUFBUTtRQUNKLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzNELHVDQUFZLE1BQU0sS0FBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUc7UUFDdkMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2IsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFDRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMvQixXQUFXO1lBQ1gsUUFBUTtTQUNYLENBQUMsQ0FBQzthQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7O1lBakRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyx1M0ZBQW1EO2dCQUVuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVBrQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBDYW5jZWxPcmRlcklucHV0LCBEaWFsb2csIEkxOG5TZXJ2aWNlLCBPcmRlckRldGFpbEZyYWdtZW50LCBPcmRlckxpbmVJbnB1dCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jYW5jZWwtb3JkZXItZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FuY2VsLW9yZGVyLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FuY2VsLW9yZGVyLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDYW5jZWxPcmRlckRpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRGlhbG9nPENhbmNlbE9yZGVySW5wdXQ+IHtcbiAgICBvcmRlcjogT3JkZXJEZXRhaWxGcmFnbWVudDtcbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdD86IENhbmNlbE9yZGVySW5wdXQpID0+IHZvaWQ7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgbGluZVF1YW50aXRpZXM6IHsgW2xpbmVJZDogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcbiAgICByZWFzb25zOiBzdHJpbmdbXSA9IFtfKCdvcmRlci5jYW5jZWwtcmVhc29uLWN1c3RvbWVyLXJlcXVlc3QnKSwgXygnb3JkZXIuY2FuY2VsLXJlYXNvbi1ub3QtYXZhaWxhYmxlJyldO1xuXG4gICAgZ2V0IHNlbGVjdGlvbkNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMubGluZVF1YW50aXRpZXMpLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyBuLCAwKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGkxOG5TZXJ2aWNlOiBJMThuU2VydmljZSkge1xuICAgICAgICB0aGlzLnJlYXNvbnMgPSB0aGlzLnJlYXNvbnMubWFwKHIgPT4gdGhpcy5pMThuU2VydmljZS50cmFuc2xhdGUocikpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxpbmVRdWFudGl0aWVzID0gdGhpcy5vcmRlci5saW5lcy5yZWR1Y2UoKHJlc3VsdCwgbGluZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBbbGluZS5pZF06IDAgfTtcbiAgICAgICAgfSwge30pO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh7XG4gICAgICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVyLmlkLFxuICAgICAgICAgICAgbGluZXM6IHRoaXMuZ2V0TGluZUlucHV0cygpLFxuICAgICAgICAgICAgcmVhc29uOiB0aGlzLnJlYXNvbixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMaW5lSW5wdXRzKCk6IE9yZGVyTGluZUlucHV0W10gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5hY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5saW5lUXVhbnRpdGllcylcbiAgICAgICAgICAgIC5tYXAoKFtvcmRlckxpbmVJZCwgcXVhbnRpdHldKSA9PiAoe1xuICAgICAgICAgICAgICAgIG9yZGVyTGluZUlkLFxuICAgICAgICAgICAgICAgIHF1YW50aXR5LFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAuZmlsdGVyKGwgPT4gMCA8IGwucXVhbnRpdHkpO1xuICAgIH1cbn1cbiJdfQ==