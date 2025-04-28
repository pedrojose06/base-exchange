import { gql } from '@apollo/client'

export const SEND_ORDER_CANCEL = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
      updatedAt
      __typename
    }
  }
`

export const SEND_ORDER_CREATE = gql`
  mutation InsertOrder($order: OrderInput!) {
    insertOrder(order: $order) {
      id
      instrument
      status
      createdAt
      side
      price
      quantity
      remainingQuantity
    }
  }
`
