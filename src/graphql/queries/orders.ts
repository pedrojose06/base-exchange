import { gql } from '@apollo/client'

export const GET_ORDERS = gql`
    query GetOrders($limit: Int!, $page: Int!) {
      orders(limit: $limit, page: $page) {
        orders{

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
        totalPages
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

export const GET_ORDERS_BY_FILTERS = gql`
  query OrdersByFilter($filters: FiltersInput) {
    ordersByFilter(filters: $filters) {
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
