import { Router } from '@angular/router';
import { Asset, BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class AssetResolver extends BaseEntityResolver<Asset.Fragment> {
    constructor(router: Router, dataService: DataService);
}
