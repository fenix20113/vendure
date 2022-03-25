import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, GetCustomerGroups, GetCustomerGroupWithCustomers, GetZones, ModalService, NotificationService } from '@vendure/admin-ui/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerGroupMemberFetchParams } from '../customer-group-member-list/customer-group-member-list.component';
export declare class CustomerGroupListComponent implements OnInit {
    private dataService;
    private notificationService;
    private modalService;
    route: ActivatedRoute;
    private router;
    activeGroup$: Observable<GetCustomerGroups.Items | undefined>;
    groups$: Observable<GetCustomerGroups.Items[]>;
    listIsEmpty$: Observable<boolean>;
    members$: Observable<GetCustomerGroupWithCustomers.Items[]>;
    membersTotal$: Observable<number>;
    selectedCustomerIds: string[];
    fetchGroupMembers$: BehaviorSubject<CustomerGroupMemberFetchParams>;
    private refreshActiveGroupMembers$;
    constructor(dataService: DataService, notificationService: NotificationService, modalService: ModalService, route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    create(): void;
    delete(groupId: string): void;
    update(group: GetCustomerGroups.Items): void;
    closeMembers(): void;
    addToGroup(group: GetCustomerGroupWithCustomers.CustomerGroup): void;
    removeFromGroup(group: GetZones.Zones, customerIds: string[]): void;
}
