import { OnChanges, SimpleChanges } from '@angular/core';
import { OrderDetail } from '@vendure/admin-ui/core';
export declare class FulfillmentDetailComponent implements OnChanges {
    fulfillmentId: string;
    order: OrderDetail.Fragment;
    customFields: Array<{
        key: string;
        value: any;
    }>;
    ngOnChanges(changes: SimpleChanges): void;
    get fulfillment(): OrderDetail.Fulfillments | undefined | null;
    get items(): Array<{
        name: string;
        quantity: number;
    }>;
    getCustomFields(): Array<{
        key: string;
        value: any;
    }>;
    customFieldIsObject(customField: unknown): boolean;
}
