import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '@/graphql/queries/orders'

export function useOrders() {
  const { data, loading, error } = useQuery(GET_ORDERS)

  return {
    orders: data?.orders || [],
    loading,
    error,
  }
}
