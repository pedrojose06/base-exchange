import { useMutation } from '@apollo/client'
import { SEND_ORDER_CREATE } from '@/graphql/mutations/orders'

const useOrderCreate = () => {
  const [createOrderMutation, { data, loading, error }] =
    useMutation(SEND_ORDER_CREATE)

  const createOrder = async (order: {
    instrument: string
    side: number
    price: number
    quantity: number
  }) => {
    try {
      const response = await createOrderMutation({
        variables: { order },
      })
      return response.data.insertOrder
    } catch (err) {
      throw err
    }
  }

  return {
    createOrder,
    data,
    loading,
    error,
  }
}

export default useOrderCreate
