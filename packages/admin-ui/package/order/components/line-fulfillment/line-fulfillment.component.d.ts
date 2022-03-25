import { OnChanges, SimpleChanges } from '@angular/core';
import { OrderDetail } from '@vendure/admin-ui/core';
export declare type FulfillmentStatus = 'full' | 'partial' | 'none';
export declare class LineFulfillmentComponent implements OnChanges {
    line: OrderDetail.Lines;
    orderState: string;
    fulfilledCount: number;
    fulfillmentStatus: FulfillmentStatus;
    fulfillments: Array<{
        count: number;
        fulfillment: OrderDetail.Fulfillments;
    }>;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Returns the number of items in an OrderLine which are fulfilled.
     */
    private getDeliveredCount;
    private getFulfillmentStatus;
    private getFulfillments;
}
