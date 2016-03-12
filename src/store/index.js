import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';
import immutableToJS from '../utils/immutable-to-js';

const logger = createLogger({
  collapsed: true,
  logger: console,
  stateTransformer: (state) => {
    return immutableToJS(state);
  },
});

export default function makeStore() {
  return compose(applyMiddleware(thunk, logger))(createStore)(rootReducer, {});
}
