import Immutable from 'immutable';
import actionTypes from '../constants/app';
import { convertKeysToCamelCase } from '../utils/case';

export const initialState = Immutable.fromJS({
  searchParams: {},
  tours: [],
  toursSortBy: {
    sort: 'price',
    direction: true,
  },
  toursFilters: {
    price: {
      min: 0,
      max: 1,
      from: 0,
      to: 1,
    },
    discount: {
      min: 0,
      max: 100,
      from: 0,
      to: 100,
    },
  },
  toursAreLoading: false,
  toursLoadedSuccess: false,
  toursLoadedFailure: false,
});

export default function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SEARCH_TOURS_PARAMS:
      return state.set('searchParams', action.searchParams);

    // TODO: remove convertKeysToCamelCase method call. Camelize fields on the backend
    case actionTypes.UPDATE_HOTEL_TOURS:
      return state
        .set('tours', Immutable.List(action.tours.map(tour => convertKeysToCamelCase(tour))))
        .set('percentage', action.percentage);

    case actionTypes.SET_HOTEL_TOURS_FILTERS:
      return state
        .setIn(['toursFilters', 'price', 'max'], action.maxPrice)
        .setIn(['toursFilters', 'price', 'to'], action.maxPrice)
        .setIn(['toursFilters', 'discount', 'max'], action.maxDiscount)
        .setIn(['toursFilters', 'discount', 'to'], action.maxDiscount);

    case actionTypes.UPDATE_HOTEL_TOURS_FILTER:
      return state
        .setIn(['toursFilters', action.key, 'from'], action.value.from)
        .setIn(['toursFilters', action.key, 'to'], action.value.to);

    case actionTypes.CHANGE_TOURS_SORT:
      return state.set('toursSortBy', Immutable.Map({
        sort: action.sort,
        direction: action.direction,
      }));

    case actionTypes.REQUEST_HOTEL_TOURS:
      return state.set('toursAreLoading', action.value);

    case actionTypes.REQUEST_HOTEL_TOURS_SUCCESS:
      return state.set('toursLoadedSuccess', action.value);

    case actionTypes.REQUEST_HOTEL_TOURS_ERROR:
      return state.set('toursLoadedFailure', action.value);

    default:
      return state;
  }
}
