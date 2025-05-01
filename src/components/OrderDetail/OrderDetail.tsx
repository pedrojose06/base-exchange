import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import OrderDetailForm from '../OrderDetailForm/OrderDetailForm'
import { Link } from 'react-router-dom'

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
        <Link
          to={`/order-detail/${orderId}`}
          className="text-center text-cyan-700 underline"
        >
          Ver Histórico
        </Link>{' '}
      </DialogContent>
    </Dialog>
  )
}
export default OrderDetail
