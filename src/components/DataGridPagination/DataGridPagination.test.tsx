import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DataGridPagination from './DataGridPagination'

describe('DataGridPagination', () => {
  it('renders page numbers and highlights the active page', () => {
    render(
      <DataGridPagination page={2} totalPages={5} onPageChange={() => {}} />
    )
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument()
    }
    expect(screen.getByText('2').closest('a')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('calls onPageChange with the correct page when a page number is clicked', () => {
    const onPageChange = vi.fn()
    render(
      <DataGridPagination page={1} totalPages={3} onPageChange={onPageChange} />
    )
    fireEvent.click(screen.getByText('3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with previous page when Previous is clicked', () => {
    const onPageChange = vi.fn()
    render(
      <DataGridPagination page={2} totalPages={3} onPageChange={onPageChange} />
    )
    fireEvent.click(screen.getByLabelText(/previous/i))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange with next page when Next is clicked', () => {
    const onPageChange = vi.fn()
    render(
      <DataGridPagination page={2} totalPages={3} onPageChange={onPageChange} />
    )
    fireEvent.click(screen.getByLabelText(/next/i))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('does not call onPageChange when clicking Previous on first page', () => {
    const onPageChange = vi.fn()
    render(
      <DataGridPagination page={1} totalPages={3} onPageChange={onPageChange} />
    )
    fireEvent.click(screen.getByLabelText(/previous/i))
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('does not call onPageChange when clicking Next on last page', () => {
    const onPageChange = vi.fn()
    render(
      <DataGridPagination page={3} totalPages={3} onPageChange={onPageChange} />
    )
    fireEvent.click(screen.getByLabelText(/next/i))
    expect(onPageChange).not.toHaveBeenCalled()
  })
})
