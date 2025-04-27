'use client'

import {} from '@tanstack/react-table'

import {} from '@/components/ui/table'
import { useOrders } from '@/hooks/useOrder'
import { createColumns } from './Columns'
import OrderDetail from '@/components/OrderDetail/OrderDetail'
import { useState } from 'react'
import OrderCancel from '../OrderCancel/OrderCancel'
import DataGrid from '../DataGrid/DataGrid'

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

  return (
    <div className="rounded-md border">
      <DataGrid content={orders} columns={columns} />

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
