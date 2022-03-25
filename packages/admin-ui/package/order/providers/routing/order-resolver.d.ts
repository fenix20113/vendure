import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { OrderDetail } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
/**
 * Resolves the id from the path into a Customer entity.
 */
export declare class OrderResolver extends BaseEntityResolver<OrderDetail.Fragment> {
    constructor(router: Router, dataService: DataService);
}
