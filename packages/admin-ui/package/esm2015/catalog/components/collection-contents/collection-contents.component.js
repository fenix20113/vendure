import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil, tap, } from 'rxjs/operators';
import { DataService } from '@vendure/admin-ui/core';
export class CollectionContentsComponent {
    constructor(route, router, dataService) {
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.filterTermControl = new FormControl('');
        this.collectionIdChange$ = new BehaviorSubject('');
        this.refresh$ = new BehaviorSubject(true);
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.contentsCurrentPage$ = this.route.paramMap.pipe(map(qpm => qpm.get('contentsPage')), map(page => (!page ? 1 : +page)), startWith(1), distinctUntilChanged());
        this.contentsItemsPerPage$ = this.route.paramMap.pipe(map(qpm => qpm.get('contentsPerPage')), map(perPage => (!perPage ? 10 : +perPage)), startWith(10), distinctUntilChanged());
        const filterTerm$ = this.filterTermControl.valueChanges.pipe(debounceTime(250), tap(() => this.setContentsPageNumber(1)), startWith(''));
        const collection$ = combineLatest(this.collectionIdChange$, this.contentsCurrentPage$, this.contentsItemsPerPage$, filterTerm$, this.refresh$).pipe(takeUntil(this.destroy$), switchMap(([id, currentPage, itemsPerPage, filterTerm]) => {
            const take = itemsPerPage;
            const skip = (currentPage - 1) * itemsPerPage;
            if (id) {
                return this.dataService.collection
                    .getCollectionContents(id, take, skip, filterTerm)
                    .mapSingle(data => data.collection);
            }
            else {
                return of(null);
            }
        }));
        this.contents$ = collection$.pipe(map(result => (result ? result.productVariants.items : [])));
        this.contentsTotalItems$ = collection$.pipe(map(result => (result ? result.productVariants.totalItems : 0)));
    }
    ngOnChanges(changes) {
        if ('collectionId' in changes) {
            this.collectionIdChange$.next(changes.collectionId.currentValue);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setContentsPageNumber(page) {
        this.setParam('contentsPage', page);
    }
    setContentsItemsPerPage(perPage) {
        this.setParam('contentsPerPage', perPage);
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
}
CollectionContentsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-contents',
                template: "<div class=\"contents-header\">\n    <div class=\"header-title-row\">\n        <ng-container\n            *ngTemplateOutlet=\"headerTemplate; context: { $implicit: contentsTotalItems$ | async }\"\n        ></ng-container>\n    </div>\n    <input\n        type=\"text\"\n        [placeholder]=\"'catalog.filter-by-name' | translate\"\n        [formControl]=\"filterTermControl\"\n    />\n</div>\n<vdr-data-table\n    [items]=\"contents$ | async\"\n    [itemsPerPage]=\"contentsItemsPerPage$ | async\"\n    [totalItems]=\"contentsTotalItems$ | async\"\n    [currentPage]=\"contentsCurrentPage$ | async\"\n    (pageChange)=\"setContentsPageNumber($event)\"\n    (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n>\n    <ng-template let-variant=\"item\">\n        <td class=\"left align-middle\">{{ variant.name }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['/catalog/products', variant.productId, { tab: 'variants' }]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".contents-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:1;border-bottom:1px solid var(--color-component-border-200)}.contents-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.contents-header .clr-input{width:100%}:host ::ng-deep table{margin-top:-1px}"]
            },] }
];
CollectionContentsComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: DataService }
];
CollectionContentsComponent.propDecorators = {
    collectionId: [{ type: Input }],
    headerTemplate: [{ type: ContentChild, args: [TemplateRef, { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1jb250ZW50cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi1jb250ZW50cy9jb2xsZWN0aW9uLWNvbnRlbnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUtMLFdBQVcsR0FDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9FLE9BQU8sRUFDSCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxHQUFHLEdBQ04sTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRckQsTUFBTSxPQUFPLDJCQUEyQjtJQWFwQyxZQUFvQixLQUFxQixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUEvRSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUxuRyxzQkFBaUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyx3QkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUN0RCxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFDOUMsYUFBUSxH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IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIGRlYm91bmNlVGltZSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgICBtYXAsXG4gICAgc3RhcnRXaXRoLFxuICAgIHN3aXRjaE1hcCxcbiAgICB0YWtlVW50aWwsXG4gICAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEdldENvbGxlY3Rpb25Db250ZW50cyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY29sbGVjdGlvbi1jb250ZW50cycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbGxlY3Rpb24tY29udGVudHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbGxlY3Rpb24tY29udGVudHMuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkNvbnRlbnRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgY29sbGVjdGlvbklkOiBzdHJpbmc7XG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IHRydWUgfSkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb250ZW50cyQ6IE9ic2VydmFibGU8R2V0Q29sbGVjdGlvbkNvbnRlbnRzLkl0ZW1zW10+O1xuICAgIGNvbnRlbnRzVG90YWxJdGVtcyQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgICBjb250ZW50c0l0ZW1zUGVyUGFnZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgICBjb250ZW50c0N1cnJlbnRQYWdlJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGZpbHRlclRlcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICBwcml2YXRlIGNvbGxlY3Rpb25JZENoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICAgIHByaXZhdGUgcmVmcmVzaCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudHNDdXJyZW50UGFnZSQgPSB0aGlzLnJvdXRlLnBhcmFtTWFwLnBpcGUoXG4gICAgICAgICAgICBtYXAocXBtID0+IHFwbS5nZXQoJ2NvbnRlbnRzUGFnZScpKSxcbiAgICAgICAgICAgIG1hcChwYWdlID0+ICghcGFnZSA/IDEgOiArcGFnZSkpLFxuICAgICAgICAgICAgc3RhcnRXaXRoKDEpLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNvbnRlbnRzSXRlbXNQZXJQYWdlJCA9IHRoaXMucm91dGUucGFyYW1NYXAucGlwZShcbiAgICAgICAgICAgIG1hcChxcG0gPT4gcXBtLmdldCgnY29udGVudHNQZXJQYWdlJykpLFxuICAgICAgICAgICAgbWFwKHBlclBhZ2UgPT4gKCFwZXJQYWdlID8gMTAgOiArcGVyUGFnZSkpLFxuICAgICAgICAgICAgc3RhcnRXaXRoKDEwKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyVGVybSQgPSB0aGlzLmZpbHRlclRlcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDI1MCksXG4gICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5zZXRDb250ZW50c1BhZ2VOdW1iZXIoMSkpLFxuICAgICAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBjb2xsZWN0aW9uJCA9IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25JZENoYW5nZSQsXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRzQ3VycmVudFBhZ2UkLFxuICAgICAgICAgICAgdGhpcy5jb250ZW50c0l0ZW1zUGVyUGFnZSQsXG4gICAgICAgICAgICBmaWx0ZXJUZXJtJCxcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCQsXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoW2lkLCBjdXJyZW50UGFnZSwgaXRlbXNQZXJQYWdlLCBmaWx0ZXJUZXJtXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRha2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpcCA9IChjdXJyZW50UGFnZSAtIDEpICogaXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29sbGVjdGlvbkNvbnRlbnRzKGlkLCB0YWtlLCBza2lwLCBmaWx0ZXJUZXJtKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcFNpbmdsZShkYXRhID0+IGRhdGEuY29sbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY29udGVudHMkID0gY29sbGVjdGlvbiQucGlwZShtYXAocmVzdWx0ID0+IChyZXN1bHQgPyByZXN1bHQucHJvZHVjdFZhcmlhbnRzLml0ZW1zIDogW10pKSk7XG4gICAgICAgIHRoaXMuY29udGVudHNUb3RhbEl0ZW1zJCA9IGNvbGxlY3Rpb24kLnBpcGUoXG4gICAgICAgICAgICBtYXAocmVzdWx0ID0+IChyZXN1bHQgPyByZXN1bHQucHJvZHVjdFZhcmlhbnRzLnRvdGFsSXRlbXMgOiAwKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoJ2NvbGxlY3Rpb25JZCcgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uSWRDaGFuZ2UkLm5leHQoY2hhbmdlcy5jb2xsZWN0aW9uSWQuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHNldENvbnRlbnRzUGFnZU51bWJlcihwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbSgnY29udGVudHNQYWdlJywgcGFnZSk7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudHNJdGVtc1BlclBhZ2UocGVyUGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW0oJ2NvbnRlbnRzUGVyUGFnZScsIHBlclBhZ2UpO1xuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaCQubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBhcmFtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nLCB7IC4uLnRoaXMucm91dGUuc25hcHNob3QucGFyYW1zLCBba2V5XTogdmFsdWUgfV0sIHtcbiAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXG4gICAgICAgICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiAnbWVyZ2UnLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=