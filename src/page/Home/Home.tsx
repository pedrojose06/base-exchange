import { OrderDataGrid } from '@/components/OrderDataGrid/OrderDataGrid'
import { Button } from '@/components/ui/button'
import { lazy, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const OrderCreate = lazy(() => import('@/components/OrderCreate/OrderCreate'))

const Home = () => {
  const [isCreateNewOrderOpen, setIsCreateNewOrderOpen] = useState(false)
  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-2xl">Orderns Recentes</h1>
      <div className="flex justify-end p-4">
        <Button
          variant={'outline'}
          onClick={() => setIsCreateNewOrderOpen(true)}
        >
          <FaPlus className="mr-2" />
          Nova Ordem
        </Button>
      </div>
      <OrderDataGrid />
      {isCreateNewOrderOpen && (
        <OrderCreate
          open={isCreateNewOrderOpen}
          onClose={() => setIsCreateNewOrderOpen(false)}
        />
      )}
    </div>
  )
}
export default Home
