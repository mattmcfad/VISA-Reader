
import Papaparse from 'papaparse';

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

export function startLoading() {
  return {
    type: 'START_LOADING',
    payload: true,
  };
}

export function doneLoading() {
  return {
    type: 'DONE_LOADING',
    payload: false,
  };
}

export function parseCSV(csvFile) {
  return (dispatch, state) => {
    dispatch(startLoading());

    Papaparse.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      beforeFirstChunk: (chunk) => {
        // todo: have different options for different banks
        const headers = 'date,description,credit,debit,balance\r\n';
        return headers + chunk;
      },
      error: (error, file) => {
        console.error('Papaparse error:', error, file);
      },
      complete: (results) => {
        dispatch(batchAdd(results.data));
      },
    });
    return state;
  };
}

export function batchAdd(charges) {
  return (dispatch, getState) => {
    const state = getState();
    const oldCharges = state.credit.get('charges');
    const dict = state.dictionary.get('entries');

    let id = oldCharges.size ? oldCharges.last().get('id') + 1 : 1;

    charges.forEach( (charge) => {
      charge.id = id++;
      charge.category = dict.getIn([charge.description, 'category'], '');
    });
    dispatch(addBatchCreditCharge(charges));
    dispatch(doneLoading());
  };
}
