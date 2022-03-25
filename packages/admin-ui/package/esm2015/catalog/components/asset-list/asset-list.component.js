import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, DeletionResult, LogicalOperator, ModalService, NotificationService, SortOrder, } from '@vendure/admin-ui/core';
import { BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { debounceTime, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
export class AssetListComponent extends BaseListComponent {
    constructor(notificationService, modalService, dataService, router, route) {
        super(router, route);
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchTerm$ = new BehaviorSubject(undefined);
        this.filterByTags$ = new BehaviorSubject(undefined);
        this.uploading = false;
        super.setQueryFn((...args) => this.dataService.product.getAssetList(...args), data => data.assets, (skip, take) => {
            var _a;
            const searchTerm = this.searchTerm$.value;
            const tags = (_a = this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(t => t.value);
            return {
                options: Object.assign(Object.assign({ skip,
                    take }, (searchTerm
                    ? {
                        filter: {
                            name: { contains: searchTerm },
                        },
                    }
                    : {})), { sort: {
                        createdAt: SortOrder.DESC,
                    }, tags, tagsOperator: LogicalOperator.AND }),
            };
        }, { take: 25, skip: 0 });
    }
    ngOnInit() {
        super.ngOnInit();
        this.paginationConfig$ = combineLatest(this.itemsPerPage$, this.currentPage$, this.totalItems$).pipe(map(([itemsPerPage, currentPage, totalItems]) => ({ itemsPerPage, currentPage, totalItems })));
        this.searchTerm$.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe(() => this.refresh());
        this.filterByTags$.pipe(takeUntil(this.destroy$)).subscribe(() => this.refresh());
        this.allTags$ = this.dataService.product.getTagList().mapStream(data => data.tags.items);
    }
    filesSelected(files) {
        if (files.length) {
            this.uploading = true;
            this.dataService.product
                .createAssets(files)
                .pipe(finalize(() => (this.uploading = false)))
                .subscribe(({ createAssets }) => {
                let successCount = 0;
                for (const result of createAssets) {
                    switch (result.__typename) {
                        case 'Asset':
                            successCount++;
                            break;
                        case 'MimeTypeError':
                            this.notificationService.error(result.message);
                            break;
                    }
                }
                if (0 < successCount) {
                    super.refresh();
                    this.notificationService.success(_('asset.notify-create-assets-success'), {
                        count: successCount,
                    });
                }
            });
        }
    }
    deleteAssets(assets) {
        this.showModalAndDelete(assets.map(a => a.id))
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(assets.map(a => a.id), response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Assets',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Assets',
            });
        });
    }
    showModalAndDelete(assetIds, message) {
        return this.modalService
            .dialog({
            title: _('catalog.confirm-delete-assets'),
            translationVars: {
                count: assetIds.length,
            },
            body: message,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.product.deleteAssets(assetIds, !!message) : EMPTY)), map(res => res.deleteAssets));
    }
}
AssetListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <vdr-asset-search-input\n            class=\"pr4 mt1\"\n            [tags]=\"allTags$ | async\"\n            (searchTermChange)=\"searchTerm$.next($event)\"\n            (tagsChange)=\"filterByTags$.next($event)\"\n        ></vdr-asset-search-input>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-list\"></vdr-action-bar-items>\n        <vdr-asset-file-input\n            (selectFiles)=\"filesSelected($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".content-area\"\n        ></vdr-asset-file-input>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-asset-gallery\n    [assets]=\"(items$ | async)! | paginate: (paginationConfig$ | async) || {}\"\n    [multiSelect]=\"true\"\n    [canDelete]=\"['DeleteCatalog', 'DeleteAsset'] | hasPermission\"\n    (deleteAssets)=\"deleteAssets($event)\"\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        (itemsPerPageChange)=\"setItemsPerPage($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"currentPage$ | async\"\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        [totalItems]=\"totalItems$ | async\"\n        (pageChange)=\"setPageNumber($event)\"\n    ></vdr-pagination-controls>\n</div>\n",
                styles: [":host{display:flex;flex-direction:column;height:100%}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}.search-input{margin-top:6px;min-width:300px}"]
            },] }
];
AssetListComponent.ctorParameters = () => [
    { type: NotificationService },
    { type: ModalService },
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvYXNzZXQtbGlzdC9hc3NldC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxjQUFjLEVBRWQsZUFBZSxFQUNmLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsU0FBUyxHQUVaLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPbkYsTUFBTSxPQUFPLGtCQUNULFNBQVEsaUJBQWlGO0lBUXpGLFlBQ1ksbUJBQXdDLEVBQ3hDLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ2hDLE1BQWMsRUFDZCxLQUFxQjtRQUVyQixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBTmIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVRwQyxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFxQixTQUFTLENBQUMsQ0FBQztRQUNqRSxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUE0QixTQUFTLENBQUMsQ0FBQztR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QyxDQUMvQixDQUFDO0lBQ1YsQ0FBQzs7O1lBeElKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQiw2NUNBQTBDOzthQUU3Qzs7O1lBWkcsbUJBQW1CO1lBRG5CLFlBQVk7WUFKWixXQUFXO1lBTFUsTUFBTTtZQUF0QixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEFzc2V0LFxuICAgIEJhc2VMaXN0Q29tcG9uZW50LFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIERlbGV0aW9uUmVzdWx0LFxuICAgIEdldEFzc2V0TGlzdCxcbiAgICBMb2dpY2FsT3BlcmF0b3IsXG4gICAgTW9kYWxTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgU29ydE9yZGVyLFxuICAgIFRhZ0ZyYWdtZW50LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IFBhZ2luYXRpb25JbnN0YW5jZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgRU1QVFksIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmluYWxpemUsIG1hcCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFzc2V0LWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hc3NldC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hc3NldC1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEFzc2V0TGlzdENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZUxpc3RDb21wb25lbnQ8R2V0QXNzZXRMaXN0LlF1ZXJ5LCBHZXRBc3NldExpc3QuSXRlbXMsIEdldEFzc2V0TGlzdC5WYXJpYWJsZXM+XG4gICAgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNlYXJjaFRlcm0kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG4gICAgZmlsdGVyQnlUYWdzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VGFnRnJhZ21lbnRbXSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICB1cGxvYWRpbmcgPSBmYWxzZTtcbiAgICBhbGxUYWdzJDogT2JzZXJ2YWJsZTxUYWdGcmFnbWVudFtdPjtcbiAgICBwYWdpbmF0aW9uQ29uZmlnJDogT2JzZXJ2YWJsZTxQYWdpbmF0aW9uSW5zdGFuY2U+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlciwgcm91dGUpO1xuICAgICAgICBzdXBlci5zZXRRdWVyeUZuKFxuICAgICAgICAgICAgKC4uLmFyZ3M6IGFueVtdKSA9PiB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3QuZ2V0QXNzZXRMaXN0KC4uLmFyZ3MpLFxuICAgICAgICAgICAgZGF0YSA9PiBkYXRhLmFzc2V0cyxcbiAgICAgICAgICAgIChza2lwLCB0YWtlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRoaXMuc2VhcmNoVGVybSQudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFncyA9IHRoaXMuZmlsdGVyQnlUYWdzJC52YWx1ZT8ubWFwKHQgPT4gdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4oc2VhcmNoVGVybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB7IGNvbnRhaW5zOiBzZWFyY2hUZXJtIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IFNvcnRPcmRlci5ERVNDLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzT3BlcmF0b3I6IExvZ2ljYWxPcGVyYXRvci5BTkQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHRha2U6IDI1LCBza2lwOiAwIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZyQgPSBjb21iaW5lTGF0ZXN0KHRoaXMuaXRlbXNQZXJQYWdlJCwgdGhpcy5jdXJyZW50UGFnZSQsIHRoaXMudG90YWxJdGVtcyQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFtpdGVtc1BlclBhZ2UsIGN1cnJlbnRQYWdlLCB0b3RhbEl0ZW1zXSkgPT4gKHsgaXRlbXNQZXJQYWdlLCBjdXJyZW50UGFnZSwgdG90YWxJdGVtcyB9KSksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSQucGlwZShkZWJvdW5jZVRpbWUoMjUwKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyQnlUYWdzJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgICAgICAgdGhpcy5hbGxUYWdzJCA9IHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5nZXRUYWdMaXN0KCkubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS50YWdzLml0ZW1zKTtcbiAgICB9XG5cbiAgICBmaWxlc1NlbGVjdGVkKGZpbGVzOiBGaWxlW10pIHtcbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAgICAgLmNyZWF0ZUFzc2V0cyhmaWxlcylcbiAgICAgICAgICAgICAgICAucGlwZShmaW5hbGl6ZSgoKSA9PiAodGhpcy51cGxvYWRpbmcgPSBmYWxzZSkpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHsgY3JlYXRlQXNzZXRzIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3NDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIGNyZWF0ZUFzc2V0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXN1bHQuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fzc2V0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ01pbWVUeXBlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IHN1Y2Nlc3NDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnYXNzZXQubm90aWZ5LWNyZWF0ZS1hc3NldHMtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IHN1Y2Nlc3NDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVBc3NldHMoYXNzZXRzOiBBc3NldFtdKSB7XG4gICAgICAgIHRoaXMuc2hvd01vZGFsQW5kRGVsZXRlKGFzc2V0cy5tYXAoYSA9PiBhLmlkKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXN1bHQgPT09IERlbGV0aW9uUmVzdWx0LkRFTEVURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbdHJ1ZV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93TW9kYWxBbmREZWxldGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRzLm1hcChhID0+IGEuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICApLnBpcGUobWFwKHIgPT4gci5yZXN1bHQgPT09IERlbGV0aW9uUmVzdWx0LkRFTEVURUQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQXNzZXRzJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0Fzc2V0cycsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd01vZGFsQW5kRGVsZXRlKGFzc2V0SWRzOiBzdHJpbmdbXSwgbWVzc2FnZT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdjYXRhbG9nLmNvbmZpcm0tZGVsZXRlLWFzc2V0cycpLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uVmFyczoge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogYXNzZXRJZHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXMgPT4gKHJlcyA/IHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5kZWxldGVBc3NldHMoYXNzZXRJZHMsICEhbWVzc2FnZSkgOiBFTVBUWSkpLFxuICAgICAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLmRlbGV0ZUFzc2V0cyksXG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==