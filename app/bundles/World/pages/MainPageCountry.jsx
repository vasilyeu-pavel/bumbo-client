import { extend } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { compose, mapProps, lifecycle } from 'recompose';
import _ from 'lodash';

import MainPage from './MainPage';

import { showCountryHotels } from '../actions/mapActionCreators';
import { changeSearchOnMapMove } from '../actions/routeActionCreators';
import { connectHistoryWithDispatch } from '../history/';
import { queriesSelector } from '../selectors/';

const mapStateToProps = (state) => ({
  defaultSearchParams: state.searchToursState.get('defaultSearchParams'),
  locationQueries: queriesSelector(state),
  cardsGroupByType: state.cardsState.get('cardsGroupByType'),
});

const mapDispatchToProps = (dispatch) => ({
  showCountryHotels: bindActionCreators(showCountryHotels, dispatch),
  changeSearchOnMapMove: bindActionCreators(changeSearchOnMapMove, dispatch),
  connectHistoryWithDispatch: bindActionCreators(connectHistoryWithDispatch, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  mapProps((props) => extend({}, props, { query: props.location.query })),
  lifecycle({
    componentWillMount() {
      this.props.showCountryHotels(this.props.match.params.id, this.props.history);
      this.props.changeSearchOnMapMove(this.props.history, false);
      // this.props.connectHistoryWithDispatch(this.props.history);
    },
    componentWillReceiveProps(nextProps) {
      const isCountryIdsNotEqual = this.props.match.params.id !== nextProps.match.params.id;
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

      if (isCountryIdsNotEqual || isLocationQueriesNotEqual) {
        this.props.showCountryHotels(nextProps.match.params.id, this.props.history);
      }
    },
  })
);

export default enhance(MainPage);
