import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OrderDetailField from './OrderDetailField'

describe('OrderDetailField', () => {
  it('renders title and content', () => {
    render(<OrderDetailField title="Status" content="Aprovado" />)
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Aprovado')).toBeInTheDocument()
  })

  it('applies font-bold class when isEmphasis is true', () => {
    render(<OrderDetailField title="Valor" content={100} isEmphasis />)
    const title = screen.getByText('Valor')
    const content = screen.getByText('100')
    expect(title.className).toMatch(/font-bold/)
    expect(content.className).toMatch(/font-bold/)
  })

  it('does not apply font-bold class when isEmphasis is false', () => {
    render(<OrderDetailField title="Valor" content={200} />)
    const title = screen.getByText('Valor')
    const content = screen.getByText('200')
    expect(title.className).not.toMatch(/font-bold/)
    expect(content.className).not.toMatch(/font-bold/)
  })
})
