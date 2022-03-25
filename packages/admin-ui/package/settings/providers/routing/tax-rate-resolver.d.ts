import { Router } from '@angular/router';
import { BaseEntityResolver, DataService, TaxRate } from '@vendure/admin-ui/core';
/**
 * Resolves the id from the path into a Customer entity.
 */
export declare class TaxRateResolver extends BaseEntityResolver<TaxRate.Fragment> {
    constructor(router: Router, dataService: DataService);
}
