import { EventEmitter } from '@angular/core';
/**
 * A control for setting the number of items per page in a paginated list.
 */
export declare class ItemsPerPageControlsComponent {
    itemsPerPage: number;
    itemsPerPageChange: EventEmitter<number>;
}
