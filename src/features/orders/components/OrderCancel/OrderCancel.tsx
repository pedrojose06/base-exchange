import useOrderCancel from '@/features/orders/hooks/useOrderChangeStatus'
import {
  getKeyFromValue,
  ORDER_STATUS,
  OrderStatus,
} from '@/features/orders/constants/order'
import { Button } from '../../../../components/ui/button'
import DialogModal from '../../../../components/DialogModal/DialogModal'

interface IOrderCancel {
  orderId: string
  open: boolean
  onClose: () => void
}
const OrderCancel = ({ orderId, open, onClose }: IOrderCancel) => {
  const { changeOrderStatus, loading, error } = useOrderCancel()

  const handleCancelOrder = async () => {
    try {
      const statusKey = getKeyFromValue(ORDER_STATUS.CANCELED) as OrderStatus
      if (statusKey) {
        await changeOrderStatus(orderId, statusKey)
      } else {
        console.error('Invalid status key for ORDER_STATUS.CANCELED')
      }

      onClose()
    } catch (err) {
      console.error(`Failed to cancel order ${orderId}:`, err)
    }
  }

  return (
    <DialogModal
      title={`Deseja cancelar a order ${orderId}?`}
      subtitle={`Você tem certeza de que deseja cancelar a ordem de número ${orderId}?`}
      open={open}
      onClose={onClose}
    >
      <div className="flex justify-evenly">
        <Button
          variant="destructive"
          className="mt-4"
          onClick={handleCancelOrder}
          disabled={loading}
        >
          {loading ? 'Cancelando...' : 'Sim'}
        </Button>
        <Button variant="outline" className="mt-4" onClick={onClose}>
          Não
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-red-500">
          Ocorreu um erro ao cancelar a ordem. Tente novamente.
        </p>
      )}
    </DialogModal>
  )
}

export default OrderCancel
