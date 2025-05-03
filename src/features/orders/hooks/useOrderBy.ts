import { useQuery } from '@apollo/client'
import { GET_ORDERS_BY_FILTERS } from '@/graphql/queries/orders'
import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { atomOrderGridPage, atomOrderList } from '@/features/orders/atoms/order'
import { IOrderFilter } from '@/features/orders/interfaces/order'

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
    if (
      Object.keys(newFilters).length === 0 ||
      (newFilters.createdAt === '' &&
        newFilters.id === '' &&
        newFilters.status === '' &&
        newFilters.side === 0 &&
        newFilters.instrument === '')
    )
      return

    setFilters(newFilters)

    try {
      const newOrderList = await refetchByFilters({ filters: newFilters })

      setOrderList(newOrderList.data.ordersByFilter.orders)

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
