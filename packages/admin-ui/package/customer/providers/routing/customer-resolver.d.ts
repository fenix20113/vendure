import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { Customer } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class CustomerResolver extends BaseEntityResolver<Customer.Fragment> {
    constructor(router: Router, dataService: DataService);
}
