import { OrderStatus } from '@/constants/order'
import { SEND_ORDER_CANCEL } from '@/graphql/mutations/sendOrderCancel'
import { useMutation } from '@apollo/client'

const useOrderChangeStatus = () => {
  const [changeOrderStatusMutation, { data, loading, error }] =
    useMutation(SEND_ORDER_CANCEL)

  const changeOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const response = await changeOrderStatusMutation({
        variables: { id: orderId, status: status },
      })
      return response.data.updateOrderStatus
    } catch (err) {
      throw err
    }
  }

  return {
    changeOrderStatus,
    data,
    loading,
    error,
  }
}

export default useOrderChangeStatus
