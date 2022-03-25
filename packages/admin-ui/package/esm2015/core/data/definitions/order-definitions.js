import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from './shared-definitions';
export const DISCOUNT_FRAGMENT = gql `
    fragment Discount on Discount {
        adjustmentSource
        amount
        amountWithTax
        description
        type
    }
`;
export const REFUND_FRAGMENT = gql `
    fragment Refund on Refund {
        id
        state
        items
        shipping
        adjustment
        transactionId
        paymentId
    }
`;
export const ORDER_ADDRESS_FRAGMENT = gql `
    fragment OrderAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
    }
`;
export const ORDER_FRAGMENT = gql `
    fragment Order on Order {
        id
        createdAt
        updatedAt
        orderPlacedAt
        code
        state
        nextStates
        total
        currencyCode
        customer {
            id
            firstName
            lastName
        }
        shippingLines {
            shippingMethod {
                name
            }
        }
    }
`;
export const FULFILLMENT_FRAGMENT = gql `
    fragment Fulfillment on Fulfillment {
        id
        state
        nextStates
        createdAt
        updatedAt
        method
        orderItems {
            id
        }
        trackingCode
    }
`;
export const ORDER_LINE_FRAGMENT = gql `
    fragment OrderLine on OrderLine {
        id
        featuredAsset {
            preview
        }
        productVariant {
            id
            name
            sku
            trackInventory
            stockOnHand
        }
        discounts {
            ...Discount
        }
        unitPrice
        unitPriceWithTax
        proratedUnitPrice
        proratedUnitPriceWithTax
        quantity
        items {
            id
            unitPrice
            unitPriceWithTax
            taxRate
            refundId
            cancelled
            fulfillment {
                ...Fulfillment
            }
        }
        linePrice
        lineTax
        linePriceWithTax
        discountedLinePrice
        discountedLinePriceWithTax
    }
`;
export const ORDER_DETAIL_FRAGMENT = gql `
    fragment OrderDetail on Order {
        id
        createdAt
        updatedAt
        code
        state
        nextStates
        active
        customer {
            id
            firstName
            lastName
        }
        lines {
            ...OrderLine
        }
        surcharges {
            id
            sku
            description
            price
            priceWithTax
            taxRate
        }
        discounts {
            ...Discount
        }
        promotions {
            id
            couponCode
        }
        subTotal
        subTotalWithTax
        total
        totalWithTax
        currencyCode
        shipping
        shippingWithTax
        shippingLines {
            shippingMethod {
                id
                code
                name
                fulfillmentHandlerCode
                description
            }
        }
        taxSummary {
            description
            taxBase
            taxRate
            taxTotal
        }
        shippingAddress {
            ...OrderAddress
        }
        billingAddress {
            ...OrderAddress
        }
        payments {
            id
            createdAt
            transactionId
            amount
            method
            state
            nextStates
            errorMessage
            metadata
            refunds {
                id
                createdAt
                state
                items
                adjustment
                total
                paymentId
                reason
                transactionId
                method
                metadata
                orderItems {
                    id
                }
            }
        }
        fulfillments {
            ...Fulfillment
        }
        modifications {
            id
            createdAt
            isSettled
            priceChange
            note
            payment {
                id
                amount
            }
            orderItems {
                id
            }
            refund {
                id
                paymentId
                total
            }
            surcharges {
                id
            }
        }
    }
    ${DISCOUNT_FRAGMENT}
    ${ORDER_ADDRESS_FRAGMENT}
    ${FULFILLMENT_FRAGMENT}
    ${ORDER_LINE_FRAGMENT}
`;
export const GET_ORDERS_LIST = gql `
    query GetOrderList($options: OrderListOptions) {
        orders(options: $options) {
            items {
                ...Order
            }
            totalItems
        }
    }
    ${ORDER_FRAGMENT}
`;
export const GET_ORDER = gql `
    query GetOrder($id: ID!) {
        order(id: $id) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
export const SETTLE_PAYMENT = gql `
    mutation SettlePayment($id: ID!) {
        settlePayment(id: $id) {
            ... on Payment {
                id
                transactionId
                amount
                method
                state
                metadata
            }
            ...ErrorResult
            ... on SettlePaymentError {
                paymentErrorMessage
            }
            ... on PaymentStateTransitionError {
                transitionError
            }
            ... on OrderStateTransitionError {
                transitionError
            }
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
export const TRANSITION_PAYMENT_TO_STATE = gql `
    mutation TransitionPaymentToState($id: ID!, $state: String!) {
        transitionPaymentToState(id: $id, state: $state) {
            ... on Payment {
                id
                transactionId
                amount
                method
                state
                metadata
            }
            ...ErrorResult
            ... on PaymentStateTransitionError {
                transitionError
            }
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
export const CREATE_FULFILLMENT = gql `
    mutation CreateFulfillment($input: FulfillOrderInput!) {
        addFulfillmentToOrder(input: $input) {
            ...Fulfillment
            ...ErrorResult
        }
    }
    ${FULFILLMENT_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const CANCEL_ORDER = gql `
    mutation CancelOrder($input: CancelOrderInput!) {
        cancelOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const REFUND_ORDER = gql `
    mutation RefundOrder($input: RefundOrderInput!) {
        refundOrder(input: $input) {
            ...Refund
            ...ErrorResult
        }
    }
    ${REFUND_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const SETTLE_REFUND = gql `
    mutation SettleRefund($input: SettleRefundInput!) {
        settleRefund(input: $input) {
            ...Refund
            ...ErrorResult
        }
    }
    ${REFUND_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const GET_ORDER_HISTORY = gql `
    query GetOrderHistory($id: ID!, $options: HistoryEntryListOptions) {
        order(id: $id) {
            id
            history(options: $options) {
                totalItems
                items {
                    id
                    type
                    createdAt
                    isPublic
                    administrator {
                        id
                        firstName
                        lastName
                    }
                    data
                }
            }
        }
    }
`;
export const ADD_NOTE_TO_ORDER = gql `
    mutation AddNoteToOrder($input: AddNoteToOrderInput!) {
        addNoteToOrder(input: $input) {
            id
        }
    }
`;
export const UPDATE_ORDER_NOTE = gql `
    mutation UpdateOrderNote($input: UpdateOrderNoteInput!) {
        updateOrderNote(input: $input) {
            id
            data
            isPublic
        }
    }
`;
export const DELETE_ORDER_NOTE = gql `
    mutation DeleteOrderNote($id: ID!) {
        deleteOrderNote(id: $id) {
            result
            message
        }
    }
`;
export const TRANSITION_ORDER_TO_STATE = gql `
    mutation TransitionOrderToState($id: ID!, $state: String!) {
        transitionOrderToState(id: $id, state: $state) {
            ...Order
            ...ErrorResult
            ... on OrderStateTransitionError {
                transitionError
            }
        }
    }
    ${ORDER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const UPDATE_ORDER_CUSTOM_FIELDS = gql `
    mutation UpdateOrderCustomFields($input: UpdateOrderInput!) {
        setOrderCustomFields(input: $input) {
            ...Order
        }
    }
    ${ORDER_FRAGMENT}
`;
export const TRANSITION_FULFILLMENT_TO_STATE = gql `
    mutation TransitionFulfillmentToState($id: ID!, $state: String!) {
        transitionFulfillmentToState(id: $id, state: $state) {
            ...Fulfillment
            ...ErrorResult
            ... on FulfillmentStateTransitionError {
                transitionError
            }
        }
    }
    ${FULFILLMENT_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const GET_ORDER_SUMMARY = gql `
    query GetOrderSummary($start: DateTime!, $end: DateTime!) {
        orders(options: { filter: { orderPlacedAt: { between: { start: $start, end: $end } } } }) {
            totalItems
            items {
                id
                total
                currencyCode
            }
        }
    }
`;
export const MODIFY_ORDER = gql `
    mutation ModifyOrder($input: ModifyOrderInput!) {
        modifyOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const ADD_MANUAL_PAYMENT_TO_ORDER = gql `
    mutation AddManualPayment($input: ManualPaymentInput!) {
        addManualPaymentToOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGVmaW5pdGlvbnMvb3JkZXItZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Q0FRbkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Q0FVakMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7OztDQWF4QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNCaEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7OztDQWF0QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNDckMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFpSGxDLGlCQUFpQjtNQUNqQixzQkFBc0I7TUFDdEIsb0JBQW9CO01BQ3BCLG1CQUFtQjtDQUN4QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7O01BUzVCLGNBQWM7Q0FDbkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU10QixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BdUIzQixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFpQnhDLHFCQUFxQjtDQUMxQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O01BTy9CLG9CQUFvQjtNQUNwQixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUE7Ozs7Ozs7TUFPekIscUJBQXFCO01BQ3JCLHFCQUFxQjtDQUMxQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQTs7Ozs7OztNQU96QixlQUFlO01BQ2YscUJBQXFCO0NBQzFCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O01BTzFCLGVBQWU7TUFDZixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJuQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Q0FNbkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Q0FRbkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7OztDQU9uQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7O01BVXRDLGNBQWM7TUFDZCxxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTXZDLGNBQWM7Q0FDbkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7OztNQVU1QyxvQkFBb0I7TUFDcEIscUJBQXFCO0NBQzFCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0NBV25DLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O01BT3pCLHFCQUFxQjtNQUNyQixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLEdBQUcsQ0FBQTs7Ozs7OztNQU94QyxxQkFBcUI7TUFDckIscUJBQXFCO0NBQzFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmltcG9ydCB7IEVSUk9SX1JFU1VMVF9GUkFHTUVOVCB9IGZyb20gJy4vc2hhcmVkLWRlZmluaXRpb25zJztcblxuZXhwb3J0IGNvbnN0IERJU0NPVU5UX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IERpc2NvdW50IG9uIERpc2NvdW50IHtcbiAgICAgICAgYWRqdXN0bWVudFNvdXJjZVxuICAgICAgICBhbW91bnRcbiAgICAgICAgYW1vdW50V2l0aFRheFxuICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICB0eXBlXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFJFRlVORF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBSZWZ1bmQgb24gUmVmdW5kIHtcbiAgICAgICAgaWRcbiAgICAgICAgc3RhdGVcbiAgICAgICAgaXRlbXNcbiAgICAgICAgc2hpcHBpbmdcbiAgICAgICAgYWRqdXN0bWVudFxuICAgICAgICB0cmFuc2FjdGlvbklkXG4gICAgICAgIHBheW1lbnRJZFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBPUkRFUl9BRERSRVNTX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IE9yZGVyQWRkcmVzcyBvbiBPcmRlckFkZHJlc3Mge1xuICAgICAgICBmdWxsTmFtZVxuICAgICAgICBjb21wYW55XG4gICAgICAgIHN0cmVldExpbmUxXG4gICAgICAgIHN0cmVldExpbmUyXG4gICAgICAgIGNpdHlcbiAgICAgICAgcHJvdmluY2VcbiAgICAgICAgcG9zdGFsQ29kZVxuICAgICAgICBjb3VudHJ5XG4gICAgICAgIGNvdW50cnlDb2RlXG4gICAgICAgIHBob25lTnVtYmVyXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IE9SREVSX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IE9yZGVyIG9uIE9yZGVyIHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBvcmRlclBsYWNlZEF0XG4gICAgICAgIGNvZGVcbiAgICAgICAgc3RhdGVcbiAgICAgICAgbmV4dFN0YXRlc1xuICAgICAgICB0b3RhbFxuICAgICAgICBjdXJyZW5jeUNvZGVcbiAgICAgICAgY3VzdG9tZXIge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGZpcnN0TmFtZVxuICAgICAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgfVxuICAgICAgICBzaGlwcGluZ0xpbmVzIHtcbiAgICAgICAgICAgIHNoaXBwaW5nTWV0aG9kIHtcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgRlVMRklMTE1FTlRfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgRnVsZmlsbG1lbnQgb24gRnVsZmlsbG1lbnQge1xuICAgICAgICBpZFxuICAgICAgICBzdGF0ZVxuICAgICAgICBuZXh0U3RhdGVzXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgbWV0aG9kXG4gICAgICAgIG9yZGVySXRlbXMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgfVxuICAgICAgICB0cmFja2luZ0NvZGVcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgT1JERVJfTElORV9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBPcmRlckxpbmUgb24gT3JkZXJMaW5lIHtcbiAgICAgICAgaWRcbiAgICAgICAgZmVhdHVyZWRBc3NldCB7XG4gICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgIH1cbiAgICAgICAgcHJvZHVjdFZhcmlhbnQge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIHNrdVxuICAgICAgICAgICAgdHJhY2tJbnZlbnRvcnlcbiAgICAgICAgICAgIHN0b2NrT25IYW5kXG4gICAgICAgIH1cbiAgICAgICAgZGlzY291bnRzIHtcbiAgICAgICAgICAgIC4uLkRpc2NvdW50XG4gICAgICAgIH1cbiAgICAgICAgdW5pdFByaWNlXG4gICAgICAgIHVuaXRQcmljZVdpdGhUYXhcbiAgICAgICAgcHJvcmF0ZWRVbml0UHJpY2VcbiAgICAgICAgcHJvcmF0ZWRVbml0UHJpY2VXaXRoVGF4XG4gICAgICAgIHF1YW50aXR5XG4gICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICB1bml0UHJpY2VcbiAgICAgICAgICAgIHVuaXRQcmljZVdpdGhUYXhcbiAgICAgICAgICAgIHRheFJhdGVcbiAgICAgICAgICAgIHJlZnVuZElkXG4gICAgICAgICAgICBjYW5jZWxsZWRcbiAgICAgICAgICAgIGZ1bGZpbGxtZW50IHtcbiAgICAgICAgICAgICAgICAuLi5GdWxmaWxsbWVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxpbmVQcmljZVxuICAgICAgICBsaW5lVGF4XG4gICAgICAgIGxpbmVQcmljZVdpdGhUYXhcbiAgICAgICAgZGlzY291bnRlZExpbmVQcmljZVxuICAgICAgICBkaXNjb3VudGVkTGluZVByaWNlV2l0aFRheFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBPUkRFUl9ERVRBSUxfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgT3JkZXJEZXRhaWwgb24gT3JkZXIge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIGNvZGVcbiAgICAgICAgc3RhdGVcbiAgICAgICAgbmV4dFN0YXRlc1xuICAgICAgICBhY3RpdmVcbiAgICAgICAgY3VzdG9tZXIge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGZpcnN0TmFtZVxuICAgICAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgfVxuICAgICAgICBsaW5lcyB7XG4gICAgICAgICAgICAuLi5PcmRlckxpbmVcbiAgICAgICAgfVxuICAgICAgICBzdXJjaGFyZ2VzIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBza3VcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICBwcmljZVxuICAgICAgICAgICAgcHJpY2VXaXRoVGF4XG4gICAgICAgICAgICB0YXhSYXRlXG4gICAgICAgIH1cbiAgICAgICAgZGlzY291bnRzIHtcbiAgICAgICAgICAgIC4uLkRpc2NvdW50XG4gICAgICAgIH1cbiAgICAgICAgcHJvbW90aW9ucyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY291cG9uQ29kZVxuICAgICAgICB9XG4gICAgICAgIHN1YlRvdGFsXG4gICAgICAgIHN1YlRvdGFsV2l0aFRheFxuICAgICAgICB0b3RhbFxuICAgICAgICB0b3RhbFdpdGhUYXhcbiAgICAgICAgY3VycmVuY3lDb2RlXG4gICAgICAgIHNoaXBwaW5nXG4gICAgICAgIHNoaXBwaW5nV2l0aFRheFxuICAgICAgICBzaGlwcGluZ0xpbmVzIHtcbiAgICAgICAgICAgIHNoaXBwaW5nTWV0aG9kIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgZnVsZmlsbG1lbnRIYW5kbGVyQ29kZVxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGF4U3VtbWFyeSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICAgICAgdGF4QmFzZVxuICAgICAgICAgICAgdGF4UmF0ZVxuICAgICAgICAgICAgdGF4VG90YWxcbiAgICAgICAgfVxuICAgICAgICBzaGlwcGluZ0FkZHJlc3Mge1xuICAgICAgICAgICAgLi4uT3JkZXJBZGRyZXNzXG4gICAgICAgIH1cbiAgICAgICAgYmlsbGluZ0FkZHJlc3Mge1xuICAgICAgICAgICAgLi4uT3JkZXJBZGRyZXNzXG4gICAgICAgIH1cbiAgICAgICAgcGF5bWVudHMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgdHJhbnNhY3Rpb25JZFxuICAgICAgICAgICAgYW1vdW50XG4gICAgICAgICAgICBtZXRob2RcbiAgICAgICAgICAgIHN0YXRlXG4gICAgICAgICAgICBuZXh0U3RhdGVzXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2VcbiAgICAgICAgICAgIG1ldGFkYXRhXG4gICAgICAgICAgICByZWZ1bmRzIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgIHN0YXRlXG4gICAgICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICAgICAgICBhZGp1c3RtZW50XG4gICAgICAgICAgICAgICAgdG90YWxcbiAgICAgICAgICAgICAgICBwYXltZW50SWRcbiAgICAgICAgICAgICAgICByZWFzb25cbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbklkXG4gICAgICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgICAgICAgICAgbWV0YWRhdGFcbiAgICAgICAgICAgICAgICBvcmRlckl0ZW1zIHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVsZmlsbG1lbnRzIHtcbiAgICAgICAgICAgIC4uLkZ1bGZpbGxtZW50XG4gICAgICAgIH1cbiAgICAgICAgbW9kaWZpY2F0aW9ucyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICBpc1NldHRsZWRcbiAgICAgICAgICAgIHByaWNlQ2hhbmdlXG4gICAgICAgICAgICBub3RlXG4gICAgICAgICAgICBwYXltZW50IHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGFtb3VudFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3JkZXJJdGVtcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlZnVuZCB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBwYXltZW50SWRcbiAgICAgICAgICAgICAgICB0b3RhbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VyY2hhcmdlcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0RJU0NPVU5UX0ZSQUdNRU5UfVxuICAgICR7T1JERVJfQUREUkVTU19GUkFHTUVOVH1cbiAgICAke0ZVTEZJTExNRU5UX0ZSQUdNRU5UfVxuICAgICR7T1JERVJfTElORV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfT1JERVJTX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0T3JkZXJMaXN0KCRvcHRpb25zOiBPcmRlckxpc3RPcHRpb25zKSB7XG4gICAgICAgIG9yZGVycyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIC4uLk9yZGVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfT1JERVIgPSBncWxgXG4gICAgcXVlcnkgR2V0T3JkZXIoJGlkOiBJRCEpIHtcbiAgICAgICAgb3JkZXIoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uT3JkZXJEZXRhaWxcbiAgICAgICAgfVxuICAgIH1cbiAgICAke09SREVSX0RFVEFJTF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTRVRUTEVfUEFZTUVOVCA9IGdxbGBcbiAgICBtdXRhdGlvbiBTZXR0bGVQYXltZW50KCRpZDogSUQhKSB7XG4gICAgICAgIHNldHRsZVBheW1lbnQoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uIG9uIFBheW1lbnQge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25JZFxuICAgICAgICAgICAgICAgIGFtb3VudFxuICAgICAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICAgICAgICAgIHN0YXRlXG4gICAgICAgICAgICAgICAgbWV0YWRhdGFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgICAgICAuLi4gb24gU2V0dGxlUGF5bWVudEVycm9yIHtcbiAgICAgICAgICAgICAgICBwYXltZW50RXJyb3JNZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuLi4gb24gUGF5bWVudFN0YXRlVHJhbnNpdGlvbkVycm9yIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC4uLiBvbiBPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0lUSU9OX1BBWU1FTlRfVE9fU1RBVEUgPSBncWxgXG4gICAgbXV0YXRpb24gVHJhbnNpdGlvblBheW1lbnRUb1N0YXRlKCRpZDogSUQhLCAkc3RhdGU6IFN0cmluZyEpIHtcbiAgICAgICAgdHJhbnNpdGlvblBheW1lbnRUb1N0YXRlKGlkOiAkaWQsIHN0YXRlOiAkc3RhdGUpIHtcbiAgICAgICAgICAgIC4uLiBvbiBQYXltZW50IHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uSWRcbiAgICAgICAgICAgICAgICBhbW91bnRcbiAgICAgICAgICAgICAgICBtZXRob2RcbiAgICAgICAgICAgICAgICBzdGF0ZVxuICAgICAgICAgICAgICAgIG1ldGFkYXRhXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICAgICAgLi4uIG9uIFBheW1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvciB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX0ZVTEZJTExNRU5UID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZUZ1bGZpbGxtZW50KCRpbnB1dDogRnVsZmlsbE9yZGVySW5wdXQhKSB7XG4gICAgICAgIGFkZEZ1bGZpbGxtZW50VG9PcmRlcihpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5GdWxmaWxsbWVudFxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0ZVTEZJTExNRU5UX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENBTkNFTF9PUkRFUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBDYW5jZWxPcmRlcigkaW5wdXQ6IENhbmNlbE9yZGVySW5wdXQhKSB7XG4gICAgICAgIGNhbmNlbE9yZGVyKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLk9yZGVyRGV0YWlsXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7T1JERVJfREVUQUlMX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFJFRlVORF9PUkRFUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZWZ1bmRPcmRlcigkaW5wdXQ6IFJlZnVuZE9yZGVySW5wdXQhKSB7XG4gICAgICAgIHJlZnVuZE9yZGVyKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlJlZnVuZFxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1JFRlVORF9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTRVRUTEVfUkVGVU5EID0gZ3FsYFxuICAgIG11dGF0aW9uIFNldHRsZVJlZnVuZCgkaW5wdXQ6IFNldHRsZVJlZnVuZElucHV0ISkge1xuICAgICAgICBzZXR0bGVSZWZ1bmQoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUmVmdW5kXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UkVGVU5EX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9PUkRFUl9ISVNUT1JZID0gZ3FsYFxuICAgIHF1ZXJ5IEdldE9yZGVySGlzdG9yeSgkaWQ6IElEISwgJG9wdGlvbnM6IEhpc3RvcnlFbnRyeUxpc3RPcHRpb25zKSB7XG4gICAgICAgIG9yZGVyKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBoaXN0b3J5KG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgaXNQdWJsaWNcbiAgICAgICAgICAgICAgICAgICAgYWRtaW5pc3RyYXRvciB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQUREX05PVEVfVE9fT1JERVIgPSBncWxgXG4gICAgbXV0YXRpb24gQWRkTm90ZVRvT3JkZXIoJGlucHV0OiBBZGROb3RlVG9PcmRlcklucHV0ISkge1xuICAgICAgICBhZGROb3RlVG9PcmRlcihpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9PUkRFUl9OT1RFID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZU9yZGVyTm90ZSgkaW5wdXQ6IFVwZGF0ZU9yZGVyTm90ZUlucHV0ISkge1xuICAgICAgICB1cGRhdGVPcmRlck5vdGUoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgIGlzUHVibGljXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX09SREVSX05PVEUgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlT3JkZXJOb3RlKCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZU9yZGVyTm90ZShpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0lUSU9OX09SREVSX1RPX1NUQVRFID0gZ3FsYFxuICAgIG11dGF0aW9uIFRyYW5zaXRpb25PcmRlclRvU3RhdGUoJGlkOiBJRCEsICRzdGF0ZTogU3RyaW5nISkge1xuICAgICAgICB0cmFuc2l0aW9uT3JkZXJUb1N0YXRlKGlkOiAkaWQsIHN0YXRlOiAkc3RhdGUpIHtcbiAgICAgICAgICAgIC4uLk9yZGVyXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICAgICAgLi4uIG9uIE9yZGVyU3RhdGVUcmFuc2l0aW9uRXJyb3Ige1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7T1JERVJfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX09SREVSX0NVU1RPTV9GSUVMRFMgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlT3JkZXJDdXN0b21GaWVsZHMoJGlucHV0OiBVcGRhdGVPcmRlcklucHV0ISkge1xuICAgICAgICBzZXRPcmRlckN1c3RvbUZpZWxkcyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5PcmRlclxuICAgICAgICB9XG4gICAgfVxuICAgICR7T1JERVJfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9GVUxGSUxMTUVOVF9UT19TVEFURSA9IGdxbGBcbiAgICBtdXRhdGlvbiBUcmFuc2l0aW9uRnVsZmlsbG1lbnRUb1N0YXRlKCRpZDogSUQhLCAkc3RhdGU6IFN0cmluZyEpIHtcbiAgICAgICAgdHJhbnNpdGlvbkZ1bGZpbGxtZW50VG9TdGF0ZShpZDogJGlkLCBzdGF0ZTogJHN0YXRlKSB7XG4gICAgICAgICAgICAuLi5GdWxmaWxsbWVudFxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgICAgIC4uLiBvbiBGdWxmaWxsbWVudFN0YXRlVHJhbnNpdGlvbkVycm9yIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0ZVTEZJTExNRU5UX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9PUkRFUl9TVU1NQVJZID0gZ3FsYFxuICAgIHF1ZXJ5IEdldE9yZGVyU3VtbWFyeSgkc3RhcnQ6IERhdGVUaW1lISwgJGVuZDogRGF0ZVRpbWUhKSB7XG4gICAgICAgIG9yZGVycyhvcHRpb25zOiB7IGZpbHRlcjogeyBvcmRlclBsYWNlZEF0OiB7IGJldHdlZW46IHsgc3RhcnQ6ICRzdGFydCwgZW5kOiAkZW5kIH0gfSB9IH0pIHtcbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIHRvdGFsXG4gICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgTU9ESUZZX09SREVSID0gZ3FsYFxuICAgIG11dGF0aW9uIE1vZGlmeU9yZGVyKCRpbnB1dDogTW9kaWZ5T3JkZXJJbnB1dCEpIHtcbiAgICAgICAgbW9kaWZ5T3JkZXIoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uT3JkZXJEZXRhaWxcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQUREX01BTlVBTF9QQVlNRU5UX1RPX09SREVSID0gZ3FsYFxuICAgIG11dGF0aW9uIEFkZE1hbnVhbFBheW1lbnQoJGlucHV0OiBNYW51YWxQYXltZW50SW5wdXQhKSB7XG4gICAgICAgIGFkZE1hbnVhbFBheW1lbnRUb09yZGVyKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLk9yZGVyRGV0YWlsXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7T1JERVJfREVUQUlMX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcbiJdfQ==