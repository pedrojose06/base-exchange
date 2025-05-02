import { useQuery } from '@apollo/client'
import { GET_ORDER_BY_ID } from '@/graphql/queries/orders'
import { statusPtBr } from '@/utils/status'
import { IOrder } from '@/features/orders/interfaces/order'

export function useOrderById(id: string) {
  const { data, loading, error } = useQuery(GET_ORDER_BY_ID, {
    variables: { id },
  })

  const order: IOrder = data?.order
    ? {
        ...data.order,
        price: data.order.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        side: data.order.side === 1 ? 'Compra' : 'Venda',
        statusFormatted: statusPtBr(data.order.status),
        createdAtDate: new Date(data.order.createdAt).toLocaleDateString(
          'pt-BR'
        ),
        createdAtTime: new Date(data.order.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        updatedAtDate: new Date(data.order.updatedAt).toLocaleDateString(
          'pt-BR'
        ),
        updatedAtTime: new Date(data.order.updatedAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
    : null

  return {
    data: order,
    loading,
    error,
  }
}
