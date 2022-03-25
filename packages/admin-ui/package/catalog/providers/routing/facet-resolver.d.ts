import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { FacetWithValues } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class FacetResolver extends BaseEntityResolver<FacetWithValues.Fragment> {
    constructor(router: Router, dataService: DataService);
}
