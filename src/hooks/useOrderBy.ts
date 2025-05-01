import { useQuery } from '@apollo/client'
import { GET_ORDERS_BY_FILTERS } from '@/graphql/queries/orders'
import { useState, useCallback } from 'react'
import { useSetAtom } from 'jotai'
import { atomOrderList } from '@/atoms/order'
import { IOrderFilter } from '@/interfaces/order'

export const useOrderBy = () => {
  const [filters, setFilters] = useState<IOrderFilter>({})
  const setOrderList = useSetAtom(atomOrderList)

  const { refetch: refetchByFilters } = useQuery(GET_ORDERS_BY_FILTERS, {
    variables: { filters },
    skip: Object.keys(filters).length === 0, // Skip if no filters are active
  })

  const executeFilters = useCallback(
    async (newFilters: IOrderFilter) => {
      setFilters(newFilters)

      try {
        const { data } = await refetchByFilters({ filters: newFilters })
        setOrderList(data?.ordersByFilter || [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setOrderList([])
      }
    },
    [refetchByFilters, setOrderList]
  )

  return {
    executeFilters,
  }
}
