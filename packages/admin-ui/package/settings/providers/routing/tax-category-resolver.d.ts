import { Router } from '@angular/router';
import { BaseEntityResolver, DataService, TaxCategory } from '@vendure/admin-ui/core';
/**
 * Resolves the id from the path into a Customer entity.
 */
export declare class TaxCategoryResolver extends BaseEntityResolver<TaxCategory.Fragment> {
    constructor(router: Router, dataService: DataService);
}
