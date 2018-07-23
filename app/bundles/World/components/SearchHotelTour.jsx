import React, { Component, PropTypes } from 'react';
import ToursFilterDate from './ToursFilterDate';
import ToursFilterVisitTime from './ToursFilterVisitTime';
import ToursFilterPeople from './ToursFilterPeople';
import ToursFilterFood from './ToursFilterFood';
import ToursFilterSearch from './ToursFilterSearch';
import ToursFilterDeparture from './ToursFilterDeparture';
import _ from 'lodash';
import { Map } from 'immutable';

export default class SearchHotelTour extends Component {
  static propTypes = {
    searchParams: PropTypes.instanceOf(Map).isRequired,
    updateSearchToursParams: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, ['handleChange', 'handleUpdateDate', 'handleSearch']);
  }

  handleChange(key, value, tabIndex) {
    this.props.updateSearchToursParams(key, value);

    if (tabIndex) { this.focusNextItem(parseInt(tabIndex, 10)); }
  }

  handleUpdateDate({ dateFrom, dateTo }) {
    this.props.updateSearchToursParams('date_from', dateFrom);
    this.props.updateSearchToursParams('date_to', dateTo);
  }

  focusNextItem(tabIndex) {
    $(`.tours-filter [tabindex=${tabIndex}]`).blur();
    $(`.tours-filter [tabindex=${tabIndex + 1}]`).focus();
  }

  handleSearch() {
    this.props.fetchHotelTours();
  }

  render() {
    const {
      searchParams,
      departFrom,
      meals,
      kidsAgesSelect,
    } = this.props;

    return (
      <div className='search-tour__form'>
        <div className='search-tour__filter'>
          <div className='tours-filter'>
            <ToursFilterDeparture
              value={searchParams.get('city_from_id')}
              onChange={this.handleChange}
              departFrom={departFrom}
              tabIndex={'10'}
            />
            <ToursFilterDate
              onChange={this.handleUpdateDate}
              dateFrom={searchParams.get('date_from')}
              dateTo={searchParams.get('date_to')}
              minimumNights={0}
              maximumNights={9}
              tabIndex={'11'}
            />
            <ToursFilterVisitTime
              onChange={this.handleChange}
              value={searchParams.get('nights')}
              dateRange={searchParams.get('nights_range')}
              tabIndex={'13'}
            />
            <ToursFilterPeople
              onChange={this.handleChange}
              kids={kidsAgesSelect}
              kidsAges={searchParams.get('kids_ages')}
              value={searchParams.get('adults')}
              tabIndex={'14'}
            />
            <ToursFilterFood
              value={searchParams.get('meals') || meals.first()}
              onChange={this.handleChange}
              meals={meals}
              tabIndex={'15'}
            />
            <ToursFilterSearch onClick={this.handleSearch} />
          </div>
        </div>
      </div>
    );
  }
}
