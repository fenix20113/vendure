import { EventEmitter } from '@angular/core';
export declare class PaginationControlsComponent {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    pageChange: EventEmitter<number>;
}
