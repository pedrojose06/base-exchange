import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DialogModal from './DialogModal'

vi.mock('@radix-ui/react-dialog', () => ({
  Dialog: ({ children, ...props }: any) => (
    <div data-testid="dialog-root" {...props}>
      {children}
    </div>
  ),
}))
vi.mock('../ui/dialog', () => ({
  DialogContent: ({ children, ...props }: any) => (
    <div data-testid="dialog-content" {...props}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: (props: any) => <h2 data-testid="dialog-title" {...props} />,
  DialogDescription: ({ children }: any) => (
    <div data-testid="dialog-description">{children}</div>
  ),
}))

describe('DialogModal', () => {
  it('renders with title, subtitle, and children when open', () => {
    render(
      <DialogModal
        title="<b>Test Title</b>"
        subtitle="<i>Test Subtitle</i>"
        open={true}
        onClose={() => {}}
      >
        <div>Dialog Content</div>
      </DialogModal>
    )

    expect(screen.getByTestId('dialog-root')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-header')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-title').innerHTML).toContain('Test Title')
    expect(screen.getByTestId('dialog-description').innerHTML).toContain(
      'Test Subtitle'
    )
    expect(screen.getByText('Dialog Content')).toBeInTheDocument()
  })

  it('does not render title or subtitle if not provided', () => {
    render(
      <DialogModal open={true} onClose={() => {}}>
        <span>Only Content</span>
      </DialogModal>
    )
    expect(screen.queryByTestId('dialog-title')).not.toBeInTheDocument()
    expect(screen.queryByTestId('dialog-description')?.innerHTML).not.toContain(
      'Test Subtitle'
    )
    expect(screen.getByText('Only Content')).toBeInTheDocument()
  })
})
