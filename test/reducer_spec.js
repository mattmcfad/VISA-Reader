import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setState, addCharge} from '../src/reducer';

describe('Reducer Logic', () => {

  describe('setState', () => {

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

      const nextState = setState (state, charges);

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

  describe('addCharge', () => {

    it('adds new credit card charge', () => {
      const state = Map();
      const charge = {
        "id": 9,
        "date": "12/21/2015",
        "description": "QUANTUM COFFEE",
        "credit": 12.49
      };
      const nextState = addCharge(state, charge);
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

      const nextState = addCharge(state, newCharge);

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

});
