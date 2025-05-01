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

export const ORDER_GRID_COLUMNS = {
  ID: 'id',
  INSTRUMENT: 'instrument',
  SIDE: 'side',
  PRICE: 'price',
  QUANTITY: 'quantity',
  REMAINING_QUANTITY: 'remainingQuantity',
  STATUS: 'status',
  CREATE_DATE: 'createdAt',
  CREATE_TIME: 'createTime',
} as const

export const ORDER_GRID_COLUMNS_NAME = new Map<string, string>([
  ['id', 'ID'],
  ['instrument', 'Instrumento'],
  ['side', 'Compra/Venda'],
  ['price', 'Preço'],
  ['quantity', 'Quantidade'],
  ['remainingQuantity', 'Quantidade Restante'],
  ['status', 'Status'],
  ['createdAt', 'Data de Criação'],
  ['createTime', 'Hora de Criação'],
])

export type OrderGridColumns =
  (typeof ORDER_GRID_COLUMNS)[keyof typeof ORDER_GRID_COLUMNS]

export type OrderGridColumnsName = keyof typeof ORDER_GRID_COLUMNS_NAME

export type OrderStatus = keyof typeof ORDER_STATUS
