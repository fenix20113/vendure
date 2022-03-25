import { AfterContentInit, EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { DataTableColumnComponent } from './data-table-column.component';
export declare class DataTableComponent<T> implements AfterContentInit {
    items: T[];
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
    allSelected: boolean;
    isRowSelectedFn: (item: T) => boolean;
    emptyStateLabel: string;
    allSelectChange: EventEmitter<void>;
    rowSelectChange: EventEmitter<T>;
    pageChange: EventEmitter<number>;
    itemsPerPageChange: EventEmitter<number>;
    columns: QueryList<DataTableColumnComponent>;
    templateRefs: QueryList<TemplateRef<any>>;
    rowTemplate: TemplateRef<any>;
    ngAfterContentInit(): void;
    trackByFn(index: number, item: any): any;
}
