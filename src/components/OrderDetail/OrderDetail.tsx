import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const OrderDetail = ({
  order,
  open,
  onClose,
}: {
  order: any
  open: boolean
  onClose: () => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Here are the details of your order.
          </DialogDescription>
        </DialogHeader>
        {/* Add your order details here */}
        <div>{JSON.stringify(order, null, 2)}</div>
      </DialogContent>
    </Dialog>
  )
}
export default OrderDetail
