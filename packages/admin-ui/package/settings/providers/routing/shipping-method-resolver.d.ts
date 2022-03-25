import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { ShippingMethod } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
/**
 * Resolves the id from the path into a Customer entity.
 */
export declare class ShippingMethodResolver extends BaseEntityResolver<ShippingMethod.Fragment> {
    constructor(router: Router, dataService: DataService);
}
