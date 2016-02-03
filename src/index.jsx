import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import makeStore from './store';
import { setEntries } from './actions.js';

import data from './mock/data.json';

const store = makeStore();

store.dispatch(setEntries(data));

import Container from './containers/Container';

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('main')
);
