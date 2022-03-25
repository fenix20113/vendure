import { EventEmitter } from '@angular/core';
import { CurrencyCode, ShippingMethodQuote } from '@vendure/admin-ui/core';
export declare class ShippingEligibilityTestResultComponent {
    testResult: ShippingMethodQuote[];
    okToRun: boolean;
    testDataUpdated: boolean;
    currencyCode: CurrencyCode;
    runTest: EventEmitter<void>;
}
