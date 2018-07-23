// See https://www.npmjs.com/package/mirror-creator
// Allows us to set up constants in a slightly more concise syntax.
import mirrorCreator from 'mirror-creator';

const appActionTypes = mirrorCreator([
  'CHANGE_CURRENCY',
  'UPDATE_GEO_DATA',
  'FETCH_HOTELS_DATA_REQUEST',
  'FETCH_HOTELS_DATA_SUCCESS',
  'FETCH_HOTELS_ONLINE_DATA_REQUEST',
  'FETCH_HOTELS_ONLINE_DATA_SUCCESS',
  'FETCH_DPT_CITIES_PRICES',
  'FETCH_DATES_PRICES',
  'FETCH_NIGHTS_PRICES',
  'TOGGLE_OPENED_TOURS',
  'UPDATE_SEARCH_PARAMS',
  'UPDATE_SEARCH_DESTINATION',
  'SET_MAP_ZOOM',
  'SET_AVIASALES_XML',
  'REMOVE_SEARCH_DESTINATION',
  'CHECKED_VALIDATION',
  'SET_PARAMS_ANY',
  'SET_LOADER_ELEMENT',
  'FILTERED_BY_PRICE_MIN',
  'FILTERED_BY_PRICE_MAX',
]);

const cardsActionTypes = mirrorCreator([
  'SHOW_MAP_FILTER',
  'CHANGE_HOTELS_SORT',
  'CHANGE_CARDS_TYPE',
  'UPDATE_VISIBLE_PARAMS',
  'RESET_VISIBLE_PARAMS',
  'TRIGGER_VISIBLE_PARAMS_UPDATING',
]);

const filtersActionTypes = mirrorCreator([
  'RESET_FILTERS_PARAMETERS',
  'UPDATE_FILTERS_PARAMETERS',
]);

const mapActionTypes = mirrorCreator([
  'CHANGE_MAP_ZOOM',
  'SET_OPENED_INFOBOX',
  'SET_HOVERED_ITEM',
  'TOGGLE_WORLD_MAP',
  'CHANGE_MARKERS_TYPE',
  'CHANGE_MAP_BOUNDS',
  'CHANGE_SEARCH_ON_MAP_MOVE',
]);

const hotelActionTypes = mirrorCreator([
  'UPDATE_SEARCH_TOURS_PARAMS',
  'UPDATE_HOTEL_TOURS',
  'SET_HOTEL_TOURS_FILTERS',
  'UPDATE_HOTEL_TOURS_FILTER',
  'CHANGE_TOURS_SORT',
  'REQUEST_HOTEL_TOURS',
  'REQUEST_HOTEL_TOURS_SUCCESS',
  'REQUEST_HOTEL_TOURS_FAILURE',
]);

const aviaSearchesActionTypes = mirrorCreator([
  'UPDATE_AVIA_TICKETS',
  'REQUEST_AVIA_TICKETS',
  'REQUEST_AVIA_TICKETS_SUCCESS',
  'REQUEST_AVIA_TICKETS_ERROR',
]);

const orderActionTypes = mirrorCreator([
  'FETCH_CITIES',
  'FETCH_PARTNERS',
  'SET_ORDER',
  'REQUEST_ORDER_FLIGHTS',
  'SET_ORDER_TYPE',
  'SET_ORDER_REQUEST_ID',
]);

const actionTypes = {
  ...appActionTypes,
  ...cardsActionTypes,
  ...mapActionTypes,
  ...hotelActionTypes,
  ...orderActionTypes,
  ...filtersActionTypes,
  ...aviaSearchesActionTypes,
};

export default actionTypes;
