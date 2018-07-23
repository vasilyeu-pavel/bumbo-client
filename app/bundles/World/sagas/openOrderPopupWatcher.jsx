import actionTypes from '../constants/app';
import { put, call, select } from 'redux-saga/effects';
import { convertKeysToSnakeCase } from '../utils/case';
import { extend } from 'lodash';
import OrderAPI from '../api/order';

export function* fetchTourPartners() {
  try {
    const partners = yield call(OrderAPI.getPartners);
    yield put({ type: actionTypes.FETCH_PARTNERS, partners });
  } catch (error) {
    console.log('error while receiving partners data', error);
  }
}

export function* fetchTourCities() {
  try {
    const cities = yield call(OrderAPI.getCities);
    yield put({ type: actionTypes.FETCH_CITIES, cities });
  } catch (error) {
    console.log('error while receiving cities data', error);
  }
}

export function* fetchNewOrder(action) {
  try {
    const { hotelState } = yield select();
    const hotelTour = hotelState.get('tours').find(tour => tour.tourHash === action.tourHash);
    const tour = convertKeysToSnakeCase(hotelTour);
    const searchParams = convertKeysToSnakeCase(hotelState.get('searchParams').toJS());
    const params = extend(searchParams, tour);

    const order = yield call(OrderAPI.getNewOrder, params);

    yield put({ type: actionTypes.CREATE_TOUR_ORDER, order });
  } catch (error) {
    console.log('error while recieving order data', error);
  }
}

export function* showPopup(params) {
  yield put({ type: actionTypes.SHOW_POPUP });
}
