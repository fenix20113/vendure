import { OnInit } from '@angular/core';
import { DataService, GetActiveAdministrator } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class WelcomeWidgetComponent implements OnInit {
    private dataService;
    version: string;
    administrator$: Observable<GetActiveAdministrator.ActiveAdministrator | null>;
    brand: string | undefined;
    hideVendureBranding: boolean | undefined;
    hideVersion: boolean | undefined;
    constructor(dataService: DataService);
    ngOnInit(): void;
}
export declare class WelcomeWidgetModule {
}
