import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import OrderCancel from './OrderCancel'
import useOrderCancel from '@/features/orders/hooks/useOrderChangeStatus'

vi.mock('../../../../components/DialogModal/DialogModal', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <div data-testid="modal" {...props}>
      {children}
    </div>
  ),
}))
vi.mock('../../../../components/ui/button', () => ({
  Button: (props: any) => <button {...props} />,
}))
vi.mock('@/features/orders/hooks/useOrderChangeStatus')

describe('OrderCancel', () => {
  const changeOrderStatusMock = vi.fn()
  const onCloseMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useOrderCancel as unknown as Mock).mockReturnValue({
      changeOrderStatus: changeOrderStatusMock,
      loading: false,
      error: null,
    })
  })

  it('renders modal with correct title, subtitle, and buttons', () => {
    render(<OrderCancel orderId="123" open={true} onClose={onCloseMock} />)
    expect(screen.getByTestId('modal')).toBeInTheDocument()
    const modal = screen.getByTestId('modal')
    expect(modal).toHaveAttribute('title', 'Deseja cancelar a order 123?')
    expect(modal).toHaveAttribute(
      'subtitle',
      'Você tem certeza de que deseja cancelar a ordem de número 123?'
    )
    expect(screen.getByRole('button', { name: /sim/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /não/i })).toBeInTheDocument()
  })

  it('calls changeOrderStatus and onClose when "Sim" is clicked', async () => {
    render(<OrderCancel orderId="123" open={true} onClose={onCloseMock} />)
    fireEvent.click(screen.getByRole('button', { name: /sim/i }))
    await waitFor(() => {
      expect(changeOrderStatusMock).toHaveBeenCalled()
      expect(onCloseMock).toHaveBeenCalled()
    })
  })

  it('calls onClose when "Não" is clicked', () => {
    render(<OrderCancel orderId="123" open={true} onClose={onCloseMock} />)
    fireEvent.click(screen.getByRole('button', { name: /não/i }))
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('shows loading state on "Sim" button when loading', () => {
    ;(useOrderCancel as unknown as Mock).mockReturnValue({
      changeOrderStatus: changeOrderStatusMock,
      loading: true,
      error: null,
    })
    render(<OrderCancel orderId="123" open={true} onClose={onCloseMock} />)
    expect(
      screen.getByRole('button', { name: /cancelando/i })
    ).toBeInTheDocument()
  })

  it('shows error message if error is present', () => {
    ;(useOrderCancel as unknown as Mock).mockReturnValue({
      changeOrderStatus: changeOrderStatusMock,
      loading: false,
      error: true,
    })
    render(<OrderCancel orderId="123" open={true} onClose={onCloseMock} />)
    expect(
      screen.getByText(/Ocorreu um erro ao cancelar a ordem/i)
    ).toBeInTheDocument()
  })
})
