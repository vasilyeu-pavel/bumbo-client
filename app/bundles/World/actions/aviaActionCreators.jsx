import request from 'axios';
import actionTypes from '../constants/app';
import { convertKeysToSnakeCase } from '../utils/case';

export const requestAviaTickets = (value) => ({
  type: actionTypes.REQUEST_AVIA_TICKETS, value,
});

export const requestAviaTicketsSuccess = (value) => ({
  type: actionTypes.REQUEST_AVIA_TICKETS_SUCCESS, value,
});

export const requestAviaTicketsFailure = (value) => ({
  type: actionTypes.REQUEST_AVIA_TICKETS_FAILURE, value,
});

export const updateAviaTickets = (tickets) => ({
  type: actionTypes.UPDATE_AVIA_TICKETS, tickets,
});

export const checkRequestTickets = (requestId, needInitSearches = false) => (dispatch, getState) => {
  if (needInitSearches) {
    dispatch(requestAviaTickets(true));
    dispatch(requestAviaTicketsSuccess(false));
    dispatch(updateAviaTickets([]));
  }

  request.get('/avia_searches', { params: { request_id: requestId } })
    .then((response) => {
      const { tickets, finished } = response.data;

      if (finished) {
        dispatch(updateAviaTickets(tickets));
        dispatch(requestAviaTickets(false));
        dispatch(requestAviaTicketsSuccess(true));
        // dispatch success
      } else {
        setTimeout(() => {
          dispatch(checkRequestTickets(requestId));
        }, 3000);

        if (tickets.length !== 0) {
          dispatch(updateAviaTickets(tickets));
        }
      }
    })
    .catch((response) => console.log('error while recieving avia tickets', response));
};

export const createNewAviaSearch = (history) => (dispatch, getState) => {
  const { searchToursState, aviaFlightLoader } = getState();

  aviaFlightLoader.loaderElement.set(0)
  aviaFlightLoader.loaderElement.animate(1)

  const destination = searchToursState.get('destination') || searchToursState.get('defaultDestination').toJS();

  const params = { city_id: destination.id, ...searchToursState.get('searchParams').toJS() };

  request.post('/avia_searches', convertKeysToSnakeCase(params))
    .then((response) => {
      return history.push({
        pathname: `/avia_searches/${response.data.requestId}`,
      });
    })
    .catch((response) => console.log('error while recieving request id', response));
};
