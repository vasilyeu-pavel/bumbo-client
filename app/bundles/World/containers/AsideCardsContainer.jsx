/* eslint no-console: 0*/

import React, { Component, PropTypes } from 'react';
import WorldAside from './../components/WorldAside';
import HotelsSort from '../components/HotelsSort';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setHoveredItem,
  toggleWorldMap,
} from '../actions/mapActionCreators';
import {
  changeHotelsCardSort,
  showFilter,
} from '../actions/cardsActionsCreators';
import {
  updateFiltersParameters,
} from '../actions/filtersActionCreators';

import {
  getCardsByType,
} from '../selectors/';

const mapStateToProps = (state, ownProps) => ({
  query: ownProps.query,
  cards: getCardsByType(state),
  isPartners: ownProps.partners,
  cardsGroupByType: state.cardsState.get('cardsGroupByType'),
  filtersProps: state.filtersState.get('filtersProps'),
  isFilterShow: state.cardsState.get('showFilter'),
  mapIsShown: state.mapState.get('mapIsShown'),
  sortHotelsBy: state.cardsState.get('sortHotelsBy'),
  hotelsFetching: state.appState.get('hotelsFetching'),
  toursIsOpened: state.appState.get('toursIsOpened'),
  searchOnMapMove: state.mapState.get('searchOnMapMove'),
  aviasalesXml: state.appState.get('aviasalesXml'),
  onlineHotelsFetching: state.appState.get('onlineHotelsFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  showFilter: bindActionCreators(showFilter, dispatch),
  setHoveredItem: bindActionCreators(setHoveredItem, dispatch),
  toggleWorldMap: bindActionCreators(toggleWorldMap, dispatch),
  changeHotelsCardSort: bindActionCreators(changeHotelsCardSort, dispatch),
  updateFiltersParameters: bindActionCreators(updateFiltersParameters, dispatch),
});

class AsideCardsContainer extends Component {
  static propTypes = {
    query: PropTypes.object,
    isPartners: PropTypes.bool,
    sortHotelsBy: PropTypes.object.isRequired,
    cardsGroupByType: PropTypes.string,
    filtersProps: PropTypes.object,
    isFilterShow: PropTypes.bool,
    mapIsShown: PropTypes.bool,
    hotelsFetching: PropTypes.bool,
    toursIsOpened: PropTypes.bool,
    searchOnMapMove: PropTypes.bool,
    onlineHotelsFetching: PropTypes.bool,
    updateFiltersParameters: PropTypes.func.isRequired,
    showFilter: PropTypes.func.isRequired,
    changeHotelsCardSort: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('%c Rerender AsideCardsContainer! ', 'background: #222; color: #bada55');

    return (
      <WorldAside
        toursIsOpened={this.props.toursIsOpened}
        query={this.props.query}
        cards={this.props.cards}
        isPartners={this.props.isPartners}
        cardsGroupByType={this.props.cardsGroupByType}
        filtersProps={this.props.filtersProps}
        updateFiltersParameters={this.props.updateFiltersParameters}
        showFilter={this.props.showFilter}
        toggleWorldMap={this.props.toggleWorldMap}
        isFilterShow={this.props.isFilterShow}
        mapIsShown={this.props.mapIsShown}
        onlineHotelsFetching={this.props.onlineHotelsFetching}
        changeHotelsCardSort={this.props.changeHotelsCardSort}
        hotelsFetching={this.props.hotelsFetching}
        sortHotelsBy={this.props.sortHotelsBy}
        aviasalesXml={this.props.aviasalesXml}
      >
        <HotelsSort
          sortHotelsBy={this.props.sortHotelsBy}
          changeHotelsCardSort={this.props.changeHotelsCardSort}
          isPartners={this.props.isPartners}
        />
      </WorldAside>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsideCardsContainer);
