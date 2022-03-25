import { Router } from '@angular/router';
import { BaseEntityResolver, DataService, Promotion } from '@vendure/admin-ui/core';
/**
 * Resolves the id from the path into a Customer entity.
 */
export declare class PromotionResolver extends BaseEntityResolver<Promotion.Fragment> {
    constructor(router: Router, dataService: DataService);
}
