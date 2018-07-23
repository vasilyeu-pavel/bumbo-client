import Immutable from 'immutable';

import actionTypes from '../constants/app';

export const initialState = Immutable.fromJS({});

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_FILTERS_PARAMETERS:
      return state.setIn(
        ['filtersProps', action.name, 'selectedValues'],
        action.value
      );

    case actionTypes.RESET_FILTERS_PARAMETERS:
      return state
        .set('filtersProps', state.get('initialFiltersProps'));

    default:
      return state;
  }
}
