import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/features/orders/hooks/useOrderById', () => ({
  useOrderById: vi.fn(),
}))
vi.mock('@/utils/status', () => ({
  getStatusColor: vi.fn(() => 'bg-green-500'),
}))
vi.mock('../../../../components/Loading/Loading', () => ({
  __esModule: true,
  default: () => <div data-testid="loading">Loading...</div>,
}))
vi.mock(
  '@/features/orders/components/OrderDetailField/OrderDetailField',
  () => ({
    __esModule: true,
    default: ({ title, content }: any) => (
      <div data-testid="order-detail-field">
        <span>{title}</span>
        <span>{content}</span>
      </div>
    ),
  })
)

import { useOrderById } from '@/features/orders/hooks/useOrderById'
import OrderDetailForm from './OrderDetailForm'

describe('OrderDetailForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing if no data is returned', () => {
    ;(useOrderById as any).mockReturnValue({ data: null })
    const { container } = render(<OrderDetailForm orderId="1" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders order details when data is present', async () => {
    ;(useOrderById as any).mockReturnValue({
      data: {
        instrument: 'VALE3',
        price: 1000,
        quantity: 10,
        remainingQuantity: 5,
        side: 1,
        status: 'open',
        statusFormatted: 'Aberta',
        createdAtDate: '2024-05-01',
        updatedAtDate: '2024-05-02',
        createdAtTime: '10:00',
        updatedAtTime: '12:00',
      },
    })
    render(<OrderDetailForm orderId="1" />)

    expect(await screen.findByText('Aberta')).toBeInTheDocument()
    expect(await screen.findByText('VALE3')).toBeInTheDocument()
    expect(await screen.findByText('1000')).toBeInTheDocument()
    expect(await screen.findByText('5 de 10')).toBeInTheDocument()
    expect(await screen.findByText('2024-05-01 às 10:00')).toBeInTheDocument()
    expect(await screen.findByText('2024-05-02 às 12:00')).toBeInTheDocument()
  })
})
