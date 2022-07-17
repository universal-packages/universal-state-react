import React from 'react'
import State from '@universal-packages/state'
import { useUniversalState } from './useUniversalState'

export function useSelector<V = any>(path: string | string[]): V {
  const state = useUniversalState()
  const [value, setValue] = React.useState<V>(state.get(path))

  React.useEffect((): (() => void) => {
    const finalPath = State.getPath(path)
    const setNewValue = (newValue: V): void => {
      setValue(newValue)
    }

    state.on(finalPath, setNewValue)

    return (): void => {
      state.removeListener(finalPath, setNewValue)
    }
  }, [path])

  return value
}
