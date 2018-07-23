import CardsList from '../components/CardsList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { toggleTourDescription } from '../actions/appActionCreators';
import { setHoveredItem } from '../actions/mapActionCreators';
import { updateVisibleParams } from '../actions/cardsActionsCreators';
import { changeSearchOnMapMove } from '../actions/routeActionCreators';
import {
  getCardsByType,
  queriesWithDefaultParamsStringSelector,
  queriesStringSelector,
} from '../selectors/';

const mapStateToProps = (state, ownProps) => ({
  type: state.cardsState.get('cardsGroupByType'),
  cards: getCardsByType(state),
  cardsIsOpen: !state.mapState.get('mapIsShown'),
  onlineHotelsFetching: state.appState.get('onlineHotelsFetching'),
  searchOnMapMove: state.mapState.get('searchOnMapMove'),
  toursIsOpened: state.appState.get('toursIsOpened'),
  locationQueriesStringWithDefaultParams: queriesWithDefaultParamsStringSelector(state),
  locationQueriesString: queriesStringSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  setHoveredItem: bindActionCreators(setHoveredItem, dispatch),
  updateVisibleParams: bindActionCreators(updateVisibleParams, dispatch),
  changeSearchOnMapMove: bindActionCreators(changeSearchOnMapMove, dispatch),
  toggleTourDescription: bindActionCreators(toggleTourDescription, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
);

export default enhance(CardsList);
