import { HotelFilters } from './../components/HotelFilters';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import {
  updateFiltersParameters,
  resetFiltersParameters,
} from '../actions/filtersActionCreators';
import {
  compose,
} from 'recompose';

const mapStateToProps = (state, ownProps) => ({
  routing: state.routing,
  filtersProps: state.filtersState.get('filtersProps').toJS(),
  initialFiltersProps: state.filtersState.get('initialFiltersProps').toJS(),
  cardsGroupByType: state.cardsState.get('cardsGroupByType'),
  onlineHotelsFetching: state.appState.get('onlineHotelsFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  updateFiltersParameters: bindActionCreators(updateFiltersParameters, dispatch),
  resetFiltersParameters: bindActionCreators(resetFiltersParameters, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
);

export default enhance(HotelFilters);
