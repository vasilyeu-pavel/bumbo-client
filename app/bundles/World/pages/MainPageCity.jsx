import { extend } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { compose, mapProps, lifecycle } from 'recompose';
import _ from 'lodash';

import MainPage from './MainPage';

import { showCityHotels } from '../actions/mapActionCreators';
import { changeSearchOnMapMove } from '../actions/routeActionCreators';
import { queriesSelector } from '../selectors/';

const mapStateToProps = (state) => ({
  defaultSearchParams: state.searchToursState.get('defaultSearchParams'),
  locationQueries: queriesSelector(state),
  cardsGroupByType: state.cardsState.get('cardsGroupByType'),
});

const mapDispatchToProps = (dispatch) => ({
  showCityHotels: bindActionCreators(showCityHotels, dispatch),
  changeSearchOnMapMove: bindActionCreators(changeSearchOnMapMove, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  mapProps((props) => extend({}, props, { query: props.location.query })),
  lifecycle({
    componentWillMount() {
      this.props.showCityHotels(this.props.match.params.id, this.props.history);
      this.props.changeSearchOnMapMove(this.props.history, false);
    },
    componentWillReceiveProps(nextProps) {
      const isCityIdsNotEqual = this.props.match.params.id !== nextProps.match.params.id;
      const matchedFields = [
        'date_from', 'date_to', 'nights', 'nights_range',
        'adults', 'kids_ages', 'city_from_id',
      ];
      const locationQueriesBefore = _.pick(this.props.locationQueries, matchedFields);
      const locationQueriesAfter = _.pick(nextProps.locationQueries, matchedFields);

      const isLocationQueriesNotEqual = !_.isEqual(
        locationQueriesBefore,
        locationQueriesAfter
      );

      if (isCityIdsNotEqual || isLocationQueriesNotEqual) {
        this.props.showCityHotels(nextProps.match.params.id, this.props.history);
      }
    },
  })
);

export default enhance(MainPage);
