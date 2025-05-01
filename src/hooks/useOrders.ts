import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '@/graphql/queries/orders'
import { useAtom } from 'jotai'
import { atomOrderList } from '@/atoms/order'
import { useEffect } from 'react'

interface IPagination {
  limit?: number
  page?: number
}

export function useOrders({ limit, page }: IPagination) {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      limit: limit ?? 5,
      page: page ?? 1,
    },
  })
  const [orderList, setOrderList] = useAtom(atomOrderList)
  useEffect(() => {
    if (data?.orders) {
      setOrderList(data.orders.orders)
    }
  }, [data, setOrderList])

  return {
    orders: orderList,
    loading,
    error,
    refetch,
    totalPages: data?.orders.totalPages,
  }
}
