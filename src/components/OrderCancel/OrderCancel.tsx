import { Dialog } from '@radix-ui/react-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import useOrderCancel from '@/hooks/useOrderChangeStatus'
import { getKeyFromValue, ORDER_STATUS, OrderStatus } from '@/constants/order'

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-h-48">
        <DialogHeader>
          <DialogTitle>
            Deseja cancelar a order <b>{orderId}</b>?
          </DialogTitle>
          <span>
            Você tem certeza de que deseja cancelar a ordem de número{' '}
            <b>{orderId}</b>?
          </span>
        </DialogHeader>
        <DialogDescription>Por favor, confirme sua escolha.</DialogDescription>
        <div className="flex justify-evenly">
          <Button
            variant="destructive"
            className="mt-4"
            onClick={handleCancelOrder} // Call the handler
            disabled={loading} // Disable while loading
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
      </DialogContent>
    </Dialog>
  )
}

export default OrderCancel
