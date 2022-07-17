import { ToolSet } from '@universal-packages/state'
import React from 'react'
import { UniversalStateProvieder, useMutate, useFunctionSelector, useSelector, useUniversalState } from '../src'

function TestDisplay(): React.ReactElement {
  const state = useUniversalState()
  const mutate = useMutate()
  const valueP = useSelector('value/in/state')
  const valueS = useFunctionSelector((state) => state.value?.in?.state)

  const handleClick = (): void => {
    state.set('/value/in/state', 'this is a value')
  }

  const handleClick2 = (): void => {
    mutate((toolset: ToolSet): void => {
      toolset.set('value/in/state', 'using useMutate')
    })
  }

  return (
    <div>
      <h1>Test Component</h1>
      <p>State value by selector: {valueP}</p>
      <p>State value by function selector: {valueS}</p>
      <button onClick={handleClick}>Click me</button>
      <button onClick={handleClick2}>Test mutate</button>
    </div>
  )
}

export default function TestApp(): React.ReactElement {
  return (
    <UniversalStateProvieder initialState={{ value: { in: { state: 'initial' } } }}>
      <TestDisplay></TestDisplay>
    </UniversalStateProvieder>
  )
}
