import { createContext } from 'react'
import State from '@universal-packages/state'

const universalStateContext = createContext<State>(null)

universalStateContext.displayName = 'UniversalStateContext'

export default universalStateContext
