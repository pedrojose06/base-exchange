import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import OrderDetailForm from '../OrderDetailForm/OrderDetailForm'

interface IOrderDetail {
  orderId: string
  open: boolean
  onClose: () => void
}

const OrderDetail = ({ orderId, open, onClose }: IOrderDetail) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da ordem</DialogTitle>
          <DialogDescription>
            Aqui estão os detalhes da ordem {orderId}
          </DialogDescription>
        </DialogHeader>
        <OrderDetailForm orderId={orderId} />
      </DialogContent>
    </Dialog>
  )
}
export default OrderDetail
