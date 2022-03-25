import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, delay, finalize, map, take as rxjsTake, takeUntil, tap } from 'rxjs/operators';
import { LogicalOperator, SortOrder, } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
import { NotificationService } from '../../../providers/notification/notification.service';
import { AssetSearchInputComponent } from '../asset-search-input/asset-search-input.component';
/**
 * A dialog which allows the creation and selection of assets.
 */
export class AssetPickerDialogComponent {
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.paginationConfig = {
            currentPage: 1,
            itemsPerPage: 25,
            totalItems: 1,
        };
        this.multiSelect = true;
        this.initialTags = [];
        this.selection = [];
        this.searchTerm$ = new BehaviorSubject(undefined);
        this.filterByTags$ = new BehaviorSubject(undefined);
        this.uploading = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.listQuery = this.dataService.product.getAssetList(this.paginationConfig.itemsPerPage, 0);
        this.allTags$ = this.dataService.product.getTagList().mapSingle(data => data.tags.items);
        this.assets$ = this.listQuery.stream$.pipe(tap(result => (this.paginationConfig.totalItems = result.assets.totalItems)), map(result => result.assets.items));
        this.searchTerm$.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe(() => {
            this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
        });
        this.filterByTags$.pipe(debounceTime(100), takeUntil(this.destroy$)).subscribe(() => {
            this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
        });
    }
    ngAfterViewInit() {
        if (0 < this.initialTags.length) {
            this.allTags$
                .pipe(rxjsTake(1), map(allTags => allTags.filter(tag => this.initialTags.includes(tag.value))), tap(tags => this.filterByTags$.next(tags)), delay(1))
                .subscribe(tags => this.assetSearchInputComponent.setTags(tags));
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    pageChange(page) {
        this.paginationConfig.currentPage = page;
        this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
    }
    itemsPerPageChange(itemsPerPage) {
        this.paginationConfig.itemsPerPage = itemsPerPage;
        this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
    }
    cancel() {
        this.resolveWith();
    }
    select() {
        this.resolveWith(this.selection);
    }
    createAssets(files) {
        if (files.length) {
            this.uploading = true;
            this.dataService.product
                .createAssets(files)
                .pipe(finalize(() => (this.uploading = false)))
                .subscribe(res => {
                this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
                this.notificationService.success(_('asset.notify-create-assets-success'), {
                    count: files.length,
                });
            });
        }
    }
    fetchPage(currentPage, itemsPerPage) {
        var _a;
        const take = +itemsPerPage;
        const skip = (currentPage - 1) * +itemsPerPage;
        const searchTerm = this.searchTerm$.value;
        const tags = (_a = this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(t => t.value);
        this.listQuery.ref.refetch({
            options: {
                skip,
                take,
                filter: {
                    name: {
                        contains: searchTerm,
                    },
                },
                sort: {
                    createdAt: SortOrder.DESC,
                },
                tags,
                tagsOperator: LogicalOperator.AND,
            },
        });
    }
}
AssetPickerDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-picker-dialog',
                template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        <span>{{ 'asset.select-assets' | translate }}</span>\n        <div class=\"flex-spacer\"></div>\n        <vdr-asset-file-input\n            class=\"ml3\"\n            (selectFiles)=\"createAssets($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".modal-content\"\n        ></vdr-asset-file-input>\n    </div>\n</ng-template>\n<vdr-asset-search-input\n    class=\"mb2\"\n    [tags]=\"allTags$ | async\"\n    (searchTermChange)=\"searchTerm$.next($event)\"\n    (tagsChange)=\"filterByTags$.next($event)\"\n    #assetSearchInputComponent\n></vdr-asset-search-input>\n<vdr-asset-gallery\n    [assets]=\"(assets$ | async)! | paginate: paginationConfig\"\n    [multiSelect]=\"multiSelect\"\n    (selectionChange)=\"selection = $event\"\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        (itemsPerPageChange)=\"itemsPerPageChange($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"paginationConfig.currentPage\"\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        [totalItems]=\"paginationConfig.totalItems\"\n        (pageChange)=\"pageChange($event)\"\n    ></vdr-pagination-controls>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"selection.length === 0\">\n        {{ 'asset.add-asset-with-count' | translate: { count: selection.length } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;height:70vh}.title-row{display:flex;align-items:center;justify-content:space-between}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between;flex-shrink:0}"]
            },] }
];
AssetPickerDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];
AssetPickerDialogComponent.propDecorators = {
    assetSearchInputComponent: [{ type: ViewChild, args: ['assetSearchInputComponent',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtcGlja2VyLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Fzc2V0LXBpY2tlci1kaWFsb2cvYXNzZXQtcGlja2VyLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBR1QsU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFdEUsT0FBTyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLElBQUksUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RyxPQUFPLEVBR0gsZUFBZSxFQUNmLFNBQVMsR0FFWixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUduRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMzRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUUvRjs7R0FFRztBQU9ILE1BQU0sT0FBTywwQkFBMEI7SUFzQm5DLFlBQW9CLFdBQXdCLEVBQVUsbUJBQXdDO1FBQTFFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQW5COUYscUJBQWdCLEdBQXVCO1lBQ25DLFdBQVcsRUFBRSxDQUFDO1lBQ2QsWUFBWSxFQUFFLEVBQUU7WUFDaEIsVUFBVSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQUlG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Q3RFLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTTtpQkFDdEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7SUFFTyxTQUFTLENBQUMsV0FBbUIsRUFBRSxZQUFvQjs7UUFDdkQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDL0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDMUMsTUFBTSxJQUFJLFNBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLDBDQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDdkIsT0FBTyxFQUFFO2dCQUNMLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixNQUFNLEVBQUU7b0JBQ0osSUFBSSxFQUFFO3dCQUNGLFFBQVEsRUFBRSxVQUFVO3FCQUN2QjtpQkFDSjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO2lCQUM1QjtnQkFDRCxJQUFJO2dCQUNKLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRzthQUNwQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQXJISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsb3REQUFtRDtnQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFkUSxXQUFXO1lBR1gsbUJBQW1COzs7d0NBb0J2QixTQUFTLFNBQUMsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSW5zdGFuY2UgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGVsYXksIGZpbmFsaXplLCBtYXAsIHRha2UgYXMgcnhqc1Rha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEFzc2V0LFxuICAgIEdldEFzc2V0TGlzdCxcbiAgICBMb2dpY2FsT3BlcmF0b3IsXG4gICAgU29ydE9yZGVyLFxuICAgIFRhZ0ZyYWdtZW50LFxufSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXJ5UmVzdWx0IH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9xdWVyeS1yZXN1bHQnO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3Byb3ZpZGVycy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXNzZXRTZWFyY2hJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uL2Fzc2V0LXNlYXJjaC1pbnB1dC9hc3NldC1zZWFyY2gtaW5wdXQuY29tcG9uZW50JztcblxuLyoqXG4gKiBBIGRpYWxvZyB3aGljaCBhbGxvd3MgdGhlIGNyZWF0aW9uIGFuZCBzZWxlY3Rpb24gb2YgYXNzZXRzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hc3NldC1waWNrZXItZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXNzZXQtcGlja2VyLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXNzZXQtcGlja2VyLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBc3NldFBpY2tlckRpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBEaWFsb2c8QXNzZXRbXT4ge1xuICAgIGFzc2V0cyQ6IE9ic2VydmFibGU8R2V0QXNzZXRMaXN0Lkl0ZW1zW10+O1xuICAgIGFsbFRhZ3MkOiBPYnNlcnZhYmxlPFRhZ0ZyYWdtZW50W10+O1xuICAgIHBhZ2luYXRpb25Db25maWc6IFBhZ2luYXRpb25JbnN0YW5jZSA9IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgIGl0ZW1zUGVyUGFnZTogMjUsXG4gICAgICAgIHRvdGFsSXRlbXM6IDEsXG4gICAgfTtcbiAgICBAVmlld0NoaWxkKCdhc3NldFNlYXJjaElucHV0Q29tcG9uZW50JylcbiAgICBwcml2YXRlIGFzc2V0U2VhcmNoSW5wdXRDb21wb25lbnQ6IEFzc2V0U2VhcmNoSW5wdXRDb21wb25lbnQ7XG5cbiAgICBtdWx0aVNlbGVjdCA9IHRydWU7XG4gICAgaW5pdGlhbFRhZ3M6IHN0cmluZ1tdID0gW107XG5cbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdD86IEFzc2V0W10pID0+IHZvaWQ7XG4gICAgc2VsZWN0aW9uOiBBc3NldFtdID0gW107XG4gICAgc2VhcmNoVGVybSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBmaWx0ZXJCeVRhZ3MkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUYWdGcmFnbWVudFtdIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIHVwbG9hZGluZyA9IGZhbHNlO1xuICAgIHByaXZhdGUgbGlzdFF1ZXJ5OiBRdWVyeVJlc3VsdDxHZXRBc3NldExpc3QuUXVlcnksIEdldEFzc2V0TGlzdC5WYXJpYWJsZXM+O1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxpc3RRdWVyeSA9IHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5nZXRBc3NldExpc3QodGhpcy5wYWdpbmF0aW9uQ29uZmlnLml0ZW1zUGVyUGFnZSwgMCk7XG4gICAgICAgIHRoaXMuYWxsVGFncyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3QuZ2V0VGFnTGlzdCgpLm1hcFNpbmdsZShkYXRhID0+IGRhdGEudGFncy5pdGVtcyk7XG4gICAgICAgIHRoaXMuYXNzZXRzJCA9IHRoaXMubGlzdFF1ZXJ5LnN0cmVhbSQucGlwZShcbiAgICAgICAgICAgIHRhcChyZXN1bHQgPT4gKHRoaXMucGFnaW5hdGlvbkNvbmZpZy50b3RhbEl0ZW1zID0gcmVzdWx0LmFzc2V0cy50b3RhbEl0ZW1zKSksXG4gICAgICAgICAgICBtYXAocmVzdWx0ID0+IHJlc3VsdC5hc3NldHMuaXRlbXMpLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm0kLnBpcGUoZGVib3VuY2VUaW1lKDI1MCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hQYWdlKHRoaXMucGFnaW5hdGlvbkNvbmZpZy5jdXJyZW50UGFnZSwgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLml0ZW1zUGVyUGFnZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZpbHRlckJ5VGFncyQucGlwZShkZWJvdW5jZVRpbWUoMTAwKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mZXRjaFBhZ2UodGhpcy5wYWdpbmF0aW9uQ29uZmlnLmN1cnJlbnRQYWdlLCB0aGlzLnBhZ2luYXRpb25Db25maWcuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoMCA8IHRoaXMuaW5pdGlhbFRhZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmFsbFRhZ3MkXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIHJ4anNUYWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICBtYXAoYWxsVGFncyA9PiBhbGxUYWdzLmZpbHRlcih0YWcgPT4gdGhpcy5pbml0aWFsVGFncy5pbmNsdWRlcyh0YWcudmFsdWUpKSksXG4gICAgICAgICAgICAgICAgICAgIHRhcCh0YWdzID0+IHRoaXMuZmlsdGVyQnlUYWdzJC5uZXh0KHRhZ3MpKSxcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkoMSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodGFncyA9PiB0aGlzLmFzc2V0U2VhcmNoSW5wdXRDb21wb25lbnQuc2V0VGFncyh0YWdzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwYWdlQ2hhbmdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmZldGNoUGFnZSh0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudFBhZ2UsIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5pdGVtc1BlclBhZ2UpO1xuICAgIH1cblxuICAgIGl0ZW1zUGVyUGFnZUNoYW5nZShpdGVtc1BlclBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcuaXRlbXNQZXJQYWdlID0gaXRlbXNQZXJQYWdlO1xuICAgICAgICB0aGlzLmZldGNoUGFnZSh0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudFBhZ2UsIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5pdGVtc1BlclBhZ2UpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnNlbGVjdGlvbik7XG4gICAgfVxuXG4gICAgY3JlYXRlQXNzZXRzKGZpbGVzOiBGaWxlW10pIHtcbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAgICAgLmNyZWF0ZUFzc2V0cyhmaWxlcylcbiAgICAgICAgICAgICAgICAucGlwZShmaW5hbGl6ZSgoKSA9PiAodGhpcy51cGxvYWRpbmcgPSBmYWxzZSkpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaFBhZ2UodGhpcy5wYWdpbmF0aW9uQ29uZmlnLmN1cnJlbnRQYWdlLCB0aGlzLnBhZ2luYXRpb25Db25maWcuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnYXNzZXQubm90aWZ5LWNyZWF0ZS1hc3NldHMtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogZmlsZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hQYWdlKGN1cnJlbnRQYWdlOiBudW1iZXIsIGl0ZW1zUGVyUGFnZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHRha2UgPSAraXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCBza2lwID0gKGN1cnJlbnRQYWdlIC0gMSkgKiAraXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGhpcy5zZWFyY2hUZXJtJC52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFncyA9IHRoaXMuZmlsdGVyQnlUYWdzJC52YWx1ZT8ubWFwKHQgPT4gdC52YWx1ZSk7XG4gICAgICAgIHRoaXMubGlzdFF1ZXJ5LnJlZi5yZWZldGNoKHtcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgIHRha2UsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zOiBzZWFyY2hUZXJtLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc29ydDoge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IFNvcnRPcmRlci5ERVNDLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGFncyxcbiAgICAgICAgICAgICAgICB0YWdzT3BlcmF0b3I6IExvZ2ljYWxPcGVyYXRvci5BTkQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=