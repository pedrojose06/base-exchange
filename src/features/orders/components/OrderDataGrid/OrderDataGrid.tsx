'use client'

import { useOrders } from '@/features/orders/hooks/useOrders'
import { createColumns } from './Columns'
import { lazy, useEffect, useState } from 'react'
import { atomOrderGridPage } from '@/features/orders/atoms/order'
import { useAtom } from 'jotai'
import Loading from '../../../../components/Loading/Loading'
import DataGrid from '../../../../components/DataGrid/DataGrid'
import DataGridPagination from '../../../../components/DataGridPagination/DataGridPagination'

const OrderCancel = lazy(() => import('../OrderCancel/OrderCancel'))
const OrderDetail = lazy(() => import('../OrderDetail/OrderDetail'))

export function OrderDataGrid() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false)
  const [isOrderCancelOpen, setIsOrderCancelOpen] = useState(false)
  const [actualPage, setActualPage] = useAtom(atomOrderGridPage)
  const { orders, totalPages, loading, refetch } = useOrders({
    limit: 5,
    page: actualPage,
  })

  const openOrderDetails = (orderId: string, action: string) => {
    setSelectedOrderId(orderId)
    if (action === 'cancel') return setIsOrderCancelOpen(true)
    setIsOrderDetailOpen(true)
  }

  const closeOrderDetails = () => {
    setSelectedOrderId(null)
    setIsOrderDetailOpen(false)
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await refetch({ limit: 5, page: actualPage })
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [actualPage, refetch])

  const columns = createColumns(openOrderDetails)

  if (loading) {
    return <Loading />
  }

  return (
    <div className="rounded-md border p-4">
      <DataGrid content={orders} columns={columns} />

      <DataGridPagination
        totalPages={totalPages}
        page={actualPage}
        onPageChange={setActualPage}
        className="p-4"
      />

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
