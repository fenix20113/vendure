import { OnChanges } from '@angular/core';
import { OrderDetail, OrderDetailFragment } from '@vendure/admin-ui/core';
export declare class ModificationDetailComponent implements OnChanges {
    order: OrderDetailFragment;
    modification: OrderDetail.Modifications;
    private addedItems;
    private removedItems;
    ngOnChanges(): void;
    getSurcharge(id: string): ({
        __typename?: "Surcharge" | undefined;
    } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Surcharge, "id" | "description" | "sku" | "taxRate" | "price" | "priceWithTax">) | undefined;
    getAddedItems(): {
        name: string;
        quantity: number;
    }[];
    getRemovedItems(): {
        name: string;
        quantity: number;
    }[];
    private getModifiedLines;
    private getOrderLineAndItem;
}
