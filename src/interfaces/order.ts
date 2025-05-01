import { OrderStatus } from '@/constants/order'

export interface IOrder {
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

export interface IOrderFilter {
  id?: string
  instrument?: string
  side?: number
  status?: string
  createdAt?: string
}
