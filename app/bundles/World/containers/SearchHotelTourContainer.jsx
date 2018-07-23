import SearchHotelTour from './../components/SearchHotelTour';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import {
  fetchHotelTours,
  updateSearchToursParams,
} from '../actions/hotelActionCreators';
import {
  compose,
  shouldUpdate,
} from 'recompose';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => ({
  routing: state.routing,
  defaultSearchParams: state.searchToursState.get('defaultSearchParams'),
  departFrom: state.hotelState.get('departFrom'),
  searchParams: state.hotelState.get('searchParams'),
  kidsAgesSelect: state.searchToursState.get('kidsAgesSelect').toJS(),
  meals: state.hotelState.get('meals'),
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchToursParams: bindActionCreators(updateSearchToursParams, dispatch),
  fetchHotelTours: bindActionCreators(fetchHotelTours, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  shouldUpdate((props, nextProps) => {
    const isSearchParamsEquals = _.isEqual(props.searchParams, nextProps.searchParams);

    return !isSearchParamsEquals;
  })
);

export default enhance(SearchHotelTour);
