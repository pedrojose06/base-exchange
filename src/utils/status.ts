import { OrderStatus } from '@/features/orders/constants/order'

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-green-300'
    case 'pending':
      return 'bg-blue-300'
    case 'closed':
      return 'bg-orange-300'
    case 'canceled':
      return 'bg-red-300'
    default:
      return 'bg-gray-300'
  }
}

export const getStatusTextColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'text-green-300'
    case 'pending':
      return 'text-blue-300'
    case 'executed':
      return 'text-orange-300'
    case 'canceled':
      return 'text-red-300'
    default:
      return 'text-gray-300'
  }
}

export const getStatusBgColor = (status: string) => {
  return `bg-${getStatusColor(status)}`
}

export const statusPtBr = (status: OrderStatus) => {
  switch (status.toLocaleLowerCase()) {
    case 'open':
      return 'Aberta'
    case 'executed':
      return 'Executada'
    case 'pending':
      return 'Pendente'
    case 'canceled':
      return 'Cancelada'
    default:
      return 'Desconhecida'
  }
}
