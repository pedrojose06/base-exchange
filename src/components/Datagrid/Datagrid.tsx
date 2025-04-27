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

export function DataGrid() {
  const { orders } = useOrders()

  // State to manage the selected order and dialog visibility
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false)

  const openOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId) // Set the selected order ID
    setIsOrderDetailOpen(true) // Open the dialog
  }

  const closeOrderDetails = () => {
    setSelectedOrderId(null) // Clear the selected order ID
    setIsOrderDetailOpen(false) // Close the dialog
  }

  // Pass the openOrderDetails function to the columns
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

      {selectedOrderId && (
        <OrderDetail
          orderId={selectedOrderId}
          open={isOrderDetailOpen}
          onClose={closeOrderDetails}
        />
      )}
    </div>
  )
}
