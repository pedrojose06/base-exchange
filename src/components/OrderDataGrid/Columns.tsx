import { OrderStatus } from '@/constants/order'
import { IOrder } from '@/interfaces/order'
import { getStatusTextColor, statusPtBr } from '@/utils/status'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/button'

const OrderStatusComponent: React.FC<{ status: OrderStatus }> = ({
  status,
}) => {
  return (
    <span className={`${getStatusTextColor(status)} font-bold`}>
      {statusPtBr(status)}
    </span>
  )
}

const OrdenationButton: React.FC<{
  column: any
  columnName: string
}> = ({ column, columnName }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {columnName}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

export const createColumns = (
  openOrderDetails: (id: string, action: string) => void
): ColumnDef<IOrder>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <OrdenationButton column={column} columnName="ID" />
    },
  },
  {
    accessorKey: 'instrument',
    header: ({ column }) => {
      return <OrdenationButton column={column} columnName="Instrumento" />
    },
  },
  {
    accessorKey: 'side',
    header: ({ column }) => {
      return <OrdenationButton column={column} columnName="Compra/Venda" />
    },
    cell: ({ getValue }) => (getValue() === 1 ? 'Compra' : 'Venda'),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return <OrdenationButton column={column} columnName="Preço" />
    },
    cell: ({ getValue }) => {
      const value = getValue() as number | undefined
      if (value === undefined || value === null) {
        return 'N/A' // Fallback for undefined or null values
      }
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return <OrdenationButton column={column} columnName="Quantidade" />
    },
  },
  {
    accessorKey: 'remainingQuantity',
    header: ({ column }) => {
      return (
        <OrdenationButton column={column} columnName="Quantidade Restante" />
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <OrdenationButton column={column} columnName="Status" />
    },
    cell: ({ getValue }) => {
      const status = getValue() as OrderStatus
      return <OrderStatusComponent status={status} />
    },
  },
  {
    accessorKey: 'createdAtDate',
    header: ({ column }) => {
      return <OrdenationButton column={column} columnName="Data de Criação" />
    },
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
    header: ({ column }) => {
      return <OrdenationButton column={column} columnName="Hora da Criação" />
    },
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
    header: '',
    cell: ({ row }) => {
      const order = row.original as IOrder
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
