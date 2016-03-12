import { List, fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  types: [],
});

export const setCategories = (state, categories) => {
  return state.set('types', List(fromJS(categories)));
};

export default function categoryReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case 'SET_CATEGORIES':
    return setCategories(state, action.categories);
  default:
    return state;
  }
}
