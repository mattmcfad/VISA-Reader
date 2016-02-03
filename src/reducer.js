import {List, Map} from 'immutable';

function setState(state, charges) {
	return state.set('credit', List(charges));
}

function addCharge(state, charge) {
  // todo
  return state;
}

export default function(state = Map(), action) {
  switch (action.type) {
	case 'ADD_CHARGE':
    return addCharge(state, action.charge, action.id);
  case 'SET_ENTRIES':
    return setState(state, action.entries);
  }
  return state;
}
