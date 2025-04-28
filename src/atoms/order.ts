import { IOrder } from '@/interfaces/order'
import { atom } from 'jotai'

export const atomOrderList = atom<IOrder[]>([])
