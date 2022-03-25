import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Dialog, GetCustomerGroups, GetCustomerList } from '@vendure/admin-ui/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerGroupMemberFetchParams } from '../customer-group-member-list/customer-group-member-list.component';
export declare class AddCustomerToGroupDialogComponent implements Dialog<string[]>, OnInit {
    private dataService;
    resolveWith: (result?: string[]) => void;
    group: GetCustomerGroups.Items;
    route: ActivatedRoute;
    selectedCustomerIds: string[];
    customers$: Observable<GetCustomerList.Items[]>;
    customersTotal$: Observable<number>;
    fetchGroupMembers$: BehaviorSubject<CustomerGroupMemberFetchParams>;
    constructor(dataService: DataService);
    ngOnInit(): void;
    cancel(): void;
    add(): void;
}
