import { useState } from 'react'
import DialogModal from '../DialogModal/DialogModal'
import { Button } from '../ui/button'
import useOrderCreate from '@/hooks/useOrderCreate'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '../ui/input'

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
  const [quantity, setQuantity] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const { createOrder } = useOrderCreate()

  const handleSubmit = async () => {
    if (!instrument || !quantity || !price) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const order = {
      instrument,
      side: Number(side),
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setQuantity(0)
      setPrice(0)
      return
    }
    const parsedValue = Number.parseInt(value, 10)

    if (!Number.isNaN(parsedValue)) {
      const instrumentPrice =
        instruments.find((inst) => inst.name === instrument)?.price ?? 0
      const calculatedPrice = (instrumentPrice * parsedValue).toFixed(2) // Ensure 2 decimal places

      setPrice(Number(calculatedPrice))
      setQuantity(parsedValue)
    } else {
      setQuantity(0)
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
          <Select
            onValueChange={(value) => setInstrument(value)}
            value={instrument}
          >
            <SelectTrigger className="w-full rounded border p-2">
              <SelectValue placeholder="Selecione um instrumento" />
            </SelectTrigger>
            <SelectContent>
              {instruments.map((instrument) => (
                <SelectItem key={instrument.id} value={instrument.name}>
                  {instrument.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="orderTypeSelect">Tipo de Ordem</label>
          <Select onValueChange={(value) => setSide(value)} value={side}>
            <SelectTrigger className="w-full rounded border p-2">
              <SelectValue placeholder="Selecione o tipo de ordem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Compra</SelectItem>
              <SelectItem value="2">Venda</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantityInput">Quantidade</label>
          <Input
            type="number"
            id="quantityInput"
            name="quantityInput"
            className="rounded border p-2"
            placeholder="Quantidade"
            value={quantity || ''}
            onChange={(e) => handleQuantityChange(e)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="priceInput">Preço</label>
          <Input
            type="text"
            id="priceInput"
            disabled
            readOnly
            name="priceInput"
            className="rounded border p-2"
            placeholder="Preço"
            value={`R$ ${price}`.replace('.', ',') || ''}
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
