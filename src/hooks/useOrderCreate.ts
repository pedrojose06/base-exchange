import { useMutation } from '@apollo/client'
import { SEND_ORDER_CREATE } from '@/graphql/mutations/orders'
import { atomOrderList } from '@/atoms/order'
import { useAtom } from 'jotai'
import { useOrders } from './useOrders'

const useOrderCreate = () => {
  const [createOrderMutation, { data, loading, error }] =
    useMutation(SEND_ORDER_CREATE)
  const { refetch } = useOrders({ limit: 5, page: 1 })
  const [orderList, setOrderList] = useAtom(atomOrderList)

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
      await refetch()
      setOrderList([response.data.insertOrder, ...orderList])
      return orderList
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
