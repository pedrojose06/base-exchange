import Loading from '@/components/Loading/Loading'
import OrderDetailField from '@/components/OrderDetailField/OrderDetailField'
import { Button } from '@/components/ui/button'
import useOrderHistoryById from '@/hooks/useOrderHistoryById'
import { lazy, Suspense } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

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
  const navigate = useNavigate() // Initialize the navigate function

  if (!id || !data) return null
  return (
    <div className="p-0 md:px-24 md:py-12">
      <div className="flex items-center justify-between p-6 ">
        <Button type="button" variant="secondary" onClick={() => navigate('/')}>
          <FaAngleLeft />
        </Button>

        <h1 className="flex-1 text-center font-bold text-2xl text-[#ba94f2]">
          Order Details
        </h1>
      </div>
      <div className="p-6">
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
