import { ColumnDef } from '@tanstack/react-table'

export type Order = {
  id: string
  instrument: string
  side: number // 1 for buy, 0 for sell
  price: number
  quantity: number
  remainingQuantity: number
  status: 'open' | 'closed' | 'pending'
  createdAt: string
  updatedAt: string
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
    cell: ({ getValue }) => (getValue() === 1 ? 'Compra' : 'Venda'), // Custom rendering for side
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
      const status = getValue() as 'open' | 'closed' | 'pending'
      const statusPtBr = () => {
        switch (status) {
          case 'open':
            return 'Aberto'
          case 'closed':
            return 'Fechado'
          case 'pending':
            return 'Pendente'
          default:
            return 'Desconhecido'
        }
      }
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
          {statusPtBr()}
        </span>
      )
    },
  },
  {
    accessorKey: 'createdAtDate', // Unique key for the date column
    header: 'Data de Criação',
    cell: ({ getValue, row }) => {
      const value = row.original.createdAt // Use the original row data
      const date = new Date(value)
      return Number.isNaN(date.getTime())
        ? 'Data Inválida'
        : date.toLocaleDateString('pt-BR') // Format in Brazilian date format
    },
  },
  {
    accessorKey: 'createdAtTime', // Unique key for the time column
    header: 'Hora de Criação',
    cell: ({ getValue, row }) => {
      const value = row.original.createdAt // Use the original row data
      const date = new Date(value)
      return Number.isNaN(date.getTime())
        ? 'Hora Inválida'
        : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Extract only hour and minutes
    },
  },
]
