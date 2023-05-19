import { ToolSet } from '@universal-packages/state'
import React from 'react'
import { UniversalStateProvider, useMutate, useFunctionSelector, useSelector, useUniversalState, useGuarantySelector } from '../src'

function GuarantyTest(): React.ReactElement {
  const value = useGuarantySelector('deep')

  return <p>State value by guaranty: {JSON.stringify(value)}</p>
}

function NoGuarantyTest(): React.ReactElement {
  const value = useSelector('deep')

  return <p>State value by no guaranty: {JSON.stringify(value)}</p>
}

function TestDisplay(): React.ReactElement {
  const state = useUniversalState()
  const mutate = useMutate()
  const valueP = useSelector('value/in/state')
  const valueS = useFunctionSelector((state) => state.value?.in?.state)
  const valueNG = useSelector('deep')
  const valueG = useGuarantySelector('deep')

  const handleClick = (): void => {
    state.set('/value/in/state', 'this is a value')
  }

  const handleClick2 = (): void => {
    mutate((toolSet: ToolSet): void => {
      toolSet.set('value/in/state', 'using useMutate')
    })
  }

  const handleClick3 = (): void => {
    mutate((toolSet: ToolSet): void => {
      toolSet.set('deep/and/deep', 2)
    })
  }

  return (
    <div>
      <h1>Test Component</h1>
      <p>State value by selector: {valueP}</p>
      <p>State value by function selector: {valueS}</p>
      <button onClick={handleClick}>Click me</button>
      <button onClick={handleClick2}>Test mutate</button>
      <button onClick={handleClick3}>Test Guaranty</button>
    </div>
  )
}

export default function TestApp(): React.ReactElement {
  return (
    <UniversalStateProvider initialState={{ value: { in: { state: 'initial' } }, deep: { and: { deep: 1 } } }}>
      <GuarantyTest />
      <NoGuarantyTest />
      <TestDisplay></TestDisplay>
    </UniversalStateProvider>
  )
}
