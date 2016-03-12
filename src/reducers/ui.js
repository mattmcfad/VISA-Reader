import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  loading: false,
});

export const startLoading = (state) => {
  return state.set('loading', true);
};

export const doneLoading = (state) => {
  return state.set('loading', false);
};

export default function uiReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case 'START_LOADING':
    return startLoading(state, action.payload);
  case 'DONE_LOADING':
    return doneLoading(state, action.payload);
  default:
    return state;
  }
}
