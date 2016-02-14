import {List, Map, fromJS} from 'immutable';

export const setCredit = (state, charges) => {
	return state.set('credit', List(fromJS(charges)));
}

export const addCreditCharge = (state, charge) => {
  const newCharges = state
                      .get('credit', List())
                      .unshift(fromJS(charge));

  return state.set('credit', newCharges);
}

export const setCategories = (state, categories) => {
  return state.set('categories', List(fromJS(categories)));
}

export const setDictionary = (state, dictionary) => {
	return state.set('dictionary', fromJS(dictionary));
}

export const addDictionaryEntry = (state, entry) => {
  const dictionary = state.get('dictionary', Map());

  return setDictionary(state,
    dictionary.set(entry.chargeDescription, fromJS(entry.chargeType))
  );
}

export default (state = Map(), action) => {
  switch (action.type) {
  case 'ADD_CREDIT_CHARGE':
    return addCreditCharge(state, action.charge);
  case 'SET_CREDIT':
    return setCredit(state, action.charges);
  case 'SET_CATEGORIES':
    return setCategories(state, action.categories);
  case 'SET_DICTIONARY':
    return setDictionary(state, action.dictionary);
  case 'ADD_DICTIONARY_ENTRY':
    return addDictionaryEntry(state, action.entry);
  default:
    return state;
  }
}
