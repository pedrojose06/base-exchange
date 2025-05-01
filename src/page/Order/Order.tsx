import Loading from '@/components/Loading/Loading'
import OrderDetailField from '@/components/OrderDetailField/OrderDetailField'
import useOrderHistoryById from '@/hooks/useOrderHistoryById'
import { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetailForm = lazy(
  () => import('@/components/OrderDetailForm/OrderDetailForm')
)

interface IOrderHistoryDetail {
  orderId: string
  executedQuantity: number
  quantity: number
  createdAt: string
}
const Order = () => {
  const { id } = useParams()
  const { data } = useOrderHistoryById(id as string)

  if (!id || !data) return null
  return (
    <div className="px-24 py-12">
      <h1 className="pb-12 text-center font-bold text-2xl">Order Details</h1>
      <div className="p-8">
        <Suspense fallback={<Loading />}>
          <OrderDetailForm orderId={id} />
        </Suspense>
      </div>
      <hr />
      {data.map((orderHistory: IOrderHistoryDetail) => {
        return (
          <div
            key={orderHistory.orderId}
            className="flex justify-between gap-4 border-gray-200 border-b border-solid p-6"
          >
            <OrderDetailField
              content={orderHistory.orderId}
              title="ID da ordem"
            />
            <OrderDetailField
              content={`${orderHistory.executedQuantity} de ${orderHistory.quantity}`}
              title="Quantidade executada"
            />
            <OrderDetailField
              content={orderHistory.createdAt}
              title="Executada em"
            />
          </div>
        )
      })}
    </div>
  )
}

export default Order
