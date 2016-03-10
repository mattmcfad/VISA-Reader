import { List } from 'immutable';

export const setCredit = (charges) => {
  return {
    type: 'SET_CREDIT',
    charges,
  };
};

export const addBatchCreditCharge = (charges) => {
  return {
    type: 'ADD_BATCH_CREDIT_CHARGE',
    charges,
  };
};

export const addCreditCharge = (charge) => {
  return {
    type: 'ADD_CREDIT_CHARGE',
    charge,
  };
};

export const addCategoryToCharge = (chargeDescription, category) => {
  return {
    type: 'ADD_CATEGORY_TO_CHARGE',
    chargeDescription,
    category,
  };
};

export const setCategories = (categories) => {
  return {
    type: 'SET_CATEGORIES',
    categories,
  };
};

export const setDictionary = (dictionary) => {
  return {
    type: 'SET_DICTIONARY',
    dictionary,
  };
};

export const addDictionaryEntry = (entry) => {
  return {
    type: 'ADD_DICTIONARY_ENTRY',
    entry,
  };
};

export function batchAdd(charges) {
  return (dispatch, state) => {
    const oldCharges = state().get('credit', List());
    let id = oldCharges.size ? oldCharges.last().get('id') + 1 : 1;

    const dict = state().get('dictionary');
    charges.map( (charge) => {
      charge.id = id++;
      charge.category = dict.getIn([charge.description, 'category'], '');
    });
    dispatch(addBatchCreditCharge(charges));
  };
}
