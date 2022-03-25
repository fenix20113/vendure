import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { Collection } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class CollectionResolver extends BaseEntityResolver<Collection.Fragment> {
    constructor(router: Router, dataService: DataService);
}
