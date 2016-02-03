import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setState} from '../src/reducer';

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

      const nextState = setState(state, charges);

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

});
