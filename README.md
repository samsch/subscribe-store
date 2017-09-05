# Subscribe Store v2.0.0
A simple subscribable store factory

The Subscribe Store factory creates an object with four properties:
- `state`: a reference to the current stored state.
- `updateState`: a function which replaces the state object and calls any listeners.
- `subscribe`: a function which is called with a listener to be called by updateState.
- `unsubscribe`: a function to remove a previously added listener.

That is pretty much the extent of the API.

## Installation and use
Install into your project with `npm i @samsch/subscribe-store` (for Node.js), or `npm i -D @samsch/subscribe-store` (for Webpack/Browserify or other bundled projects).

Use the factory like this:
```js
// For es module environments (Webpack, Babel)
import createStore from '@samsch/subscribe-store';

// For Node.js or other CommonJS environments
const createStore = require('@samsch/subscribe-store');

// ...

const aStore = createStore();

const listener = aStore => {
  console.log(aStore.state);
}

aStore.subscribe(listener);

aStore.updateState({
  foo: 'a',
});
// listener will be called synchronously

aStore.state.foo === 'a';
// true

aStore.unsubscribe(listener);
```

## API

### createStore([initialState: Any])
The module exports a single function, which takes a single optional argument which will be used as the initial state.
```js
// Create store with empty object as initial state.
const store = createStore();

// Create store with an explicit initial state.
const store = createStore({ bar: 'b' });
```

### store.state
The store holds a public reference to the current state as the `state` property.

### store.updateState(newState: Any)
`store.updateState()` synchronously replaces the current state with the single passed argument, then calls all listeners attached with `store.subscribe()` with the store as their argument.
```js
store.updateState({ baz: 'c' });

store.state.baz === 'c';
// true
```

### store.subscribe(listener: Function)
Adds a new listener function to be called during updateState. This listener should accept a single store argument, which it can use to get the current state.

> Currently `store.subscribe()` does not return a value, but future versions will probably return the store to allow for chaining.

### store.unsubscribe(listener: Function)
Removes a previously added listener function. Currently it will return false if the give listener was not actually attached.

> The return value of unsubscribe is likely to change in future (major) versions.

## ES support
This library is compiled with Babel to support IE11, last 3 Safari, and last 2 Chrome and Firefox. Publically, it expects ES6 methods/objects to exist (natively or polyfilled). Realistically, it's a small library, and only uses ES5 methods/objects, so it probably will work in a pure ES5 environment.

If a case is found which doesn't work in pure ES5 environments, and it doesn't require drastic changes or much uglier code, I'll pull those changes in.

## Getting help
You can frequently find me (samsch) hanging out in ##javascript, #Node.js, and #reactjs on Freenode, especially during US working hours. This is a small library, so it's likely someone else could help you as well if you point them at the source file and your code.

## Contributing
Code is formatted to the local prettier/eslint config.

Run tests once with `npm test`, or continuously with `npm test -- --watch`.

The projects builds with `npm run build`, which is also called on pre-publish.
