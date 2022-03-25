import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { concat, merge, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, mapTo, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
export class ProductSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.searchInput$ = new Subject();
        this.searchLoading = false;
        this.productSelected = new EventEmitter();
    }
    ngOnInit() {
        this.initSearchResults();
    }
    initSearchResults() {
        const searchItems$ = this.searchInput$.pipe(debounceTime(200), distinctUntilChanged(), tap(() => (this.searchLoading = true)), switchMap(term => {
            if (!term) {
                return of([]);
            }
            return this.dataService.product
                .productSelectorSearch(term, 10)
                .mapSingle(result => result.search.items);
        }), tap(() => (this.searchLoading = false)));
        const clear$ = this.productSelected.pipe(mapTo([]));
        this.searchResults$ = concat(of([]), merge(searchItems$, clear$));
    }
    selectResult(product) {
        if (product) {
            this.productSelected.emit(product);
            this.ngSelect.clearModel();
        }
    }
}
ProductSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-selector',
                template: "<ng-select\n    #autoComplete\n    [items]=\"searchResults$ | async\"\n    [addTag]=\"false\"\n    [multiple]=\"false\"\n    [hideSelected]=\"true\"\n    [loading]=\"searchLoading\"\n    [typeahead]=\"searchInput$\"\n    [appendTo]=\"'body'\"\n    [placeholder]=\"'settings.search-by-product-name-or-sku' | translate\"\n    (change)=\"selectResult($event)\"\n>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <img [src]=\"item.productAsset | assetPreview: 32\">\n        {{ item.productVariantName }}\n        <small class=\"sku\">{{ item.sku }}</small>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.sku{margin-left:12px;color:var(--color-grey-500)}"]
            },] }
];
ProductSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
ProductSelectorComponent.propDecorators = {
    productSelected: [{ type: Output }],
    ngSelect: [{ type: ViewChild, args: ['autoComplete', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3Byb2R1Y3Qtc2VsZWN0b3IvcHJvZHVjdC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFHekcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBUW5FLE1BQU0sT0FBTyx3QkFBd0I7SUFRakMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFQNUMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRVosb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBK0IsQ0FBQztJQUk3QixDQUFDO0lBRWhELFFBQVE7UUFDSixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU8saUJBQWlCO1FBQ3JCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUN2QyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLG9CQUFvQixFQUFFLEVBQ3RCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFDdEMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqQjtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO2lCQUMxQixxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2lCQUMvQixTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FDMUMsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUFxQztRQUM5QyxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7WUE3Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLHFtQkFBZ0Q7Z0JBRWhELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBUFEsV0FBVzs7OzhCQVlmLE1BQU07dUJBRU4sU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgY29uY2F0LCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcFRvLCBzd2l0Y2hNYXAsIHRhcCwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQcm9kdWN0U2VsZWN0b3JTZWFyY2ggfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcHJvZHVjdC1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3Qtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Byb2R1Y3Qtc2VsZWN0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFNlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzZWFyY2hJbnB1dCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgc2VhcmNoTG9hZGluZyA9IGZhbHNlO1xuICAgIHNlYXJjaFJlc3VsdHMkOiBPYnNlcnZhYmxlPFByb2R1Y3RTZWxlY3RvclNlYXJjaC5JdGVtc1tdPjtcbiAgICBAT3V0cHV0KCkgcHJvZHVjdFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxQcm9kdWN0U2VsZWN0b3JTZWFyY2guSXRlbXM+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdhdXRvQ29tcGxldGUnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHByaXZhdGUgbmdTZWxlY3Q6IE5nU2VsZWN0Q29tcG9uZW50O1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdFNlYXJjaFJlc3VsdHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTZWFyY2hSZXN1bHRzKCkge1xuICAgICAgICBjb25zdCBzZWFyY2hJdGVtcyQgPSB0aGlzLnNlYXJjaElucHV0JC5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLnNlYXJjaExvYWRpbmcgPSB0cnVlKSksXG4gICAgICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0ZXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLnByb2R1Y3RTZWxlY3RvclNlYXJjaCh0ZXJtLCAxMClcbiAgICAgICAgICAgICAgICAgICAgLm1hcFNpbmdsZShyZXN1bHQgPT4gcmVzdWx0LnNlYXJjaC5pdGVtcyk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiAodGhpcy5zZWFyY2hMb2FkaW5nID0gZmFsc2UpKSxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBjbGVhciQgPSB0aGlzLnByb2R1Y3RTZWxlY3RlZC5waXBlKG1hcFRvKFtdKSk7XG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyQgPSBjb25jYXQob2YoW10pLCBtZXJnZShzZWFyY2hJdGVtcyQsIGNsZWFyJCkpO1xuICAgIH1cblxuICAgIHNlbGVjdFJlc3VsdChwcm9kdWN0PzogUHJvZHVjdFNlbGVjdG9yU2VhcmNoLkl0ZW1zKSB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RTZWxlY3RlZC5lbWl0KHByb2R1Y3QpO1xuICAgICAgICAgICAgdGhpcy5uZ1NlbGVjdC5jbGVhck1vZGVsKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=