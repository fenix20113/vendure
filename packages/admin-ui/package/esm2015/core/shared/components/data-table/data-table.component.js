import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, } from '@angular/core';
import { PaginationService } from 'ngx-pagination';
import { DataTableColumnComponent } from './data-table-column.component';
export class DataTableComponent {
    constructor() {
        this.allSelectChange = new EventEmitter();
        this.rowSelectChange = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.itemsPerPageChange = new EventEmitter();
    }
    ngAfterContentInit() {
        this.rowTemplate = this.templateRefs.last;
    }
    trackByFn(index, item) {
        if (item.id != null) {
            return item.id;
        }
        else {
            return index;
        }
    }
}
DataTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-data-table',
                template: "<ng-container *ngIf=\"!items || (items && items.length); else emptyPlaceholder\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th *ngIf=\"isRowSelectedFn\" class=\"align-middle\">\n                    <input\n                        type=\"checkbox\"\n                        clrCheckbox\n                        [checked]=\"allSelected\"\n                        (change)=\"allSelectChange.emit()\"\n                    />\n                </th>\n                <th *ngFor=\"let header of columns?.toArray()\" class=\"left\" [class.expand]=\"header.expand\">\n                    <ng-container *ngTemplateOutlet=\"header.template\"></ng-container>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr\n                *ngFor=\"\n                    let item of items\n                        | paginate\n                            : {\n                                  itemsPerPage: itemsPerPage,\n                                  currentPage: currentPage,\n                                  totalItems: totalItems\n                              };\n                    index as i;\n                    trackBy: trackByFn\n                \"\n            >\n                <td *ngIf=\"isRowSelectedFn\" class=\"align-middle\">\n                    <input\n                        type=\"checkbox\"\n                        clrCheckbox\n                        [checked]=\"isRowSelectedFn(item)\"\n                        (change)=\"rowSelectChange.emit(item)\"\n                    />\n                </td>\n                <ng-container\n                    *ngTemplateOutlet=\"rowTemplate; context: { item: item, index: i }\"\n                ></ng-container>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"table-footer\">\n        <vdr-items-per-page-controls\n            *ngIf=\"totalItems\"\n            [itemsPerPage]=\"itemsPerPage\"\n            (itemsPerPageChange)=\"itemsPerPageChange.emit($event)\"\n        ></vdr-items-per-page-controls>\n\n        <vdr-pagination-controls\n            *ngIf=\"totalItems\"\n            [currentPage]=\"currentPage\"\n            [itemsPerPage]=\"itemsPerPage\"\n            [totalItems]=\"totalItems\"\n            (pageChange)=\"pageChange.emit($event)\"\n        ></vdr-pagination-controls>\n    </div>\n</ng-container>\n<ng-template #emptyPlaceholder>\n    <vdr-empty-placeholder [emptyStateLabel]=\"emptyStateLabel\"></vdr-empty-placeholder>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [PaginationService],
                styles: [":host{display:block;max-width:100%;overflow:auto}thead th{position:sticky;top:24px;z-index:1}thead th.expand{width:100%}.table-footer{display:flex;align-items:baseline;justify-content:space-between;margin-top:6px}"]
            },] }
];
DataTableComponent.propDecorators = {
    items: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    currentPage: [{ type: Input }],
    totalItems: [{ type: Input }],
    allSelected: [{ type: Input }],
    isRowSelectedFn: [{ type: Input }],
    emptyStateLabel: [{ type: Input }],
    allSelectChange: [{ type: Output }],
    rowSelectChange: [{ type: Output }],
    pageChange: [{ type: Output }],
    itemsPerPageChange: [{ type: Output }],
    columns: [{ type: ContentChildren, args: [DataTableColumnComponent,] }],
    templateRefs: [{ type: ContentChildren, args: [TemplateRef,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2RhdGEtdGFibGUvZGF0YS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBRVQsZUFBZSxFQUNmLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEdBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFTekUsTUFBTSxPQUFPLGtCQUFrQjtJQVAvQjtRQWVjLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUMzQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7UUFDeEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQWdCOUQsQ0FBQztJQVhHLGtCQUFrQjtRQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFhLEVBQUUsSUFBUztRQUM5QixJQUFLLElBQVksQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFO1lBQzFCLE9BQVEsSUFBWSxDQUFDLEVBQUUsQ0FBQztTQUMzQjthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDOzs7WUFqQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLG8rRUFBd0M7Z0JBRXhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs7YUFDakM7OztvQkFFSSxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLE1BQU07OEJBQ04sTUFBTTt5QkFDTixNQUFNO2lDQUNOLE1BQU07c0JBQ04sZUFBZSxTQUFDLHdCQUF3QjsyQkFDeEMsZUFBZSxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGlvblNlcnZpY2UgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5cbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vZGF0YS10YWJsZS1jb2x1bW4uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZGF0YS10YWJsZScsXG4gICAgdGVtcGxhdGVVcmw6ICdkYXRhLXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZGF0YS10YWJsZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1BhZ2luYXRpb25TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQ29tcG9uZW50PFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQElucHV0KCkgaXRlbXM6IFRbXTtcbiAgICBASW5wdXQoKSBpdGVtc1BlclBhZ2U6IG51bWJlcjtcbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHRvdGFsSXRlbXM6IG51bWJlcjtcbiAgICBASW5wdXQoKSBhbGxTZWxlY3RlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBpc1Jvd1NlbGVjdGVkRm46IChpdGVtOiBUKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGVtcHR5U3RhdGVMYWJlbDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBhbGxTZWxlY3RDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIHJvd1NlbGVjdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcbiAgICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSBpdGVtc1BlclBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAQ29udGVudENoaWxkcmVuKERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudD47XG4gICAgQENvbnRlbnRDaGlsZHJlbihUZW1wbGF0ZVJlZikgdGVtcGxhdGVSZWZzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG4gICAgcm93VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm93VGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlUmVmcy5sYXN0O1xuICAgIH1cblxuICAgIHRyYWNrQnlGbihpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpIHtcbiAgICAgICAgaWYgKChpdGVtIGFzIGFueSkuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChpdGVtIGFzIGFueSkuaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=