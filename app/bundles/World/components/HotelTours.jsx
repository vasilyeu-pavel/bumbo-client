import React, { PropTypes, Component } from 'react';
import HotelToursSort from './HotelToursSort';
import HotelToursList from './HotelToursList';
import HotelToursFilter from './HotelToursFilter';
import OrderPopup from './OrderPopup';
import { Map, List } from 'immutable';
import _ from 'lodash';

export default class HotelTours extends Component {
  static propTypes = {
    authenticityToken: PropTypes.string,
    name: PropTypes.string.isRequired,
    tours: PropTypes.instanceOf(List).isRequired,
    toursAreLoading: PropTypes.bool.isRequired,
    toursLoadedSuccess: PropTypes.bool.isRequired,
    toursSortBy: PropTypes.instanceOf(Map).isRequired,
    toursFilters: PropTypes.instanceOf(Map).isRequired,
    changeHotelToursSort: PropTypes.func.isRequired,
    updateHotelToursFilter: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      toursToShowCount: 10,
    };

    _.bindAll(this, ['showMoreTours']);
  }

  showMoreTours() {
    const { toursToShowCount } = this.state;

    this.setState({
      toursToShowCount: toursToShowCount + 10,
    });
  }

  render() {
    const {
      name,
      tours,
      toursAreLoading,
      toursLoadedSuccess,
      order,
      cities,
      partners,
      authenticityToken,
      changeHotelToursSort,
      updateHotelToursFilter,
      toursFilters,
      toursSortBy,
    } = this.props;

    const toursToShow = tours.slice(0, this.state.toursToShowCount);
    const toursCount = this.props.tours.size;

    return (
      <div className='tours'>
        <div className='inner-hotel-page'>
          <div className='tours__title title'>Туры в отель {name}</div>
          <HotelToursFilter
            hotelName={name}
            toursAreLoading={toursAreLoading}
            toursLoadedSuccess={toursLoadedSuccess}
            toursFilters={toursFilters}
            updateHotelToursFilter={updateHotelToursFilter}
            count={tours.size}
          />
          {tours.size > 0 && <HotelToursSort
            changeHotelToursSort={changeHotelToursSort}
            toursSortBy={toursSortBy}
          />}
          <HotelToursList
            tours={toursToShow}
            toursLoadedSuccess={toursLoadedSuccess}
          />
          <div className='tours__button'>
            {toursCount - this.state.toursToShowCount >= 10 &&
              <div
                className='button button--bigger button--linear button--color-green' data-offset='0'
                onClick={this.showMoreTours}
              >
              Показать еще
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
