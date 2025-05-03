import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, ...props }: any) => (
    <div data-testid="dialog" {...props}>
      {children}
    </div>
  ),
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: (props: any) => <h2 data-testid="dialog-title" {...props} />,
  DialogDescription: ({ children }: any) => (
    <div data-testid="dialog-description">{children}</div>
  ),
}))
vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} data-testid="history-link" {...props}>
      {children}
    </a>
  ),
}))
vi.mock('../OrderDetailForm/OrderDetailForm', () => ({
  default: ({ orderId }: any) => (
    <div data-testid="order-detail-form">Form for {orderId}</div>
  ),
}))

import OrderDetail from './OrderDetail'

describe('OrderDetail', () => {
  const onClose = vi.fn()

  it('renders dialog with title, description, form, and link', () => {
    render(<OrderDetail orderId="42" open={true} onClose={onClose} />)

    expect(screen.getByTestId('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-header')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-title')).toHaveTextContent(
      'Detalhes da ordem'
    )
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Aqui estão os detalhes da ordem 42'
    )
    expect(screen.getByTestId('order-detail-form')).toHaveTextContent(
      'Form for 42'
    )
    expect(screen.getByTestId('history-link')).toHaveAttribute(
      'href',
      '/order-detail/42'
    )
    expect(screen.getByTestId('history-link')).toHaveTextContent(
      'Ver Histórico'
    )
  })

  it('does not render dialog when open is false', () => {
    render(<OrderDetail orderId="42" open={false} onClose={onClose} />)

    expect(screen.getByTestId('dialog')).toBeInTheDocument()
  })
})
