import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DatePicker from './DatePicker'

vi.mock('@/components/ui/button', () => ({
  Button: (props: any) => <button {...props} />,
}))
vi.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: any) => <div>{children}</div>,
  PopoverTrigger: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  PopoverContent: ({ children }: any) => <div>{children}</div>,
}))
vi.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect }: any) => (
    <button
      onClick={() => onSelect(new Date('2024-05-03'))}
      data-testid="calendar-day"
      type="button"
    >
      Select Date
    </button>
  ),
}))
vi.mock('lucide-react', () => ({
  Calendar: () => <svg data-testid="calendar-icon" />,
}))

describe('DatePicker', () => {
  it('renders with placeholder when no date is selected', () => {
    const setDate = vi.fn()
    render(<DatePicker date={undefined} setDate={setDate} />)
    expect(screen.getByText('Escolha uma data')).toBeInTheDocument()
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
  })

  it('renders with formatted date when date is selected', () => {
    const setDate = vi.fn()
    render(<DatePicker date={new Date('2024-05-03')} setDate={setDate} />)
    const expected = new Date('2024-05-03').toLocaleDateString('pt-BR')
    expect(screen.getByText(expected)).toBeInTheDocument()
  })

  it('calls setDate when a date is selected from the calendar', () => {
    const setDate = vi.fn()
    render(<DatePicker date={undefined} setDate={setDate} />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByTestId('calendar-day'))
    expect(setDate).toHaveBeenCalledWith(new Date('2024-05-03'))
  })
})
