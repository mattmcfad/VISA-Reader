import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import makeStore from './store';

import data from './mock/data.json';

const store = makeStore();

store.dispatch({
  type: 'SET_ENTRIES',
  entries: data
});

import Container from './containers/Container';

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('main')
);
