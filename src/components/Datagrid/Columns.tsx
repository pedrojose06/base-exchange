import { Order, OrderStatus } from '@/interfaces/order'
import { getStatusTextColor, statusPtBr } from '@/utils/status'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'

const OrderStatusComponent: React.FC<{ status: OrderStatus }> = ({
  status,
}) => {
  return (
    <span className={`${getStatusTextColor(status)} font-bold`}>
      {statusPtBr(status)}
    </span>
  )
}

export const createColumns = (
  openOrderDetails: (id: string, action: string) => void
): ColumnDef<Order>[] => [
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
    cell: ({ row }) => {
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
    cell: ({ row }) => {
      const value = row.original.createdAt
      const date = new Date(value)
      return Number.isNaN(date.getTime())
        ? 'Hora Inválida'
        : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const order = row.original as Order
      return (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => openOrderDetails(order.id, 'detail')}
            className="rounded p-2 text-blue-500 transition hover:bg-blue-100 hover:text-blue-700"
            aria-label={`Edit order ${order.id}`}
          >
            <FaEdit />
          </button>
          <button
            type="button"
            onClick={() => openOrderDetails(order.id, 'cancel')}
            className="rounded p-2 text-red-500 transition hover:bg-red-100 hover:text-red-700"
            aria-label={`Delete order ${order.id}`}
          >
            <FaTrash />
          </button>
        </div>
      )
    },
  },
]
