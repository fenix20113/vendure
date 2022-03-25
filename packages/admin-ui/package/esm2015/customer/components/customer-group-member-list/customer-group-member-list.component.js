import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap } from 'rxjs/operators';
export class CustomerGroupMemberListComponent {
    constructor(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.selectedMemberIds = [];
        this.selectionChange = new EventEmitter();
        this.fetchParamsChange = new EventEmitter();
        this.filterTermControl = new FormControl('');
        this.refresh$ = new BehaviorSubject(true);
        this.destroy$ = new Subject();
        this.isMemberSelected = (member) => {
            return -1 < this.selectedMemberIds.indexOf(member.id);
        };
    }
    ngOnInit() {
        this.membersCurrentPage$ = this.route.paramMap.pipe(map((qpm) => qpm.get('membersPage')), map((page) => (!page ? 1 : +page)), startWith(1), distinctUntilChanged());
        this.membersItemsPerPage$ = this.route.paramMap.pipe(map((qpm) => qpm.get('membersPerPage')), map((perPage) => (!perPage ? 10 : +perPage)), startWith(10), distinctUntilChanged());
        const filterTerm$ = this.filterTermControl.valueChanges.pipe(debounceTime(250), tap(() => this.setContentsPageNumber(1)), startWith(''));
        combineLatest(this.membersCurrentPage$, this.membersItemsPerPage$, filterTerm$, this.refresh$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(([currentPage, itemsPerPage, filterTerm]) => {
            const take = itemsPerPage;
            const skip = (currentPage - 1) * itemsPerPage;
            this.fetchParamsChange.emit({
                filterTerm,
                skip,
                take,
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setContentsPageNumber(page) {
        this.setParam('membersPage', page);
    }
    setContentsItemsPerPage(perPage) {
        this.setParam('membersPerPage', perPage);
    }
    refresh() {
        this.refresh$.next(true);
    }
    setParam(key, value) {
        this.router.navigate(['./', Object.assign(Object.assign({}, this.route.snapshot.params), { [key]: value })], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
    areAllSelected() {
        if (this.members) {
            return this.selectedMemberIds.length === this.members.length;
        }
        else {
            return false;
        }
    }
    toggleSelectAll() {
        if (this.areAllSelected()) {
            this.selectionChange.emit([]);
        }
        else {
            this.selectionChange.emit(this.members.map((v) => v.id));
        }
    }
    toggleSelectMember(member) {
        if (this.selectedMemberIds.includes(member.id)) {
            this.selectionChange.emit(this.selectedMemberIds.filter((id) => id !== member.id));
        }
        else {
            this.selectionChange.emit([...this.selectedMemberIds, member.id]);
        }
    }
}
CustomerGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-member-list',
                template: "<input\n    type=\"text\"\n    name=\"searchTerm\"\n    [formControl]=\"filterTermControl\"\n    [placeholder]=\"'customer.search-customers-by-email' | translate\"\n    class=\"search-input\"\n/>\n\n<vdr-data-table\n    [items]=\"members\"\n    [itemsPerPage]=\"membersItemsPerPage$ | async\"\n    [totalItems]=\"totalItems\"\n    [currentPage]=\"membersCurrentPage$ | async\"\n    (pageChange)=\"setContentsPageNumber($event)\"\n    (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n    [allSelected]=\"areAllSelected()\"\n    [isRowSelectedFn]=\"('UpdateCustomerGroup' | hasPermission) && isMemberSelected\"\n    (rowSelectChange)=\"toggleSelectMember($event)\"\n    (allSelectChange)=\"toggleSelectAll()\"\n>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-customer=\"item\">\n        <td class=\"left align-middle\">\n            {{ customer.title }} {{ customer.firstName }} {{ customer.lastName }}\n        </td>\n        <td class=\"left align-middle\">{{ customer.emailAddress }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['/customer', 'customers', customer.id]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CustomerGroupMemberListComponent.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
CustomerGroupMemberListComponent.propDecorators = {
    members: [{ type: Input }],
    totalItems: [{ type: Input }],
    route: [{ type: Input }],
    selectedMemberIds: [{ type: Input }],
    selectionChange: [{ type: Output }],
    fetchParamsChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jdXN0b21lci9zcmMvY29tcG9uZW50cy9jdXN0b21lci1ncm91cC1tZW1iZXItbGlzdC9jdXN0b21lci1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFZLFdBQVcsRUFBaUMsTUFBTSx3QkFBd0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWNwRyxNQUFNLE9BQU8sZ0NBQWdDO0lBZ0J6QyxZQUFvQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVjNELHNCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFJakYsc0JBQWlCLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO1FBQzlDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBc0Z2QyxxQkFBZ0IsR0FBRyxDQUFDLE1BQWtCLEVBQVcsRUFBRTtZQUMvQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQztJQXRGcUUsQ0FBQztJQUV4RSxRQUFRO1FBQ0osSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDL0MsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQ3BDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ2xDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDWixvQkFBb0IsRUFBRSxDQUN6QixDQUFDO1FBRUYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEQsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFDdkMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFDNUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUNiLG9CQUFvQixFQUFFLENBQ3pCLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDeEQsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3hDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FDaEIsQ0FBQztRQUVGLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3pGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFO1lBQ25ELE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQztZQUMxQixNQUFNLElBQUksR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDeEIsVUFBVTtnQkFDVixJQUFJO2dCQUNKLElBQUk7YUFDUCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxJQUFZO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxPQUFlO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sUUFBUSxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxrQ0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUcsRUFBRTtZQUMxRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDdEIsbUJBQW1CLEVBQUUsT0FBTztTQUMvQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNoRTthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBa0I7UUFDakMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEY7YUFBTTtZQUNILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckU7SUFDTCxDQUFDOzs7WUF4R0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLHFnREFBMEQ7Z0JBRTFELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBakJ3QixNQUFNO1lBQ1osV0FBVzs7O3NCQWtCekIsS0FBSzt5QkFHTCxLQUFLO29CQUNMLEtBQUs7Z0NBQ0wsS0FBSzs4QkFDTCxNQUFNO2dDQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEN1c3RvbWVyLCBEYXRhU2VydmljZSwgR2V0Q3VzdG9tZXJHcm91cFdpdGhDdXN0b21lcnMgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IFpvbmVNZW1iZXIgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9zZXR0aW5ncyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRoLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21lckdyb3VwTWVtYmVyRmV0Y2hQYXJhbXMge1xuICAgIHNraXA6IG51bWJlcjtcbiAgICB0YWtlOiBudW1iZXI7XG4gICAgZmlsdGVyVGVybTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jdXN0b21lci1ncm91cC1tZW1iZXItbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jdXN0b21lci1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lckdyb3VwTWVtYmVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBtZW1iZXJzOiBBcnJheTxcbiAgICAgICAgUGljazxDdXN0b21lciwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3VwZGF0ZWRBdCcgfCAndGl0bGUnIHwgJ2ZpcnN0TmFtZScgfCAnbGFzdE5hbWUnIHwgJ2VtYWlsQWRkcmVzcyc+XG4gICAgPjtcbiAgICBASW5wdXQoKSB0b3RhbEl0ZW1zOiBudW1iZXI7XG4gICAgQElucHV0KCkgcm91dGU6IEFjdGl2YXRlZFJvdXRlO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkTWVtYmVySWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuICAgIEBPdXRwdXQoKSBmZXRjaFBhcmFtc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q3VzdG9tZXJHcm91cE1lbWJlckZldGNoUGFyYW1zPigpO1xuXG4gICAgbWVtYmVyc0l0ZW1zUGVyUGFnZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgICBtZW1iZXJzQ3VycmVudFBhZ2UkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgZmlsdGVyVGVybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIHByaXZhdGUgcmVmcmVzaCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZW1iZXJzQ3VycmVudFBhZ2UkID0gdGhpcy5yb3V0ZS5wYXJhbU1hcC5waXBlKFxuICAgICAgICAgICAgbWFwKChxcG0pID0+IHFwbS5nZXQoJ21lbWJlcnNQYWdlJykpLFxuICAgICAgICAgICAgbWFwKChwYWdlKSA9PiAoIXBhZ2UgPyAxIDogK3BhZ2UpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgxKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5tZW1iZXJzSXRlbXNQZXJQYWdlJCA9IHRoaXMucm91dGUucGFyYW1NYXAucGlwZShcbiAgICAgICAgICAgIG1hcCgocXBtKSA9PiBxcG0uZ2V0KCdtZW1iZXJzUGVyUGFnZScpKSxcbiAgICAgICAgICAgIG1hcCgocGVyUGFnZSkgPT4gKCFwZXJQYWdlID8gMTAgOiArcGVyUGFnZSkpLFxuICAgICAgICAgICAgc3RhcnRXaXRoKDEwKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyVGVybSQgPSB0aGlzLmZpbHRlclRlcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDI1MCksXG4gICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5zZXRDb250ZW50c1BhZ2VOdW1iZXIoMSkpLFxuICAgICAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgKTtcblxuICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMubWVtYmVyc0N1cnJlbnRQYWdlJCwgdGhpcy5tZW1iZXJzSXRlbXNQZXJQYWdlJCwgZmlsdGVyVGVybSQsIHRoaXMucmVmcmVzaCQpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbY3VycmVudFBhZ2UsIGl0ZW1zUGVyUGFnZSwgZmlsdGVyVGVybV0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWtlID0gaXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNraXAgPSAoY3VycmVudFBhZ2UgLSAxKSAqIGl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoUGFyYW1zQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXJtLFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudHNQYWdlTnVtYmVyKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldFBhcmFtKCdtZW1iZXJzUGFnZScsIHBhZ2UpO1xuICAgIH1cblxuICAgIHNldENvbnRlbnRzSXRlbXNQZXJQYWdlKHBlclBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldFBhcmFtKCdtZW1iZXJzUGVyUGFnZScsIHBlclBhZ2UpO1xuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaCQubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBhcmFtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nLCB7IC4uLnRoaXMucm91dGUuc25hcHNob3QucGFyYW1zLCBba2V5XTogdmFsdWUgfV0sIHtcbiAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXG4gICAgICAgICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiAnbWVyZ2UnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhcmVBbGxTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubWVtYmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNZW1iZXJJZHMubGVuZ3RoID09PSB0aGlzLm1lbWJlcnMubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAodGhpcy5hcmVBbGxTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KFtdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5tZW1iZXJzLm1hcCgodikgPT4gdi5pZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0TWVtYmVyKG1lbWJlcjogWm9uZU1lbWJlcikge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE1lbWJlcklkcy5pbmNsdWRlcyhtZW1iZXIuaWQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRNZW1iZXJJZHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IG1lbWJlci5pZCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChbLi4udGhpcy5zZWxlY3RlZE1lbWJlcklkcywgbWVtYmVyLmlkXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01lbWJlclNlbGVjdGVkID0gKG1lbWJlcjogWm9uZU1lbWJlcik6IGJvb2xlYW4gPT4ge1xuICAgICAgICByZXR1cm4gLTEgPCB0aGlzLnNlbGVjdGVkTWVtYmVySWRzLmluZGV4T2YobWVtYmVyLmlkKTtcbiAgICB9O1xufVxuIl19