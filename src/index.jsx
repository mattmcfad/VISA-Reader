import './styles/styles.css';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import makeStore from './store';
import { setCredit, setCategories, setDictionary } from './actions.js';

import mockCharges from './mock/charges.json';
import mockCategories from './mock/categories.json';
import mockDictionary from './mock/dictionary.json';

const store = makeStore();
store.dispatch(setCredit({}));
// store.dispatch(setCredit(mockCharges));
store.dispatch(setCategories(mockCategories));
store.dispatch(setDictionary(mockDictionary));

import App from './containers/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
