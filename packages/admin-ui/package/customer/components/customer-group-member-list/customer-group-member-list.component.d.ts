import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, DataService } from '@vendure/admin-ui/core';
import { ZoneMember } from '@vendure/admin-ui/settings';
import { Observable } from 'rxjs';
export interface CustomerGroupMemberFetchParams {
    skip: number;
    take: number;
    filterTerm: string;
}
export declare class CustomerGroupMemberListComponent implements OnInit, OnDestroy {
    private router;
    private dataService;
    members: Array<Pick<Customer, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'firstName' | 'lastName' | 'emailAddress'>>;
    totalItems: number;
    route: ActivatedRoute;
    selectedMemberIds: string[];
    selectionChange: EventEmitter<string[]>;
    fetchParamsChange: EventEmitter<CustomerGroupMemberFetchParams>;
    membersItemsPerPage$: Observable<number>;
    membersCurrentPage$: Observable<number>;
    filterTermControl: FormControl;
    private refresh$;
    private destroy$;
    constructor(router: Router, dataService: DataService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setContentsPageNumber(page: number): void;
    setContentsItemsPerPage(perPage: number): void;
    refresh(): void;
    private setParam;
    areAllSelected(): boolean;
    toggleSelectAll(): void;
    toggleSelectMember(member: ZoneMember): void;
    isMemberSelected: (member: ZoneMember) => boolean;
}
