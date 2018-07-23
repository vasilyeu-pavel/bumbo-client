import React from 'react';
import { withRouter } from 'react-router';
import {
  compose,
  mapProps,
  lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HotelSlider from '../components/HotelSlider';
import SearchToursContainer from '../containers/SearchToursContainer';
import HotelToursHOC from '../containers/HotelToursHOC';
import HotelDescriptionHOC from '../containers/HotelDescriptionHOC';
import HotelAddress from '../components/HotelAddress';
import {
  createToursSearchParams,
  fetchHotelTours,
} from '../actions/hotelActionCreators';
import { defaultSearchParamsSelector } from '../selectors';





const HotelPage = (props, context) => {
  const { hotelData } = props;
  const hotel = hotelData.get('hotel');
  const name = hotel.get('name');

  return (
    <div className='landing__content'>
      <div className='landing__filter'>
        <div className='search-tour'>
          <SearchToursContainer />
        </div>
      </div>
      <p>{context}</p>
      <div className='landing__page'>
        <div className='page__inner inner-hotel-page'>
          <div className='breadcrumps inner'>
            {hotelData.get('hotelCityWithCountry')} &mdash; отель {name}
          </div>
          <HotelSlider
            name={name}
            rating={hotelData.get('rate')}
            imageUrls={hotelData.get('hotelImages')}
            hotelId={hotel.get('sletatHotelId')}
            facilities={hotelData.get('sliderFacilities')}
            starsCount={hotelData.get('humanStarCount')}
            cityAndCountry={hotelData.get('hotelCityWithCountry')}
          />
          <a href='' className='tours__anchor-link' id='prices' name='prices'></a>
          <HotelToursHOC />
          <HotelDescriptionHOC />
        </div>
        <HotelAddress
          address={hotelData.get('address')}
          name={name}
          lat={hotel.get('latitude')}
          lng={hotel.get('longitude')}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  defaultSearchParams: defaultSearchParamsSelector(state),
  hotelData: state.hotelState,
});

const mapDispatchToProps = (dispatch) => ({
  createToursSearchParams: bindActionCreators(createToursSearchParams, dispatch),
  fetchHotelTours: bindActionCreators(fetchHotelTours, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  lifecycle({
    componentDidMount() {
      this.props.createToursSearchParams();
      this.props.fetchHotelTours();
    },
  })
);

export default enhance(HotelPage);
