import { extend } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { compose, mapProps } from 'recompose';

import WorldMap from './../components/WorldMap';

import {
  setOpenedInfoBox,
  zoomFromTo,
  changeMapBounds,
  toggleWorldMap,
} from '../actions/mapActionCreators';
import { prepareSearchParams } from '../utils/prepareSearchParams';
import { changeSearchOnMapMove, setMapZoom, setMapCenter } from '../actions/routeActionCreators';
import {
  getMapZoom,
  getMapCenter,
  getMarkersByType,
  getSearchOnMapMove,
  queriesWithDefaultParamsStringSelector,
} from '../selectors';
import { changeCardsGroupByType } from '../actions/cardsActionsCreators';

const mapStateToProps = (state, ownProps) => ({
  query: ownProps.query,
  zoom: getMapZoom(state),
  center: getMapCenter(state),
  bounds: state.mapState.get('bounds'),
  markers: getMarkersByType(state),
  mapIsShown: state.mapState.get('mapIsShown'),
  markersType: state.mapState.get('markersType'),
  hoveredItemId: state.mapState.get('hoveredItemId'),
  openedInfoBoxId: state.mapState.get('openedInfoBoxId'),
  searchOnMapMove: getSearchOnMapMove(state, ownProps),
  defaultSearchParams: state.searchToursState.get('defaultSearchParams'),
  locationQueriesStringWithDefaultParams: queriesWithDefaultParamsStringSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  zoomFromTo: bindActionCreators(zoomFromTo, dispatch),
  setMapZoom: bindActionCreators(setMapZoom, dispatch),
  setMapCenter: bindActionCreators(setMapCenter, dispatch),
  toggleWorldMap: bindActionCreators(toggleWorldMap, dispatch),
  changeMapBounds: bindActionCreators(changeMapBounds, dispatch),
  setOpenedInfoBox: bindActionCreators(setOpenedInfoBox, dispatch),
  changeSearchOnMapMove: bindActionCreators(changeSearchOnMapMove, dispatch),
  changeCardsGroupByType: bindActionCreators(changeCardsGroupByType, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  mapProps(props => {
    const { query = {}, defaultSearchParams, isPartners } = props;
    const searchParams = prepareSearchParams(query, defaultSearchParams.toJS(), isPartners);

    return extend({}, props, { searchParams });
  }),
);

export default enhance(WorldMap);
