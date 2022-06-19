import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TestApp from './TestApp'

describe('state-react', (): void => {
  it('lets connect react with a universal state', async (): Promise<void> => {
    render(<TestApp />)

    fireEvent.click(screen.getByText('Click me'))

    expect(screen.getByText(/State value:/)).toHaveTextContent('State value: this is a value')
  })

  it('lets use mutate as a single function', async (): Promise<void> => {
    render(<TestApp />)

    fireEvent.click(screen.getByText('Test mutate'))

    expect(screen.getByText(/State value:/)).toHaveTextContent('State value: using useMutate')
  })
})
