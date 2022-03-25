import { EventEmitter } from '@angular/core';
import { CurrencyCode, TestShippingMethodResult } from '@vendure/admin-ui/core';
export declare class ShippingMethodTestResultComponent {
    testResult: TestShippingMethodResult;
    okToRun: boolean;
    testDataUpdated: boolean;
    currencyCode: CurrencyCode;
    runTest: EventEmitter<void>;
}
