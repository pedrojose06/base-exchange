import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import OrderCreate from './OrderCreate'
import useOrderCreate from '@/features/orders/hooks/useOrderCreate'

vi.mock('../../../../components/DialogModal/DialogModal', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="modal">{children}</div>,
}))

vi.mock('@/features/orders/hooks/useOrderCreate')

describe('OrderCreate', () => {
  const createOrderMock = vi.fn()
  const onCloseMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useOrderCreate as unknown as Mock).mockReturnValue({
      createOrder: createOrderMock,
    })
  })

  it('renders modal with form fields', () => {
    render(<OrderCreate open={true} onClose={onCloseMock} />)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByText('Instrumento financeiro')).toBeInTheDocument()
    expect(screen.getByText('Tipo de Ordem')).toBeInTheDocument()
    expect(screen.getByText('Quantidade')).toBeInTheDocument()
    expect(screen.getByText('Preço')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /criar ordem/i })
    ).toBeInTheDocument()
  })

  it('fills out and submits the form', async () => {
    render(<OrderCreate open={true} onClose={onCloseMock} />)

    const [instrumentCombobox] = screen.getAllByRole('combobox')
    fireEvent.click(instrumentCombobox)
    const option = await screen.getByRole('option', { name: /PETR4/ })
    fireEvent.click(option)

    const [, orderTypeCombobox] = screen.getAllByRole('combobox')
    fireEvent.click(orderTypeCombobox)
    fireEvent.click(await screen.getByRole('option', { name: /Compra/ }))

    const quantityInput = screen.getByPlaceholderText('Quantidade')
    fireEvent.change(quantityInput, { target: { value: '2' } })

    fireEvent.click(screen.getByRole('button', { name: /criar ordem/i }))

    await waitFor(() => {
      expect(createOrderMock).toHaveBeenCalledWith({
        instrument: 'PETR4',
        side: 1,
        quantity: 2,
        price: 10.68,
      })

      expect(onCloseMock).toHaveBeenCalled()
    })
  })
})
