import { State } from '@universal-packages/state'
import { createContext } from 'react'

const universalStateContext = createContext<State>(null)

universalStateContext.displayName = 'UniversalStateContext'

export default universalStateContext
