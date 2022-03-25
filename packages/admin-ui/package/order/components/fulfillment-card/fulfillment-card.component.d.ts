import { EventEmitter } from '@angular/core';
import { Fulfillment, OrderDetail } from '@vendure/admin-ui/core';
export declare class FulfillmentCardComponent {
    fulfillment: Fulfillment.Fragment | undefined;
    order: OrderDetail.Fragment;
    transitionState: EventEmitter<string>;
    nextSuggestedState(): string | undefined;
    nextOtherStates(): string[];
}
