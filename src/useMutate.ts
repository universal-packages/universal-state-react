import { ToolSet } from '@universal-packages/state'
import { useUniversalState } from './useUniversalState'

export function useMutate(): (mutator: (toolSet: ToolSet) => void) => void {
  const state = useUniversalState()

  return (mutator: (toolSet: ToolSet) => void): void => {
    state.mutate(mutator)
  }
}
