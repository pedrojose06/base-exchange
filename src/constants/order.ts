export const ORDER_STATUS = {
  OPEN: 'Aberta',
  EXECUTED: 'Execudada',
  PENDING: 'Pendente',
  CANCELED: 'Cancelada',
} as const
export const getKeyFromValue = (value: string) => {
  const entry = Object.entries(ORDER_STATUS).find(([, v]) => v === value)
  return entry ? entry[0].toLowerCase() : undefined
}
export type OrderStatus = keyof typeof ORDER_STATUS
