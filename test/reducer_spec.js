import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setCredit, addCreditCharge, setCategories, setDictionary, addDictionaryEntry}
from '../src/reducer';

describe('Reducer Logic', () => {

  describe('setCredit', () => {

    it('adds the charges to the credit state', () => {
      const state = Map();
      const charges = [
        {
          "id": 8,
          "date": "12/19/2015",
          "description": "AAA Bar",
          "credit": 99.10
        },
        {
          "id": 7,
          "date": "12/17/2015",
          "description": "PATRIA",
          "credit": 230.47
        },
        {
          "id": 6,
          "date": "12/14/2015",
          "description": "METRO #62",
          "credit": 20.94
        }
      ];

      const nextState = setCredit(state, charges);

      expect(nextState).to.equal(Map({
        credit: List.of(
          Map({
            "id": 8,
            "date": "12/19/2015",
            "description": "AAA Bar",
            "credit": 99.10
          }),
          Map({
            "id": 7,
            "date": "12/17/2015",
            "description": "PATRIA",
            "credit": 230.47
          }),
          Map({
            "id": 6,
            "date": "12/14/2015",
            "description": "METRO #62",
            "credit": 20.94
          })
        )
      }));
    });
  });

  describe('addCreditCharge', () => {

    it('adds new credit card charge', () => {
      const state = Map();
      const charge = {
        "id": 9,
        "date": "12/21/2015",
        "description": "QUANTUM COFFEE",
        "credit": 12.49
      };
      const nextState = addCreditCharge(state, charge);
      expect(nextState).to.equal(Map({
        credit: List.of(
          Map({
            "id": 9,
            "date": "12/21/2015",
            "description": "QUANTUM COFFEE",
            "credit": 12.49
          })
        )
      }));
    });

    it('append charge to front of list', () => {
      const state = Map({
        credit: List.of(
          Map({
            "id": 8,
            "date": "12/19/2015",
            "description": "AAA Bar",
            "credit": 99.10
          })
        )
      });

      const newCharge = {
        "id": 9,
        "date": "12/21/2015",
        "description": "QUANTUM COFFEE",
        "credit": 12.49
      };

      const nextState = addCreditCharge(state, newCharge);

      expect(nextState).to.equal(Map({
        credit: List.of(
          Map({
            "id": 9,
            "date": "12/21/2015",
            "description": "QUANTUM COFFEE",
            "credit": 12.49
          }),
          Map({
              "id": 8,
              "date": "12/19/2015",
              "description": "AAA Bar",
              "credit": 99.10
          })
        )
      }));
    });
  });

  describe('setCategories', () => {

    it('adds the mock categories to the state', () => {
      const state = Map();
      const categories = [
      	"Food",
      	"Coffee",
      	"Uber",
      	"Restaurant",
      	"Bar",
      	"Alcohol",
      	"Optometrist",
      	"Dentist",
      	"TTC",
      	"Internet",
      	"Clothes",
      	"Shoes",
      	"Miscellaneous"
      ];

      const nextState = setCategories(state, categories);

      expect(nextState).to.equal(Map({
        'categories': List.of(
          'Food',
        	'Coffee',
        	'Uber',
        	'Restaurant',
        	'Bar',
        	'Alcohol',
        	'Optometrist',
        	'Dentist',
        	'TTC',
        	'Internet',
        	'Clothes',
        	'Shoes',
        	'Miscellaneous'
        )
      }));
    });

  });

  describe('setDictionary', () => {
    it('adds the mock dictionary to the state', () => {
      const state = Map();
      const dictionary = {
      	"AAA Bar": {
      		"category": "Alcohol",
      		"tags": ["Bar", "Dinner"]
      	},
      	"PATRIA": {
      		"category": "Food",
      		"tags": ["Dinner", "Drinks"]
      	},
      	"METRO #62": {
      		"category": "Food",
      		"tags": ["Grocery"]
      	},
      	"Amazon.ca": {
      		"category": "Miscellaneous",
      		"tags": ["Electronics"]
      	},
      	"Uber BV": {
      		"category": "Transportation",
      		"tags": []
      	}
      };

      const nextState = setDictionary(state, dictionary);

      expect(nextState).to.equal(Map({
        'dictionary': Map({
          'AAA Bar' : Map({
            'category': 'Alcohol',
            'tags': List.of('Bar', 'Dinner')
          }),
          'PATRIA': Map({
            'category': 'Food',
            'tags': List.of('Dinner', 'Drinks')
          }),
          'METRO #62': Map({
            'category': 'Food',
            'tags': List.of('Grocery')
          }),
          'Amazon.ca': Map({
            'category': 'Miscellaneous',
            'tags': List.of('Electronics')
          }),
          'Uber BV': Map({
            'category': 'Transportation',
            'tags': List.of()
          })
        })
      }));
    });
  });

  describe('addDictionaryEntry', () => {
    it('adds a new entry to dictionary', () => {

      const state = Map();
      const entry = {
        chargeDescription: 'AAA Bar',
        chargeType: {
          'category': 'Alcohol',
      		'tags': ['Bar', 'Dinner']
        }
      };

      const nextState = addDictionaryEntry(state, entry);
      expect(nextState).to.equal(Map({
        'dictionary': Map({
          'AAA Bar': Map({
            'category': 'Alcohol',
            'tags': List.of('Bar', 'Dinner')
          })
        })
      }));

    });

  });
});
