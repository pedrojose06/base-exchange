import { gql } from '@apollo/client'

export const GET_ORDER_HISTORY = gql`
    query OrderHistoryDetailById($id: ID!) {
        orderHistoryDetailById(id: $id) {
            orderId
            executedQuantity
            quantity
            createdAt
        }
    }
`
