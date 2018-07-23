import qs from 'qs';
import { locationSelector } from '../selectors';

export const changeSearchOnMapMove = (history, searchOnMapMove) => (dispatch, getState) => {
  const location = locationSelector(getState());

  if (location.pathname !== '/' && searchOnMapMove) {
    return history.replace({
      pathname: '/',
      search: `?${qs.stringify({ ...location.query, s_map_move: searchOnMapMove })}`,
    });
  }

  return history.replace({
    search: `?${qs.stringify({ ...location.query, s_map_move: searchOnMapMove })}`,
  });
};

export const setMapZoom = (history, newZoom) => (dispatch, getState) => {
  const { pathname, query } = locationSelector(getState());
  const zoom = newZoom || parseInt(query.zoom, 10) || 3;
  const search = qs.stringify({ ...query, zoom });

  if (parseInt(query.zoom, 10) !== newZoom) {
    history.replace({ pathname, search });

    dispatch({ type: 'SET_MAP_ZOOM' });
  }
};

export const setMapCenter = (history, center) => (dispatch, getState) => {
  const { lat, lng } = center;
  const { pathname, query } = locationSelector(getState());
  const search = qs.stringify({
    ...query,
    clat: lat.toFixed(5) || 20,
    clng: lng.toFixed(5) || 40,
  });

  history.replace({ pathname, search });
};

export const setCustomPageInitialParams = (history) => (dispatch, getState) => {
  const { pathname, query } = locationSelector(getState());
  const search = qs.stringify({
    ...query,
    // zoom: query.zoom || 3,
    // clat: query.clat || 20,
    // clng: query.clng || 40,
    s_map_move: query.s_map_move || true,
  });

  history.replace({ pathname, search });
};
