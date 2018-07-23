/* global $ */

import React, { Component, PropTypes } from 'react';
import AviaToursFilterDateFrom from './AviaToursFilterDateFrom';
import AviaToursFilterDateTo from './AviaToursFilterDateTo/AviaToursFilterDateTo';
import AviaToursFilterVisitTime from './AviaToursFilterVisitTime';
import AviaToursFilterCountry from './AviaToursFilterCountry';
import AviaToursFilterPeople from './AviaToursFilterPeople';
import AviaToursFilterSearch from './AviaToursFilterSearch';
import AviaToursFilterDeparture from './AviaToursFilterDeparture';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Map } from 'immutable';
import ToggleMobileMode from '../../decorators/toggleMobileMode'
import MobileAviaTourFilterCountry from './MobileAviaTourFilterCountry/MobileAviaTourFilterCountry'

class AviaToursFilter extends Component {
  static propTypes = {
    isMainPage: PropTypes.bool,
    searchParams: PropTypes.object.isRequired,
    createNewAviaSearch: PropTypes.func,
    updateSearchParams: PropTypes.func,
    router: PropTypes.object,
    departFrom: PropTypes.instanceOf(Map).isRequired,
    kidsAgesSelect: PropTypes.array.isRequired,
    priceDptCities: PropTypes.object,
    priceDates: PropTypes.object,
    minPriceDates: PropTypes.number,
    minPriceNights: PropTypes.number,
    maxPriceNights: PropTypes.number,
    locationQueriesStringWithParams: PropTypes.string,
    defaultDestination: PropTypes.object,
    validInputDestination: PropTypes.bool,
    validInputDateFrom: PropTypes.bool,
    validInputDateTo: PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'handleSearch',
      'handleUpdateFilter',
      'handleUpdateDateFrom',
      'handleUpdateDateTo',
      'handleChangeDestination',
      'checkedValidation',
      'handleRemoveSearchDestination',
    ]);
  }

  createLink() {
    const {
      destination,
      locationQueriesStringWithParams,
    } = this.props;

    const { id, type } = destination;

    return `/avia_searches/new?${locationQueriesStringWithParams}&city_id=${id}`;
  }

  checkedValidation() {
    this.props.checkedValidation()
  }

  handleSearch() {
    const { history } = this.props;
    this.props.createNewAviaSearch(history);
  }

  handleUpdateDateFrom({ dateFrom }, tabIndex) {
    this.handleUpdateFilter('date_from', dateFrom, 4);
  }

  handleUpdateDateTo({ dateTo, dateToAny }) {
    this.props.updateSearchParams('date_to', dateTo, dateToAny);
  }

  handleUpdateFilter(name, value, tabIndex) {
    this.props.updateSearchParams(name, value);
    if (tabIndex) {
      setTimeout(() => this.focusNextItem(parseInt(tabIndex, 10)), 10);
    }
  }

  handleChangeDestination(destination) {
    this.props.updateSearchDestination(destination);
    this.focusNextItem(2)
  }

  handleRemoveSearchDestination() {
    this.props.removeSearchDestination()
  }

  focusNextItem(tabIndex) {
    $(`.tours-filter [tabindex=${tabIndex}]`).blur();
    $(`.tours-filter [tabindex=${tabIndex + 1}]`).focus();
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

    const { toggleWorldMap, departFrom, priceDates, destination, validInputDestination,
      searchParams, priceDptCities, validInputDateFrom, validInputDateTo, isMainPage,
      minPriceDates, mobileMode 
     } = this.props;

    return (
      <div className='inner'>
        <div className='search-tour__form'>
          <div className='search-tour__filter'>
          { isMainPage ? <img className='tours-filter__map' src='/images/map.svg'/> :
          null }
            <div className='tours-filter'>
              <AviaToursFilterPeople
                onChange={this.handleUpdateFilter}
                kids={this.props.kidsAgesSelect}
                kidsAges={kidsAges}
                value={adults}
                tabIndex={'1'}
              />
              <AviaToursFilterDeparture
                value={cityFromId}
                onChange={this.handleUpdateFilter}
                departFrom={departFrom}
                departPrices={priceDptCities}
                tabIndex={'3'}
              />
              {!mobileMode ? 
              <AviaToursFilterCountry
                onChange={this.handleChangeDestination}
                removeSearch={this.handleRemoveSearchDestination}
                value={destination}
                tabIndex={'2'}
                isPartners={true}
                searchParams={searchParams}
                inputIsValid={validInputDestination}
              />                
               :
              <MobileAviaTourFilterCountry 
                onChange={this.handleChangeDestination}
                removeSearch={this.handleRemoveSearchDestination}
                value={destination}
                tabIndex={'2'}
                isPartners={true}
                searchParams={searchParams}
                inputIsValid={validInputDestination}
              />
              }
              <AviaToursFilterDateFrom
                onChangeDate={this.handleUpdateDateFrom}
                dateFrom={dateFrom}
                minimumNights={0}
                maximumNights={9}
                tabIndex={'4'}
                inputIsValid={validInputDateFrom}
              />
              <AviaToursFilterDateTo
                onChangeDate={this.handleUpdateDateTo}
                dateFrom={dateFrom}
                dateTo={dateTo}
                minimumNights={0}
                maximumNights={9}
                tabIndex={'5'}
                inputIsValid={validInputDateTo}
              /> 
            </div>
            <div className='search-tour__button'>
              <AviaToursFilterSearch
                onClick={this.handleSearch}
                href={this.createLink()}
                isMainPage={isMainPage}
                minPriceText={minPriceDates}
                toggleWorldMap={toggleWorldMap}
                tabIndex={'6'}
                destination={destination}
                date_from={searchParams.date_from}
                checkedValidation={this.checkedValidation}                
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToggleMobileMode(AviaToursFilter)