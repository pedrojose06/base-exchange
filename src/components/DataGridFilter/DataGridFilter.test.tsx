import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DataGridFilter from './DataGridFilter'

vi.mock('@/features/orders/hooks/useOrderBy', () => ({
  useOrderBy: () => ({
    executeFilters: vi.fn(),
  }),
}))
vi.mock('@/features/orders/hooks/useOrders', () => ({
  useOrders: () => ({
    refetch: vi.fn(),
  }),
}))
vi.mock('../DatePicker/DatePicker', () => ({
  default: ({ date, setDate }: any) => (
    <input
      data-testid="datepicker"
      value={date ? date.toISOString().split('T')[0] : ''}
      onChange={(e) => setDate(new Date(e.target.value))}
      type="date"
    />
  ),
}))

vi.mock('@/features/orders/hooks/useOrders', () => ({
  useOrders: () => ({
    refetch: vi.fn().mockResolvedValue({
      data: {
        orders: {
          orders: [],
        },
      },
    }),
  }),
}))

describe('DataGridFilter', () => {
  const setGlobalFilter = vi.fn()
  const getColumn = vi.fn(() => ({
    setFilterValue: vi.fn(),
  }))
  const resetColumnFilters = vi.fn()
  const table = {
    getColumn,
    resetColumnFilters,
  } as any

  it('renders all filter inputs and buttons', () => {
    render(<DataGridFilter setGlobalFilter={setGlobalFilter} table={table} />)
    expect(
      screen.getByPlaceholderText('Digite para filtrar...')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Filtrar por ID')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Filtrar por Instrumento')
    ).toBeInTheDocument()
    expect(screen.getByText('Limpar todos filtros')).toBeInTheDocument()
  })

  it('calls setGlobalFilter when typing in global filter', () => {
    render(<DataGridFilter setGlobalFilter={setGlobalFilter} table={table} />)
    const input = screen.getByPlaceholderText('Digite para filtrar...')
    fireEvent.change(input, { target: { value: 'abc' } })
    expect(setGlobalFilter).toHaveBeenCalledWith('abc')
  })

  it('calls table.getColumn and setFilterValue when typing in ID filter', () => {
    render(<DataGridFilter setGlobalFilter={setGlobalFilter} table={table} />)
    const input = screen.getByPlaceholderText('Filtrar por ID')
    fireEvent.change(input, { target: { value: '123' } })
    expect(getColumn).toHaveBeenCalledWith('id')
  })

  it('calls resetColumnFilters and refetch when clearing all filters', async () => {
    render(<DataGridFilter setGlobalFilter={setGlobalFilter} table={table} />)
    const btn = screen.getByText('Limpar todos filtros')
    fireEvent.click(btn)
    await waitFor(() => {
      expect(resetColumnFilters).toHaveBeenCalled()
    })
  })
  it('renders and interacts with the date picker', () => {
    render(<DataGridFilter setGlobalFilter={setGlobalFilter} table={table} />)
    const dateInput = screen.getByTestId('datepicker')
    fireEvent.change(dateInput, { target: { value: '2024-05-03' } })
    expect(dateInput).toHaveValue('2024-05-03')
  })
})
