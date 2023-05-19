import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TestApp from './TestApp'

describe('state-react', (): void => {
  it('lets connect react with a universal state', async (): Promise<void> => {
    render(<TestApp />)

    expect(screen.getByText(/State value by selector:/)).toHaveTextContent('State value by selector: initial')
    expect(screen.getByText(/State value by function selector:/)).toHaveTextContent('State value by function selector: initial')
    expect(screen.getByText(/State value by no guaranty:/)).toHaveTextContent('State value by no guaranty: {"and":{"deep":1}}')
    expect(screen.getByText(/State value by guaranty:/)).toHaveTextContent('State value by guaranty: {"and":{"deep":1}}')

    fireEvent.click(screen.getByText('Click me'))

    expect(screen.getByText(/State value by selector:/)).toHaveTextContent('State value by selector: this is a value')
    expect(screen.getByText(/State value by function selector:/)).toHaveTextContent('State value by function selector: this is a value')
    expect(screen.getByText(/State value by no guaranty:/)).toHaveTextContent('State value by no guaranty: {"and":{"deep":1}}')
    expect(screen.getByText(/State value by guaranty:/)).toHaveTextContent('State value by guaranty: {"and":{"deep":1}}')
  })

  it('lets use mutate as a single function', async (): Promise<void> => {
    render(<TestApp />)

    expect(screen.getByText(/State value by selector:/)).toHaveTextContent('State value by selector: initial')
    expect(screen.getByText(/State value by function selector:/)).toHaveTextContent('State value by function selector: initial')
    expect(screen.getByText(/State value by no guaranty:/)).toHaveTextContent('State value by no guaranty: {"and":{"deep":1}}')
    expect(screen.getByText(/State value by guaranty:/)).toHaveTextContent('State value by guaranty: {"and":{"deep":1}}')

    fireEvent.click(screen.getByText('Test mutate'))

    expect(screen.getByText(/State value by selector:/)).toHaveTextContent('State value by selector: using useMutate')
    expect(screen.getByText(/State value by function selector:/)).toHaveTextContent('State value by function selector: using useMutate')
    expect(screen.getByText(/State value by no guaranty:/)).toHaveTextContent('State value by no guaranty: {"and":{"deep":1}}')
    expect(screen.getByText(/State value by guaranty:/)).toHaveTextContent('State value by guaranty: {"and":{"deep":1}}')
  })

  it('guaranties the change of deep containers if use guaranty', async (): Promise<void> => {
    render(<TestApp />)

    expect(screen.getByText(/State value by selector:/)).toHaveTextContent('State value by selector: initial')
    expect(screen.getByText(/State value by function selector:/)).toHaveTextContent('State value by function selector: initial')
    expect(screen.getByText(/State value by no guaranty:/)).toHaveTextContent('State value by no guaranty: {"and":{"deep":1}}')
    expect(screen.getByText(/State value by guaranty:/)).toHaveTextContent('State value by guaranty: {"and":{"deep":1}}')

    fireEvent.click(screen.getByText('Test Guaranty'))
    expect(screen.getByText(/State value by selector:/)).toHaveTextContent('State value by selector: initial')
    expect(screen.getByText(/State value by function selector:/)).toHaveTextContent('State value by function selector: initial')
    expect(screen.getByText(/State value by no guaranty:/)).toHaveTextContent('State value by no guaranty: {"and":{"deep":1}}')
    expect(screen.getByText(/State value by guaranty:/)).toHaveTextContent('State value by guaranty: {"and":{"deep":2}}')
  })
})
