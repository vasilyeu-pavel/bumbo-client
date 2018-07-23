import Immutable from 'immutable';
import actionTypes from '../constants/app';
import toCamelCase from '../utils/toCamelCase'

export const initialState = Immutable.Map({ 
  validInputDestination: true,
  validInputDateFrom: true,
  validInputDateTo: true,
  searchParams: Immutable.Map({
    date_to_any: ''
  }),
});

export default function searchToursReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SEARCH_PARAMS:
    {
      const str = "validInput" + toCamelCase(action.name);

        return state
        .setIn(['searchParams', action.name], action.value)
        .set(str, true)
        .setIn(['searchParams', 'date_to_any'], action.dateToAny)
    }

    case actionTypes.UPDATE_SEARCH_DESTINATION:
      return state
        .set('destination', action.destination)
        .set('validInputDestination', true);

    case actionTypes.REMOVE_SEARCH_DESTINATION:
      return state
      .remove('destination')
      .removeIn(['defaultDestination', 'id'])
      .removeIn(['defaultDestination', 'type'])
      .set('validInputDestination', true);

    case actionTypes.CHECKED_VALIDATION:
      return state.set(action.payload, false);

    case actionTypes.SET_PARAMS_ANY:
      return state
      .setIn(['searchParams', 'date_to_any'], 'any')  

    case actionTypes.FETCH_DPT_CITIES_PRICES:
      return state.set('priceDptCities', action.data);

    case actionTypes.FETCH_DATES_PRICES:
      return state
        .set('priceDates', action.data.dates)
        .set('minPriceDates', action.data.minPrice);

    case actionTypes.FETCH_NIGHTS_PRICES:
      return state.merge({
        minPriceNights: action.min,
        maxPriceNights: action.max,
      });

    default:
      return state;
  }
}
