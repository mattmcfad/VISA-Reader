import {List, Map} from 'immutable';

const setState = (state, charges) => {
	return state.set('credit', List(charges));
}

const addCharge = (state, charge) => {
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
