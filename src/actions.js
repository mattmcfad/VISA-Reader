export const setCredit = (charges) => {
	return {
		type: 'SET_CREDIT',
		charges
	}
}

export const addCreditCharge = (charge) => {
	return {
		type: 'ADD_CREDIT_CHARGE',
		charge
	}
}

export const addCategoryToCharge = (chargeDescription, category) => {
	return {
		type: 'ADD_CATEGORY_TO_CHARGE',
		chargeDescription,
		category
	}
}


export const setCategories = (categories) => {
	return {
		type: 'SET_CATEGORIES',
		categories
	}
}

export const setDictionary = (dictionary) => {
	return {
		type: 'SET_DICTIONARY',
		dictionary
	}
}

export const addDictionaryEntry = (entry) => {
	return {
		type: 'ADD_DICTIONARY_ENTRY',
		entry
	}
}
