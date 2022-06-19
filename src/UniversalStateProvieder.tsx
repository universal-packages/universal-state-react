import State from '@universal-packages/state'
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
  return <context.Provider value={props.state || new State(props.initialState)}>{props.children}</context.Provider>
}
