import HotelDescription from './../components/HotelDescription';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapStateToProps = (state, ownProps) => ({
  id: state.hotelState.get('hotel').get('sletatHotelId'),
  name: state.hotelState.get('hotel').get('name'),
  video: state.hotelState.get('hotel').get('video'),
  rate: state.hotelState.get('rate'),
  ratingPlace: state.hotelState.get('hotel').get('ratingPlace'),
  hotel: state.hotelState.get('hotel'),
  ratingMeal: state.hotelState.get('hotel').get('ratingMeal'),
  ratingService: state.hotelState.get('hotel').get('ratingService'),
  hotelReviews: state.hotelState.get('hotelReviews'),
  humanStarCount: state.hotelState.get('humanStarCount'),
  hotelFacilities: state.hotelState.get('hotelFacilities'),
  hotelDescription: state.hotelState.get('hotelDescription'),
});


const enhance = compose(connect(mapStateToProps));

export default enhance(HotelDescription);
