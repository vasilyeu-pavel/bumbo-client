import Immutable, { List } from 'immutable';
import actionTypes from '../constants/app';

export const initialState = Immutable.fromJS({
  popupIsVisible: false,
  partners: new List(),
  cities: new List(),
  order: null,
  orderStatus: null,
  orderType: null,
  orderRequestId: null,
  flightsAreLoading: false
});

export default function orderReducer(state = initialState, action) {

  switch (action.type) {
    case actionTypes.FETCH_CITIES:
      return state
        .set('cities', new List(action.cities));

    case actionTypes.FETCH_PARTNERS:
      return state
        .set('partners', new List(action.partners));

    case actionTypes.SET_ORDER:
      return state
        .set('order', action.order);

    case actionTypes.SET_ORDER_TYPE:
      return state
        .set('orderType', action.orderType);

    case actionTypes.SET_ORDER_REQUEST_ID:
      return state
        .set('orderRequestId', action.orderRequestId);

    case actionTypes.REQUEST_ORDER_FLIGHTS:
      return state.set('flightsAreLoading', action.value);

    default:
      return state;
  }
}
