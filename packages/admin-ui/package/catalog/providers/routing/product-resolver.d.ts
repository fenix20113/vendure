import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { ProductWithVariants } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class ProductResolver extends BaseEntityResolver<ProductWithVariants.Fragment> {
    constructor(dataService: DataService, router: Router);
}
