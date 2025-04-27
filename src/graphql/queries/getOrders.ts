import { gql } from '@apollo/client'

export const GET_ORDERS = gql`
    query GetOrders {
        orders {
            id
            instrument
            side
            price
            quantity
            remainingQuantity
            status
            createdAt
            updatedAt
        }
    }
`
export const GET_ORDER_BY_ID = gql`
    query GetOrder($id: ID!) {
        order(id: $id) {
            instrument
            side
            price
            quantity
            remainingQuantity
            status
            updatedAt
            createdAt
        }
    }
`
