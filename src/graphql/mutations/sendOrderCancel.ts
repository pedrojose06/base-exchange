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
