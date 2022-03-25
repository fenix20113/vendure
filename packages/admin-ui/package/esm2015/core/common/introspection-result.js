// tslint:disable
const result = {
    "possibleTypes": {
        "CreateAssetResult": [
            "Asset",
            "MimeTypeError"
        ],
        "NativeAuthenticationResult": [
            "CurrentUser",
            "InvalidCredentialsError",
            "NativeAuthStrategyError"
        ],
        "AuthenticationResult": [
            "CurrentUser",
            "InvalidCredentialsError"
        ],
        "CreateChannelResult": [
            "Channel",
            "LanguageNotAvailableError"
        ],
        "UpdateChannelResult": [
            "Channel",
            "LanguageNotAvailableError"
        ],
        "CreateCustomerResult": [
            "Customer",
            "EmailAddressConflictError"
        ],
        "UpdateCustomerResult": [
            "Customer",
            "EmailAddressConflictError"
        ],
        "UpdateGlobalSettingsResult": [
            "GlobalSettings",
            "ChannelDefaultLanguageError"
        ],
        "TransitionOrderToStateResult": [
            "Order",
            "OrderStateTransitionError"
        ],
        "SettlePaymentResult": [
            "Payment",
            "SettlePaymentError",
            "PaymentStateTransitionError",
            "OrderStateTransitionError"
        ],
        "AddFulfillmentToOrderResult": [
            "Fulfillment",
            "EmptyOrderLineSelectionError",
            "ItemsAlreadyFulfilledError",
            "InsufficientStockOnHandError",
            "InvalidFulfillmentHandlerError",
            "FulfillmentStateTransitionError",
            "CreateFulfillmentError"
        ],
        "CancelOrderResult": [
            "Order",
            "EmptyOrderLineSelectionError",
            "QuantityTooGreatError",
            "MultipleOrderError",
            "CancelActiveOrderError",
            "OrderStateTransitionError"
        ],
        "RefundOrderResult": [
            "Refund",
            "QuantityTooGreatError",
            "NothingToRefundError",
            "OrderStateTransitionError",
            "MultipleOrderError",
            "PaymentOrderMismatchError",
            "RefundOrderStateError",
            "AlreadyRefundedError",
            "RefundStateTransitionError"
        ],
        "SettleRefundResult": [
            "Refund",
            "RefundStateTransitionError"
        ],
        "TransitionFulfillmentToStateResult": [
            "Fulfillment",
            "FulfillmentStateTransitionError"
        ],
        "TransitionPaymentToStateResult": [
            "Payment",
            "PaymentStateTransitionError"
        ],
        "ModifyOrderResult": [
            "Order",
            "NoChangesSpecifiedError",
            "OrderModificationStateError",
            "PaymentMethodMissingError",
            "RefundPaymentIdMissingError",
            "OrderLimitError",
            "NegativeQuantityError",
            "InsufficientStockError"
        ],
        "AddManualPaymentToOrderResult": [
            "Order",
            "ManualPaymentStateError"
        ],
        "RemoveOptionGroupFromProductResult": [
            "Product",
            "ProductOptionInUseError"
        ],
        "CreatePromotionResult": [
            "Promotion",
            "MissingConditionsError"
        ],
        "UpdatePromotionResult": [
            "Promotion",
            "MissingConditionsError"
        ],
        "StockMovement": [
            "StockAdjustment",
            "Allocation",
            "Sale",
            "Cancellation",
            "Return",
            "Release"
        ],
        "StockMovementItem": [
            "StockAdjustment",
            "Allocation",
            "Sale",
            "Cancellation",
            "Return",
            "Release"
        ],
        "PaginatedList": [
            "AdministratorList",
            "CustomerGroupList",
            "JobList",
            "PaymentMethodList",
            "AssetList",
            "CollectionList",
            "ProductVariantList",
            "CountryList",
            "CustomerList",
            "FacetList",
            "HistoryEntryList",
            "OrderList",
            "ProductList",
            "PromotionList",
            "RoleList",
            "ShippingMethodList",
            "TagList",
            "TaxRateList"
        ],
        "Node": [
            "Administrator",
            "Asset",
            "Collection",
            "Customer",
            "Facet",
            "HistoryEntry",
            "Job",
            "Order",
            "Fulfillment",
            "Payment",
            "OrderModification",
            "PaymentMethod",
            "Product",
            "ProductVariant",
            "StockAdjustment",
            "Allocation",
            "Sale",
            "Cancellation",
            "Return",
            "Release",
            "Address",
            "Channel",
            "Country",
            "CustomerGroup",
            "FacetValue",
            "OrderItem",
            "OrderLine",
            "Refund",
            "Surcharge",
            "ProductOptionGroup",
            "ProductOption",
            "Promotion",
            "Role",
            "ShippingMethod",
            "Tag",
            "TaxCategory",
            "TaxRate",
            "User",
            "AuthenticationMethod",
            "Zone"
        ],
        "ErrorResult": [
            "MimeTypeError",
            "LanguageNotAvailableError",
            "ChannelDefaultLanguageError",
            "SettlePaymentError",
            "EmptyOrderLineSelectionError",
            "ItemsAlreadyFulfilledError",
            "InvalidFulfillmentHandlerError",
            "CreateFulfillmentError",
            "InsufficientStockOnHandError",
            "MultipleOrderError",
            "CancelActiveOrderError",
            "PaymentOrderMismatchError",
            "RefundOrderStateError",
            "NothingToRefundError",
            "AlreadyRefundedError",
            "QuantityTooGreatError",
            "RefundStateTransitionError",
            "PaymentStateTransitionError",
            "FulfillmentStateTransitionError",
            "OrderModificationStateError",
            "NoChangesSpecifiedError",
            "PaymentMethodMissingError",
            "RefundPaymentIdMissingError",
            "ManualPaymentStateError",
            "ProductOptionInUseError",
            "MissingConditionsError",
            "NativeAuthStrategyError",
            "InvalidCredentialsError",
            "OrderStateTransitionError",
            "EmailAddressConflictError",
            "OrderLimitError",
            "NegativeQuantityError",
            "InsufficientStockError"
        ],
        "CustomField": [
            "StringCustomFieldConfig",
            "LocaleStringCustomFieldConfig",
            "IntCustomFieldConfig",
            "FloatCustomFieldConfig",
            "BooleanCustomFieldConfig",
            "DateTimeCustomFieldConfig",
            "RelationCustomFieldConfig"
        ],
        "CustomFieldConfig": [
            "StringCustomFieldConfig",
            "LocaleStringCustomFieldConfig",
            "IntCustomFieldConfig",
            "FloatCustomFieldConfig",
            "BooleanCustomFieldConfig",
            "DateTimeCustomFieldConfig",
            "RelationCustomFieldConfig"
        ],
        "SearchResultPrice": [
            "PriceRange",
            "SinglePrice"
        ]
    }
};
export default result;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50cm9zcGVjdGlvbi1yZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2NvbW1vbi9pbnRyb3NwZWN0aW9uLXJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUI7QUFPWCxNQUFNLE1BQU0sR0FBNEI7SUFDNUMsZUFBZSxFQUFFO1FBQ2YsbUJBQW1CLEVBQUU7WUFDbkIsT0FBTztZQUNQLGVBQWU7U0FDaEI7UUFDRCw0QkFBNEIsRUFBRTtZQUM1QixhQUFhO1lBQ2IseUJBQXlCO1lBQ3pCLHlCQUF5QjtTQUMxQjtRQUNELHNCQUFzQixFQUFFO1lBQ3RCLGFBQWE7WUFDYix5QkFBeUI7U0FDMUI7UUFDRCxxQkFBcUIsRUFBRTtZQUNyQixTQUFTO1lBQ1QsMkJBQTJCO1NBQzVCO1FBQ0QscUJBQXFCLEVBQUU7WUFDckIsU0FBUztZQUNULDJCQUEyQjtTQUM1QjtRQUNELHNCQUFzQixFQUFFO1lBQ3RCLFVBQVU7WUFDViwyQkFBMkI7U0FDNUI7UUFDRCxzQkFBc0IsRUFBRTtZQUN0QixVQUFVO1lBQ1YsMkJBQTJCO1NBQzVCO1FBQ0QsNEJBQTRCLEVBQUU7WUFDNUIsZ0JBQWdCO1lBQ2hCLDZCQUE2QjtTQUM5QjtRQUNELDhCQUE4QixFQUFFO1lBQzlCLE9BQU87WUFDUCwyQkFBMkI7U0FDNUI7UUFDRCxxQkFBcUIsRUFBRTtZQUNyQixTQUFTO1lBQ1Qsb0JBQW9CO1lBQ3BCLDZCQUE2QjtZQUM3QiwyQkFBMkI7U0FDNUI7UUFDRCw2QkFBNkIsRUFBRTtZQUM3QixhQUFhO1lBQ2IsOEJBQThCO1lBQzlCLDRCQUE0QjtZQUM1Qiw4QkFBOEI7WUFDOUIsZ0NBQWdDO1lBQ2hDLGlDQUFpQztZQUNqQyx3QkFBd0I7U0FDekI7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixPQUFPO1lBQ1AsOEJBQThCO1lBQzlCLHVCQUF1QjtZQUN2QixvQkFBb0I7WUFDcEIsd0JBQXdCO1lB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eUI7WUFDekIsMkJBQTJCO1lBQzNCLDJCQUEyQjtZQUMzQixpQkFBaUI7WUFDakIsdUJBQXVCO1lBQ3ZCLHdCQUF3QjtTQUN6QjtRQUNELGFBQWEsRUFBRTtZQUNiLHlCQUF5QjtZQUN6QiwrQkFBK0I7WUFDL0Isc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4QiwwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLDJCQUEyQjtTQUM1QjtRQUNELG1CQUFtQixFQUFFO1lBQ25CLHlCQUF5QjtZQUN6QiwrQkFBK0I7WUFDL0Isc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4QiwwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLDJCQUEyQjtTQUM1QjtRQUNELG1CQUFtQixFQUFFO1lBQ25CLFlBQVk7WUFDWixhQUFhO1NBQ2Q7S0FDRjtDQUNGLENBQUM7QUFDSSxlQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlXG5cbiAgICAgIGV4cG9ydCBpbnRlcmZhY2UgUG9zc2libGVUeXBlc1Jlc3VsdERhdGEge1xuICAgICAgICBwb3NzaWJsZVR5cGVzOiB7XG4gICAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0OiBQb3NzaWJsZVR5cGVzUmVzdWx0RGF0YSA9IHtcbiAgXCJwb3NzaWJsZVR5cGVzXCI6IHtcbiAgICBcIkNyZWF0ZUFzc2V0UmVzdWx0XCI6IFtcbiAgICAgIFwiQXNzZXRcIixcbiAgICAgIFwiTWltZVR5cGVFcnJvclwiXG4gICAgXSxcbiAgICBcIk5hdGl2ZUF1dGhlbnRpY2F0aW9uUmVzdWx0XCI6IFtcbiAgICAgIFwiQ3VycmVudFVzZXJcIixcbiAgICAgIFwiSW52YWxpZENyZWRlbnRpYWxzRXJyb3JcIixcbiAgICAgIFwiTmF0aXZlQXV0aFN0cmF0ZWd5RXJyb3JcIlxuICAgIF0sXG4gICAgXCJBdXRoZW50aWNhdGlvblJlc3VsdFwiOiBbXG4gICAgICBcIkN1cnJlbnRVc2VyXCIsXG4gICAgICBcIkludmFsaWRDcmVkZW50aWFsc0Vycm9yXCJcbiAgICBdLFxuICAgIFwiQ3JlYXRlQ2hhbm5lbFJlc3VsdFwiOiBbXG4gICAgICBcIkNoYW5uZWxcIixcbiAgICAgIFwiTGFuZ3VhZ2VOb3RBdmFpbGFibGVFcnJvclwiXG4gICAgXSxcbiAgICBcIlVwZGF0ZUNoYW5uZWxSZXN1bHRcIjogW1xuICAgICAgXCJDaGFubmVsXCIsXG4gICAgICBcIkxhbmd1YWdlTm90QXZhaWxhYmxlRXJyb3JcIlxuICAgIF0sXG4gICAgXCJDcmVhdGVDdXN0b21lclJlc3VsdFwiOiBbXG4gICAgICBcIkN1c3RvbWVyXCIsXG4gICAgICBcIkVtYWlsQWRkcmVzc0NvbmZsaWN0RXJyb3JcIlxuICAgIF0sXG4gICAgXCJVcGRhdGVDdXN0b21lclJlc3VsdFwiOiBbXG4gICAgICBcIkN1c3RvbWVyXCIsXG4gICAgICBcIkVtYWlsQWRkcmVzc0NvbmZsaWN0RXJyb3JcIlxuICAgIF0sXG4gICAgXCJVcGRhdGVHbG9iYWxTZXR0aW5nc1Jlc3VsdFwiOiBbXG4gICAgICBcIkdsb2JhbFNldHRpbmdzXCIsXG4gICAgICBcIkNoYW5uZWxEZWZhdWx0TGFuZ3VhZ2VFcnJvclwiXG4gICAgXSxcbiAgICBcIlRyYW5zaXRpb25PcmRlclRvU3RhdGVSZXN1bHRcIjogW1xuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yXCJcbiAgICBdLFxuICAgIFwiU2V0dGxlUGF5bWVudFJlc3VsdFwiOiBbXG4gICAgICBcIlBheW1lbnRcIixcbiAgICAgIFwiU2V0dGxlUGF5bWVudEVycm9yXCIsXG4gICAgICBcIlBheW1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvclwiLFxuICAgICAgXCJPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yXCJcbiAgICBdLFxuICAgIFwiQWRkRnVsZmlsbG1lbnRUb09yZGVyUmVzdWx0XCI6IFtcbiAgICAgIFwiRnVsZmlsbG1lbnRcIixcbiAgICAgIFwiRW1wdHlPcmRlckxpbmVTZWxlY3Rpb25FcnJvclwiLFxuICAgICAgXCJJdGVtc0FscmVhZHlGdWxmaWxsZWRFcnJvclwiLFxuICAgICAgXCJJbnN1ZmZpY2llbnRTdG9ja09uSGFuZEVycm9yXCIsXG4gICAgICBcIkludmFsaWRGdWxmaWxsbWVudEhhbmRsZXJFcnJvclwiLFxuICAgICAgXCJGdWxmaWxsbWVudFN0YXRlVHJhbnNpdGlvbkVycm9yXCIsXG4gICAgICBcIkNyZWF0ZUZ1bGZpbGxtZW50RXJyb3JcIlxuICAgIF0sXG4gICAgXCJDYW5jZWxPcmRlclJlc3VsdFwiOiBbXG4gICAgICBcIk9yZGVyXCIsXG4gICAgICBcIkVtcHR5T3JkZXJMaW5lU2VsZWN0aW9uRXJyb3JcIixcbiAgICAgIFwiUXVhbnRpdHlUb29HcmVhdEVycm9yXCIsXG4gICAgICBcIk11bHRpcGxlT3JkZXJFcnJvclwiLFxuICAgICAgXCJDYW5jZWxBY3RpdmVPcmRlckVycm9yXCIsXG4gICAgICBcIk9yZGVyU3RhdGVUcmFuc2l0aW9uRXJyb3JcIlxuICAgIF0sXG4gICAgXCJSZWZ1bmRPcmRlclJlc3VsdFwiOiBbXG4gICAgICBcIlJlZnVuZFwiLFxuICAgICAgXCJRdWFudGl0eVRvb0dyZWF0RXJyb3JcIixcbiAgICAgIFwiTm90aGluZ1RvUmVmdW5kRXJyb3JcIixcbiAgICAgIFwiT3JkZXJTdGF0ZVRyYW5zaXRpb25FcnJvclwiLFxuICAgICAgXCJNdWx0aXBsZU9yZGVyRXJyb3JcIixcbiAgICAgIFwiUGF5bWVudE9yZGVyTWlzbWF0Y2hFcnJvclwiLFxuICAgICAgXCJSZWZ1bmRPcmRlclN0YXRlRXJyb3JcIixcbiAgICAgIFwiQWxyZWFkeVJlZnVuZGVkRXJyb3JcIixcbiAgICAgIFwiUmVmdW5kU3RhdGVUcmFuc2l0aW9uRXJyb3JcIlxuICAgIF0sXG4gICAgXCJTZXR0bGVSZWZ1bmRSZXN1bHRcIjogW1xuICAgICAgXCJSZWZ1bmRcIixcbiAgICAgIFwiUmVmdW5kU3RhdGVUcmFuc2l0aW9uRXJyb3JcIlxuICAgIF0sXG4gICAgXCJUcmFuc2l0aW9uRnVsZmlsbG1lbnRUb1N0YXRlUmVzdWx0XCI6IFtcbiAgICAgIFwiRnVsZmlsbG1lbnRcIixcbiAgICAgIFwiRnVsZmlsbG1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvclwiXG4gICAgXSxcbiAgICBcIlRyYW5zaXRpb25QYXltZW50VG9TdGF0ZVJlc3VsdFwiOiBbXG4gICAgICBcIlBheW1lbnRcIixcbiAgICAgIFwiUGF5bWVudFN0YXRlVHJhbnNpdGlvbkVycm9yXCJcbiAgICBdLFxuICAgIFwiTW9kaWZ5T3JkZXJSZXN1bHRcIjogW1xuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJOb0NoYW5nZXNTcGVjaWZpZWRFcnJvclwiLFxuICAgICAgXCJPcmRlck1vZGlmaWNhdGlvblN0YXRlRXJyb3JcIixcbiAgICAgIFwiUGF5bWVudE1ldGhvZE1pc3NpbmdFcnJvclwiLFxuICAgICAgXCJSZWZ1bmRQYXltZW50SWRNaXNzaW5nRXJyb3JcIixcbiAgICAgIFwiT3JkZXJMaW1pdEVycm9yXCIsXG4gICAgICBcIk5lZ2F0aXZlUXVhbnRpdHlFcnJvclwiLFxuICAgICAgXCJJbnN1ZmZpY2llbnRTdG9ja0Vycm9yXCJcbiAgICBdLFxuICAgIFwiQWRkTWFudWFsUGF5bWVudFRvT3JkZXJSZXN1bHRcIjogW1xuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJNYW51YWxQYXltZW50U3RhdGVFcnJvclwiXG4gICAgXSxcbiAgICBcIlJlbW92ZU9wdGlvbkdyb3VwRnJvbVByb2R1Y3RSZXN1bHRcIjogW1xuICAgICAgXCJQcm9kdWN0XCIsXG4gICAgICBcIlByb2R1Y3RPcHRpb25JblVzZUVycm9yXCJcbiAgICBdLFxuICAgIFwiQ3JlYXRlUHJvbW90aW9uUmVzdWx0XCI6IFtcbiAgICAgIFwiUHJvbW90aW9uXCIsXG4gICAgICBcIk1pc3NpbmdDb25kaXRpb25zRXJyb3JcIlxuICAgIF0sXG4gICAgXCJVcGRhdGVQcm9tb3Rpb25SZXN1bHRcIjogW1xuICAgICAgXCJQcm9tb3Rpb25cIixcbiAgICAgIFwiTWlzc2luZ0NvbmRpdGlvbnNFcnJvclwiXG4gICAgXSxcbiAgICBcIlN0b2NrTW92ZW1lbnRcIjogW1xuICAgICAgXCJTdG9ja0FkanVzdG1lbnRcIixcbiAgICAgIFwiQWxsb2NhdGlvblwiLFxuICAgICAgXCJTYWxlXCIsXG4gICAgICBcIkNhbmNlbGxhdGlvblwiLFxuICAgICAgXCJSZXR1cm5cIixcbiAgICAgIFwiUmVsZWFzZVwiXG4gICAgXSxcbiAgICBcIlN0b2NrTW92ZW1lbnRJdGVtXCI6IFtcbiAgICAgIFwiU3RvY2tBZGp1c3RtZW50XCIsXG4gICAgICBcIkFsbG9jYXRpb25cIixcbiAgICAgIFwiU2FsZVwiLFxuICAgICAgXCJDYW5jZWxsYXRpb25cIixcbiAgICAgIFwiUmV0dXJuXCIsXG4gICAgICBcIlJlbGVhc2VcIlxuICAgIF0sXG4gICAgXCJQYWdpbmF0ZWRMaXN0XCI6IFtcbiAgICAgIFwiQWRtaW5pc3RyYXRvckxpc3RcIixcbiAgICAgIFwiQ3VzdG9tZXJHcm91cExpc3RcIixcbiAgICAgIFwiSm9iTGlzdFwiLFxuICAgICAgXCJQYXltZW50TWV0aG9kTGlzdFwiLFxuICAgICAgXCJBc3NldExpc3RcIixcbiAgICAgIFwiQ29sbGVjdGlvbkxpc3RcIixcbiAgICAgIFwiUHJvZHVjdFZhcmlhbnRMaXN0XCIsXG4gICAgICBcIkNvdW50cnlMaXN0XCIsXG4gICAgICBcIkN1c3RvbWVyTGlzdFwiLFxuICAgICAgXCJGYWNldExpc3RcIixcbiAgICAgIFwiSGlzdG9yeUVudHJ5TGlzdFwiLFxuICAgICAgXCJPcmRlckxpc3RcIixcbiAgICAgIFwiUHJvZHVjdExpc3RcIixcbiAgICAgIFwiUHJvbW90aW9uTGlzdFwiLFxuICAgICAgXCJSb2xlTGlzdFwiLFxuICAgICAgXCJTaGlwcGluZ01ldGhvZExpc3RcIixcbiAgICAgIFwiVGFnTGlzdFwiLFxuICAgICAgXCJUYXhSYXRlTGlzdFwiXG4gICAgXSxcbiAgICBcIk5vZGVcIjogW1xuICAgICAgXCJBZG1pbmlzdHJhdG9yXCIsXG4gICAgICBcIkFzc2V0XCIsXG4gICAgICBcIkNvbGxlY3Rpb25cIixcbiAgICAgIFwiQ3VzdG9tZXJcIixcbiAgICAgIFwiRmFjZXRcIixcbiAgICAgIFwiSGlzdG9yeUVudHJ5XCIsXG4gICAgICBcIkpvYlwiLFxuICAgICAgXCJPcmRlclwiLFxuICAgICAgXCJGdWxmaWxsbWVudFwiLFxuICAgICAgXCJQYXltZW50XCIsXG4gICAgICBcIk9yZGVyTW9kaWZpY2F0aW9uXCIsXG4gICAgICBcIlBheW1lbnRNZXRob2RcIixcbiAgICAgIFwiUHJvZHVjdFwiLFxuICAgICAgXCJQcm9kdWN0VmFyaWFudFwiLFxuICAgICAgXCJTdG9ja0FkanVzdG1lbnRcIixcbiAgICAgIFwiQWxsb2NhdGlvblwiLFxuICAgICAgXCJTYWxlXCIsXG4gICAgICBcIkNhbmNlbGxhdGlvblwiLFxuICAgICAgXCJSZXR1cm5cIixcbiAgICAgIFwiUmVsZWFzZVwiLFxuICAgICAgXCJBZGRyZXNzXCIsXG4gICAgICBcIkNoYW5uZWxcIixcbiAgICAgIFwiQ291bnRyeVwiLFxuICAgICAgXCJDdXN0b21lckdyb3VwXCIsXG4gICAgICBcIkZhY2V0VmFsdWVcIixcbiAgICAgIFwiT3JkZXJJdGVtXCIsXG4gICAgICBcIk9yZGVyTGluZVwiLFxuICAgICAgXCJSZWZ1bmRcIixcbiAgICAgIFwiU3VyY2hhcmdlXCIsXG4gICAgICBcIlByb2R1Y3RPcHRpb25Hcm91cFwiLFxuICAgICAgXCJQcm9kdWN0T3B0aW9uXCIsXG4gICAgICBcIlByb21vdGlvblwiLFxuICAgICAgXCJSb2xlXCIsXG4gICAgICBcIlNoaXBwaW5nTWV0aG9kXCIsXG4gICAgICBcIlRhZ1wiLFxuICAgICAgXCJUYXhDYXRlZ29yeVwiLFxuICAgICAgXCJUYXhSYXRlXCIsXG4gICAgICBcIlVzZXJcIixcbiAgICAgIFwiQXV0aGVudGljYXRpb25NZXRob2RcIixcbiAgICAgIFwiWm9uZVwiXG4gICAgXSxcbiAgICBcIkVycm9yUmVzdWx0XCI6IFtcbiAgICAgIFwiTWltZVR5cGVFcnJvclwiLFxuICAgICAgXCJMYW5ndWFnZU5vdEF2YWlsYWJsZUVycm9yXCIsXG4gICAgICBcIkNoYW5uZWxEZWZhdWx0TGFuZ3VhZ2VFcnJvclwiLFxuICAgICAgXCJTZXR0bGVQYXltZW50RXJyb3JcIixcbiAgICAgIFwiRW1wdHlPcmRlckxpbmVTZWxlY3Rpb25FcnJvclwiLFxuICAgICAgXCJJdGVtc0FscmVhZHlGdWxmaWxsZWRFcnJvclwiLFxuICAgICAgXCJJbnZhbGlkRnVsZmlsbG1lbnRIYW5kbGVyRXJyb3JcIixcbiAgICAgIFwiQ3JlYXRlRnVsZmlsbG1lbnRFcnJvclwiLFxuICAgICAgXCJJbnN1ZmZpY2llbnRTdG9ja09uSGFuZEVycm9yXCIsXG4gICAgICBcIk11bHRpcGxlT3JkZXJFcnJvclwiLFxuICAgICAgXCJDYW5jZWxBY3RpdmVPcmRlckVycm9yXCIsXG4gICAgICBcIlBheW1lbnRPcmRlck1pc21hdGNoRXJyb3JcIixcbiAgICAgIFwiUmVmdW5kT3JkZXJTdGF0ZUVycm9yXCIsXG4gICAgICBcIk5vdGhpbmdUb1JlZnVuZEVycm9yXCIsXG4gICAgICBcIkFscmVhZHlSZWZ1bmRlZEVycm9yXCIsXG4gICAgICBcIlF1YW50aXR5VG9vR3JlYXRFcnJvclwiLFxuICAgICAgXCJSZWZ1bmRTdGF0ZVRyYW5zaXRpb25FcnJvclwiLFxuICAgICAgXCJQYXltZW50U3RhdGVUcmFuc2l0aW9uRXJyb3JcIixcbiAgICAgIFwiRnVsZmlsbG1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvclwiLFxuICAgICAgXCJPcmRlck1vZGlmaWNhdGlvblN0YXRlRXJyb3JcIixcbiAgICAgIFwiTm9DaGFuZ2VzU3BlY2lmaWVkRXJyb3JcIixcbiAgICAgIFwiUGF5bWVudE1ldGhvZE1pc3NpbmdFcnJvclwiLFxuICAgICAgXCJSZWZ1bmRQYXltZW50SWRNaXNzaW5nRXJyb3JcIixcbiAgICAgIFwiTWFudWFsUGF5bWVudFN0YXRlRXJyb3JcIixcbiAgICAgIFwiUHJvZHVjdE9wdGlvbkluVXNlRXJyb3JcIixcbiAgICAgIFwiTWlzc2luZ0NvbmRpdGlvbnNFcnJvclwiLFxuICAgICAgXCJOYXRpdmVBdXRoU3RyYXRlZ3lFcnJvclwiLFxuICAgICAgXCJJbnZhbGlkQ3JlZGVudGlhbHNFcnJvclwiLFxuICAgICAgXCJPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yXCIsXG4gICAgICBcIkVtYWlsQWRkcmVzc0NvbmZsaWN0RXJyb3JcIixcbiAgICAgIFwiT3JkZXJMaW1pdEVycm9yXCIsXG4gICAgICBcIk5lZ2F0aXZlUXVhbnRpdHlFcnJvclwiLFxuICAgICAgXCJJbnN1ZmZpY2llbnRTdG9ja0Vycm9yXCJcbiAgICBdLFxuICAgIFwiQ3VzdG9tRmllbGRcIjogW1xuICAgICAgXCJTdHJpbmdDdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJMb2NhbGVTdHJpbmdDdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJJbnRDdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJGbG9hdEN1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIkJvb2xlYW5DdXN0b21GaWVsZENvbmZpZ1wiLFxuICAgICAgXCJEYXRlVGltZUN1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIlJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWdcIlxuICAgIF0sXG4gICAgXCJDdXN0b21GaWVsZENvbmZpZ1wiOiBbXG4gICAgICBcIlN0cmluZ0N1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIkxvY2FsZVN0cmluZ0N1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIkludEN1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIkZsb2F0Q3VzdG9tRmllbGRDb25maWdcIixcbiAgICAgIFwiQm9vbGVhbkN1c3RvbUZpZWxkQ29uZmlnXCIsXG4gICAgICBcIkRhdGVUaW1lQ3VzdG9tRmllbGRDb25maWdcIixcbiAgICAgIFwiUmVsYXRpb25DdXN0b21GaWVsZENvbmZpZ1wiXG4gICAgXSxcbiAgICBcIlNlYXJjaFJlc3VsdFByaWNlXCI6IFtcbiAgICAgIFwiUHJpY2VSYW5nZVwiLFxuICAgICAgXCJTaW5nbGVQcmljZVwiXG4gICAgXVxuICB9XG59O1xuICAgICAgZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuICAgICJdfQ==