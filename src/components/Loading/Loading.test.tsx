import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Loading from './Loading'

describe('Loading', () => {
  it('renders loading indicator and message', () => {
    render(<Loading />)
    expect(document.querySelector('[data-cy="loading-indicator"]')).toBeTruthy()
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })
})
