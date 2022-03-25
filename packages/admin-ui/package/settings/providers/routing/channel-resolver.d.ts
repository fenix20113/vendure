import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { Channel } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
/**
 * Resolves the id from the path into a Customer entity.
 */
export declare class ChannelResolver extends BaseEntityResolver<Channel.Fragment> {
    constructor(router: Router, dataService: DataService);
}
