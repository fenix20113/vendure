import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyCode } from '@vendure/admin-ui/core';
export class ShippingEligibilityTestResultComponent {
    constructor() {
        this.okToRun = false;
        this.testDataUpdated = false;
        this.runTest = new EventEmitter();
    }
}
ShippingEligibilityTestResultComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-shipping-eligibility-test-result',
                template: "<div class=\"test-result card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-result' | translate }}\n    </div>\n    <div class=\"card-block\" *ngFor=\"let quote of testResult\">\n        <div class=\"result-details\" [class.stale]=\"testDataUpdated\">\n            <vdr-labeled-data [label]=\"'settings.shipping-method' | translate\">\n                {{ quote.name }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data [label]=\"'common.price' | translate\">\n                    {{ quote.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data [label]=\"'common.price-with-tax' | translate\">\n                    {{ quote.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree *ngIf=\"quote.metadata\" [value]=\"quote.metadata\"></vdr-object-tree>\n        </div>\n    </div>\n    <div class=\"card-block\" *ngIf=\"testResult?.length === 0\">\n        <clr-icon shape=\"ban\" class=\"is-solid error\"></clr-icon>\n        {{ 'settings.no-eligible-shipping-methods' | translate }}\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-secondary\" (click)=\"runTest.emit()\" [disabled]=\"!okToRun\">\n            {{ 'settings.test-shipping-methods' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".result-details{transition:opacity .2s}.result-details.stale{opacity:.5}.price-row{display:flex}.price-row>:not(:first-child){margin-left:24px}clr-icon.error{color:var(--color-error-500)}"]
            },] }
];
ShippingEligibilityTestResultComponent.propDecorators = {
    testResult: [{ type: Input }],
    okToRun: [{ type: Input }],
    testDataUpdated: [{ type: Input }],
    currencyCode: [{ type: Input }],
    runTest: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmctZWxpZ2liaWxpdHktdGVzdC1yZXN1bHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy9zaGlwcGluZy1lbGlnaWJpbGl0eS10ZXN0LXJlc3VsdC9zaGlwcGluZy1lbGlnaWJpbGl0eS10ZXN0LXJlc3VsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUUsWUFBWSxFQUF1QixNQUFNLHdCQUF3QixDQUFDO0FBUTNFLE1BQU0sT0FBTyxzQ0FBc0M7SUFObkQ7UUFRYSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXZCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBQ2pELENBQUM7OztZQVpBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCx5NkNBQWdFO2dCQUVoRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozt5QkFFSSxLQUFLO3NCQUNMLEtBQUs7OEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ3VycmVuY3lDb2RlLCBTaGlwcGluZ01ldGhvZFF1b3RlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXNoaXBwaW5nLWVsaWdpYmlsaXR5LXRlc3QtcmVzdWx0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2hpcHBpbmctZWxpZ2liaWxpdHktdGVzdC1yZXN1bHQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NoaXBwaW5nLWVsaWdpYmlsaXR5LXRlc3QtcmVzdWx0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNoaXBwaW5nRWxpZ2liaWxpdHlUZXN0UmVzdWx0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSB0ZXN0UmVzdWx0OiBTaGlwcGluZ01ldGhvZFF1b3RlW107XG4gICAgQElucHV0KCkgb2tUb1J1biA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHRlc3REYXRhVXBkYXRlZCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGN1cnJlbmN5Q29kZTogQ3VycmVuY3lDb2RlO1xuICAgIEBPdXRwdXQoKSBydW5UZXN0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xufVxuIl19