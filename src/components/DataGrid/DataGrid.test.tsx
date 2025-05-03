import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DataGrid from './DataGrid'
import { ColumnDef } from '@tanstack/react-table'

vi.mock('../DataGridFilter/DataGridFilter', () => ({
  default: ({ setGlobalFilter }: any) => (
    <input
      placeholder="Search..."
      onChange={(e) => setGlobalFilter(e.target.value)}
      data-testid="global-filter"
    />
  ),
}))

describe('DataGrid', () => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => info.getValue(),
    },
  ]

  const data = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]

  it('renders table headers and rows', () => {
    render(<DataGrid content={data} columns={columns} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('shows "No results." when content is empty', () => {
    render(<DataGrid content={[]} columns={columns} />)
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })
})
