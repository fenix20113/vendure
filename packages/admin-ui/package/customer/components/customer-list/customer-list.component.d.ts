import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, GetCustomerList, ModalService, NotificationService } from '@vendure/admin-ui/core';
export declare class CustomerListComponent extends BaseListComponent<GetCustomerList.Query, GetCustomerList.Items> implements OnInit {
    private dataService;
    private modalService;
    private notificationService;
    emailSearchTerm: FormControl;
    lastNameSearchTerm: FormControl;
    constructor(dataService: DataService, router: Router, route: ActivatedRoute, modalService: ModalService, notificationService: NotificationService);
    ngOnInit(): void;
    deleteCustomer(customer: GetCustomerList.Items): import("rxjs").Subscription;
}
