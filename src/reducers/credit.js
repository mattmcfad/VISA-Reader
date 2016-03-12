import { List, fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  charges: [],
});

export const setCredit = (state, charges) => {
  return state.set('charges', List(fromJS(charges)));
};

export const addBatchCreditCharge = (state, charges) => {
  const newCredit = state.get('charges', List()).concat(fromJS(charges));
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
  const charges = state.get('charges', List()).map(charge => {
    return charge.get('description') === chargeDescription
      ? charge.set('category', category)
      : charge;
  });
  return setCredit(state, charges);
};


export default function creditReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_CREDIT':
    return setCredit(state, action.charges);
  case 'ADD_BATCH_CREDIT_CHARGE':
    return addBatchCreditCharge(state, action.charges);
  case 'ADD_CREDIT_CHARGE':
    return addCreditCharge(state, action.charge);
  case 'ADD_CATEGORY_TO_CHARGE':
    return addCategoryToCharge(state, action.chargeDescription, action.category);
  default:
    return state;
  }
}
