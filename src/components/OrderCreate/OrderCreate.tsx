import DialogModal from '../DialogModal/DialogModal'

interface IOrderCreate {
  open: boolean
  onClose: () => void
}

const OrderCreate = ({ open, onClose }: IOrderCreate) => {
  return (
    <DialogModal
      title="Criar Ordem"
      subtitle="Preencha os detalhes da nova ordem"
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="orderName">Nome da Ordem</label>
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="orderDescription">Descrição da Ordem</label>
        <textarea id="orderDescription" rows={4} className="border p-2" />
      </div>
    </DialogModal>
  )
}
export default OrderCreate
