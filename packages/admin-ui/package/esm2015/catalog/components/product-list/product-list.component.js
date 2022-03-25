import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, JobQueueService, JobState, LogicalOperator, ModalService, NotificationService, } from '@vendure/admin-ui/core';
import { EMPTY } from 'rxjs';
import { delay, map, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ProductSearchInputComponent } from '../product-search-input/product-search-input.component';
export class ProductListComponent extends BaseListComponent {
    constructor(dataService, modalService, notificationService, jobQueueService, router, route) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.jobQueueService = jobQueueService;
        this.searchTerm = '';
        this.facetValueIds = [];
        this.groupByProduct = true;
        super.setQueryFn((...args) => this.dataService.product.searchProducts(this.searchTerm, ...args).refetchOnChannelChange(), data => data.search, 
        // tslint:disable-next-line:no-shadowed-variable
        (skip, take) => ({
            input: {
                skip,
                take,
                term: this.searchTerm,
                facetValueIds: this.facetValueIds,
                facetValueOperator: LogicalOperator.AND,
                groupByProduct: this.groupByProduct,
            },
        }));
    }
    ngOnInit() {
        super.ngOnInit();
        this.facetValues$ = this.result$.pipe(map(data => data.search.facetValues));
        // this.facetValues$ = of([]);
        this.route.queryParamMap
            .pipe(map(qpm => qpm.get('q')), takeUntil(this.destroy$))
            .subscribe(term => {
            this.productSearchInput.setSearchTerm(term);
        });
        const fvids$ = this.route.queryParamMap.pipe(map(qpm => qpm.getAll('fvids')));
        fvids$.pipe(takeUntil(this.destroy$)).subscribe(ids => {
            this.productSearchInput.setFacetValues(ids);
        });
        this.facetValues$.pipe(take(1), delay(100), withLatestFrom(fvids$)).subscribe(([__, ids]) => {
            this.productSearchInput.setFacetValues(ids);
        });
    }
    setSearchTerm(term) {
        this.searchTerm = term;
        this.setQueryParam({ q: term || null, page: 1 });
        this.refresh();
    }
    setFacetValueIds(ids) {
        this.facetValueIds = ids;
        this.setQueryParam({ fvids: ids, page: 1 });
        this.refresh();
    }
    rebuildSearchIndex() {
        this.dataService.product.reindex().subscribe(({ reindex }) => {
            this.notificationService.info(_('catalog.reindexing'));
            this.jobQueueService.addJob(reindex.id, job => {
                if (job.state === JobState.COMPLETED) {
                    const time = new Intl.NumberFormat().format(job.duration || 0);
                    this.notificationService.success(_('catalog.reindex-successful'), {
                        count: job.result.indexedItemCount,
                        time,
                    });
                    this.refresh();
                }
                else {
                    this.notificationService.error(_('catalog.reindex-error'));
                }
            });
        });
    }
    deleteProduct(productId) {
        this.modalService
            .dialog({
            title: _('catalog.confirm-delete-product'),
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => (response ? this.dataService.product.deleteProduct(productId) : EMPTY)), 
        // Short delay to allow the product to be removed from the search index before
        // refreshing.
        delay(500))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Product',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Product',
            });
        });
    }
}
ProductListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-products-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <div class=\"search-form\">\n            <vdr-product-search-input\n                #productSearchInputComponent\n                [facetValueResults]=\"facetValues$ | async\"\n                (searchTermChange)=\"setSearchTerm($event)\"\n                (facetValueChange)=\"setFacetValueIds($event)\"\n            ></vdr-product-search-input>\n            <vdr-dropdown class=\"search-settings-menu mr3\">\n                <button type=\"button\" class=\"icon-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"cog\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        (click)=\"rebuildSearchIndex()\"\n                        [disabled]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                    >\n                        {{ 'catalog.rebuild-search-index' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n        <clr-checkbox-wrapper>\n            <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"groupByProduct\" />\n            <label>{{ 'catalog.group-by-product' | translate }}</label>\n        </clr-checkbox-wrapper>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"product-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateCatalog', 'CreateProduct']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            <span class=\"full-label\">{{ 'catalog.create-new-product' | translate }}</span>\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <ng-template let-result=\"item\">\n        <td class=\"left align-middle\" [class.disabled]=\"!result.enabled\">\n            <div class=\"image-placeholder\">\n                <img\n                    *ngIf=\"\n                        groupByProduct\n                            ? result.productAsset\n                            : result.productVariantAsset || result.productAsset as asset;\n                        else imagePlaceholder\n                    \"\n                    [src]=\"asset | assetPreview:'tiny'\"\n                />\n                <ng-template #imagePlaceholder>\n                    <div class=\"placeholder\"><clr-icon shape=\"image\" size=\"48\"></clr-icon></div>\n                </ng-template>\n            </div>\n        </td>\n        <td class=\"left align-middle\" [class.disabled]=\"!result.enabled\">\n            {{ groupByProduct ? result.productName : result.productVariantName }}\n        </td>\n        <td class=\"align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-chip *ngIf=\"!result.enabled\">{{ 'common.disabled' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', result.productId]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteProduct(result.productId)\"\n                        [disabled]=\"!(['DeleteCatalog', 'DeleteProduct'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: [".image-placeholder{width:50px;height:50px;background-color:var(--color-component-bg-200)}.image-placeholder .placeholder{text-align:center;color:var(--color-grey-300)}.search-form{display:flex;align-items:center;width:100%;margin-bottom:6px}.search-input{min-width:300px}@media screen and (max-width:768px){.search-input{min-width:100px}}.search-settings-menu{margin:0 12px}td.disabled{background-color:var(--color-component-bg-200)}"]
            },] }
];
ProductListComponent.ctorParameters = () => [
    { type: DataService },
    { type: ModalService },
    { type: NotificationService },
    { type: JobQueueService },
    { type: Router },
    { type: ActivatedRoute }
];
ProductListComponent.propDecorators = {
    productSearchInput: [{ type: ViewChild, args: ['productSearchInputComponent', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9wcm9kdWN0LWxpc3QvcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsZUFBZSxFQUNmLFFBQVEsRUFDUixlQUFlLEVBQ2YsWUFBWSxFQUNaLG1CQUFtQixHQUd0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFPckcsTUFBTSxPQUFPLG9CQUNULFNBQVEsaUJBQXVGO0lBUS9GLFlBQ1ksV0FBd0IsRUFDeEIsWUFBMEIsRUFDMUIsbUJBQXdDLEVBQ3hDLGVBQWdDLEVBQ3hDLE1BQWMsRUFDZCxLQUFxQjtRQUVyQixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBUGIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFWNUMs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Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJhc2VMaXN0Q29tcG9uZW50LFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIEpvYlF1ZXVlU2VydmljZSxcbiAgICBKb2JTdGF0ZSxcbiAgICBMb2dpY2FsT3BlcmF0b3IsXG4gICAgTW9kYWxTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgU2VhcmNoSW5wdXQsXG4gICAgU2VhcmNoUHJvZHVjdHMsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUHJvZHVjdFNlYXJjaElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vcHJvZHVjdC1zZWFyY2gtaW5wdXQvcHJvZHVjdC1zZWFyY2gtaW5wdXQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcHJvZHVjdHMtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3QtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZHVjdC1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RMaXN0Q29tcG9uZW50XG4gICAgZXh0ZW5kcyBCYXNlTGlzdENvbXBvbmVudDxTZWFyY2hQcm9kdWN0cy5RdWVyeSwgU2VhcmNoUHJvZHVjdHMuSXRlbXMsIFNlYXJjaFByb2R1Y3RzLlZhcmlhYmxlcz5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc2VhcmNoVGVybSA9ICcnO1xuICAgIGZhY2V0VmFsdWVJZHM6IHN0cmluZ1tdID0gW107XG4gICAgZ3JvdXBCeVByb2R1Y3QgPSB0cnVlO1xuICAgIGZhY2V0VmFsdWVzJDogT2JzZXJ2YWJsZTxTZWFyY2hQcm9kdWN0cy5GYWNldFZhbHVlc1tdPjtcbiAgICBAVmlld0NoaWxkKCdwcm9kdWN0U2VhcmNoSW5wdXRDb21wb25lbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHByaXZhdGUgcHJvZHVjdFNlYXJjaElucHV0OiBQcm9kdWN0U2VhcmNoSW5wdXRDb21wb25lbnQ7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgam9iUXVldWVTZXJ2aWNlOiBKb2JRdWV1ZVNlcnZpY2UsXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlciwgcm91dGUpO1xuICAgICAgICBzdXBlci5zZXRRdWVyeUZuKFxuICAgICAgICAgICAgKC4uLmFyZ3M6IGFueVtdKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5zZWFyY2hQcm9kdWN0cyh0aGlzLnNlYXJjaFRlcm0sIC4uLmFyZ3MpLnJlZmV0Y2hPbkNoYW5uZWxDaGFuZ2UoKSxcbiAgICAgICAgICAgIGRhdGEgPT4gZGF0YS5zZWFyY2gsXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcbiAgICAgICAgICAgIChza2lwLCB0YWtlKSA9PiAoe1xuICAgICAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgIHRha2UsXG4gICAgICAgICAgICAgICAgICAgIHRlcm06IHRoaXMuc2VhcmNoVGVybSxcbiAgICAgICAgICAgICAgICAgICAgZmFjZXRWYWx1ZUlkczogdGhpcy5mYWNldFZhbHVlSWRzLFxuICAgICAgICAgICAgICAgICAgICBmYWNldFZhbHVlT3BlcmF0b3I6IExvZ2ljYWxPcGVyYXRvci5BTkQsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwQnlQcm9kdWN0OiB0aGlzLmdyb3VwQnlQcm9kdWN0LFxuICAgICAgICAgICAgICAgIH0gYXMgU2VhcmNoSW5wdXQsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgdGhpcy5mYWNldFZhbHVlcyQgPSB0aGlzLnJlc3VsdCQucGlwZShtYXAoZGF0YSA9PiBkYXRhLnNlYXJjaC5mYWNldFZhbHVlcykpO1xuICAgICAgICAvLyB0aGlzLmZhY2V0VmFsdWVzJCA9IG9mKFtdKTtcbiAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtTWFwXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocXBtID0+IHFwbS5nZXQoJ3EnKSksXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0ZXJtID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RTZWFyY2hJbnB1dC5zZXRTZWFyY2hUZXJtKHRlcm0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZnZpZHMkID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtTWFwLnBpcGUobWFwKHFwbSA9PiBxcG0uZ2V0QWxsKCdmdmlkcycpKSk7XG5cbiAgICAgICAgZnZpZHMkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoaWRzID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFNlYXJjaElucHV0LnNldEZhY2V0VmFsdWVzKGlkcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmFjZXRWYWx1ZXMkLnBpcGUodGFrZSgxKSwgZGVsYXkoMTAwKSwgd2l0aExhdGVzdEZyb20oZnZpZHMkKSkuc3Vic2NyaWJlKChbX18sIGlkc10pID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFNlYXJjaElucHV0LnNldEZhY2V0VmFsdWVzKGlkcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFNlYXJjaFRlcm0odGVybTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IHRlcm07XG4gICAgICAgIHRoaXMuc2V0UXVlcnlQYXJhbSh7IHE6IHRlcm0gfHwgbnVsbCwgcGFnZTogMSB9KTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgc2V0RmFjZXRWYWx1ZUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuZmFjZXRWYWx1ZUlkcyA9IGlkcztcbiAgICAgICAgdGhpcy5zZXRRdWVyeVBhcmFtKHsgZnZpZHM6IGlkcywgcGFnZTogMSB9KTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgcmVidWlsZFNlYXJjaEluZGV4KCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3QucmVpbmRleCgpLnN1YnNjcmliZSgoeyByZWluZGV4IH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5pbmZvKF8oJ2NhdGFsb2cucmVpbmRleGluZycpKTtcbiAgICAgICAgICAgIHRoaXMuam9iUXVldWVTZXJ2aWNlLmFkZEpvYihyZWluZGV4LmlkLCBqb2IgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChqb2Iuc3RhdGUgPT09IEpvYlN0YXRlLkNPTVBMRVRFRCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KGpvYi5kdXJhdGlvbiB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY2F0YWxvZy5yZWluZGV4LXN1Y2Nlc3NmdWwnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IGpvYi5yZXN1bHQuaW5kZXhlZEl0ZW1Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY2F0YWxvZy5yZWluZGV4LWVycm9yJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVQcm9kdWN0KHByb2R1Y3RJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1wcm9kdWN0JyksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ2RhbmdlcicsIGxhYmVsOiBfKCdjb21tb24uZGVsZXRlJyksIHJldHVyblZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzcG9uc2UgPT4gKHJlc3BvbnNlID8gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0LmRlbGV0ZVByb2R1Y3QocHJvZHVjdElkKSA6IEVNUFRZKSksXG4gICAgICAgICAgICAgICAgLy8gU2hvcnQgZGVsYXkgdG8gYWxsb3cgdGhlIHByb2R1Y3QgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBzZWFyY2ggaW5kZXggYmVmb3JlXG4gICAgICAgICAgICAgICAgLy8gcmVmcmVzaGluZy5cbiAgICAgICAgICAgICAgICBkZWxheSg1MDApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUHJvZHVjdCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdQcm9kdWN0JyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19