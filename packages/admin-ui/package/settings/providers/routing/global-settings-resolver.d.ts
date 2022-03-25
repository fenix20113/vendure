import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { GetGlobalSettings } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
/**
 * Resolves the global settings.
 */
export declare class GlobalSettingsResolver extends BaseEntityResolver<GetGlobalSettings.GlobalSettings> {
    constructor(router: Router, dataService: DataService);
}
