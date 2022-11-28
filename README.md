# State React

[![npm version](https://badge.fury.io/js/@universal-packages%2Fstate-react.svg)](https://www.npmjs.com/package/@universal-packages/state-react)
[![Testing](https://github.com/universal-packages/universal-state-react/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-state-react/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-state-react/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-state-react)

React bindings for [Universal State](https://github.com/universal-packages/universal-state), as an alternative for simple context state and other state management libraries.

## Trade offs

As you may notice this alternative lacks some of what other libraries consider fundamentals like action naming or atomization of state transformations, instead with universal state you still treat your state as a centralized source of truth but with the simplification that you mutate and observe changes in it by using string paths. This dynamism requires you to be sure always what paths are you using, there is a section here to mitigate the debugging difficulty that this brings.

## Install

```shell
npm install @universal-packages/state-react
```

> State react uses exclusively teh react hooks API so make sure you are using a recent version of React.

## Provider

Make sure you wrap your application with the `UniversalStateProvider` so the state object is available for all components in the tree.

```js
import { UniversalStateProvider } from '@universal-packages/state-react'

const App = () => {

  return <UniversalStateProvider>
    /** Some other components */
  <UniversalStateProvider>
}
```

You can pass your own state object imported from somewhere else probably already populated with some data.

```js
import { UniversalStateProvider } from '@universal-packages/state-react'
import { State } from '@universal-packages/state'

const state = new State({ initialized: false })

const App = () => {

  return <UniversalStateProvider state={state}>
    /** Some other components */
  <UniversalStateProvider>
}
```

Or pass some initial state directly to the provider.

```js
import { UniversalStateProvider } from '@universal-packages/state-react'

const initialState = { initialized: false }

const App = () => {

  return <UniversalStateProvider initialState={initialState}>
    /** Some other components */
  <UniversalStateProvider>
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

## useSelector()

Observes state changes for a provided path and returns the value there.

```js
import { useSelector } from '@universal-packages/state-react'

const HappyComponent = () => {
  const value = useSelector('value/in/state')

  return (
    <div>
      <h1>Test Component</h1>
      <p>State value: {value}</p>
    </div>
  )
}
```

## useFunctionSelector()

Observes state changes for a provided selector and returns the value there.

```js
import { useFunctionSelector } from '@universal-packages/state-react'

const HappyComponent = () => {
  const valueS = useFunctionSelector((state) => state.value.in.state)

  return (
    <div>
      <h1>Test Component</h1>
      <p>State value: {value}</p>
    </div>
  )
}
```

## useMutate()

Gives a direct access to the state `mutate` function.

```js
import { useMutate } from '@universal-packages/state-react'

const HappyComponent = () => {
  const mutate = useMutate()

  const handleClick = (): void => {
    mutate((toolSet) => {
      toolSet.remove('session)
      toolSet.set('initialized', false)
    })
  }

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}
```

## Mitigate debugging by using string constants

If you want to make sure all paths in your app are constant and truthful because you want to ensure 100% you are not messing that up, you can just assign the paths you are using to some constants.

```js
export const SESSION_PATH = 'auth/session'
export const USER_INFO_PATH = 'auth/user'
```

```js
import { SESSION_PATH } from './paths'
//.
//.
//.
state.remove(SESSION_PATH)
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
