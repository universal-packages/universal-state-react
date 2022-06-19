# State React

[![npm version](https://badge.fury.io/js/@universal-packages%2Fstate-react.svg)](https://www.npmjs.com/package/@universal-packages/state-react)
[![Testing](https://github.com/Universal-Packages/universal-state-react/actions/workflows/testing.yml/badge.svg)](https://github.com/Universal-Packages/universal-state-react/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/Universal-Packages/universal-state-react/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/Universal-Packages/universal-state-react)

React bindings for [Universal State](https://github.com/Universal-Packages/universal-state), as an alternative for simple context state and other state management libraries.

## Trade offs

As you may notice this alternative lacks some of what other libraries consider fundamentals like action naming or atomization of state transformations, instead with universal state you still treat your state as a centralized source of truth but with the simplification that you mutate and observe changes in it by using string paths. This dynamicity requires you to be sure always what paths are you using, there is a seccion here to mitigate the debugging difficulty that this brings.

## Install

```shell
npm install @universal-packages/state-react
```

> State react uses exclusively teh react hooks API so make sure you are using a recent version of React.

## Provider

Make sure you wrap your application with the `UniversalStateProvider` so the state object is available for all components in the tree.

```js
import { UniversalStateProvieder } from '@universal-packages/state-react'

const App = () => {

  return <UniversalStateProvieder>
    /** Some other components */
  <UniversalStateProvieder>
}
```

You can pass your own state object imported from somewhere else probably already populated with some data.

```js
import { UniversalStateProvieder } from '@universal-packages/state-react'
import State from '@universal-packages/state'

const state = new State({ initialized: false })

const App = () => {

  return <UniversalStateProvieder state={state}>
    /** Some other components */
  <UniversalStateProvieder>
}
```

Or pass some initial state directly to the provider.

```js
import { UniversalStateProvieder } from '@universal-packages/state-react'

const initialState = { initialized: false }

const App = () => {

  return <UniversalStateProvieder initialState={initialState}>
    /** Some other components */
  <UniversalStateProvieder>
}
```

## useUniversalState()

Gets the context provided instance of of universal state.

```js
import { useUniversalState } from '@universal-packages/state-react'

const HappyComponent = () => {
  const state = useUniversalState()

  const handleClick = (): void => {
    state.remove('/session')
  }

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}
```

## useStateChanged()

Observes state changes for a privided path and returns the value there.

```js
import { useStateChanged } from '@universal-packages/state-react'

const HappyComponent = () => {
  const value = useStateChanged('value/in/state')

  return (
    <div>
      <h1>Test Component</h1>
      <p>State value: {value}</p>
    </div>
  )
}
```

## useMutate()

Givies a direct access to the state `mutate` function.

```js
import { useMutate } from '@universal-packages/state-react'

const HappyComponent = () => {
  const mutate = useMutate()

  const handleClick = (): void => {
    mutate((toolset) => {
      toolset.remove('session)
      toolset.set('initialized', false)
    })
  }

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
```
