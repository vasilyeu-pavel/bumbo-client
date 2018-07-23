import { extend } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { compose, mapProps, lifecycle } from 'recompose';

import MainPage from './MainPage';

import { connectHistoryWithDispatch } from '../history/';

import { initRootView } from '../actions/appActionCreators';
import {
  showHotels,
  setMarkersTypeByZoom,
} from '../actions/mapActionCreators';
import { setMapZoom } from '../actions/routeActionCreators';
import {
  changeSearchOnMapMove,
  setCustomPageInitialParams,
} from '../actions/routeActionCreators';

const mapStateToProps = (state) => ({
  destination: state.searchToursState.get('destination'),
  cardsGroupByType: state.cardsState.get('cardsGroupByType'),
});

const mapDispatchToProps = (dispatch) => ({
  initRootView: bindActionCreators(initRootView, dispatch),
  setMapZoom: bindActionCreators(setMapZoom, dispatch),
  showHotels: bindActionCreators(showHotels, dispatch),
  setMarkersTypeByZoom: bindActionCreators(setMarkersTypeByZoom, dispatch),
  changeSearchOnMapMove: bindActionCreators(changeSearchOnMapMove, dispatch),
  setCustomPageInitialParams: bindActionCreators(setCustomPageInitialParams, dispatch),
  connectHistoryWithDispatch: bindActionCreators(connectHistoryWithDispatch, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  mapProps((props) => extend({}, props, { query: props.location.query })),
  lifecycle({
    componentWillMount() {
      this.props.initRootView();
      this.props.connectHistoryWithDispatch(this.props.history);
      this.props.setCustomPageInitialParams(this.props.history);
    },
    componentDidMount() {
      this.props.setMarkersTypeByZoom();
      this.props.setMapZoom(this.props.history);
    },
  })
);

export default enhance(MainPage);
