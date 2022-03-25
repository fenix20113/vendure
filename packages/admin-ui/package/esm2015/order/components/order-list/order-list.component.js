import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, LocalStorageService, ServerConfigService, SortOrder, } from '@vendure/admin-ui/core';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
export class OrderListComponent extends BaseListComponent {
    constructor(serverConfigService, dataService, localStorageService, router, route) {
        super(router, route);
        this.serverConfigService = serverConfigService;
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.searchOrderCodeControl = new FormControl('');
        this.searchLastNameControl = new FormControl('');
        this.orderStates = this.serverConfigService.getOrderProcessStates().map(item => item.name);
        this.filterPresets = [
            {
                name: 'open',
                label: _('order.filter-preset-open'),
                config: {
                    active: false,
                    states: this.orderStates.filter(s => s !== 'Delivered' && s !== 'Cancelled' && s !== 'Shipped'),
                },
            },
            {
                name: 'shipped',
                label: _('order.filter-preset-shipped'),
                config: {
                    active: false,
                    states: ['Shipped'],
                },
            },
            {
                name: 'completed',
                label: _('order.filter-preset-completed'),
                config: {
                    active: false,
                    states: ['Delivered', 'Cancelled'],
                },
            },
            {
                name: 'active',
                label: _('order.filter-preset-active'),
                config: {
                    active: true,
                },
            },
        ];
        super.setQueryFn(
        // tslint:disable-next-line:no-shadowed-variable
        (take, skip) => this.dataService.order.getOrders({ take, skip }).refetchOnChannelChange(), data => data.orders, 
        // tslint:disable-next-line:no-shadowed-variable
        (skip, take) => this.createQueryOptions(skip, take, this.searchOrderCodeControl.value, this.searchLastNameControl.value, this.route.snapshot.queryParamMap.get('filter') || 'open'));
        const lastFilters = this.localStorageService.get('orderListLastCustomFilters');
        if (lastFilters) {
            this.setQueryParam(lastFilters, { replaceUrl: true });
        }
    }
    ngOnInit() {
        var _a;
        super.ngOnInit();
        this.activePreset$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('filter') || 'open'), distinctUntilChanged());
        const searchTerms$ = merge(this.searchOrderCodeControl.valueChanges, this.searchLastNameControl.valueChanges).pipe(filter(value => 2 < value.length || value.length === 0), debounceTime(250));
        merge(searchTerms$, this.route.queryParamMap)
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
            this.refresh();
        });
        const queryParamMap = this.route.snapshot.queryParamMap;
        this.customFilterForm = new FormGroup({
            states: new FormControl((_a = queryParamMap.getAll('states')) !== null && _a !== void 0 ? _a : []),
            placedAtStart: new FormControl(queryParamMap.get('placedAtStart')),
            placedAtEnd: new FormControl(queryParamMap.get('placedAtEnd')),
        });
    }
    selectFilterPreset(presetName) {
        var _a;
        const lastCustomFilters = (_a = this.localStorageService.get('orderListLastCustomFilters')) !== null && _a !== void 0 ? _a : {};
        const emptyCustomFilters = { states: undefined, placedAtStart: undefined, placedAtEnd: undefined };
        const filters = presetName === 'custom' ? lastCustomFilters : emptyCustomFilters;
        this.setQueryParam(Object.assign({ filter: presetName, page: 1 }, filters), { replaceUrl: true });
    }
    applyCustomFilters() {
        const formValue = this.customFilterForm.value;
        const customFilters = {
            states: formValue.states,
            placedAtStart: formValue.placedAtStart,
            placedAtEnd: formValue.placedAtEnd,
        };
        this.setQueryParam(Object.assign({ filter: 'custom' }, customFilters));
        this.customFilterForm.markAsPristine();
        this.localStorageService.set('orderListLastCustomFilters', customFilters);
    }
    createQueryOptions(
    // tslint:disable-next-line:no-shadowed-variable
    skip, take, orderCodeSearchTerm, customerNameSearchTerm, activeFilterPreset) {
        var _a;
        const filterConfig = this.filterPresets.find(p => p.name === activeFilterPreset);
        // tslint:disable-next-line:no-shadowed-variable
        const filter = {};
        if (filterConfig) {
            if (filterConfig.config.active != null) {
                filter.active = {
                    eq: filterConfig.config.active,
                };
            }
            if (filterConfig.config.states) {
                filter.state = {
                    in: filterConfig.config.states,
                };
            }
        }
        else if (activeFilterPreset === 'custom') {
            const queryParams = this.route.snapshot.queryParamMap;
            const states = (_a = queryParams.getAll('states')) !== null && _a !== void 0 ? _a : [];
            const placedAtStart = queryParams.get('placedAtStart');
            const placedAtEnd = queryParams.get('placedAtEnd');
            if (states.length) {
                filter.state = {
                    in: states,
                };
            }
            if (placedAtStart && placedAtEnd) {
                filter.orderPlacedAt = {
                    between: {
                        start: placedAtStart,
                        end: placedAtEnd,
                    },
                };
            }
            else if (placedAtStart) {
                filter.orderPlacedAt = {
                    after: placedAtStart,
                };
            }
            else if (placedAtEnd) {
                filter.orderPlacedAt = {
                    before: placedAtEnd,
                };
            }
        }
        if (customerNameSearchTerm) {
            filter.customerLastName = {
                contains: customerNameSearchTerm,
            };
        }
        if (orderCodeSearchTerm) {
            filter.code = {
                contains: orderCodeSearchTerm,
            };
        }
        return {
            options: {
                skip,
                take,
                filter: Object.assign({}, (filter !== null && filter !== void 0 ? filter : {})),
                sort: {
                    updatedAt: SortOrder.DESC,
                },
            },
        };
    }
    getShippingNames(order) {
        if (order.shippingLines.length) {
            return order.shippingLines.map(shippingLine => shippingLine.shippingMethod.name).join(', ');
        }
        else {
            return '';
        }
    }
}
OrderListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"search-form\">\n            <div class=\"btn-group btn-outline-primary\" *ngIf=\"activePreset$ | async as activePreset\">\n                <button\n                    class=\"btn\"\n                    *ngFor=\"let preset of filterPresets\"\n                    [class.btn-primary]=\"activePreset === preset.name\"\n                    (click)=\"selectFilterPreset(preset.name)\"\n                >\n                    {{ preset.label | translate }}\n                </button>\n                <button\n                    class=\"btn\"\n                    [class.btn-primary]=\"activePreset === 'custom'\"\n                    (click)=\"selectFilterPreset('custom')\"\n                >\n                    {{ 'order.filter-custom' | translate }}\n                    <clr-icon shape=\"angle down\"></clr-icon>\n                </button>\n            </div>\n\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"searchOrderCodeControl\"\n                [placeholder]=\"'order.search-by-order-code' | translate\"\n                class=\"search-input\"\n            />\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"searchLastNameControl\"\n                [placeholder]=\"'order.search-by-customer-last-name' | translate\"\n                class=\"search-input\"\n            />\n        </div>\n        <div class=\"custom-filters\" [class.expanded]=\"(activePreset$ | async) === 'custom'\">\n            <form [formGroup]=\"customFilterForm\">\n                <div class=\"flex align-center\">\n                    <ng-select\n                        [items]=\"orderStates\"\n                        appendTo=\"body\"\n                        [addTag]=\"false\"\n                        [multiple]=\"true\"\n                        formControlName=\"states\"\n                        [placeholder]=\"'state.all-orders' | translate\"\n                        [clearable]=\"true\"\n                        [searchable]=\"false\"\n                    >\n                        <ng-template ng-option-tmp let-item=\"item\">{{ item | stateI18nToken | translate }}</ng-template>\n                        <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                            <span class=\"ng-value-label\"> {{ item | stateI18nToken | translate }}</span>\n                            <span class=\"ng-value-icon right\" (click)=\"clear(item)\" aria-hidden=\"true\">\u00D7</span>\n                        </ng-template>\n                    </ng-select>\n                    <button\n                        class=\"btn btn-secondary\"\n                        [disabled]=\"customFilterForm.pristine\"\n                        (click)=\"applyCustomFilters()\"\n                    >\n                        {{ 'order.apply-filters' | translate }}\n                        <clr-icon shape=\"filter\"></clr-icon>\n                    </button>\n                </div>\n                <div class=\"flex\">\n                    <div>\n                        <label>{{ 'order.placed-at-start' | translate }}</label>\n                        <vdr-datetime-picker formControlName=\"placedAtStart\"></vdr-datetime-picker>\n                    </div>\n                    <div>\n                        <label>{{ 'order.placed-at-end' | translate }}</label>\n                        <vdr-datetime-picker formControlName=\"placedAtEnd\"></vdr-datetime-picker>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"order-list\"></vdr-action-bar-items>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.customer' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.state' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.total' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.updated-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.placed-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.shipping' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-order=\"item\">\n        <td class=\"left align-middle\">{{ order.code }}</td>\n        <td class=\"left align-middle\">\n            <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </td>\n        <td class=\"left align-middle\">{{ order.total | localeCurrency: order.currencyCode }}</td>\n        <td class=\"left align-middle\">{{ order.updatedAt | timeAgo }}</td>\n        <td class=\"left align-middle\">{{ order.orderPlacedAt | localeDate: 'medium' }}</td>\n        <td class=\"left align-middle\">{{ getShippingNames(order) }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"shopping-cart\"\n                [label]=\"'common.open' | translate\"\n                [linkTo]=\"order.state === 'Modifying' ? ['./', order.id, 'modify'] : ['./', order.id]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".search-form{display:flex;flex-direction:column;align-items:baseline;width:100%;margin-bottom:6px}@media screen and (min-width:768px){.search-form{flex-direction:row}}.search-input{margin-left:6px;margin-top:6px;min-width:300px}.custom-filters{overflow:hidden;max-height:0;padding-bottom:6px}.custom-filters.expanded{max-height:none}.custom-filters>form{display:flex;flex-direction:column;align-items:center}.custom-filters>form>div{width:100%}ng-select{flex:1;min-width:200px}ng-select,ng-select ::ng-deep .ng-select-container{height:36px}"]
            },] }
];
OrderListComponent.ctorParameters = () => [
    { type: ServerConfigService },
    { type: DataService },
    { type: LocalStorageService },
    { type: Router },
    { type: ActivatedRoute }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL29yZGVyLWxpc3Qvb3JkZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFdBQVcsRUFFWCxtQkFBbUIsRUFFbkIsbUJBQW1CLEVBQ25CLFNBQVMsR0FDWixNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFRLFNBQVMsRUFBTyxNQUFNLGdCQUFnQixDQUFDO0FBbUJ2RyxNQUFNLE9BQU8sa0JBQ1QsU0FBUSxpQkFBeUQ7SUEyQ2pFLFlBQ1ksbUJBQXdDLEVBQ3hDLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUNoRCxNQUFjLEVBQ2QsS0FBcUI7UUFFckIsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQU5iLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQTVDcEQsMkJBQXNCLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsMEJBQXFC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Q0FBQztTQUNMO1FBQ0QsSUFBSSxtQkFBbUIsRUFBRTtZQUNyQixNQUFNLENBQUMsSUFBSSxHQUFHO2dCQUNWLFFBQVEsRUFBRSxtQkFBbUI7YUFDaEMsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJO2dCQUNKLElBQUk7Z0JBQ0osTUFBTSxvQkFDQyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO2lCQUM1QjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFZO1FBQ3pCLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDNUIsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9GO2FBQU07WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNiO0lBQ0wsQ0FBQzs7O1lBck5KLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixzb0xBQTBDO2dCQUUxQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQXZCRyxtQkFBbUI7WUFKbkIsV0FBVztZQUVYLG1CQUFtQjtZQU5FLE1BQU07WUFBdEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBCYXNlTGlzdENvbXBvbmVudCxcbiAgICBEYXRhU2VydmljZSxcbiAgICBHZXRPcmRlckxpc3QsXG4gICAgTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICBPcmRlckxpc3RPcHRpb25zLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgU29ydE9yZGVyLFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBza2lwLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW50ZXJmYWNlIE9yZGVyRmlsdGVyQ29uZmlnIHtcbiAgICBhY3RpdmU/OiBib29sZWFuO1xuICAgIHN0YXRlcz86IHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgRmlsdGVyUHJlc2V0IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBjb25maWc6IE9yZGVyRmlsdGVyQ29uZmlnO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vcmRlci1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXItbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3JkZXItbGlzdC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckxpc3RDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VMaXN0Q29tcG9uZW50PEdldE9yZGVyTGlzdC5RdWVyeSwgR2V0T3JkZXJMaXN0Lkl0ZW1zPlxuICAgIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzZWFyY2hPcmRlckNvZGVDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICBzZWFyY2hMYXN0TmFtZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIGN1c3RvbUZpbHRlckZvcm06IEZvcm1Hcm91cDtcbiAgICBvcmRlclN0YXRlcyA9IHRoaXMuc2VydmVyQ29uZmlnU2VydmljZS5nZXRPcmRlclByb2Nlc3NTdGF0ZXMoKS5tYXAoaXRlbSA9PiBpdGVtLm5hbWUpO1xuICAgIGZpbHRlclByZXNldHM6IEZpbHRlclByZXNldFtdID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnb3BlbicsXG4gICAgICAgICAgICBsYWJlbDogXygnb3JkZXIuZmlsdGVyLXByZXNldC1vcGVuJyksXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXRlczogdGhpcy5vcmRlclN0YXRlcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIHMgPT4gcyAhPT0gJ0RlbGl2ZXJlZCcgJiYgcyAhPT0gJ0NhbmNlbGxlZCcgJiYgcyAhPT0gJ1NoaXBwZWQnLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnc2hpcHBlZCcsXG4gICAgICAgICAgICBsYWJlbDogXygnb3JkZXIuZmlsdGVyLXByZXNldC1zaGlwcGVkJyksXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXRlczogWydTaGlwcGVkJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY29tcGxldGVkJyxcbiAgICAgICAgICAgIGxhYmVsOiBfKCdvcmRlci5maWx0ZXItcHJlc2V0LWNvbXBsZXRlZCcpLFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0ZXM6IFsnRGVsaXZlcmVkJywgJ0NhbmNlbGxlZCddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2FjdGl2ZScsXG4gICAgICAgICAgICBsYWJlbDogXygnb3JkZXIuZmlsdGVyLXByZXNldC1hY3RpdmUnKSxcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgXTtcbiAgICBhY3RpdmVQcmVzZXQkOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZXIsIHJvdXRlKTtcbiAgICAgICAgc3VwZXIuc2V0UXVlcnlGbihcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxuICAgICAgICAgICAgKHRha2UsIHNraXApID0+IHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuZ2V0T3JkZXJzKHsgdGFrZSwgc2tpcCB9KS5yZWZldGNoT25DaGFubmVsQ2hhbmdlKCksXG4gICAgICAgICAgICBkYXRhID0+IGRhdGEub3JkZXJzLFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXNoYWRvd2VkLXZhcmlhYmxlXG4gICAgICAgICAgICAoc2tpcCwgdGFrZSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVF1ZXJ5T3B0aW9ucyhcbiAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgdGFrZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hPcmRlckNvZGVDb250cm9sLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaExhc3ROYW1lQ29udHJvbC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmdldCgnZmlsdGVyJykgfHwgJ29wZW4nLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGxhc3RGaWx0ZXJzID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnb3JkZXJMaXN0TGFzdEN1c3RvbUZpbHRlcnMnKTtcbiAgICAgICAgaWYgKGxhc3RGaWx0ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFF1ZXJ5UGFyYW0obGFzdEZpbHRlcnMsIHsgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICB0aGlzLmFjdGl2ZVByZXNldCQgPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1NYXAucGlwZShcbiAgICAgICAgICAgIG1hcChxcG0gPT4gcXBtLmdldCgnZmlsdGVyJykgfHwgJ29wZW4nKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm1zJCA9IG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5zZWFyY2hPcmRlckNvZGVDb250cm9sLnZhbHVlQ2hhbmdlcyxcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTGFzdE5hbWVDb250cm9sLnZhbHVlQ2hhbmdlcyxcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IDIgPCB2YWx1ZS5sZW5ndGggfHwgdmFsdWUubGVuZ3RoID09PSAwKSxcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgyNTApLFxuICAgICAgICApO1xuICAgICAgICBtZXJnZShzZWFyY2hUZXJtcyQsIHRoaXMucm91dGUucXVlcnlQYXJhbU1hcClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1NYXAgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1NYXA7XG4gICAgICAgIHRoaXMuY3VzdG9tRmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgICAgICAgc3RhdGVzOiBuZXcgRm9ybUNvbnRyb2wocXVlcnlQYXJhbU1hcC5nZXRBbGwoJ3N0YXRlcycpID8/IFtdKSxcbiAgICAgICAgICAgIHBsYWNlZEF0U3RhcnQ6IG5ldyBGb3JtQ29udHJvbChxdWVyeVBhcmFtTWFwLmdldCgncGxhY2VkQXRTdGFydCcpKSxcbiAgICAgICAgICAgIHBsYWNlZEF0RW5kOiBuZXcgRm9ybUNvbnRyb2wocXVlcnlQYXJhbU1hcC5nZXQoJ3BsYWNlZEF0RW5kJykpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXJQcmVzZXQocHJlc2V0TmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGxhc3RDdXN0b21GaWx0ZXJzID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnb3JkZXJMaXN0TGFzdEN1c3RvbUZpbHRlcnMnKSA/PyB7fTtcbiAgICAgICAgY29uc3QgZW1wdHlDdXN0b21GaWx0ZXJzID0geyBzdGF0ZXM6IHVuZGVmaW5lZCwgcGxhY2VkQXRTdGFydDogdW5kZWZpbmVkLCBwbGFjZWRBdEVuZDogdW5kZWZpbmVkIH07XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBwcmVzZXROYW1lID09PSAnY3VzdG9tJyA/IGxhc3RDdXN0b21GaWx0ZXJzIDogZW1wdHlDdXN0b21GaWx0ZXJzO1xuICAgICAgICB0aGlzLnNldFF1ZXJ5UGFyYW0oXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiBwcmVzZXROYW1lLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgLi4uZmlsdGVycyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHJlcGxhY2VVcmw6IHRydWUgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhcHBseUN1c3RvbUZpbHRlcnMoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuY3VzdG9tRmlsdGVyRm9ybS52YWx1ZTtcbiAgICAgICAgY29uc3QgY3VzdG9tRmlsdGVycyA9IHtcbiAgICAgICAgICAgIHN0YXRlczogZm9ybVZhbHVlLnN0YXRlcyxcbiAgICAgICAgICAgIHBsYWNlZEF0U3RhcnQ6IGZvcm1WYWx1ZS5wbGFjZWRBdFN0YXJ0LFxuICAgICAgICAgICAgcGxhY2VkQXRFbmQ6IGZvcm1WYWx1ZS5wbGFjZWRBdEVuZCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRRdWVyeVBhcmFtKHtcbiAgICAgICAgICAgIGZpbHRlcjogJ2N1c3RvbScsXG4gICAgICAgICAgICAuLi5jdXN0b21GaWx0ZXJzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWx0ZXJGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ29yZGVyTGlzdExhc3RDdXN0b21GaWx0ZXJzJywgY3VzdG9tRmlsdGVycyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVRdWVyeU9wdGlvbnMoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxuICAgICAgICBza2lwOiBudW1iZXIsXG4gICAgICAgIHRha2U6IG51bWJlcixcbiAgICAgICAgb3JkZXJDb2RlU2VhcmNoVGVybTogc3RyaW5nLFxuICAgICAgICBjdXN0b21lck5hbWVTZWFyY2hUZXJtOiBzdHJpbmcsXG4gICAgICAgIGFjdGl2ZUZpbHRlclByZXNldD86IHN0cmluZyxcbiAgICApOiB7IG9wdGlvbnM6IE9yZGVyTGlzdE9wdGlvbnMgfSB7XG4gICAgICAgIGNvbnN0IGZpbHRlckNvbmZpZyA9IHRoaXMuZmlsdGVyUHJlc2V0cy5maW5kKHAgPT4gcC5uYW1lID09PSBhY3RpdmVGaWx0ZXJQcmVzZXQpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcbiAgICAgICAgY29uc3QgZmlsdGVyOiBhbnkgPSB7fTtcbiAgICAgICAgaWYgKGZpbHRlckNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGZpbHRlckNvbmZpZy5jb25maWcuYWN0aXZlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuYWN0aXZlID0ge1xuICAgICAgICAgICAgICAgICAgICBlcTogZmlsdGVyQ29uZmlnLmNvbmZpZy5hY3RpdmUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWx0ZXJDb25maWcuY29uZmlnLnN0YXRlcykge1xuICAgICAgICAgICAgICAgIGZpbHRlci5zdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW46IGZpbHRlckNvbmZpZy5jb25maWcuc3RhdGVzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlRmlsdGVyUHJlc2V0ID09PSAnY3VzdG9tJykge1xuICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1NYXA7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZXMgPSBxdWVyeVBhcmFtcy5nZXRBbGwoJ3N0YXRlcycpID8/IFtdO1xuICAgICAgICAgICAgY29uc3QgcGxhY2VkQXRTdGFydCA9IHF1ZXJ5UGFyYW1zLmdldCgncGxhY2VkQXRTdGFydCcpO1xuICAgICAgICAgICAgY29uc3QgcGxhY2VkQXRFbmQgPSBxdWVyeVBhcmFtcy5nZXQoJ3BsYWNlZEF0RW5kJyk7XG4gICAgICAgICAgICBpZiAoc3RhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5zdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW46IHN0YXRlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlZEF0U3RhcnQgJiYgcGxhY2VkQXRFbmQpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIub3JkZXJQbGFjZWRBdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgYmV0d2Vlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHBsYWNlZEF0U3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHBsYWNlZEF0RW5kLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlZEF0U3RhcnQpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIub3JkZXJQbGFjZWRBdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWZ0ZXI6IHBsYWNlZEF0U3RhcnQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxhY2VkQXRFbmQpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIub3JkZXJQbGFjZWRBdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlOiBwbGFjZWRBdEVuZCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXN0b21lck5hbWVTZWFyY2hUZXJtKSB7XG4gICAgICAgICAgICBmaWx0ZXIuY3VzdG9tZXJMYXN0TmFtZSA9IHtcbiAgICAgICAgICAgICAgICBjb250YWluczogY3VzdG9tZXJOYW1lU2VhcmNoVGVybSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGVyQ29kZVNlYXJjaFRlcm0pIHtcbiAgICAgICAgICAgIGZpbHRlci5jb2RlID0ge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5zOiBvcmRlckNvZGVTZWFyY2hUZXJtLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgdGFrZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uKGZpbHRlciA/PyB7fSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogU29ydE9yZGVyLkRFU0MsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0U2hpcHBpbmdOYW1lcyhvcmRlcjogT3JkZXIpIHtcbiAgICAgICAgaWYgKG9yZGVyLnNoaXBwaW5nTGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gb3JkZXIuc2hpcHBpbmdMaW5lcy5tYXAoc2hpcHBpbmdMaW5lID0+IHNoaXBwaW5nTGluZS5zaGlwcGluZ01ldGhvZC5uYW1lKS5qb2luKCcsICcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19