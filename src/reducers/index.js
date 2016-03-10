import { List, Map, fromJS } from 'immutable';

export const setCredit = (state, charges) => {
  return state.set('credit', List(fromJS(charges)));
};

export const addBatchCreditCharge = (state, charges) => {
  const newCredit = state.get('credit', List()).concat(fromJS(charges));
  return setCredit(state, newCredit);
};

export const addCreditCharge = (state, charge) => {
  const oldCharges = state.get('credit', List());
  const charges = oldCharges.push(fromJS(charge));

  return state.get('dictionary').has(charge.description)
    ? addCategoryToCharge(
        setCredit(state, charges),
        charge.description,
        state.getIn(['dictionary', charge.description, 'category'])
    )
    : setCredit(state, charges);
};

export const addCategoryToCharge = (state, chargeDescription, category) => {
  const charges = state.get('credit', List()).map(charge => {
    return charge.get('description') === chargeDescription
      ? charge.set('category', category)
      : charge;
  });
  return setCredit(state, charges);
};

export const setCategories = (state, categories) => {
  return state.set('categories', List(fromJS(categories)));
};

export const setDictionary = (state, dictionary) => {
  return state.set('dictionary', fromJS(dictionary));
};

export const addDictionaryEntry = (state, entry) => {
  const dictionary = state.get('dictionary', Map());

  return setDictionary(state,
    dictionary.set(entry.chargeDescription, fromJS(entry.chargeType))
  );
};

export default (state = Map(), action) => {
  switch (action.type) {
  case 'SET_CREDIT':
    return setCredit(state, action.charges);
  case 'ADD_BATCH_CREDIT_CHARGE':
    return addBatchCreditCharge(state, action.charges);
  case 'ADD_CREDIT_CHARGE':
    return addCreditCharge(state, action.charge);
  case 'ADD_CATEGORY_TO_CHARGE':
    return addCategoryToCharge(state, action.chargeDescription, action.category);
  case 'SET_CATEGORIES':
    return setCategories(state, action.categories);
  case 'SET_DICTIONARY':
    return setDictionary(state, action.dictionary);
  case 'ADD_DICTIONARY_ENTRY':
    return addDictionaryEntry(state, action.entry);
  default:
    return state;
  }
};
