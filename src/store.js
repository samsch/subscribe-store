'use strict';

const createStore = initialState => {
  const store = {
    state: initialState || {},
  };
  const listeners = [];
  store.updateState = newState => {
    store.state = newState;
    listeners.forEach(callback => callback(store));
  };
  store.subscribe = callback => {
    listeners.push(callback);
  };
  store.unsubscribe = callback => {
    const index = listeners.indexOf(callback);
    if (index < 0) {
      return false;
    }
    listeners.splice(index, 1);
  };
  return store;
};

module.exports = createStore;
