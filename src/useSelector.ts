import { State } from '@universal-packages/state'
import React from 'react'

import { useUniversalState } from './useUniversalState'

export function useSelector<V = any>(path: string | string[]): V {
  const state = useUniversalState()
  const [value, setValue] = React.useState<V>(state.get(path))

  React.useEffect((): (() => void) => {
    const finalPath = State.resolvePath(path)
    const setNewValue = ({ payload }): void => {
      setValue(payload)
    }

    state.on(finalPath, setNewValue)

    return (): void => {
      state.off(finalPath, setNewValue)
    }
  }, [path])

  return value
}
