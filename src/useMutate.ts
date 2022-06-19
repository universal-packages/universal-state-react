import { ToolSet } from '@universal-packages/state'
import useUniversalState from './useUniversalState'

export default function useMutate(): (mutatator: (toolset: ToolSet) => void) => void {
  const state = useUniversalState()

  return (mutator: (toolset: ToolSet) => void): void => {
    state.mutate(mutator)
  }
}
