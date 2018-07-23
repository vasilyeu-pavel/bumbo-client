import Immutable from 'immutable';
import actionTypes from '../constants/app';
import _ from 'lodash';

export const initialState = Immutable.fromJS({
  geoData: {
    country: Immutable.OrderedMap({}),
    city: Immutable.OrderedMap({}),
    hotel: Immutable.OrderedMap({}),
  },
  cachedGeoData: {},
  hotelsFetching: false,
  onlineHotelsFetching: false,
  toursIsOpened: false,
});

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENCY:
      return state.set('currencyId', action.id);

    case actionTypes.UPDATE_GEO_DATA:
      if (action.data && action.isPartners) {
        return state.setIn(
          ['geoData', 'hotel'],
          Immutable.List(_.clone(action.data)));
      }

      if (action.data && !action.isPartners) {
        return state.setIn(
          ['geoData', action.groupByType],
          Immutable.OrderedMap(action.data));
      }

      return false;

    case actionTypes.CACHE_GEO_DATA:
      return state.setIn(
        ['cachedGeoData', action.groupByType],
        Immutable.OrderedMap(action.data));

    case actionTypes.TOGGLE_OPENED_TOURS:
      return state.set('toursIsOpened', action.value);

    case actionTypes.FETCH_CARDS_REQUEST:
      return state.set('cardsFetching', true);

    case actionTypes.FETCH_HOTELS_DATA_REQUEST:
      return state.set('hotelsFetching', true);

    case actionTypes.FETCH_HOTELS_DATA_SUCCESS:
      return state.set('hotelsFetching', false);

    case actionTypes.FETCH_HOTELS_ONLINE_DATA_REQUEST:
      return state.set('onlineHotelsFetching', true);

    case actionTypes.FETCH_HOTELS_ONLINE_DATA_SUCCESS:
      return state.set('onlineHotelsFetching', false);

    case actionTypes.SET_AVIASALES_XML:
      return state.set('aviasalesXml', action.xml);

    default:
      return state;
  }
}
