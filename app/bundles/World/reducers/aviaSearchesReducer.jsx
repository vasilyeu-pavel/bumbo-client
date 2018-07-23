import Immutable from 'immutable';
import actionTypes from '../constants/app';

export const initialState = Immutable.fromJS({
  tickets: [],
  ticketsAreLoading: false,
  ticketsLoadedSuccess: false,
  ticketsLoadedFailure: false,
});

export default function aviaSearchesReducer(state = initialState, action) {
  switch (action.type) {

    // TODO: remove convertKeysToCamelCase method call. Camelize fields on the backend
    case actionTypes.UPDATE_AVIA_TICKETS:
      return state.set('tickets', Immutable.List(action.tickets));

    case actionTypes.REQUEST_AVIA_TICKETS:
      return state.set('ticketsAreLoading', action.value);

    case actionTypes.REQUEST_AVIA_TICKETS_SUCCESS:
      return state.set('ticketsLoadedSuccess', action.value);

    case actionTypes.REQUEST_AVIA_TICKETS_ERROR:
      return state.set('ticketsLoadedFailure', action.value);

    case actionTypes.FILTERED_BY_PRICE_MAX: 
      return state.set('tickets', 
        state.get('tickets').sort((a, b) => a.flightData.priceInfo.price - b.flightData.priceInfo.price)
      )

    case actionTypes.FILTERED_BY_PRICE_MIN: 
      return state.set('tickets', 
        state.get('tickets').sort((a, b) => b.flightData.priceInfo.price - a.flightData.priceInfo.price)
      )  

    default:
      return state;
  }
}
