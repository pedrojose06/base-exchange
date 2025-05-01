import { useQuery } from '@apollo/client'
import { GET_ORDERS_BY_FILTERS } from '@/graphql/queries/orders'
import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { atomOrderGridPage, atomOrderList } from '@/atoms/order'
import { IOrderFilter } from '@/interfaces/order'

export const useOrderBy = () => {
  const [filters, setFilters] = useState<IOrderFilter>({})
  const setOrderList = useSetAtom(atomOrderList)
  const setActualPage = useSetAtom(atomOrderGridPage)

  const { refetch: refetchByFilters } = useQuery(GET_ORDERS_BY_FILTERS, {
    variables: { filters },
    skip:
      Object.keys(filters).length === 0 ||
      (filters.createdAt === '' &&
        filters.id === '' &&
        filters.status === '' &&
        filters.side === 0 &&
        filters.instrument === ''),
  })

  const executeFilters = async (newFilters: IOrderFilter) => {
    setFilters(newFilters)
    if (
      Object.keys(filters).length === 0 ||
      (filters.createdAt === '' &&
        filters.id === '' &&
        filters.status === '' &&
        filters.side === 0 &&
        filters.instrument === '')
    )
      return

    try {
      const { data } = await refetchByFilters({ filters: newFilters })
      setOrderList(data?.ordersByFilter.orders || [])
      setActualPage(1)
    } catch (err) {
      console.error('Error fetching data:', err)
      setOrderList([])
    }
  }

  return {
    executeFilters,
  }
}
