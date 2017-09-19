'use strict';

const createStore = initialState => {
  const store = {
    state: initialState || {},
  };
  const listeners = [];

  const replaceState = newState => {
    store.state = newState;
    listeners.forEach(callback => callback(store));
  };

  store.setState = updator => {
    const newState =
      typeof updator === 'function' ? updator(store.state) : updator;
    replaceState(newState);
  };
  store.updateState = updator => {
    const newState =
      typeof updator === 'function' ? updator(store.state) : updator;
    replaceState(Object.assign({}, store.state, newState));
  };
  store.subscribe = callback => {
    listeners.push(callback);
    return store;
  };
  store.unsubscribe = callback => {
    const index = listeners.indexOf(callback);
    if (index < 0) {
      return false;
    }
    listeners.splice(index, 1);
    return store;
  };
  return store;
};

module.exports = createStore;
