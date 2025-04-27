import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Loading from '../Loading/Loading'
import { useOrderById } from '@/hooks/useOrderById'
import { getStatusColor } from '@/utils/status'
import OrderDetailField from '../OrderDetailField/OrderDetailField'

interface IOrderDetail {
  orderId: string
  open: boolean
  onClose: () => void
}

const OrderDetail = ({ orderId, open, onClose }: IOrderDetail) => {
  const { data, loading } = useOrderById(orderId)

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {loading ? (
          <Loading />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Detalhes da ordem</DialogTitle>
              <DialogDescription>
                Aqui estão os detalhes da ordem {orderId}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-gray-400 text-xs">
                  {statusFormatted}
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full bg-${getStatusColor(status)}`}
                    title={`Status: ${status}`}
                  />
                  <h4>{instrument}</h4>
                </div>
              </div>
              <OrderDetailField title="Tipo:" content={side} isEmphasis />
              <OrderDetailField title="Price:" content={price} />
              <OrderDetailField
                title="Quantidade:"
                content={`${quantity} de ${remainingQuantity}`}
              />
              <OrderDetailField
                title="Criada em:"
                content={`${createdAtDate} às ${createdAtTime}`}
              />
              <OrderDetailField
                title="Última atualização:"
                content={`${updatedAtDate} às ${updatedAtTime}`}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
export default OrderDetail
