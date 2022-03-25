import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { GetTaxRateList } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
export declare class TaxRateListComponent extends BaseListComponent<GetTaxRateList.Query, GetTaxRateList.Items> {
    private modalService;
    private notificationService;
    private dataService;
    constructor(modalService: ModalService, notificationService: NotificationService, dataService: DataService, router: Router, route: ActivatedRoute);
    deleteTaxRate(taxRate: GetTaxRateList.Items): import("rxjs").Subscription;
}
