import HotelTours from './../components/HotelTours';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import {
  changeHotelToursSort,
  updateHotelToursFilter } from '../actions/hotelActionCreators';
import { getHotelTours } from '../selectors';

const mapStateToProps = (state, ownProps) => ({
  name: state.hotelState.get('hotel').get('name'),
  tours: getHotelTours(state),
  toursAreLoading: state.hotelState.get('toursAreLoading'),
  toursLoadedSuccess: state.hotelState.get('toursLoadedSuccess'),
  toursSortBy: state.hotelState.get('toursSortBy'),
  toursFilters: state.hotelState.get('toursFilters'),
});

const mapDispatchToProps = (dispatch) => ({
  changeHotelToursSort: bindActionCreators(changeHotelToursSort, dispatch),
  updateHotelToursFilter: bindActionCreators(updateHotelToursFilter, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(HotelTours);
