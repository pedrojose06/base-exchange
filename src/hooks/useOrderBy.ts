import { useQuery } from '@apollo/client'
import { GET_ORDERS_BY_STATUS } from '@/graphql/queries/orders'
import { useState, useCallback } from 'react'
import { useSetAtom } from 'jotai'
import { atomOrderList } from '@/atoms/order'

export const useOrderByStatus = () => {
  const [status, setStatus] = useState<string | null>(null)
  const setOrderList = useSetAtom(atomOrderList)

  const { data, loading, error, refetch } = useQuery(GET_ORDERS_BY_STATUS, {
    variables: { status },
    skip: !status,
  })

  const executeFilterByStatus = useCallback(
    async (newStatus: string) => {
      setStatus(newStatus)

      try {
        const { data: ordersByFiltredByStatus } = await refetch({
          status: newStatus,
        })
        setOrderList(ordersByFiltredByStatus.ordersByStatus)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    },
    [refetch, setOrderList]
  )

  return {
    data,
    loading,
    error,
    executeFilterByStatus,
  }
}
