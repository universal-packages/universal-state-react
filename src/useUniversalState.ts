import { State } from '@universal-packages/state'
import { useContext } from 'react'

import universalStateContext from './context'

export function useUniversalState(): State {
  const universalState = useContext(universalStateContext)

  if (!universalState) throw new Error('Universal state provider not found in tree')

  return universalState
}
