import Immutable from 'immutable';
import actionTypes from '../constants/app';

export const initialState = Immutable.fromJS({

});

export default function aviasalesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENCY:
      return state.set('currencyId', action.id);

    default:
      return state;
  }
}
