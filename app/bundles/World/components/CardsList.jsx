import React, { Component, PropTypes } from 'react';
import CardCitiesOfCountry from './CardCitiesOfCountry.jsx';
import CardCountry from './CardCountry.jsx';
import CardHotel from './CardHotel.jsx';
import CardHotelPartners from './CardHotelPartners.jsx';
import classNames from 'classnames';
import { List, OrderedMap } from 'immutable';
import LazyLoad from 'react-lazyload';
import { map, debounce, bindAll } from 'lodash';

export default class CardsList extends Component {
  static propTypes = {
    isPartners: PropTypes.bool,
    cards: PropTypes.oneOfType([
      PropTypes.instanceOf(OrderedMap),
      PropTypes.instanceOf(List)]).isRequired,
    type: PropTypes.string.isRequired,
    setHoveredItem: PropTypes.func.isRequired,
    cardsIsOpen: PropTypes.bool,
    searchOnMapMove: PropTypes.bool,
    onlineHotelsFetching: PropTypes.bool,
    locationQueriesString: PropTypes.string,
    changeSearchOnMapMove: PropTypes.func,
    updateVisibleParams: PropTypes.func.isRequired,
    toggleTourDescription: PropTypes.func,
    toursIsOpened: PropTypes.bool,
    history: PropTypes.object,
    locationQueriesStringWithDefaultParams: PropTypes.string.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.handleScroll = debounce(this.handleScroll, 150, { maxWait: 1000 });

    bindAll(this, ['handleScroll']);
  }

  _renderCountryCards() {
    const { cards, isPartners } = this.props;

    return cards.valueSeq().map(card => {
      const price = isPartners ? card.price : card.minPrice;

      return (
        <CardCountry
          id={card.id}
          key={`country_${card.id}`}
          country={card.key}
          text={`от ${price} ₽`}
        />
      );
    });
  }

  _renderCityCards() {
    const { cards, setHoveredItem } = this.props;

    return cards.groupBy(country => country.countryName).sortBy(card =>
      card.minBy(tour => tour.minPrice).minPrice
    ).map((cities, country) => (
      <CardCitiesOfCountry
        key={`cities_of_${country}`}
        country={country}
        cities={cities}
        onCityHover={setHoveredItem}
        isPartners={this.props.isPartners}
        locationQueriesString={this.props.locationQueriesString}
      />
    ));
  }

  handleScroll() {
    this.props.updateVisibleParams();
  }

  _renderHotelCards() {
    const {
      type,
      cards,
      isPartners,
      setHoveredItem,
      locationQueriesStringWithDefaultParams,
    } = this.props;

    return map(cards.toArray(), (card, index) => {
      const buttonText = this.props.isPartners
        ? `${card.tourInfo.price} руб.`
        : `от ${card.minPrice} руб.`;

      if (isPartners) {
        let isFirstCard = false;

        if (index === 0) {
          isFirstCard = true;
        }

        return (
          <LazyLoad
            once={true}
            key={index}
            overflow={true}
            throttle={150}
            height={300}
            offset={300 * 5}
            unmountIfInvisible={true}
          >
            <CardHotelPartners
              isFirstCard={isFirstCard}
              id={card.id}
              city={card.cityName}
              key={`${type}_${card.id}`}
              name={card.key}
              stars={card.stars}
              mark={card.rate}
              line={card.beachLineId}
              features={card.facilities}
              imageUrls={card.imageUrls}
              buttonText={buttonText}
              imagesCount={card.imagesCount}
              cardIsOpen={this.props.cardsIsOpen}
              hotelLink={''}
              tourInfo={card.tourInfo}
            />
          </LazyLoad>
        );
      }

      return (
        <LazyLoad
          once={true}
          key={index}
          overflow={true}
          throttle={150}
          height={300}
          offset={300 * 5}
          unmountIfInvisible={true}
        >
          <CardHotel
            id={card.id}
            key={`${type}_${card.id}`}
            city={card.cityName}
            name={card.key}
            stars={card.stars}
            mark={card.rate}
            line={card.beachLineId}
            imagesCount={card.imagesCount}
            features={card.facilities}
            buttonText={buttonText}
            priceUpdatedAt={card.priceUpdatedAt}
            cardIsOpen={this.props.cardsIsOpen}
            hotelLink={locationQueriesStringWithDefaultParams}
            tourInfo={card.tourInfo}
            onCardHover={setHoveredItem}
          />
        </LazyLoad>
      );
    });
  }

  _renderEmptyHolets() {
    const showCurrentHotels = () => {
      this.props.changeSearchOnMapMove(this.props.history, true);
    };

    if (this.props.onlineHotelsFetching) return '';

    return this.props.searchOnMapMove ? (
      <div className='hotel-cards-empty'>
        <div className='hotel-cards-empty__label'>В данной области нет отелей</div>
      </div>
    ) : (
      <div className='hotel-cards-empty'>
        <div className='hotel-cards-empty__label'>Мы потеряли из виду все результаты :)</div>
        <a
          className='hotel-cards-empty__link hotel-cards-empty__link--show-new'
          onClick={showCurrentHotels}
        >
          Показать новые результаты в этой области
        </a>
        <a className='hotel-cards-empty__link hotel-cards-empty__link--return'>
          Вернуться к старым результатам
        </a>
      </div>
    );
  }

  renderCards() {
    const { type, cards } = this.props;

    if (type === 'country') {
      return this._renderCountryCards();
    }

    if (type === 'city') {
      return this._renderCityCards();
    }

    if (type === 'hotel') {
      if (cards.size === 0) {
        return this._renderEmptyHolets();
      }

      return this._renderHotelCards();
    }

    return false;
  }

  cardsListClassName() {
    const { toursIsOpened, isPartners, type } = this.props;

    return classNames('cards-list cards-list--main',
      { 'cards-list--compact': toursIsOpened },
      { 'cards-list--partners': isPartners },
      { 'cards-list--hotel': type === 'hotel' },
    );
  }

  render() {
    console.log('%c Rerender CardsList! ', 'background: #333; color: yellow');

    return (
      <div
        className={this.cardsListClassName()}
      >
        {this.renderCards()}
      </div>
    );
  }
}
