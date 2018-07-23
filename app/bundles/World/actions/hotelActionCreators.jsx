import request from 'axios';
import actionTypes from '../constants/app';
import { convertKeysToSnakeCase } from '../utils/case';
import _ from 'lodash';
import Immutable from 'immutable';
import { queriesWithDefaultParamsSelector } from '../selectors';

export const requestHotelTours = (value) => ({
  type: actionTypes.REQUEST_HOTEL_TOURS, value,
});

export const requestHotelToursSuccess = (value) => ({
  type: actionTypes.REQUEST_HOTEL_TOURS_SUCCESS, value,
});

export const requestHotelToursFailure = (value) => ({
  type: actionTypes.REQUEST_HOTEL_TOURS_FAILURE, value,
});

export const changeHotelToursSort = ({ sort, direction }) => ({
  type: actionTypes.CHANGE_TOURS_SORT, sort, direction,
});

export const updateHotelTours = (percentage, tours) => ({
  type: actionTypes.UPDATE_HOTEL_TOURS, percentage, tours,
});

export const setHotelToursFilters = (maxPrice, maxDiscount) => ({
  type: actionTypes.SET_HOTEL_TOURS_FILTERS, maxPrice, maxDiscount,
});

export const updateHotelToursFilter = (key, value) => ({
  type: actionTypes.UPDATE_HOTEL_TOURS_FILTER, key, value,
});

export const checkRequestHotelTours = (requestId, data) => (dispatch, getState) => {
  request.get('/p1/search_results', { params: { request_id: requestId } })
    .then((response) => {
      const {
        loaded_percentage: percentage,
        hotels_with_tours: hotelWithTours } = response.data;
      const tours = hotelWithTours.length ? hotelWithTours[0].tours : [];
      const maxPrice = tours.length && _.maxBy(tours, 'price').price;
      const maxDiscount = tours.length && _.maxBy(tours, 'discount').discount;

      if (percentage === 100) {
        if (tours.length !== 0) {
          dispatch(setHotelToursFilters(maxPrice, maxDiscount));
        }

        dispatch(updateHotelTours(percentage, tours));
        dispatch(requestHotelTours(false));
        dispatch(requestHotelToursSuccess(true));
        // dispatch success
      } else {
        setTimeout(dispatch(checkRequestHotelTours(requestId)), 100);

        if (tours.length !== 0) {
          dispatch(setHotelToursFilters(maxPrice, maxDiscount));
          dispatch(updateHotelTours(percentage, tours));
        }
      }
    })
    .catch((response) => console.log('error while recieving hotel tours', response));
};

export const fetchHotelTours = () => (dispatch, getState) => {
  const { hotelState } = getState();
  const params = hotelState.get('searchParams').toJS();

  request.get('/p1/init_search', { params: convertKeysToSnakeCase(params) })
    .then((response) => {
      dispatch(updateHotelTours(0, []));
      dispatch(checkRequestHotelTours(response.data.request_id));
      dispatch(requestHotelTours(true));
    })
    .catch((response) => console.log('error while recieving request id', response));
};

export const createToursSearchParams = () => (dispatch, getState) => {
  const id = getState().hotelState.get('hotel').get('sletatHotelId');
  const params = queriesWithDefaultParamsSelector(getState());

  const searchParams = _.extend({}, params, { meals: 0, go_to: [`hotel_${id}`] });

  return dispatch({
    type: actionTypes.UPDATE_SEARCH_TOURS_PARAMS,
    searchParams: _.clone(Immutable.Map(searchParams)),
  });
};

export const updateSearchToursParams = (key, value) => (dispatch, getState) => {
  const searchParams = getState().hotelState.get('searchParams');

  return dispatch({
    type: actionTypes.UPDATE_SEARCH_TOURS_PARAMS,
    searchParams: searchParams.set(key, value),
  });
};
