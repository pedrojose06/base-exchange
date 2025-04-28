import { useState } from 'react'
import DialogModal from '../DialogModal/DialogModal'
import { Button } from '../ui/button'
import useOrderCreate from '@/hooks/useOrderCreate'

interface IOrderCreate {
  open: boolean
  onClose: () => void
}

const instruments = [
  { id: 1, name: 'PETR4', price: 5.34 },
  { id: 2, name: 'VALE3', price: 67.89 },
  { id: 3, name: 'ITUB4', price: 28.45 },
  { id: 4, name: 'BBAS3', price: 36.12 },
  { id: 5, name: 'ABEV3', price: 14.67 },
  { id: 6, name: 'MGLU3', price: 3.21 },
  { id: 7, name: 'LREN3', price: 25.78 },
  { id: 8, name: 'WEGE3', price: 40.56 },
  { id: 9, name: 'B3SA3', price: 12.34 },
  { id: 10, name: 'BRFS3', price: 8.9 },
]

const OrderCreate = ({ open, onClose }: IOrderCreate) => {
  const [instrument, setInstrument] = useState<string>('')
  const [side, setSide] = useState<string>('buy')
  const [quantity, setQuantity] = useState<number | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  const { createOrder } = useOrderCreate()

  const handleSubmit = async () => {
    if (!instrument || !quantity || !price) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const order = {
      instrument,
      side: side === 'buy' ? 1 : 2,
      price,
      quantity,
    }

    try {
      await createOrder(order)
      onClose()
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Ocorreu um erro ao criar a ordem. Tente novamente.')
    }
  }

  return (
    <DialogModal
      title="Criar Ordem"
      subtitle="Preencha os detalhes da nova ordem"
      open={open}
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="instrumentSelect">Instrumento financeiro</label>
          <select
            id="instrumentSelect"
            name="instrumentSelect"
            className="rounded border p-2"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          >
            <option value="" disabled>
              Selecione um instrumento
            </option>
            {instruments.map((instrument) => (
              <option key={instrument.id} value={instrument.name}>
                {instrument.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="orderTypeSelect">Tipo de Ordem</label>
          <select
            id="orderTypeSelect"
            name="orderTypeSelect"
            className="rounded border p-2"
            value={side}
            onChange={(e) => setSide(e.target.value)}
          >
            <option value="buy">Compra</option>
            <option value="sell">Venda</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantityInput">Quantidade</label>
          <input
            type="number"
            id="quantityInput"
            name="quantityInput"
            className="rounded border p-2"
            placeholder="Quantidade"
            value={quantity || ''}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="priceInput">Preço</label>
          <input
            type="number"
            id="priceInput"
            name="priceInput"
            className="rounded border p-2"
            placeholder="Preço"
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <Button
          type="button"
          onClick={handleSubmit}
          className="col-span-2 mt-4"
        >
          Criar Ordem
        </Button>
      </div>
    </DialogModal>
  )
}

export default OrderCreate
