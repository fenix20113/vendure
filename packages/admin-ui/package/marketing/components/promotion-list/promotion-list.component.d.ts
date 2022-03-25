import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { GetPromotionList } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
export declare class PromotionListComponent extends BaseListComponent<GetPromotionList.Query, GetPromotionList.Items> {
    private dataService;
    private notificationService;
    private modalService;
    constructor(dataService: DataService, router: Router, route: ActivatedRoute, notificationService: NotificationService, modalService: ModalService);
    deletePromotion(promotionId: string): void;
}
