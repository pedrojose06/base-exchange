import { GET_ORDER_HISTORY } from '@/graphql/queries/orderHistory'
import { useQuery } from '@apollo/client'

const useOrderHistoryById = (orderId: string) => {
  const { data, loading, error } = useQuery(GET_ORDER_HISTORY, {
    variables: { id: orderId },
  })

  const orderHistory = data?.orderHistoryDetailById?.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }),
  }))

  return {
    data: orderHistory,
    loading,
    error,
  }
}

export default useOrderHistoryById
