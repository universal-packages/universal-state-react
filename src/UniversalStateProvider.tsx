import { State } from '@universal-packages/state'
import React from 'react'

import context from './context'

type ConditionalProps =
  | {
      state?: State
      initialState?: never
    }
  | {
      state?: never
      initialState?: Record<string, any>
    }

export type UniversalStateProviderProps = React.PropsWithChildren & ConditionalProps

export default function UniversalStateProvider(props: UniversalStateProviderProps): React.ReactElement {
  const state = React.useMemo(() => {
    const state = props.state || new State(props.initialState)

    state.setMaxListeners(Infinity)

    return state
  }, [props.state, props.initialState])

  return <context.Provider value={state}>{props.children}</context.Provider>
}
