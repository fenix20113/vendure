import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { DataService, LocalStorageService, } from '@vendure/admin-ui/core';
export class TestOrderBuilderComponent {
    constructor(dataService, localStorageService) {
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.orderLinesChange = new EventEmitter();
        this.lines = [];
    }
    get subTotal() {
        return this.lines.reduce((sum, l) => sum + l.unitPriceWithTax * l.quantity, 0);
    }
    ngOnInit() {
        this.lines = this.loadFromLocalStorage();
        if (this.lines) {
            this.orderLinesChange.emit(this.lines);
        }
        this.dataService.settings.getActiveChannel('cache-first').single$.subscribe(result => {
            this.currencyCode = result.activeChannel.currencyCode;
        });
    }
    selectResult(result) {
        if (result) {
            this.addToLines(result);
        }
    }
    addToLines(result) {
        var _a, _b;
        if (!this.lines.find(l => l.id === result.productVariantId)) {
            this.lines.push({
                id: result.productVariantId,
                name: result.productVariantName,
                preview: (_b = (_a = result.productAsset) === null || _a === void 0 ? void 0 : _a.preview) !== null && _b !== void 0 ? _b : '',
                quantity: 1,
                sku: result.sku,
                unitPriceWithTax: (result.priceWithTax.__typename === 'SinglePrice' && result.priceWithTax.value) || 0,
            });
            this.persistToLocalStorage();
            this.orderLinesChange.emit(this.lines);
        }
    }
    updateQuantity() {
        this.persistToLocalStorage();
        this.orderLinesChange.emit(this.lines);
    }
    removeLine(line) {
        this.lines = this.lines.filter(l => l.id !== line.id);
        this.persistToLocalStorage();
        this.orderLinesChange.emit(this.lines);
    }
    persistToLocalStorage() {
        this.localStorageService.setForCurrentLocation('shippingTestOrder', this.lines);
    }
    loadFromLocalStorage() {
        return this.localStorageService.getForCurrentLocation('shippingTestOrder') || [];
    }
}
TestOrderBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-test-order-builder',
                template: "<div class=\"card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-order' | translate }}\n    </div>\n    <table class=\"order-table table\" *ngIf=\"lines.length; else emptyPlaceholder\">\n        <thead>\n            <tr>\n                <th></th>\n                <th>{{ 'order.product-name' | translate }}</th>\n                <th>{{ 'order.product-sku' | translate }}</th>\n                <th>{{ 'order.unit-price' | translate }}</th>\n                <th>{{ 'order.quantity' | translate }}</th>\n                <th>{{ 'order.total' | translate }}</th>\n            </tr>\n        </thead>\n        <tr *ngFor=\"let line of lines\" class=\"order-line\">\n            <td class=\"align-middle thumb\">\n                <img [src]=\"line.preview + '?preset=tiny'\" />\n            </td>\n            <td class=\"align-middle name\">{{ line.name }}</td>\n            <td class=\"align-middle sku\">{{ line.sku }}</td>\n            <td class=\"align-middle unit-price\">\n                {{ line.unitPriceWithTax | localeCurrency: currencyCode }}\n            </td>\n            <td class=\"align-middle quantity\">\n                <input\n                    [(ngModel)]=\"line.quantity\"\n                    (change)=\"updateQuantity()\"\n                    type=\"number\"\n                    max=\"9999\"\n                    min=\"1\"\n                />\n                <button class=\"icon-button\" (click)=\"removeLine(line)\">\n                    <clr-icon shape=\"trash\"></clr-icon>\n                </button>\n            </td>\n            <td class=\"align-middle total\">\n                {{ (line.unitPriceWithTax * line.quantity) | localeCurrency: currencyCode }}\n            </td>\n        </tr>\n        <tr class=\"sub-total\">\n            <td class=\"left\">{{ 'order.sub-total' | translate }}</td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td>{{ subTotal | localeCurrency: currencyCode }}</td>\n        </tr>\n    </table>\n\n    <ng-template #emptyPlaceholder>\n        <div class=\"card-block empty-placeholder\">\n            <div class=\"empty-text\">{{ 'settings.add-products-to-test-order' | translate }}</div>\n            <clr-icon shape=\"arrow\" dir=\"down\" size=\"96\"></clr-icon>\n        </div>\n    </ng-template>\n    <div class=\"card-block\">\n        <vdr-product-selector (productSelected)=\"selectResult($event)\"> </vdr-product-selector>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".empty-placeholder{color:var(--color-grey-400);text-align:center}.empty-text{font-size:22px}"]
            },] }
];
TestOrderBuilderComponent.ctorParameters = () => [
    { type: DataService },
    { type: LocalStorageService }
];
TestOrderBuilderComponent.propDecorators = {
    orderLinesChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1vcmRlci1idWlsZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvdGVzdC1vcmRlci1idWlsZGVyL3Rlc3Qtb3JkZXItYnVpbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFFSCxXQUFXLEVBQ1gsbUJBQW1CLEdBRXRCLE1BQU0sd0JBQXdCLENBQUM7QUFpQmhDLE1BQU0sT0FBTyx5QkFBeUI7SUFRbEMsWUFBb0IsV0FBd0IsRUFBVSxtQkFBd0M7UUFBMUUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBUHBGLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ2pFLFVBQUssR0FBb0IsRUFBRSxDQUFDO0lBTXFFLENBQUM7SUFKbEcsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBSUQsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pGLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQW1DO1FBQzVDLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFTyxVQUFVLENBQUMsTUFBbUM7O1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1osRUFBRSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7Z0JBQzNCLElBQUksRUFBRSxNQUFNLENBQUMsa0JBQWtCO2dCQUMvQixPQUFPLGNBQUUsTUFBTSxDQUFDLFlBQVksMENBQUUsT0FBTyxtQ0FBSSxFQUFFO2dCQUMzQyxRQUFRLEVBQUUsQ0FBQztnQkFDWCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7Z0JBQ2YsZ0JBQWdCLEVBQ1osQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsS0FBSyxhQUFhLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzNGLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQUVELGNBQWM7UUFDVixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQW1CO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU8scUJBQXFCO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyRixDQUFDOzs7WUFqRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHk4RUFBa0Q7Z0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBbkJHLFdBQVc7WUFDWCxtQkFBbUI7OzsrQkFvQmxCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEN1cnJlbmN5Q29kZSxcbiAgICBEYXRhU2VydmljZSxcbiAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgIFByb2R1Y3RTZWxlY3RvclNlYXJjaCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVzdE9yZGVyTGluZSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcHJldmlldzogc3RyaW5nO1xuICAgIHNrdTogc3RyaW5nO1xuICAgIHVuaXRQcmljZVdpdGhUYXg6IG51bWJlcjtcbiAgICBxdWFudGl0eTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci10ZXN0LW9yZGVyLWJ1aWxkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZXN0LW9yZGVyLWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rlc3Qtb3JkZXItYnVpbGRlci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUZXN0T3JkZXJCdWlsZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAT3V0cHV0KCkgb3JkZXJMaW5lc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VGVzdE9yZGVyTGluZVtdPigpO1xuICAgIGxpbmVzOiBUZXN0T3JkZXJMaW5lW10gPSBbXTtcbiAgICBjdXJyZW5jeUNvZGU6IEN1cnJlbmN5Q29kZTtcbiAgICBnZXQgc3ViVG90YWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGluZXMucmVkdWNlKChzdW0sIGwpID0+IHN1bSArIGwudW5pdFByaWNlV2l0aFRheCAqIGwucXVhbnRpdHksIDApO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5saW5lcyA9IHRoaXMubG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgaWYgKHRoaXMubGluZXMpIHtcbiAgICAgICAgICAgIHRoaXMub3JkZXJMaW5lc0NoYW5nZS5lbWl0KHRoaXMubGluZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3MuZ2V0QWN0aXZlQ2hhbm5lbCgnY2FjaGUtZmlyc3QnKS5zaW5nbGUkLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW5jeUNvZGUgPSByZXN1bHQuYWN0aXZlQ2hhbm5lbC5jdXJyZW5jeUNvZGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdFJlc3VsdChyZXN1bHQ6IFByb2R1Y3RTZWxlY3RvclNlYXJjaC5JdGVtcykge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvTGluZXMocmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9MaW5lcyhyZXN1bHQ6IFByb2R1Y3RTZWxlY3RvclNlYXJjaC5JdGVtcykge1xuICAgICAgICBpZiAoIXRoaXMubGluZXMuZmluZChsID0+IGwuaWQgPT09IHJlc3VsdC5wcm9kdWN0VmFyaWFudElkKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogcmVzdWx0LnByb2R1Y3RWYXJpYW50SWQsXG4gICAgICAgICAgICAgICAgbmFtZTogcmVzdWx0LnByb2R1Y3RWYXJpYW50TmFtZSxcbiAgICAgICAgICAgICAgICBwcmV2aWV3OiByZXN1bHQucHJvZHVjdEFzc2V0Py5wcmV2aWV3ID8/ICcnLFxuICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxuICAgICAgICAgICAgICAgIHNrdTogcmVzdWx0LnNrdSxcbiAgICAgICAgICAgICAgICB1bml0UHJpY2VXaXRoVGF4OlxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0LnByaWNlV2l0aFRheC5fX3R5cGVuYW1lID09PSAnU2luZ2xlUHJpY2UnICYmIHJlc3VsdC5wcmljZVdpdGhUYXgudmFsdWUpIHx8IDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGVyc2lzdFRvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgICAgICB0aGlzLm9yZGVyTGluZXNDaGFuZ2UuZW1pdCh0aGlzLmxpbmVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVF1YW50aXR5KCkge1xuICAgICAgICB0aGlzLnBlcnNpc3RUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLm9yZGVyTGluZXNDaGFuZ2UuZW1pdCh0aGlzLmxpbmVzKTtcbiAgICB9XG5cbiAgICByZW1vdmVMaW5lKGxpbmU6IFRlc3RPcmRlckxpbmUpIHtcbiAgICAgICAgdGhpcy5saW5lcyA9IHRoaXMubGluZXMuZmlsdGVyKGwgPT4gbC5pZCAhPT0gbGluZS5pZCk7XG4gICAgICAgIHRoaXMucGVyc2lzdFRvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMub3JkZXJMaW5lc0NoYW5nZS5lbWl0KHRoaXMubGluZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGVyc2lzdFRvTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0Rm9yQ3VycmVudExvY2F0aW9uKCdzaGlwcGluZ1Rlc3RPcmRlcicsIHRoaXMubGluZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTogVGVzdE9yZGVyTGluZVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXRGb3JDdXJyZW50TG9jYXRpb24oJ3NoaXBwaW5nVGVzdE9yZGVyJykgfHwgW107XG4gICAgfVxufVxuIl19