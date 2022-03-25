import { OnInit } from '@angular/core';
import { CustomFieldConfig, OrderDetail } from '@vendure/admin-ui/core';
export declare class OrderTableComponent implements OnInit {
    order: OrderDetail.Fragment;
    orderLineCustomFields: CustomFieldConfig[];
    orderLineCustomFieldsVisible: boolean;
    get visibleOrderLineCustomFields(): CustomFieldConfig[];
    get showElided(): boolean;
    ngOnInit(): void;
    toggleOrderLineCustomFields(): void;
    getLineDiscounts(line: OrderDetail.Lines): ({
        __typename?: "Discount" | undefined;
    } & {
        __typename?: "Discount" | undefined;
    } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Discount, "description" | "adjustmentSource" | "amount" | "amountWithTax" | "type">)[];
    getLineCustomFields(line: OrderDetail.Lines): Array<{
        config: CustomFieldConfig;
        value: any;
    }>;
    getPromotionLink(promotion: OrderDetail.Discounts): any[];
    getCouponCodeForAdjustment(order: OrderDetail.Fragment, promotionAdjustment: OrderDetail.Discounts): string | undefined;
}
