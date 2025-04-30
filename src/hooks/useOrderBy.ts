import { useQuery } from '@apollo/client'
import {
  GET_ORDERS_BY_SIDE,
  GET_ORDERS_BY_STATUS,
} from '@/graphql/queries/orders'
import { useState, useCallback } from 'react'
import { useSetAtom } from 'jotai'
import { atomOrderList } from '@/atoms/order'

export const useOrderBy = () => {
  const [status, setStatus] = useState<string | null>(null)
  const setOrderList = useSetAtom(atomOrderList)

  const {
    data: dataByStatus,
    loading,
    error,
    refetch,
  } = useQuery(GET_ORDERS_BY_STATUS, {
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
  const [side, setSide] = useState<number>(0)

  const {
    data: dataBySide,
    loading: loadingBySide,
    error: errorBySide,
    refetch: refetchBySide,
  } = useQuery(GET_ORDERS_BY_SIDE, {
    variables: { side: side },
    skip: !side,
  })

  const executeFilterBySide = useCallback(
    async (newSide: string) => {
      setSide(Number(newSide))
      try {
        const { data: ordersByFiltredBySide } = await refetchBySide({
          side: Number(newSide),
        })
        setOrderList(ordersByFiltredBySide.ordersBySide)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    },
    [refetch, setOrderList]
  )

  return {
    dataByStatus,
    loading,
    error,
    executeFilterByStatus,
    dataBySide,
    loadingBySide,
    errorBySide,
    executeFilterBySide,
  }
}
