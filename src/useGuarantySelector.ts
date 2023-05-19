import React from 'react'
import { State } from '@universal-packages/state'
import { useUniversalState } from './useUniversalState'

export function useGuarantySelector<V = any>(path: string | string[]): V {
  const state = useUniversalState()
  const [value, setValue] = React.useState<V>(state.get(path))
  const [guaranty, setGuaranty] = React.useState(0)

  React.useEffect((): (() => void) => {
    const finalPath = State.getPath(path)
    const setNewValue = (newValue: V): void => {
      setValue(newValue)
      setGuaranty(guaranty + 1)
    }

    state.on(finalPath, setNewValue)

    return (): void => {
      state.off(finalPath, setNewValue)
    }
  }, [path])

  return value
}
