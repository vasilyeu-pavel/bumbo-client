import { createSelector } from 'reselect';
import { getVisibleMarkers } from '../utils/getVisibleMarkers';
import _ from 'lodash';
import Immutable from 'immutable';
import qs from 'qs';

const hotelsSorter = state => state.cardsState.get('sortHotelsBy');
const visibleParams = state => state.cardsState.get('visibleParams');
const cardsFilterParams = state => state.filtersState.get('filtersProps');

const relevantCountriesSelector = state => state.appState.get('geoData').get('country');
const countriesSelector = state => state.appState.get('geoDictionaries').get('country');
const relevantCitiesSelector = state => state.appState.get('geoData').get('city');
const citiesSelector = state => state.appState.get('geoDictionaries').get('city');
const hotelsSelector = state => state.appState.get('geoData').get('hotel');
const boundsSelector = state => state.mapState.get('bounds');

const toursSorter = state => state.hotelState.get('toursSortBy');
const toursFilters = state => state.hotelState.get('toursFilters');
const toursOnHotelPage = state => state.hotelState.get('tours');

// need to add a filter parameter and return filtered cards
const getFilteredHotels = createSelector(
  hotelsSelector,
  cardsFilterParams,
  (hotels, filters) => {
    let filteredHotels = hotels;
    if (hotels.size === 0) return hotels;

    filters.map((filter, filterKey) => {
      const selectedValues = filter.get('selectedValues');
      const key = _.camelCase(filterKey);

      if (selectedValues.size > 0 || selectedValues.length > 0) {
        switch (filter.get('type')) {
          case 'isPresent':
            if (selectedValues[0]) {
              filteredHotels = filteredHotels.filter(hotel => hotel[key] > 0);
            }
            break;
          case 'inRange':
            filteredHotels = filteredHotels.filter(hotel =>
              hotel[key] >= selectedValues[0].min && hotel[key] <= selectedValues[1].max
            );
            break;
          case 'greaterThan':
            filteredHotels = filteredHotels.filter(hotel => hotel[key] >= selectedValues[0]);
            break;
          case 'eql':
            filteredHotels = filteredHotels.filter(hotel => {
              const equalItems = _.intersection(_.castArray(hotel[key]), selectedValues);

              if (equalItems.length !== 0 || selectedValues.lenght === 0) return true;
              return false;
            });
            break;
          default:
        }
      }
    });

    return filteredHotels;
  }
);

const getSortedAndFilteredHotels = createSelector(
  getFilteredHotels,
  hotelsSorter,
  (hotels, sorter) => {
    const sortedHotels = hotels.sortBy(hotel =>
      parseFloat(hotel[sorter.get('sort')] || hotel.tourInfo.tourData[sorter.get('sort')], 10)
    );

    let resultHotels = sorter.get('direction') ? sortedHotels : sortedHotels.reverse();

    return resultHotels;
  }
);

const getRelevantCountries = createSelector(
  relevantCountriesSelector,
  countriesSelector,
  (relevantCountries, countries) =>
    relevantCountries.map((value, id) => _.merge(value, countries.get(id).toJS()))
);

const getRelevantCities = createSelector(
  relevantCitiesSelector,
  citiesSelector,
  (relevantCities, cities) =>
    relevantCities.map((value, id) => _.merge(value, cities.get(id).toJS()))
);

const getRelevantVisibleCities = createSelector(
  getRelevantCities,
  boundsSelector,
  (relevantCities, bounds) =>
    getVisibleMarkers(relevantCities, bounds)
);

const getHotels = createSelector(
  getSortedAndFilteredHotels,
  visibleParams,
  (hotels, data) => {
    if (!data.get('visible').size) {
      return hotels.take(15);
    }

    const preparedHotels = hotels
      .filter(hotel => data.some((value, key) => value.includes(hotel.id)))
      .map(hotel => {
        const modifiers = [];

        data.forEach((ids, key) => {
          if (ids.includes(hotel.id)) modifiers.push(key);
        });

        return _.extend(hotel, { modifiers });
      });

    return preparedHotels;
  }
);

const getSortedTours = createSelector(
  toursOnHotelPage,
  toursSorter,
  (tours, sorter) => {
    const key = _.camelCase(sorter.get('sort'));
    const sortedTours = Immutable.List(_.sortBy(tours.toArray(), (tour) => tour[key]));

    return sorter.get('direction') ? sortedTours : sortedTours.reverse();
  }
);

const getSortedAndFilteredTours = createSelector(
  getSortedTours,
  toursFilters,
  (tours, filters) => {
    let filteredTours = tours;

    filters.forEach((filterData, key) => {
      filteredTours = filteredTours.filter(tour =>
        tour[key] <= filterData.get('to') && tour[key] >= filterData.get('from')
      );
    });

    return filteredTours.toList();
  }
);

export const getMarkersByType = state => {
  const type = state.mapState.get('markersType');

  switch (type) {
    case 'country':
      return getRelevantCountries(state);
    case 'city':
      return getRelevantCities(state);
    case 'hotel':
      return getHotels(state);
    default:
      return null;
  }
};

