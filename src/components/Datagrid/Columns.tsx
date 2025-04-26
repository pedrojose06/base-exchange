import { ColumnDef } from '@tanstack/react-table'

export type Order = {
  id: string
  instrument: string
  side: number // 1 for buy, 0 for sell
  price: number
  quantity: number
  remainingQuantity: number
  status: 'open' | 'closed' | 'canceled'
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
    header: 'Instrument',
  },
  {
    accessorKey: 'side',
    header: 'Side',
    cell: ({ getValue }) => (getValue() === 1 ? 'Buy' : 'Sell'), // Custom rendering for side
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'remainingQuantity',
    header: 'Remaining Quantity',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(), // Format date
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(), // Format date
  },
]
