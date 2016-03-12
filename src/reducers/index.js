import { combineReducers } from 'redux';
import credit from './credit';
import ui from './ui';
import dictionary from './dictionary';
import categories from './categories';

const rootReducer = combineReducers({
  credit,
  categories,
  dictionary,
  ui,
});


export default rootReducer;
