/* global $ */

import React, { Component, PropTypes } from 'react';
import ToursFilterDate from './ToursFilterDate';
import ToursFilterVisitTime from './ToursFilterVisitTime';
import ToursFilterCountry from './ToursFilterCountry';
import ToursFilterPeople from './ToursFilterPeople';
import ToursFilterSearch from './ToursFilterSearch';
import ToursFilterDeparture from './ToursFilterDeparture';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import { Map } from 'immutable';

export default class ToursFilter extends Component {
  static propTypes = {
    isPartners: PropTypes.bool,
    searchParams: PropTypes.object.isRequired,
    toggleWorldMap: PropTypes.func,
    updateSearchParams: PropTypes.func,
    fetchNightsPrices: PropTypes.func,
    fetchDptCitiesPrices: PropTypes.func,
    fetchDatesPrices: PropTypes.func,
    router: PropTypes.object,
    departFrom: PropTypes.instanceOf(Map).isRequired,
    kidsAgesSelect: PropTypes.array.isRequired,
    priceDptCities: PropTypes.object,
    priceDates: PropTypes.object,
    minPriceDates: PropTypes.number,
    minPriceNights: PropTypes.number,
    maxPriceNights: PropTypes.number,
    locationQueriesStringWithParams: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'handleSearch',
      'handleUpdateFilter',
      'handleUpdateDate',
      'handleChangeDestination',
      'createLink',
      'handleUpdatePrices',
    ]);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.searchParams, this.props.searchParams)) {
      this.handleUpdatePrices();
    }
  }

  createLink() {
    const {
      destination,
      locationQueriesStringWithParams,
    } = this.props;
    const { id, type } = destination;
    const hotelId = id;


    if (type !== 'hotel') return null;

    const pathname = this.props.isPartners ?
      `/partners_tours/${hotelId}` : `/online_tours/${hotelId}`;


    return `${pathname}?${locationQueriesStringWithParams}`;
  }

  handleSearchCountryOrCity() {

  }

  handleSearchHotel() {

  }

  handleSearch() {
    const { destination, locationQueriesStringWithParams } = this.props;
    const { id, type } = destination;
    const isEmptySearch = id === undefined;

    if (isEmptySearch) { return false; }

    if (!this.props.isPartners) {
      return this.props.history.push({
        pathname: `/search/${type}/${id}`,
        search: locationQueriesStringWithParams,
      });
    }

    return this.props.history.push({
      pathname: `/main_partners/${type}/${id}`,
      search: `${locationQueriesStringWithParams}`,
    });
  }

  handleUpdateDate({ dateFrom, dateTo }) {
    this.props.updateSearchParams('date_from', dateFrom);
    this.props.updateSearchParams('date_to', dateTo);
  }

  handleUpdateFilter(name, value, tabIndex) {
    this.props.updateSearchParams(name, value);

    if (tabIndex) { this.focusNextItem(parseInt(tabIndex, 10)); }
  }

  handleChangeDestination(destination) {
    this.props.updateSearchDestination(destination);

    this.props.resetPrices();

    setTimeout(() => this.focusNextItem(2), 10);
  }

  focusNextItem(tabIndex) {
    $(`.tours-filter [tabindex=${tabIndex}]`).blur();
    $(`.tours-filter [tabindex=${tabIndex + 1}]`).focus();
  }

  prepareParamsForPrices(params) {
    const {
      adults,
      nights,
      nights_range: nightsRange,
      city_from_id: cityFromId,
      // date_from: dateFrom,
      // date_to: dateTo,
      kids_ages: kidsAges,
      date_from,
      date_to,
    } = this.props.searchParams;
    const { departFrom, kidsAgesSelect, destination } = this.props;
    const date = new Date();
    const newDate = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    const start = params.start || moment(date).format('YYYY.MM.DD');
    const finish = params.finish || moment(newDate).format('YYYY.MM.DD');

    return {
      adults,
      start,
      finish,
      date_from,
      date_to,
      nights,
      nights_values: nightsRange ? `${nights - nightsRange}-${nights + nightsRange}` : nights,
      destination_type: destination.type,
      destination_id: destination.id,
      dpt_cities_ids: departFrom.join(','),
      dpt_city_id: cityFromId,
      kid1age: kidsAges[0] || -1,
      kid2age: kidsAges[1] || -1,
      kid3age: kidsAges[2] || -1,
      kids: kidsAges.length,
    };
  }

  handleUpdatePrices(params = {}) {
    const { destination } = this.props;

    if (destination && destination.id) {
      const queryParams = this.prepareParamsForPrices(params);

      if (this.props.isPartners) {
        queryParams.search_for = 'partners';
      }

      this.props.fetchNightsPrices(queryParams);
      this.props.fetchDptCitiesPrices(queryParams);
      this.props.fetchDatesPrices(queryParams);
    }
  }

  render() {
    console.log('%c Rerender ToursFilter! ', 'background: #222; color: #bada55');

    const {
      adults,
      nights,
      nights_range: nightsRange,
      city_from_id: cityFromId,
      date_from: dateFrom,
      date_to: dateTo,
      kids_ages: kidsAges,
    } = this.props.searchParams;


    const { toggleWorldMap, departFrom, priceDates, destination } = this.props;

    return (
      <div className='inner'>
        <div className='search-tour__logo'>
          <Link to='/'>
            <img title='jamm.travel' src='/images/logo31.svg' />
          </Link>
        </div>
        <div className='search-tour__form'>
          <div className='search-tour__filter'>
            <div className='tours-filter'>
              <ToursFilterPeople
                onChange={this.handleUpdateFilter}
                kids={this.props.kidsAgesSelect}
                kidsAges={kidsAges}
                value={adults}
                tabIndex={'1'}
              />
              <ToursFilterCountry
                onChange={this.handleChangeDestination}
                value={destination}
                tabIndex={'2'}
                isPartners={this.props.isPartners}
                searchParams={this.props.searchParams}
              />
              <ToursFilterDeparture
                value={cityFromId}
                onChange={this.handleUpdateFilter}
                departFrom={departFrom}
                departPrices={this.props.priceDptCities}
                tabIndex={'3'}
              />
              <ToursFilterDate
                onChange={this.handleUpdateDate}
                priceDates={priceDates}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onMonthChange={this.handleUpdatePrices}
                minimumNights={0}
                maximumNights={this.props.isPartners ? 9 : 14}
                tabIndex={'4'}
              />
              <ToursFilterVisitTime
                onChange={this.handleUpdateFilter}
                value={nights}
                dateRange={nightsRange}
                tabIndex={'6'}
                minPrice={this.props.minPriceNights}
                maxPrice={this.props.maxPriceNights}
              />
              <ToursFilterSearch
                onClick={this.handleSearch}
                href={this.createLink()}
                minPriceText={this.props.minPriceDates}
                toggleWorldMap={toggleWorldMap}
                tabIndex={'7'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
