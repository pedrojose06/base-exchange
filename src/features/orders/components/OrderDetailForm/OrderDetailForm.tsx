import { getStatusColor } from '@/utils/status'
import { useOrderById } from '@/features/orders/hooks/useOrderById'
import { lazy, Suspense } from 'react'
import Loading from '../../../../components/Loading/Loading'

const OrderDetailField = lazy(
  () => import('@/features/orders/components/OrderDetailField/OrderDetailField')
)

interface IOrderDetailForm {
  orderId: string
}

const OrderDetailForm = ({ orderId }: IOrderDetailForm) => {
  const { data } = useOrderById(orderId)

  if (!data) return null

  const {
    instrument,
    price,
    quantity,
    remainingQuantity,
    side,
    status,
    statusFormatted,
    createdAtDate,
    updatedAtDate,
    createdAtTime,
    updatedAtTime,
  } = data
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="font-bold text-gray-400 text-xs">{statusFormatted}</p>
        <div className="flex items-center gap-2">
          <div
            className={`h-4 w-4 rounded-full ${getStatusColor(status)}`}
            title={`Status: ${status}`}
          />
          <h4>{instrument}</h4>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <OrderDetailField title="Tipo:" content={side} isEmphasis />
        <OrderDetailField title="Price:" content={price} />
        <OrderDetailField
          title="Quantidade:"
          content={`${remainingQuantity} de ${quantity}`}
        />
        <OrderDetailField
          title="Criada em:"
          content={`${createdAtDate} às ${createdAtTime}`}
        />
        <OrderDetailField
          title="Última atualização:"
          content={`${updatedAtDate} às ${updatedAtTime}`}
        />
      </Suspense>
    </div>
  )
}
export default OrderDetailForm
