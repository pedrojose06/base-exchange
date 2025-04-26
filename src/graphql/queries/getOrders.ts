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
