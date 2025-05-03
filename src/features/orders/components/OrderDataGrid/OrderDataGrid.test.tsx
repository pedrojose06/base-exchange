import { render, screen, waitFor } from '@testing-library/react'
import { OrderDataGrid } from './OrderDataGrid'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { useOrders } from '@/features/orders/hooks/useOrders'
import { useAtom } from 'jotai'

vi.mock('@/features/orders/hooks/useOrders')
vi.mock('./Columns', () => ({
  createColumns: vi.fn(() => []),
}))
vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(typeof actual === 'object' && actual !== null ? actual : {}),
    useAtom: vi.fn(),
  }
})

vi.mock('../../../../components/Loading/Loading', () => ({
  default: () => <div>Loading...</div>,
}))

vi.mock('../../../../components/DataGrid/DataGrid', () => ({
  default: ({ content }: { content: any[] }) => (
    <div data-testid="mock-datagrid">{JSON.stringify(content)}</div>
  ),
}))

vi.mock('../../../../components/DataGridPagination/DataGridPagination', () => ({
  default: ({ page }: { page: number }) => (
    <div data-testid="mock-pagination">Page: {page}</div>
  ),
}))

describe('OrderDataGrid', () => {
  const mockUseAtom = useAtom as unknown as Mock

  beforeEach(() => {
    mockUseAtom.mockReturnValue([1, vi.fn()])
  })

  it('renders loading state', () => {
    ;(useOrders as Mock).mockReturnValue({
      loading: true,
      orders: [],
      totalPages: 1,
      refetch: vi.fn(),
    })

    render(<OrderDataGrid />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders DataGrid and pagination after loading', async () => {
    ;(useOrders as Mock).mockReturnValue({
      loading: false,
      orders: [{ id: '1', instrument: 'PETR4', type: 'Venda' }],
      totalPages: 2,
      refetch: vi.fn(),
    })

    render(<OrderDataGrid />)

    await waitFor(() => {
      expect(screen.getByTestId('mock-datagrid')).toBeInTheDocument()
      expect(screen.getByTestId('mock-pagination')).toHaveTextContent('Page: 1')
    })
  })
})
