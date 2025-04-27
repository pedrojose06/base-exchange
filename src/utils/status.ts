import { OrderStatus } from '@/interfaces/order'

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'green-300'
    case 'pending':
      return 'blue-300'
    case 'closed':
      return 'orange-300'
    case 'canceled':
      return 'red-300'
    default:
      return 'gray-300'
  }
}

export const statusPtBr = (status: OrderStatus) => {
  switch (status) {
    case 'open':
      return 'Aberta'
    case 'closed':
      return 'Fechada'
    case 'pending':
      return 'Pendente'
    case 'canceled':
      return 'Cancelada'
    default:
      return 'Desconhecida'
  }
}
