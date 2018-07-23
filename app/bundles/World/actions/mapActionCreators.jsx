// axios - Promise based HTTP client for the browser and node.js
import actionTypes from '../constants/app';
import _ from 'lodash';
import qs from 'qs';
import {
  changeCardsGroupByType,
  resetVisibleParams,
  updateVisibleParams,
} from './cardsActionsCreators';
import {
  updateGeoData,
  fetchHotels,
  fetchHotelsSuccess,
  fetchHotelsOnlineSuccess,
  fetchHotelsOnline
} from './appActionCreators';
import { setMapZoom, setMapCenter } from './routeActionCreators';
import { getVisibleMarkers } from './../utils/getVisibleMarkers';
import { getBoundsZoomLevel } from './../utils/mapHelpers.js';
import { fitBounds } from 'google-map-react/utils';
import { locationSelector } from '../selectors';

export const changeMarkersType = (markersType) => ({
  type: actionTypes.CHANGE_MARKERS_TYPE, markersType,
});

export const setMarkersTypeByZoom = () => (dispatch, getState) => {
  const { query } = locationSelector(getState());
  const zoom = parseInt(query.zoom, 10);

  if (zoom >= 7) dispatch(changeMarkersType('hotel'));
  if (zoom < 7) dispatch(changeMarkersType('city'));
};

export const showCountries = () => (dispatch, getState) => {
  const { routing, mapState } = getState();
  const markersType = mapState.get('markersType');
  const queries = routing.location.query;

  if (markersType !== 'city') dispatch(changeMarkersType('city'));
  dispatch(changeCardsGroupByType('country'));

  // dispatch(replace({ pathname: '/search', query: _.omit(queries, 'destination') }));
};

export function showCities() {
  return (dispatch, getState) => {
    const { routing, mapState } = getState();
    const queries = routing.location.query;
    const markersType = mapState.get('markersType');

    if (markersType !== 'city') dispatch(changeMarkersType('city'));

    dispatch(changeCardsGroupByType('city'));


    // dispatch(push({ pathname: '/search', query: _.omit(queries, 'destination') }));
  };
}

export function showHotels() {
  return (dispatch, getState) => {
    const { mapState, appState, searchToursState } = getState();
    const defaultSearchParams = searchToursState.get('defaultSearchParams').toJS();
    const newBounds = mapState.get('bounds');

    const cityMarkers = appState.get('geoData').get('city');
    const cities = appState.get('geoDictionaries').get('city');
    const relevantCities = cityMarkers.map((value, id) => _.merge(value, cities.get(id).toJS()));
    const visibleCities = getVisibleMarkers(relevantCities, newBounds).toArray();
    
    if (visibleCities.length) {
      // dispatch(fetchHotelsRequest());
      dispatch(fetchHotels(
        _.extend(defaultSearchParams, { city_ids: _.map(visibleCities, 'id') }),
        { groupByType: 'hotel', target: 'all' },
        (response) => {
          // @HACK calculate visible params
          dispatch(updateVisibleParams());
          dispatch(fetchHotelsSuccess());
        }
      ));
    } else {
      dispatch(updateGeoData([], 'hotel'));
    }
  };
}

function checkType(zoom) {
  const ZOOM_TO_CITIES_ID = 5;
  const ZOOM_TO_HOTELS_ID = 8;

  if (_.inRange(zoom, ZOOM_TO_CITIES_ID)) return 'country';

  if (_.inRange(zoom, ZOOM_TO_CITIES_ID, ZOOM_TO_HOTELS_ID)) return 'city';

  if (_.inRange(zoom, ZOOM_TO_HOTELS_ID, 22)) return 'hotel';
}

export function zoomFromTo(transition, bounds, data) {
  return (dispatch, getState) => {
    switch (transition.to) {
      case 'country': return dispatch(showCountries());
      case 'city': return dispatch(showCities());
      case 'hotel': return dispatch(showHotels());
      default: return true;
    }
  };
}

export const changeMapBounds = (bounds) => ({
  type: actionTypes.CHANGE_MAP_BOUNDS, bounds,
});

export const toggleWorldMap = (state) => ({
  type: actionTypes.TOGGLE_WORLD_MAP, state,
});

export const setOpenedInfoBox = (id) => ({
  type: actionTypes.SET_OPENED_INFOBOX, id,
});

export const setHoveredItem = (id) => ({
  type: actionTypes.SET_HOVERED_ITEM, id,
});

export function calculateBounds(latLngBounds, dimensions) {
  const viewport = latLngBounds.toJSON();
  const bounds = {
    nw: { lat: viewport.north, lng: viewport.west },
    se: { lat: viewport.south, lng: viewport.east },
  };

  return { ...fitBounds(bounds, dimensions), bounds };
}

export const getMapDimensions = () => ({
  width: document.querySelector('.map').offsetWidth,
  height: document.querySelector('.map').offsetHeight,
});

export const combineSearchParamsWithDefaultForHotels = (searchToursState, id, type) => {
  const params = searchToursState.get('searchParams').toJS();
  const defaultSearchParams = searchToursState.get('defaultSearchParams').toJS();

  return _.extend(defaultSearchParams, params, {
    group_by_type: 'hotel',
    [`${type}_ids`]: [id],
  });
};

const calculateBoundsByHotels = (hotels) => {
  const hotelsPositions = _.map(hotels, hotel => hotel.position);

  const createMarkerForPoint = (point) => new google.maps.Marker({
    position: new google.maps.LatLng(point.lat, point.lng),
  });

  const createBoundsForMarkers = (markers) => {
    const latLngBounds = new google.maps.LatLngBounds();

    markers.forEach(marker => latLngBounds.extend(marker.getPosition()));

    return latLngBounds;
  };

  const size = getMapDimensions();
  const markers = hotelsPositions.map(hotel => createMarkerForPoint(hotel));
  const latLngBounds = createBoundsForMarkers(markers);
  const zoom = getBoundsZoomLevel(latLngBounds, size);
  const center = { lat: latLngBounds.getCenter().lat(), lng: latLngBounds.getCenter().lng() };
  const { bounds } = calculateBounds(latLngBounds, size);

  return { zoom, center, bounds };
};

const showHotelsByTypeNew = (id, type, history) => (dispatch, getState) => {
  const { searchToursState } = getState();
  const hotelParams = combineSearchParamsWithDefaultForHotels(searchToursState, id, type);
  const options = { groupByType: 'hotel' };

  const callback = (response) => {
    if (Object.keys(response.items).length > 0) {
      const hotels = _.values(response.items.hotel);
      const { zoom, center, bounds } = calculateBoundsByHotels(hotels);

      dispatch(changeMapBounds(bounds));
      dispatch(changeMarkersType('hotel'));
      dispatch(changeCardsGroupByType('hotel'));
      dispatch(setMapZoom(history, zoom));
      dispatch(setMapCenter(history, center));
    }

    if (response.finished) {
      dispatch(fetchHotelsOnlineSuccess());
    }
  };

  dispatch(fetchHotelsOnline(hotelParams, callback));
};

export const showCountryHotels = (id, history) =>
  showHotelsByTypeNew(id, 'country', history);

export const showCityHotels = (id, history) =>
  showHotelsByTypeNew(id, 'city', history);
