import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { GetProductVariantOptions } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class ProductVariantsResolver extends BaseEntityResolver<GetProductVariantOptions.Product> {
    constructor(router: Router, dataService: DataService);
}
