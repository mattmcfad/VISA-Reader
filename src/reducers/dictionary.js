import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  entries: [],
});

export const setDictionary = (state, dictionary) => {
  return state.set('entries', fromJS(dictionary));
};

export const addDictionaryEntry = (state, entry) => {
  const dictionary = state.get('entries', Map());

  return setDictionary(state,
    dictionary.set(entry.chargeDescription, fromJS(entry.chargeType))
  );
};

export default function dictionaryReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case 'SET_DICTIONARY':
    return setDictionary(state, action.dictionary);
  case 'ADD_DICTIONARY_ENTRY':
    return addDictionaryEntry(state, action.entry);
  default:
    return state;
  }
}
