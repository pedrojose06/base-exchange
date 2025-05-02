import { useCallback } from 'react'
import { OrderStatus } from '@/features/orders/constants/order'
import { SEND_ORDER_CANCEL } from '@/graphql/mutations/orders'
import { useMutation } from '@apollo/client'

const useOrderChangeStatus = () => {
  const [changeOrderStatusMutation, { data, loading, error }] =
    useMutation(SEND_ORDER_CANCEL)

  const changeOrderStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      try {
        const response = await changeOrderStatusMutation({
          variables: { id: orderId, status: status },
        })
        return response.data.updateOrderStatus
      } catch (err) {
        throw err
      }
    },
    [changeOrderStatusMutation]
  )

  return {
    changeOrderStatus,
    data,
    loading,
    error,
  }
}

export default useOrderChangeStatus
