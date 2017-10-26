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

describe('setState', () => {
  test('should replace the state object', () => {
    const initialState = {
      foo: 'foo',
    };
    const store = createStore(initialState);

    const nextState = {
      bar: 'bar',
    };

    store.setState(nextState);

    expect(store.state).not.toBe(initialState);
    expect(store.state).toBe(nextState);
  });
  test('can be called with an updator function', () => {
    const initialState = {
      foo: 'foo',
    };
    const store = createStore(initialState);

    const nextState = prevState => ({
      bar: prevState.foo + ' bar',
    });

    store.setState(nextState);

    expect(store.state).not.toBe(initialState);
    expect(store.state).toEqual({
      bar: 'foo bar',
    });
  });
});

describe('updateState', () => {
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
    expect(store.state).not.toBe(nextState);
    expect(store.state).toEqual(Object.assign({}, initialState, nextState));
  });
  test('can be called with an updator function', () => {
    const initialState = {
      foo: 'foo',
    };
    const store = createStore(initialState);

    const nextState = prevState => ({
      bar: prevState.foo + ' bar',
    });

    store.updateState(nextState);

    expect(store.state).not.toBe(initialState);
    expect(store.state).toEqual({
      foo: 'foo',
      bar: 'foo bar',
    });
  });
});

describe('store.subscribe', () => {
  test('Returns an unsubscribe method', () => {
    const store = createStore();
    expect(store.subscribe(() => {})).toEqual(expect.any(Function));
  });
});

describe('store.unsubscribe', () => {
  test("Returns the store or false (if listener wasn't attached)", () => {
    const store = createStore();
    const subscriber = jest.fn();
    store.subscribe(subscriber);
    expect(store.unsubscribe(subscriber)).toBe(store);
    expect(store.unsubscribe(subscriber)).toBe(false);
    const unsubscribe = store.subscribe(subscriber);
    expect(unsubscribe()).toBe(store);
    expect(unsubscribe()).toBe(false);
  });
});

describe('Subscribers', () => {
  test('should be called during setState and updateState calls', () => {
    const subscriber = jest.fn();
    const store = createStore();
    store.subscribe(subscriber);
    store.setState({});
    expect(subscriber).toHaveBeenCalledWith(store);
    store.updateState({});
    expect(subscriber).toHaveBeenCalledWith(store);
    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  test('should be able to be removed', () => {
    const subscriber = jest.fn();
    const store = createStore();
    store.subscribe(subscriber);
    store.updateState({}); // Calls subscriber
    store.unsubscribe(subscriber);
    store.updateState({}); // Doesn't call subscriber
    const unsubscribe = store.subscribe(subscriber);
    store.updateState({}); // Calls subscriber
    unsubscribe();
    store.updateState({}); // Doesn't call subscriber
    expect(subscriber).toHaveBeenCalledTimes(2);
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
