import request from 'axios';
import _ from 'lodash';
import actionTypes from '../constants/app';
import promiseWhile from '../utils/promisesHelper';
import { changeCardsGroupByType } from './cardsActionsCreators';
import {
  changeMarkersType,
  changeMapBounds,
  toggleWorldMap
} from './mapActionCreators';
import {
  combineSearchParamsWithDefaultForHotels,
} from './mapActionCreators';

export const changeCurrency = (id) => ({
  type: actionTypes.CHANGE_CURRENCY, id,
});

export const toggleTourDescription = (value, cb) => ({
  type: actionTypes.TOGGLE_OPENED_TOURS, value,
});

export function updateGeoData(data, groupByType, target, isPartners) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_GEO_DATA,
      data, groupByType, isPartners,
    });

    if (!isPartners) {
      if (target === 'map') dispatch(changeMarkersType(groupByType));
      if (target === 'cards') dispatch(changeCardsGroupByType(groupByType));
      if (target === 'all') {
        dispatch(changeMarkersType(groupByType));
        dispatch(changeCardsGroupByType(groupByType));
      }
    }

    const value = {
      country: false,
      hotel: true,
    }[groupByType] || false;

    dispatch({ type: actionTypes.TOGGLE_OPENED_TOURS, value });
  };
}

const resolveFetchDataSuccess = (data, options, isPartners) => (dispatch) => {
  const { target, groupByType } = options;
  const resp = !isPartners ? data.items[groupByType] : data;

  dispatch(updateGeoData(resp, groupByType, target, isPartners));
};

export const fetchHotelsRequest = () => ({
  type: actionTypes.FETCH_HOTELS_DATA_REQUEST,
});

export const fetchHotelsSuccess = () => ({
  type: actionTypes.FETCH_HOTELS_DATA_SUCCESS,
});

export const fetchHotelsOnlineRequest = () => ({
  type: actionTypes.FETCH_HOTELS_ONLINE_DATA_REQUEST,
});

export const fetchHotelsOnlineSuccess = () => ({
  type: actionTypes.FETCH_HOTELS_ONLINE_DATA_SUCCESS,
});

export const setAviasalesXML = (xml) => ({
  type: actionTypes.SET_AVIASALES_XML, xml,
});

export function fetchPartnersData(params, options) {
  return (dispatch, getState) => {
    const defaultParams = getState().searchToursState.get('defaultSearchParams').toJS();
    const searchParams = _.extend(defaultParams, params);
    const getRequestId = (reqUrl) => request.get(reqUrl, { params: searchParams });

    const fetchFlightsWhile = (reqUrl, requestId, message, errorMessage) => {
      const object = {};
      const requestFunction = () => request.get(reqUrl, {
        params: { request_id: requestId },
      });
      const condition = () =>
        object.data && object.data.finished === true;
      const errorCondition = () =>
        object.data && object.data.results === errorMessage;

      return promiseWhile(condition, errorCondition, requestFunction,
        ({ data }) => {
          object.data = data;

          const hotels = [];

          if (data.tours.length) {
            data.tours.forEach(({ hotelData, flightData, tourData }) => {
              hotels.push({ ...hotelData, tourInfo: { flightData, tourData } });
            });
            dispatch(updateGeoData(hotels, 'hotel', 'cards', searchParams.isPartners));
            dispatch(changeCardsGroupByType('hotel'));
            if (data.finished) dispatch(fetchHotelsSuccess());
            dispatch(setAviasalesXML(data.aviasalesXml));
          } else {
            if (data.finished) {
              dispatch(updateGeoData(hotels, 'hotel', 'cards', searchParams.isPartners));
              dispatch(changeCardsGroupByType('hotel'));
              dispatch(fetchHotelsSuccess());
            }
          }
        });
    };

    return getRequestId('/tours/init_search')
      .then(response => new Promise((res, rej) => {
        const { request_id } = response.data;

        res(fetchFlightsWhile('/tours/actualizations',
          request_id,
          'not finished yet',
          'error'));
      }));
  };
}

export function fetchData(params, options, cb) {
  return (dispatch, getState) => {
    // if (options.asideCardsLoading) dispatch(geoDataRequest());
    const defaultParams = getState().searchToursState.get('defaultSearchParams').toJS();
    const searchParams = _.extend(defaultParams, params);
    const url = '/tours';

    request.get(url, { params: searchParams })
      .then((response) => {
        dispatch(resolveFetchDataSuccess(response.data, options, searchParams.isPartners));
        if (cb) cb(response.data);
      })
      .catch((error) => {
        throw new Error('fetchData', error);
      });
  };
}

export const fetchCountries = (params, options, cb) => (dispatch) => {
  const extendedParams = { ...params, group_by_type: 'country' };
  const extendedOptions = { ...options, groupByType: 'country' };

  dispatch(fetchData(extendedParams, extendedOptions, cb));
};

export const fetchCities = (params, options, cb) => (dispatch) => {
  const extendedParams = { ...params, group_by_type: 'city' };
  const extendedOptions = { ...options, groupByType: 'city' };

  dispatch(fetchData(extendedParams, extendedOptions, cb));
};

export const fetchHotels = (params, options, cb) => (dispatch, getState) => {
  const limit = 20;
  const extendedParams = { ...params, group_by_type: 'hotel', limit };

  const callback = () => dispatch(fetchData(extendedParams, options, cb));

  dispatch(fetchHotelsRequest());

  dispatch(fetchData(extendedParams, options, () => { cb(); callback(); }));
};

export const fetchPartnersHotels = (id) => (dispatch, getState) => {
  const { searchToursState } = getState();
  const hotelParams = combineSearchParamsWithDefaultForHotels(searchToursState, id, 'city');
  const options = { groupByType: 'hotel' };
  const extendedParams = { ...hotelParams, group_by_type: 'hotel', isPartners: true };
  dispatch(fetchHotelsRequest());
  dispatch(fetchPartnersData(extendedParams, options));
};

export const fetchHotelsOnline = (params, cb) => (dispatch, getState) => {
  dispatch(fetchHotelsRequest());

  const getRequestId = (reqUrl) => request.get(reqUrl, { params: params });

  const fetchCardsWhile = (url, requestId, errorMessage) => {
    const object = {};
    const options = { groupByType: 'hotel', target: 'all' };
    const requestFunction = () => request.get(url, {
      params: { request_id: requestId },
    });
    const condition = () =>
      object.data && object.data.finished === true;
    const errorCondition = () =>
      object.data && object.data.message === errorMessage;

    let firstDataIsLoaded = false;

    const cbWrap = (response) => {
      object.data = response.data;
      cb(response.data);

      if (!firstDataIsLoaded && object.data.items) {
        dispatch(fetchHotelsSuccess());
        dispatch(fetchHotelsOnlineRequest());
        firstDataIsLoaded = true;
      }

      dispatch(resolveFetchDataSuccess(response.data, options, false));
    }

    return promiseWhile(condition, errorCondition, requestFunction, cbWrap, {});
  };

  return getRequestId('/combine_search/tours/new')
    .then(response => new Promise((res, rej) => {
      const { request_id } = response.data;

      res(fetchCardsWhile('/combine_search/tours', request_id, 'error'));
    }));
}

export const initRootView = (searchParams = {}) => (dispatch, getState) => {
  dispatch(changeMapBounds({
    nw: { lat: 71, lng: -63 },
    se: { lat: -54, lng: 144 },
  }));
  dispatch(fetchCountries(searchParams));
  dispatch(fetchCities(searchParams));
};
