import { createStore, applyMiddleware } from 'redux';

import createLogger from 'redux-logger';
import { Iterable } from 'immutable';

import reducer from '../reducers';

const stateTransformer = (state) => {
  return (Iterable.isIterable(state)) ? state.toJS() : state;
};

const logger = createLogger({
  stateTransformer,
});

export default function makeStore() {
  return createStore(
    reducer,
    applyMiddleware(logger)
  );
}
