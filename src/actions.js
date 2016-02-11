let chargeId = 0;

export const addCharge = (charge) => {
	return {
		type: 'ADD_CHARGE',
		charge
	}
}

export const setEntries = (entries) => {
	return {
		type: 'SET_ENTRIES',
		entries
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
