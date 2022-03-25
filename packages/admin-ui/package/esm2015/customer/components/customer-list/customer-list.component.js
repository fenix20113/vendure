import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, ModalService, NotificationService, } from '@vendure/admin-ui/core';
import { SortOrder } from '@vendure/common/lib/generated-shop-types';
import { EMPTY, merge } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
export class CustomerListComponent extends BaseListComponent {
    constructor(dataService, router, route, modalService, notificationService) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.emailSearchTerm = new FormControl('');
        this.lastNameSearchTerm = new FormControl('');
        super.setQueryFn((...args) => this.dataService.customer.getCustomerList(...args).refetchOnChannelChange(), data => data.customers, (skip, take) => ({
            options: {
                skip,
                take,
                filter: {
                    emailAddress: {
                        contains: this.emailSearchTerm.value,
                    },
                    lastName: {
                        contains: this.lastNameSearchTerm.value,
                    },
                },
                sort: {
                    createdAt: SortOrder.DESC,
                },
            },
        }));
    }
    ngOnInit() {
        super.ngOnInit();
        merge(this.emailSearchTerm.valueChanges, this.lastNameSearchTerm.valueChanges)
            .pipe(filter(value => 2 < value.length || value.length === 0), debounceTime(250), takeUntil(this.destroy$))
            .subscribe(() => this.refresh());
    }
    deleteCustomer(customer) {
        return this.modalService
            .dialog({
            title: _('catalog.confirm-delete-customer'),
            body: `${customer.firstName} ${customer.lastName}`,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.customer.deleteCustomer(customer.id) : EMPTY)))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Customer',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Customer',
            });
        });
    }
}
CustomerListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <input\n            type=\"text\"\n            name=\"emailSearchTerm\"\n            [formControl]=\"emailSearchTerm\"\n            [placeholder]=\"'customer.search-customers-by-email' | translate\"\n            class=\"search-input ml3\"\n        />\n        <input\n            type=\"text\"\n            name=\"lastNameSearchTerm\"\n            [formControl]=\"lastNameSearchTerm\"\n            [placeholder]=\"'customer.search-customers-by-last-name' | translate\"\n            class=\"search-input ml3\"\n        />\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateCustomer'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-customer' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'customer.customer-type' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-customer=\"item\">\n        <td class=\"left align-middle\">\n            {{ customer.title }} {{ customer.firstName }} {{ customer.lastName }}\n        </td>\n        <td class=\"left align-middle\">{{ customer.emailAddress }}</td>\n        <td class=\"left align-middle\">\n            <vdr-customer-status-label [customer]=\"customer\"></vdr-customer-status-label>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', customer.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteCustomer(customer)\"\n                        [disabled]=\"!('DeleteCustomer' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: [".search-input{margin-top:6px;min-width:300px}"]
            },] }
];
CustomerListComponent.ctorParameters = () => [
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ModalService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2N1c3RvbWVyL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyLWxpc3QvY3VzdG9tZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsV0FBVyxFQUVYLFlBQVksRUFDWixtQkFBbUIsR0FDdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzVFLE1BQU0sT0FBTyxxQkFDVCxTQUFRLGlCQUErRDtJQUl2RSxZQUNZLFdBQXdCLEVBQ2hDLE1BQWMsRUFDZCxLQUFxQixFQUNiLFlBQTBCLEVBQzFCLG1CQUF3QztRQUVoRCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBTmIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFHeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVBwRCxvQkFBZSxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RD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LFdBQVc7WUFKVSxNQUFNO1lBQXRCLGNBQWM7WUFNbkIsWUFBWTtZQUNaLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBCYXNlTGlzdENvbXBvbmVudCxcbiAgICBEYXRhU2VydmljZSxcbiAgICBHZXRDdXN0b21lckxpc3QsXG4gICAgTW9kYWxTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgU29ydE9yZGVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9nZW5lcmF0ZWQtc2hvcC10eXBlcyc7XG5pbXBvcnQgeyBFTVBUWSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY3VzdG9tZXItbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJMaXN0Q29tcG9uZW50XG4gICAgZXh0ZW5kcyBCYXNlTGlzdENvbXBvbmVudDxHZXRDdXN0b21lckxpc3QuUXVlcnksIEdldEN1c3RvbWVyTGlzdC5JdGVtcz5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZW1haWxTZWFyY2hUZXJtID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICBsYXN0TmFtZVNlYXJjaFRlcm0gPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZXIsIHJvdXRlKTtcbiAgICAgICAgc3VwZXIuc2V0UXVlcnlGbihcbiAgICAgICAgICAgICguLi5hcmdzOiBhbnlbXSkgPT4gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lci5nZXRDdXN0b21lckxpc3QoLi4uYXJncykucmVmZXRjaE9uQ2hhbm5lbENoYW5nZSgpLFxuICAgICAgICAgICAgZGF0YSA9PiBkYXRhLmN1c3RvbWVycyxcbiAgICAgICAgICAgIChza2lwLCB0YWtlKSA9PiAoe1xuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgdGFrZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluczogdGhpcy5lbWFpbFNlYXJjaFRlcm0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluczogdGhpcy5sYXN0TmFtZVNlYXJjaFRlcm0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IFNvcnRPcmRlci5ERVNDLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgbWVyZ2UodGhpcy5lbWFpbFNlYXJjaFRlcm0udmFsdWVDaGFuZ2VzLCB0aGlzLmxhc3ROYW1lU2VhcmNoVGVybS52YWx1ZUNoYW5nZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gMiA8IHZhbHVlLmxlbmd0aCB8fCB2YWx1ZS5sZW5ndGggPT09IDApLFxuICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSgyNTApLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgIH1cblxuICAgIGRlbGV0ZUN1c3RvbWVyKGN1c3RvbWVyOiBHZXRDdXN0b21lckxpc3QuSXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1jdXN0b21lcicpLFxuICAgICAgICAgICAgICAgIGJvZHk6IGAke2N1c3RvbWVyLmZpcnN0TmFtZX0gJHtjdXN0b21lci5sYXN0TmFtZX1gLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRlbGV0ZScpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoc3dpdGNoTWFwKHJlcyA9PiAocmVzID8gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lci5kZWxldGVDdXN0b21lcihjdXN0b21lci5pZCkgOiBFTVBUWSkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ3VzdG9tZXInLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ3VzdG9tZXInLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=