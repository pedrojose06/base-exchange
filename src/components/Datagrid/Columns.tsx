import { ColumnDef } from '@tanstack/react-table'

export type Order = {
  id: string
  instrument: string
  side: number
  price: number
  quantity: number
  remainingQuantity: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

type OrderStatus = 'open' | 'closed' | 'pending' | 'canceled'

const statusPtBr = (status: OrderStatus) => {
  switch (status) {
    case 'open':
      return 'Aberto'
    case 'closed':
      return 'Fechado'
    case 'pending':
      return 'Pendente'
    case 'canceled':
      return 'Cancelada'
    default:
      return 'Desconhecido'
  }
}

const OrderStatusComponent: React.FC<{ status: OrderStatus }> = ({
  status,
}) => {
  return (
    <span
      className={`${
        status === 'open'
          ? 'text-green-500'
          : status === 'pending'
            ? 'text-blue-500'
            : 'text-red-500'
      } font-bold`}
    >
      {statusPtBr(status)}
    </span>
  )
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'instrument',
    header: 'Instrumento',
  },
  {
    accessorKey: 'side',
    header: 'Lado (Compra/Venda)',
    cell: ({ getValue }) => (getValue() === 1 ? 'Compra' : 'Venda'),
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ getValue }) => {
      const value = getValue() as number
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
  },
  {
    accessorKey: 'remainingQuantity',
    header: 'Quantidade Restante',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as OrderStatus
      return <OrderStatusComponent status={status} />
    },
  },
  {
    accessorKey: 'createdAtDate',
    header: 'Data de Criação',
    cell: ({ getValue, row }) => {
      const value = row.original.createdAt
      const date = new Date(value)
      return Number.isNaN(date.getTime())
        ? 'Data Inválida'
        : date.toLocaleDateString('pt-BR')
    },
  },
  {
    accessorKey: 'createdAtTime',
    header: 'Hora de Criação',
    cell: ({ getValue, row }) => {
      const value = row.original.createdAt
      const date = new Date(value)
      return Number.isNaN(date.getTime())
        ? 'Hora Inválida'
        : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  },
]
