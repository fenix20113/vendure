/** This file was generated by the graphql-errors-plugin, which is part of the "codegen" npm script. */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    JSON: any;
    DateTime: any;
    Upload: any;
};
export declare class ErrorResult {
    readonly __typename: string;
    readonly errorCode: string;
    message: Scalars['String'];
}
export declare class MimeTypeError extends ErrorResult {
    fileName: Scalars['String'];
    mimeType: Scalars['String'];
    readonly __typename = "MimeTypeError";
    readonly errorCode: any;
    readonly message = "MIME_TYPE_ERROR";
    constructor(fileName: Scalars['String'], mimeType: Scalars['String']);
}
export declare class LanguageNotAvailableError extends ErrorResult {
    languageCode: Scalars['String'];
    readonly __typename = "LanguageNotAvailableError";
    readonly errorCode: any;
    readonly message = "LANGUAGE_NOT_AVAILABLE_ERROR";
    constructor(languageCode: Scalars['String']);
}
export declare class ChannelDefaultLanguageError extends ErrorResult {
    language: Scalars['String'];
    channelCode: Scalars['String'];
    readonly __typename = "ChannelDefaultLanguageError";
    readonly errorCode: any;
    readonly message = "CHANNEL_DEFAULT_LANGUAGE_ERROR";
    constructor(language: Scalars['String'], channelCode: Scalars['String']);
}
export declare class SettlePaymentError extends ErrorResult {
    paymentErrorMessage: Scalars['String'];
    readonly __typename = "SettlePaymentError";
    readonly errorCode: any;
    readonly message = "SETTLE_PAYMENT_ERROR";
    constructor(paymentErrorMessage: Scalars['String']);
}
export declare class EmptyOrderLineSelectionError extends ErrorResult {
    readonly __typename = "EmptyOrderLineSelectionError";
    readonly errorCode: any;
    readonly message = "EMPTY_ORDER_LINE_SELECTION_ERROR";
    constructor();
}
export declare class ItemsAlreadyFulfilledError extends ErrorResult {
    readonly __typename = "ItemsAlreadyFulfilledError";
    readonly errorCode: any;
    readonly message = "ITEMS_ALREADY_FULFILLED_ERROR";
    constructor();
}
export declare class InvalidFulfillmentHandlerError extends ErrorResult {
    readonly __typename = "InvalidFulfillmentHandlerError";
    readonly errorCode: any;
    readonly message = "INVALID_FULFILLMENT_HANDLER_ERROR";
    constructor();
}
export declare class CreateFulfillmentError extends ErrorResult {
    fulfillmentHandlerError: Scalars['String'];
    readonly __typename = "CreateFulfillmentError";
    readonly errorCode: any;
    readonly message = "CREATE_FULFILLMENT_ERROR";
    constructor(fulfillmentHandlerError: Scalars['String']);
}
export declare class InsufficientStockOnHandError extends ErrorResult {
    productVariantId: Scalars['ID'];
    productVariantName: Scalars['String'];
    stockOnHand: Scalars['Int'];
    readonly __typename = "InsufficientStockOnHandError";
    readonly errorCode: any;
    readonly message = "INSUFFICIENT_STOCK_ON_HAND_ERROR";
    constructor(productVariantId: Scalars['ID'], productVariantName: Scalars['String'], stockOnHand: Scalars['Int']);
}
export declare class MultipleOrderError extends ErrorResult {
    readonly __typename = "MultipleOrderError";
    readonly errorCode: any;
    readonly message = "MULTIPLE_ORDER_ERROR";
    constructor();
}
export declare class CancelActiveOrderError extends ErrorResult {
    orderState: Scalars['String'];
    readonly __typename = "CancelActiveOrderError";
    readonly errorCode: any;
    readonly message = "CANCEL_ACTIVE_ORDER_ERROR";
    constructor(orderState: Scalars['String']);
}
export declare class PaymentOrderMismatchError extends ErrorResult {
    readonly __typename = "PaymentOrderMismatchError";
    readonly errorCode: any;
    readonly message = "PAYMENT_ORDER_MISMATCH_ERROR";
    constructor();
}
export declare class RefundOrderStateError extends ErrorResult {
    orderState: Scalars['String'];
    readonly __typename = "RefundOrderStateError";
    readonly errorCode: any;
    readonly message = "REFUND_ORDER_STATE_ERROR";
    constructor(orderState: Scalars['String']);
}
export declare class NothingToRefundError extends ErrorResult {
    readonly __typename = "NothingToRefundError";
    readonly errorCode: any;
    readonly message = "NOTHING_TO_REFUND_ERROR";
    constructor();
}
export declare class AlreadyRefundedError extends ErrorResult {
    refundId: Scalars['ID'];
    readonly __typename = "AlreadyRefundedError";
    readonly errorCode: any;
    readonly message = "ALREADY_REFUNDED_ERROR";
    constructor(refundId: Scalars['ID']);
}
export declare class QuantityTooGreatError extends ErrorResult {
    readonly __typename = "QuantityTooGreatError";
    readonly errorCode: any;
    readonly message = "QUANTITY_TOO_GREAT_ERROR";
    constructor();
}
export declare class RefundStateTransitionError extends ErrorResult {
    transitionError: Scalars['String'];
    fromState: Scalars['String'];
    toState: Scalars['String'];
    readonly __typename = "RefundStateTransitionError";
    readonly errorCode: any;
    readonly message = "REFUND_STATE_TRANSITION_ERROR";
    constructor(transitionError: Scalars['String'], fromState: Scalars['String'], toState: Scalars['String']);
}
export declare class PaymentStateTransitionError extends ErrorResult {
    transitionError: Scalars['String'];
    fromState: Scalars['String'];
    toState: Scalars['String'];
    readonly __typename = "PaymentStateTransitionError";
    readonly errorCode: any;
    readonly message = "PAYMENT_STATE_TRANSITION_ERROR";
    constructor(transitionError: Scalars['String'], fromState: Scalars['String'], toState: Scalars['String']);
}
export declare class FulfillmentStateTransitionError extends ErrorResult {
    transitionError: Scalars['String'];
    fromState: Scalars['String'];
    toState: Scalars['String'];
    readonly __typename = "FulfillmentStateTransitionError";
    readonly errorCode: any;
    readonly message = "FULFILLMENT_STATE_TRANSITION_ERROR";
    constructor(transitionError: Scalars['String'], fromState: Scalars['String'], toState: Scalars['String']);
}
export declare class OrderModificationStateError extends ErrorResult {
    readonly __typename = "OrderModificationStateError";
    readonly errorCode: any;
    readonly message = "ORDER_MODIFICATION_STATE_ERROR";
    constructor();
}
export declare class NoChangesSpecifiedError extends ErrorResult {
    readonly __typename = "NoChangesSpecifiedError";
    readonly errorCode: any;
    readonly message = "NO_CHANGES_SPECIFIED_ERROR";
    constructor();
}
export declare class PaymentMethodMissingError extends ErrorResult {
    readonly __typename = "PaymentMethodMissingError";
    readonly errorCode: any;
    readonly message = "PAYMENT_METHOD_MISSING_ERROR";
    constructor();
}
export declare class RefundPaymentIdMissingError extends ErrorResult {
    readonly __typename = "RefundPaymentIdMissingError";
    readonly errorCode: any;
    readonly message = "REFUND_PAYMENT_ID_MISSING_ERROR";
    constructor();
}
export declare class ManualPaymentStateError extends ErrorResult {
    readonly __typename = "ManualPaymentStateError";
    readonly errorCode: any;
    readonly message = "MANUAL_PAYMENT_STATE_ERROR";
    constructor();
}
export declare class ProductOptionInUseError extends ErrorResult {
    optionGroupCode: Scalars['String'];
    productVariantCount: Scalars['Int'];
    readonly __typename = "ProductOptionInUseError";
    readonly errorCode: any;
    readonly message = "PRODUCT_OPTION_IN_USE_ERROR";
    constructor(optionGroupCode: Scalars['String'], productVariantCount: Scalars['Int']);
}
export declare class MissingConditionsError extends ErrorResult {
    readonly __typename = "MissingConditionsError";
    readonly errorCode: any;
    readonly message = "MISSING_CONDITIONS_ERROR";
    constructor();
}
export declare class NativeAuthStrategyError extends ErrorResult {
    readonly __typename = "NativeAuthStrategyError";
    readonly errorCode: any;
    readonly message = "NATIVE_AUTH_STRATEGY_ERROR";
    constructor();
}
export declare class InvalidCredentialsError extends ErrorResult {
    authenticationError: Scalars['String'];
    readonly __typename = "InvalidCredentialsError";
    readonly errorCode: any;
    readonly message = "INVALID_CREDENTIALS_ERROR";
    constructor(authenticationError: Scalars['String']);
}
export declare class OrderStateTransitionError extends ErrorResult {
    transitionError: Scalars['String'];
    fromState: Scalars['String'];
    toState: Scalars['String'];
    readonly __typename = "OrderStateTransitionError";
    readonly errorCode: any;
    readonly message = "ORDER_STATE_TRANSITION_ERROR";
    constructor(transitionError: Scalars['String'], fromState: Scalars['String'], toState: Scalars['String']);
}
export declare class EmailAddressConflictError extends ErrorResult {
    readonly __typename = "EmailAddressConflictError";
    readonly errorCode: any;
    readonly message = "EMAIL_ADDRESS_CONFLICT_ERROR";
    constructor();
}
export declare class OrderLimitError extends ErrorResult {
    maxItems: Scalars['Int'];
    readonly __typename = "OrderLimitError";
    readonly errorCode: any;
    readonly message = "ORDER_LIMIT_ERROR";
    constructor(maxItems: Scalars['Int']);
}
export declare class NegativeQuantityError extends ErrorResult {
    readonly __typename = "NegativeQuantityError";
    readonly errorCode: any;
    readonly message = "NEGATIVE_QUANTITY_ERROR";
    constructor();
}
export declare class InsufficientStockError extends ErrorResult {
    quantityAvailable: Scalars['Int'];
    order: any;
    readonly __typename = "InsufficientStockError";
    readonly errorCode: any;
    readonly message = "INSUFFICIENT_STOCK_ERROR";
    constructor(quantityAvailable: Scalars['Int'], order: any);
}
export declare const adminErrorOperationTypeResolvers: {
    CreateAssetResult: {
        __resolveType(value: any): any;
    };
    NativeAuthenticationResult: {
        __resolveType(value: any): any;
    };
    AuthenticationResult: {
        __resolveType(value: any): any;
    };
    CreateChannelResult: {
        __resolveType(value: any): any;
    };
    UpdateChannelResult: {
        __resolveType(value: any): any;
    };
    CreateCustomerResult: {
        __resolveType(value: any): any;
    };
    UpdateCustomerResult: {
        __resolveType(value: any): any;
    };
    UpdateGlobalSettingsResult: {
        __resolveType(value: any): any;
    };
    SettlePaymentResult: {
        __resolveType(value: any): any;
    };
    AddFulfillmentToOrderResult: {
        __resolveType(value: any): any;
    };
    CancelOrderResult: {
        __resolveType(value: any): any;
    };
    RefundOrderResult: {
        __resolveType(value: any): any;
    };
    SettleRefundResult: {
        __resolveType(value: any): any;
    };
    TransitionOrderToStateResult: {
        __resolveType(value: any): any;
    };
    TransitionFulfillmentToStateResult: {
        __resolveType(value: any): any;
    };
    TransitionPaymentToStateResult: {
        __resolveType(value: any): any;
    };
    ModifyOrderResult: {
        __resolveType(value: any): any;
    };
    AddManualPaymentToOrderResult: {
        __resolveType(value: any): any;
    };
    RemoveOptionGroupFromProductResult: {
        __resolveType(value: any): any;
    };
    CreatePromotionResult: {
        __resolveType(value: any): any;
    };
    UpdatePromotionResult: {
        __resolveType(value: any): any;
    };
};
