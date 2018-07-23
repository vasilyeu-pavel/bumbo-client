import actionTypes from '../constants/app';
import request from 'axios';
import qs from 'qs';
import { extend } from 'lodash';
import { convertKeysToSnakeCase } from '../utils/case';

const OrderService = {
  getPartners: () =>
    request.get('/tour_agencies.json').then(res => res.data),
  getCities: () =>
    request.get('/cities').then(res => res.data),
  createAviaOrder: (params) =>
    request.post('/avia/orders', params).then(res => res.data),
  createAviaOrderRequest: (params) =>
    request.post('/avia/orders/create_request', params).then(res => res.data),
  createHotelOrder: (params) =>
    request.post('/hotel/orders', params).then(res => res.data),
  fetchAviaOrder: (params) =>
    request.get('/avia/orders/tour_data', { params }).then(res => res.data),
  fetchHotelOrder: (orderTourId) =>
    request.get(`/hotel/order_tours/${orderTourId}/tour_data`).then(res => res.data),
  actualizeHotelOrder: (orderTourId) =>
    request.get(`/hotel/order_tours/${orderTourId}/actualize`).then(res => res.data),
};

const setOrder = (order) => ({
  type: actionTypes.SET_ORDER, order
});

const setOrderType = (orderType) => ({
  type: actionTypes.SET_ORDER_TYPE, orderType
});

const setOrderRequestId = (orderRequestId) => ({
  type: actionTypes.SET_ORDER_REQUEST_ID, orderRequestId
});

const setRequestOrderFlights = (value) => ({
  type: actionTypes.REQUEST_ORDER_FLIGHTS, value
});

export const createAviaOrder = (order, requestId) => async (dispatch, getState) => {
  try {
    const { orderState, routing } = getState();
    const marker = qs.parse(routing.location.search.slice(1)).marker;
    const authenticityToken = orderState.get('authenticityToken');
    const orderRequestId = orderState.get('orderRequestId');

    const params = extend({ order: { ...order, order_request_id: orderRequestId } }, {
      authenticity_token: authenticityToken,
      request_id: requestId,
      marker
    });
    const data = await OrderService.createAviaOrder(params);

    if (data.redirectUrl)
      window.location = data.redirectUrl;
  } catch (error) {
    console.log('error while creating aviasales order', error);
  }
};

export const createAviaOrderRequest = (order, requestId) => async (dispatch, getState) => {
  try {
    const { orderState, routing } = getState();
    const authenticityToken = orderState.get('authenticityToken');

    const params = extend({ order }, {
      authenticity_token: authenticityToken
    });
    const data = await OrderService.createAviaOrderRequest(params);
    dispatch(setOrderRequestId(data.orderRequestId));
    console.log('done order request', data);

  } catch (error) {
    console.log('error while creating aviasales order request', error);
  }
};

export const createHotelOrder = (order, orderTourId) => async (dispatch, getState) => {
  try {
    const { orderState } = getState();
    const authenticityToken = orderState.get('authenticityToken');
    const orderRequestId = orderState.get('orderRequestId');
    const params = extend({ order: { ...order, order_tour_id: orderTourId, order_request_id: orderRequestId } }, {
      authenticity_token: authenticityToken
    });

    const data = await OrderService.createHotelOrder(params);
    console.log('done', data);

    if (data.redirectUrl)
      window.location = data.redirectUrl;
  } catch (error) {
    console.log('error while creating hotel order', error);
  }
};

export const fetchHotelOrderInfo = (orderTourId, params) => async (dispatch, getState) => {
  try {
    const order = await OrderService.fetchHotelOrder(orderTourId);

    dispatch(setOrder(order));
    dispatch(setOrderType('hotel'));
  } catch (error) {
    console.log('error while fetching hotel order', error);
  }
};

export const fetchAviaOrderInfo = (orderTourId, params) => async (dispatch, getState) => {
  try {
    const order = await OrderService.fetchAviaOrder({ request_id: orderTourId, ...params });

    dispatch(setOrder(order));
    dispatch(setOrderType('avia'));
  } catch (error) {
    console.log('error while fetching aviasales order', error);
  }
};

export const actualizeHotelOrder = (orderTourId) => async (dispatch, getState) => {
  try {
    dispatch(setRequestOrderFlights(true));
    const order = await OrderService.actualizeHotelOrder(orderTourId);
    dispatch(setRequestOrderFlights(false));

    dispatch(setOrder(order));
  } catch (error) {
    console.log('error while fetching aviasales order', error);
  }
};
