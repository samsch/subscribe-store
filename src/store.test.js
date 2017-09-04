/* eslint-env jest */
const createStore = require('./store');

describe('Store initialization', () => {
  test('should default to an empty state object', () => {
    const store = createStore();
    expect(Object.keys(store.state)).toHaveLength(0);
  });

  test('should accept an initial state', () => {
    const initialState = {
      foo: 'foo',
    };
    const store = createStore(initialState);
    expect(store.state).toBe(initialState);
  });
});

describe('Store updates', () => {
  test('should replace the state object', () => {
    const initialState = {
      foo: 'foo',
    };
    const store = createStore(initialState);

    const nextState = {
      bar: 'bar',
    };

    store.updateState(nextState);

    expect(store.state).not.toBe(initialState);
    expect(store.state).toBe(nextState);
  });
});

describe('Subscribers', () => {
  test('should be called after a state update', () => {
    const subscriber = jest.fn();
    const store = createStore();
    store.subscribe(subscriber);
    store.updateState({});
    expect(subscriber).toHaveBeenCalledWith(store);
  });

  test('should be able to be removed', () => {
    const subscriber = jest.fn();
    const store = createStore();
    store.subscribe(subscriber);
    store.updateState({});
    store.unsubscribe(subscriber);
    store.updateState({});
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  test('should all be called', () => {
    const subscribers = [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()];
    const store = createStore();
    subscribers.forEach(subscriber => {
      store.subscribe(subscriber);
    });
    store.updateState({});
    subscribers.forEach(subscriber => {
      expect(subscriber).toHaveBeenCalledWith(store);
    });
    expect.assertions(5);
  });

  test('should be removed individually', () => {
    const subscribers = [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()];
    const store = createStore();
    subscribers.forEach(subscriber => {
      store.subscribe(subscriber);
    });
    store.unsubscribe(subscribers[2]);
    store.updateState({});
    subscribers.forEach((subscriber, index) => {
      if (index === 2) {
        expect(subscriber).toHaveBeenCalledTimes(0);
      } else {
        expect(subscriber).toHaveBeenCalledTimes(1);
      }
    });
    expect.assertions(5);
  });
});
