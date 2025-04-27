import { Dialog } from '@radix-ui/react-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'

interface IOrderCancel {
  orderId: string
  open: boolean
  onClose: () => void
}

const OrderCancel = ({ orderId, open, onClose }: IOrderCancel) => {
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
          <Button variant="destructive" className="mt-4">
            Sim
          </Button>
          <Button variant="outline" className="mt-4" onClick={onClose}>
            Não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderCancel
