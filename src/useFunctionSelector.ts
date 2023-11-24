import React from 'react'

import { useUniversalState } from './useUniversalState'

export function useFunctionSelector<S = any, V = any>(selector: (state: S) => V): V {
  const state = useUniversalState()
  const [value, setValue] = React.useState<V>(selector(state.get()))

  React.useEffect((): (() => void) => {
    const setNewValue = ({ payload }): void => {
      const newValue = selector(payload)
      setValue(newValue)
    }

    state.on('@', setNewValue)

    return (): void => {
      state.off('@', setNewValue)
    }
  }, [selector])

  return value
}
