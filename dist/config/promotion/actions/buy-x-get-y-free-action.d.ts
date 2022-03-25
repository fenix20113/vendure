import { LanguageCode } from '@vendure/common/lib/generated-types';
import { ID } from '@vendure/common/lib/shared-types';
import { PromotionItemAction } from '../promotion-action';
export declare const buyXGetYFreeAction: PromotionItemAction<{}, import("..").PromotionCondition<{
    amountX: {
        type: "int";
        defaultValue: number;
    };
    variantIdsX: {
        type: "ID";
        list: true;
        ui: {
            component: "product-selector-form-input";
        };
        label: {
            languageCode: LanguageCode.en;
            value: string;
        }[];
    };
    amountY: {
        type: "int";
        defaultValue: number;
    };
    variantIdsY: {
        type: "ID";
        list: true;
        ui: {
            component: "product-selector-form-input";
        };
        label: {
            languageCode: LanguageCode.en;
            value: string;
        }[];
    };
}, "buy_x_get_y_free", false | {
    freeItemIds: ID[];
}>[]>;
