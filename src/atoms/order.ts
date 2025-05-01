import { IOrder } from '@/interfaces/order'
import { atom } from 'jotai'

export const atomOrderList = atom<IOrder[]>([])

export const atomOrderGridPage = atom(1)
