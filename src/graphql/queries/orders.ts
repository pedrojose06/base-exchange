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

export const GET_ORDERS_BY_STATUS = gql`
    query OrdersByStatus($status: String!) {
        ordersByStatus(status: $status) {
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

export const GET_ORDERS_BY_SIDE = gql`
    query OrdersBySide($side: Int!) {
        ordersBySide(side: $side) {
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

export const GET_ORDERS_BY_DATE = gql`
    query OrderByDate($date: String!) {
        ordersByDate(date: $date) {
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
