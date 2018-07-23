import actionTypes from '../constants/app';
import request from 'axios';
import { merge } from 'lodash';
import validation from '../utils/validation'

const SearchToursService = {
  getPricesForCities: (params) =>
    request.get('/search_params_filters/prices/for_dpt_cities', { params }).then(res => res.data),
  getPricesForDates: (params) =>
    request.get('/search_params_filters/prices/for_dates', { params }).then(res => res.data),
  getPricesForNights: (params) =>
    request.get('/search_params_filters/prices/for_nights', { params }).then(res => res.data),
};

export const checkedValidation = () => (dispatch, getState) => {
  const { searchToursState } = getState();
  validation(searchToursState, dispatch)
};

export const removeSearchDestination = () => ({
  type: actionTypes.REMOVE_SEARCH_DESTINATION,
});

export const filteredByPriceMin = () => ({
  type: actionTypes.FILTERED_BY_PRICE_MIN,
});

export const filteredByPriceMax = () => ({
  type: actionTypes.FILTERED_BY_PRICE_MAX,
});

export const updateSearchParams = (name, value, dateToAny = 'any') => ({
  type: actionTypes.UPDATE_SEARCH_PARAMS, name, value, dateToAny
});

export const updateSearchDestination = (destination) => ({
  type: actionTypes.UPDATE_SEARCH_DESTINATION, destination,
});

export const fetchDptCitiesPrices = (params) => (dispatch, getState) => {
  SearchToursService.getPricesForCities(params)
    .then((data) => {
      dispatch({ type: actionTypes.FETCH_DPT_CITIES_PRICES, data });
    })
    .catch((response) => console.log('error while fetching price data', response));
};

export const fetchDatesPrices = (params) => (dispatch, getState) => {
  const { searchToursState } = getState();
  const prices = searchToursState.get('priceDates');

  SearchToursService.getPricesForDates(params)
    .then((data) => {
      dispatch({
        type: actionTypes.FETCH_DATES_PRICES,
        data: { dates: merge({}, prices, data.dates), minPrice: data.min_price },
      });
    })
    .catch((response) => console.log('error while fetching price data', response));
};

export const fetchNightsPrices = (params) => (dispatch, getState) => {
  SearchToursService.getPricesForNights(params)
    .then(({ min, max }) => {
      dispatch({ type: actionTypes.FETCH_NIGHTS_PRICES, min, max });
    })
    .catch((response) => console.log('error while fetching price data', response));
};

export const resetPrices = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_DPT_CITIES_PRICES, data: { } });
  dispatch({ type: actionTypes.FETCH_DATES_PRICES, data: { } });
  dispatch({
    type: actionTypes.FETCH_NIGHTS_PRICES,
    minPriceNights: undefined,
    maxPriceNights: undefined,
  });
};
