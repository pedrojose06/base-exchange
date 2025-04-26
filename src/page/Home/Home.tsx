import { DataGrid } from '@/components/DataGrid/DataGrid'
import OrderDetail from '@/components/OrderDetail/OrderDetail'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const order = {
  id: '3',
  instrument: 'ETH-USD',
  side: 1,
  price: 2000,
  quantity: 5,
  remainingQuantity: 5,
  status: 'open',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const Home = () => {
  const [open, setOpen] = useState(false)

  const openOrderDetail = () => {
    setOpen(true)
  }

  const closeOrderDetail = () => {
    setOpen(false)
  }

  return (
    <div>
      <h1>Home</h1>
      <DataGrid />
      <Button className="mt-4" onClick={openOrderDetail}>
        Order Detail
      </Button>
      <OrderDetail order={order} open={open} onClose={closeOrderDetail} />
    </div>
  )
}
export default Home
