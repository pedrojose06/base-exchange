import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../../../../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useOrderCreate from '@/features/orders/hooks/useOrderCreate'
import DialogModal from '../../../../components/DialogModal/DialogModal'
import { instruments } from '../../constants/intruments'

interface IOrderCreate {
  open: boolean
  onClose: () => void
}

const orderSchema = z.object({
  instrument: z.string().nonempty('Selecione um instrumento financeiro.'),
  side: z
    .enum(['1', '2'], {
      errorMap: () => ({ message: 'Selecione o tipo de ordem.' }),
    })
    .refine((value) => value !== undefined, {
      message: 'Selecione o tipo de ordem.',
    }),
  quantity: z
    .number()
    .min(1, 'A quantidade deve ser maior que 0.')
    .refine(
      (value) => Number.isInteger(value),
      'A quantidade deve ser um número inteiro.'
    ),
  price: z.number().min(0.01, 'O preço deve ser maior que 0.'),
})

type OrderFormValues = z.infer<typeof orderSchema>

const OrderCreate = ({ open, onClose }: IOrderCreate) => {
  const { createOrder } = useOrderCreate()
  const [instrumentPrice, setInstrumentPrice] = useState<number>(0)

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      instrument: '',
      side: undefined,
      quantity: 0,
      price: 0,
    },
  })

  const onSubmit = async (data: OrderFormValues) => {
    data
    try {
      await createOrder({ ...data, side: Number(data.side) })
      onClose()
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Ocorreu um erro ao criar a ordem. Tente novamente.')
    }
  }

  const handleInstrumentChange = (value: string) => {
    const selectedInstrument = instruments.find((inst) => inst.name === value)
    setInstrumentPrice(selectedInstrument?.price ?? 0)
    form.setValue('instrument', value)
    form.setValue(
      'price',
      (selectedInstrument?.price ?? 0) * form.getValues('quantity')
    )
  }

  const handleQuantityChange = (value: string) => {
    const quantity = Number(value)
    if (!Number.isNaN(quantity)) {
      form.setValue('quantity', quantity)
      form.setValue('price', instrumentPrice * quantity)
    }
  }

  return (
    <DialogModal
      title="Criar Ordem"
      subtitle="Preencha os detalhes da nova ordem"
      open={open}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Instrument Select */}
          <FormField
            control={form.control}
            name="instrument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instrumento financeiro</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => handleInstrumentChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger
                      data-cy="select-instrument"
                      className="w-full rounded border p-2"
                    >
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Order Type Select */}
          <FormField
            control={form.control}
            name="side"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Ordem</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full rounded border p-2">
                      <SelectValue placeholder="Selecione o tipo de ordem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Compra</SelectItem>
                      <SelectItem value="2">Venda</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity Input */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Quantidade"
                    value={field.value || ''}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Input */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Preço"
                    value={`R$ ${field.value.toFixed(2)}`.replace('.', ',')}
                    disabled
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Criar Ordem
          </Button>
        </form>
      </Form>
    </DialogModal>
  )
}

export default OrderCreate
