export type Order = {
  id: string
  instrument: string
  side: number
  price: number
  quantity: number
  remainingQuantity: number
  status: OrderStatus
  statusFormatted: string
  createdAt: string
  updatedAt: string
  createdAtDate: string
  updatedAtDate: string
  createdAtTime: string
  updatedAtTime: string
}

export type OrderStatus = 'open' | 'closed' | 'pending' | 'canceled'
