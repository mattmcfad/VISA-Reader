import {List, Map, fromJS} from 'immutable';

export const setState = (state, charges) => {
	return state.set('credit', List(fromJS(charges)));
}

export const addCharge = (state, charge) => {
  // todo
  return state;
}

export default (state = Map(), action) => {
  switch (action.type) {
	case 'ADD_CHARGE':
    return addCharge(state, action.charge, action.id);
  case 'SET_ENTRIES':
    return setState(state, action.entries);
  }
  return state;
}
