import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, GetPaymentMethodList, ModalService, NotificationService } from '@vendure/admin-ui/core';
export declare class PaymentMethodListComponent extends BaseListComponent<GetPaymentMethodList.Query, GetPaymentMethodList.Items> {
    private dataService;
    private modalService;
    private notificationService;
    constructor(dataService: DataService, router: Router, route: ActivatedRoute, modalService: ModalService, notificationService: NotificationService);
    deletePaymentMethod(paymentMethodId: string): void;
    private showModalAndDelete;
}
