import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '@/graphql/queries/orders'
import { useAtom } from 'jotai'
import { atomOrderList } from '@/atoms/order'
import { useEffect } from 'react'

export function useOrders() {
  const { data, loading, error } = useQuery(GET_ORDERS)
  const [orderList, setOrderList] = useAtom(atomOrderList)

  useEffect(() => {
    if (data?.orders) {
      setOrderList(data.orders)
    }
  }, [data, setOrderList])

  return {
    orders: orderList,
    loading,
    error,
  }
}
