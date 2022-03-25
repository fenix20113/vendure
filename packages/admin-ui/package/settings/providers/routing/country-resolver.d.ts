import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { Country } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
/**
 * Resolves the id from the path into a Customer entity.
 */
export declare class CountryResolver extends BaseEntityResolver<Country.Fragment> {
    constructor(router: Router, dataService: DataService);
}
