import { createStore, applyMiddleware, compose } from 'redux';

import { fromJS } from 'immutable';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import rootReducer from '../reducers';
import immutableToJS from '../utils/immutable-to-js';

const logger = createLogger({
  collapsed: true,
  logger: console,
  stateTransformer: (state) => {
    return immutableToJS(state);
  },
});

function _getStorageConfig() {
  return {
    key: 'TD-visa-reader-storage',
    serialize: (store) => {
      return store && store.dictionary ?
        JSON.stringify(store.dictionary.toJS()) : store;
    },
    deserialize: (state) => ({
      dictionary: state ? fromJS(JSON.parse(state)) : fromJS({}),
    }),
  };
}

export default function makeStore() {
  return compose(
    applyMiddleware(thunk, logger),
    persistState('dictionary', _getStorageConfig())
  )(createStore)(rootReducer, {});
}