export const getCardsByType = state => {
  const type = state.cardsState.get('cardsGroupByType');

  switch (type) {
    case 'country':
      return getRelevantCountries(state);
    case 'city':
      return getRelevantVisibleCities(state);
    case 'hotel':
      return getSortedAndFilteredHotels(state);
    default:
      return null;
  }
};

export const getDestination = (state, ownProps) => {
  const { pathname } = state.routing.location;
  const destination = state.searchToursState.get('destination') || state.searchToursState.get('defaultDestination').toJS();
  const geoDictionaries = state.appState.get('geoDictionaries');
  let geoObject;
  let id;
  let type;

  const isNumeric = (value) =>
    /^\d+$/.test(value);

  if (_.isEmpty(destination)) {
    const urlParts = pathname.split('/');
    type = urlParts[2];
    id = urlParts[3];
  } else {
    type = destination.type;
    id = destination.id.split('_')[1];
  }

  if (isNumeric(type)) type = 'hotel';

  switch (type) {
    case 'hotel':
      let hotel = state.hotelState.get('hotel')
      if (!hotel) {
        return {
          id,
          text: destination.text,
          type,
          value: `${type}_${id}`,
          label: `${type}_${id}`,
        };
      } else {
        hotel = hotel.toJS();
      }

      return {
        id: hotel.sletatHotelId,
        text: hotel.name,
        type,
        value: `${type}_${hotel.sletatHotelId}`,
        label: `${type}_${hotel.sletatHotelId}`,
      };

    case 'city':
      geoObject = geoDictionaries.get('city').get(id); break;
    case 'country':
      geoObject = geoDictionaries.get('country').get(id); break;
    default:
      return { };
  }

  if (geoObject === undefined) return { };

  return {
    id,
    text: geoObject.get('key'),
    value: `${type}_${id}`,
    label: geoObject.get('key'),
    type,
  };
};

export const getHotelTours = state => getSortedAndFilteredTours(state);

const convertFieldsToNumbers = (params) => {
  const newParams = _.clone(params);
  const replaceField = (field) =>
    _.set(newParams, field, parseInt(newParams[field], 10));

  if (newParams.adults) replaceField('adults');
  if (newParams.nights) replaceField('nights');
  if (newParams.nights_range) replaceField('nights_range');
  if (newParams.city_from_id) replaceField('city_from_id');

  return newParams;
};

export const defaultSearchParamsSelector = state =>
  convertFieldsToNumbers(state.searchToursState.get('defaultSearchParams').toJS());

export const searchParamsSelector = state =>
  convertFieldsToNumbers(state.searchToursState.get('searchParams').toJS());

export const queriesStringSelector = (state) =>
  state.routing.location.search;

export const queriesSelector = createSelector(
  queriesStringSelector,
  (queriesString) => convertFieldsToNumbers(qs.parse(queriesString.slice(1)))
);

export const paramsFromQueriesSelector = createSelector(
  queriesSelector,
  (queries) => {
    const params = _.clone(queries);

    return _.omit(params, ['s_map_move', 'clat', 'clng']);
  }
);

export const locationSelector = (state) => ({
  pathname: state.routing.location.pathname,
  query: qs.parse(state.routing.location.search.slice(1)),
});

export const queriesWithParamsSelector = createSelector(
  searchParamsSelector,
  defaultSearchParamsSelector,
  queriesSelector,
  (searchParams, defaultSearchParams, locationQueries) => {
    return _.extend({}, defaultSearchParams, locationQueries, searchParams)
  }
);

// default params + queries + params = string
export const queriesWithParamsStringSelector = createSelector(
  queriesWithParamsSelector,
  (queriesWithParams) => qs.stringify(queriesWithParams)
);

// params + default params
export const combinedSearchParamsSelector = createSelector(
  searchParamsSelector,
  defaultSearchParamsSelector,
  (searchParams, defaultSearchParams) =>
    _.extend({}, defaultSearchParams, searchParams)
);

// queries + default params
export const queriesWithDefaultParamsSelector = createSelector(
  defaultSearchParamsSelector,
  paramsFromQueriesSelector,
  (defaultSearchParams, paramsFromQueries) =>
    _.extend({}, defaultSearchParams, paramsFromQueries)
);

// queries + default params = string
export const queriesWithDefaultParamsStringSelector = createSelector(
  queriesWithDefaultParamsSelector,
  (combinedParams) => qs.stringify(combinedParams)
);

export const getSearchOnMapMove = (state) => {
  const queries = qs.parse(state.routing.location.search.slice(1));

  if (queries.s_map_move === 'false') return false;
  if (queries.s_map_move === 'true') return true;
  return true;
};

export const getMapZoom = (state) => {
  const queries = qs.parse(state.routing.location.search.slice(1));
  return parseInt(queries.zoom, 10) || 3;
};

export const getMapCenter = (state) => {
  const queries = qs.parse(state.routing.location.search.slice(1));
  // debugger
  return {
    lat: parseFloat(queries.clat) || 20,
    lng: parseFloat(queries.clng) || 40,
  };
};
