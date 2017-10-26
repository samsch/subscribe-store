# 4.0.0

## API changes

`subscribe(myListener)` now returns an unsubscribe function equivalent to `() => store.unsubscribe(myListener)`.

# 3.0.0

## API changes

`updateState` now merges the given state into a copy of the current state, rather than replacing it. For the previous functionality, you can now use `setState`, which replaces the state.

`updateState` (and `setState`) can now be passed an updator function with a signature of `<previousState> => <newState>`.

`subscribe` now returns the store to allow for chaining.

# 2.0.1

Initial public release.
