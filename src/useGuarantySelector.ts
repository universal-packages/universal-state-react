import { State } from '@universal-packages/state'
import React from 'react'

import { useUniversalState } from './useUniversalState'

export function useGuarantySelector<V = any>(path: string | string[]): V {
  const state = useUniversalState()
  const [value, setValue] = React.useState<V>(state.get(path))
  const [guaranty, setGuaranty] = React.useState(0)

  React.useEffect((): (() => void) => {
    const finalPath = State.resolvePath(path)
    const setNewValue = (event: any): void => {
      setValue(event.payload)
      setGuaranty(guaranty + 1)
    }

    state.on(finalPath, setNewValue)

    return (): void => {
      state.off(finalPath, setNewValue)
    }
  }, [path])

  return value
}
