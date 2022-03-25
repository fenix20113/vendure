import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { Administrator } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class ProfileResolver extends BaseEntityResolver<Administrator.Fragment> {
    constructor(router: Router, dataService: DataService);
}
