import React, { PureComponent, PropTypes } from 'react';
import CardsListContainer from '../containers/CardsListContainer';
import CardTypeToggle from './CardTypeToggle';
import FilterGroup from './FilterGroup.jsx';
import { bindAll } from 'lodash';
import classNames from 'classnames';
import { Map, OrderedMap, List } from 'immutable';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/styles';

export default class WorldAside extends PureComponent {
  static propTypes = {
    cardsGroupByType: PropTypes.string.isRequired,
    filtersProps: PropTypes.instanceOf(Map).isRequired,
    cards: PropTypes.oneOfType([
      PropTypes.instanceOf(OrderedMap),
      PropTypes.instanceOf(List)]).isRequired,
    sortHotelsBy: PropTypes.instanceOf(Map).isRequired,
    updateFiltersParameters: PropTypes.func.isRequired,
    showFilter: PropTypes.func.isRequired,
    toggleWorldMap: PropTypes.func.isRequired,
    onlineHotelsFetching: PropTypes.bool,
    isFilterShow: PropTypes.bool.isRequired,
    mapIsShown: PropTypes.bool,
    changeHotelsCardSort: PropTypes.func.isRequired,
    hotelsFetching: PropTypes.bool.isRequired,
    query: PropTypes.object,
    isPartners: PropTypes.bool,
    toursIsOpened: PropTypes.bool.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    bindAll(this, [
      'handleHideFilter',
      'handleShowFilter',
      'handleSortChange',
    ]);
  }

  handleShowFilter() {
    this.props.showFilter(true);
  }

  handleHideFilter() {
    this.props.showFilter(false);
  }

  needShowFilterTrigger() {
    return this.props.cardsGroupByType === 'hotel';
  }

  handleSortChange(item) {
    this.props.changeHotelsCardSort({ sort: item.value, direction: false });
  }

  cardsTypeToggle() {
    const {
      mapIsShown,
      isPartners,
      toggleWorldMap,
      cardsGroupByType,
      onlineHotelsFetching,
      cards,
    } = this.props;

    if (cardsGroupByType !== 'hotel' || isPartners) return '';
    return (
      <CardTypeToggle
        hotelsLength={cards.size}
        onSelect={toggleWorldMap}
        mapIsShown={mapIsShown}
        onlineHotelsFetching={onlineHotelsFetching}
      />
    );
  }

  render() {
    // const selectValues = [
    //   { label: 'По стоимости', value: 'min_price' },
    //   { label: 'По рейтингу', value: 'rate' },
    //   { label: 'По отзывам', value: 'reviews_count' },
    //   { label: 'По звездности', value: 'stars' },
    // ];
    // const sort = this.props.sortHotelsBy.get('sort');

    console.log('%c Rerender WorldAside! ', 'background: #333; color: yellow');

    return (
      <div className={classNames(
          'world__aside-inner',
          { 'world__aside-inner--flex': this.props.toursIsOpened })}
      >
        {this.props.isFilterShow && <div className='world__aside-filter'>
          {this.needShowFilterTrigger() && (
            <div className='filter-group__item filter-group__item--no-margin cf'>
                <button className='pointer pointer--left pointer--bordered'
                  onClick={this.handleHideFilter}
                >Спрятать фильтры</button>
            </div>
          )}
          <FilterGroup
            isPartners={this.props.isPartners}
            onChange={this.props.updateFiltersParameters}
            filtersProps={this.props.filtersProps.toJS()}
            className='checkbox-group'
          />
        </div>}
        <div className={classNames(
            'world__aside-cards-list',
            { 'world__aside-cards-list--partners': this.props.isPartners }
          )}
        >
          {this.cardsTypeToggle()}
          {this.props.hotelsFetching && (
            <div className='world__aside-loader'>
              <div className='loader'></div>
            </div>
          )}

          <CardsListContainer query={this.props.query} isPartners={this.props.isPartners}/>
        </div>
        {this.props.aviasalesXml && (
          <SyntaxHighlighter language='javascript' style={atomOneLight}>
            {this.props.aviasalesXml}
          </SyntaxHighlighter>
        )}
      </div>
    );
  }
}
