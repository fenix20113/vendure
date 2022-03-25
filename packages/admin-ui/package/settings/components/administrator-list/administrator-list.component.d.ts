import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, GetAdministrators, ModalService, NotificationService } from '@vendure/admin-ui/core';
export declare class AdministratorListComponent extends BaseListComponent<GetAdministrators.Query, GetAdministrators.Items> {
    private dataService;
    private modalService;
    private notificationService;
    constructor(dataService: DataService, router: Router, route: ActivatedRoute, modalService: ModalService, notificationService: NotificationService);
    deleteAdministrator(administrator: GetAdministrators.Items): import("rxjs").Subscription;
}
