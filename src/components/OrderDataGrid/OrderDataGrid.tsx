'use client'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useOrders } from '@/hooks/useOrder'
import { createColumns } from './Columns'
import OrderDetail from '@/components/OrderDetail/OrderDetail'
import { useState } from 'react'
import OrderCancel from '../OrderCancel/OrderCancel'

export function OrderDataGrid() {
  const { orders } = useOrders()

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false)
  const [isOrderCancelOpen, setIsOrderCancelOpen] = useState(false)

  const openOrderDetails = (orderId: string, action: string) => {
    setSelectedOrderId(orderId)
    if (action === 'cancel') return setIsOrderCancelOpen(true)
    setIsOrderDetailOpen(true)
  }

  const closeOrderDetails = () => {
    setSelectedOrderId(null)
    setIsOrderDetailOpen(false)
  }

  const columns = createColumns(openOrderDetails)

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedOrderId && isOrderDetailOpen && (
        <OrderDetail
          orderId={selectedOrderId}
          open={isOrderDetailOpen}
          onClose={closeOrderDetails}
        />
      )}

      {selectedOrderId && isOrderCancelOpen && (
        <OrderCancel
          orderId={selectedOrderId}
          open={isOrderCancelOpen}
          onClose={closeOrderDetails}
        />
      )}
    </div>
  )
}
