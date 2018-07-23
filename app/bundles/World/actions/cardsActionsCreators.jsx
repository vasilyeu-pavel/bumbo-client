import qs from 'qs';
import actionTypes from '../constants/app';

export const updateVisibleParams = () => ({
  type: actionTypes.TRIGGER_VISIBLE_PARAMS_UPDATING,
});

export const changeCardsGroupByType = (cardsGroupByType) => ({
  type: actionTypes.CHANGE_CARDS_TYPE, cardsGroupByType,
});

export const changeHotelsCardSort = (value) => ({
  type: actionTypes.CHANGE_HOTELS_SORT, value,
});

export const showFilter = (value) => ({
  type: actionTypes.SHOW_MAP_FILTER, value,
});

export const resetVisibleParams = () => ({
  type: actionTypes.RESET_VISIBLE_PARAMS,
});

export const setCardsTypeByZoom = () => (dispatch, getState) => {
  // const routeState = getState().routing;
  // const params = qs.parse(routeState.location.search.slice(1));
  // const zoom = params.zoom;
  //
  // if (zoom >= 7) dispatch(changeCardsGroupByType('hotel'));
  // if (zoom >= 5 && zoom < 7) dispatch(changeCardsGroupByType('city'));
  // if (zoom < 5) dispatch(changeCardsGroupByType('country'));
};
