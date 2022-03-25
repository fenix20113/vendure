import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { Role } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class RoleResolver extends BaseEntityResolver<Role.Fragment> {
    constructor(router: Router, dataService: DataService);
}
