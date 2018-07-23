import Stars from './common/Stars.jsx';
import Mark from './common/Mark.jsx';
import Button from './common/Button/Button.jsx';
import CardTour from './CardTour.jsx';
import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { map, bindAll, uniq, compact } from 'lodash';
import Slick from 'react-slick';
import classNames from 'classnames';
import TourFlightItem from './TourFlightItem';
import includes from 'lodash';

export default class CardHotelPartners extends Component {
  static propTypes = {
    id: PropTypes.number,
    imagesCount: PropTypes.number.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    hotelLink: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    mark: PropTypes.number.isRequired,
    tours: PropTypes.arrayOf(PropTypes.object),
    line: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string),
    buttonText: PropTypes.string.isRequired,
    cardIsOpen: PropTypes.bool.isRequired,
    tourInfo: PropTypes.object,
    isFirstCard: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    bindAll(this, ['next', 'previous']);
  }

  cardTours() {
    if (!this.props.tours) {
      return (<div>Информация по турам в разработке</div>);
    }

    return _.map(this.props.tours, (tour, i) =>
      <CardTour key={i} name={tour.name} price={tour.price} hot={tour.hot} />
    );
  }

  cardFeatures() {
    const { features } = this.props;
    const getIcon = (id) => {
      switch (id) {
        case '130': return 'wifi';
        case '131': return 'wifi';
        case '94': return 'wifi';
        case '118': return 'refrigerator';
        case '117': return 'tv';
        case '116': return 'hairdryer';
        case '126': return 'gym';
        case '24': return 'airconditioning';
        case '20': return 'safetybox';
        case '137': return 'waterpark';
        case '139': return 'waterpark';
        case '36': return 'sauna';
        default: return undefined;
      }
    };
    const uniqFeatureIcons = uniq(compact(map(features, getIcon)));

    return map(uniqFeatureIcons, (icon, i) => (
      <div key={i} className={classNames(['card__feature', `card__feature--${icon}`])}></div>
    ));
  }

  hotelLink() {
    const { id, hotelLink } = this.props;

    return `/online_tours/${id}?${hotelLink.slice(1)}`;
  }

  getImages = () => {
    const { id, imagesCount, imageUrls } = this.props;

    if (imagesCount === 0 || includes(!imageUrls[0], 'sletat')) return imageUrls;

    const ratio = window.devicePixelRatio;
    const width = 270 * ratio;
    const height = 170 * ratio;
    const images = [];

    for (let i = 0; i < imagesCount; i++) {
      images[i] = `https://hotels.sletat.ru/i/f/${id}_${i}_${width}_${height}.jpg`;
    }

    return images;
  }

  makeLabel(label) {
    return label.length > 11 ?
    ` ${label.substr(0, 9)}...` :
    ` ${label}`;
  }

  next() {
    this.refs.slider.slickNext();
  }

  previous() {
    this.refs.slider.slickPrev();
  }

  cardMark() {
    if (this.props.mark === null || this.props.mark === 0 || this.props.mark === '0') return '';

    return (
      <div className='card__mark'>
        <Mark value={this.props.mark} small={true} />
      </div>
    );
  }

  operatorLink() {
    const { operatorName, tourUrl } = this.props.tourInfo.tourData;

    if (tourUrl === '') return operatorName;

    return (<a style={{ color: '#15981c' }} target='_blank' href={tourUrl}>{operatorName}</a>);
  }

  hotelCard() {
    const { flightData, tourData } = this.props.tourInfo;
    const { medinsurance, transfer } = tourData;
    const withImages = this.props.imagesCount > 0;

    let fuelLabel = '*Чартер: авиарейсы могут измениться. ';
    let transferLabel = '';

    if (medinsurance && medinsurance !== 'unknown') {
      fuelLabel += 'Мед. страховка включена. ';
    } else if (medinsurance !== 'unknown') {
      fuelLabel += 'Мед. страховка не включена. ';
    }

    if (transfer && transfer !== 'unknown') {
      transferLabel = (<span>Трансфер включен.</span>);
    } else if (transfer !== 'unknown') {
      transferLabel = (<span style={{ color: 'red' }}>Трансфер не включен.</span>);
    }

    let tourPrice = this.props.buttonText;
    let buttonModifiers = ['loading'];

    const { fuelPrice, mealName, roomName, nights } = tourData;

    tourPrice = !!tourData.price ? `${tourData.price} руб.` : this.props.buttonText;
    buttonModifiers = ['loading'];

    if (fuelPrice && fuelPrice !== 0) {
      fuelLabel = `*Чартер: авиарейсы могут измениться. Багаж 20 кг + ручная кладь`;
    }

    const slickSettings = { arrows: true, lazyLoad: true, speed: 200 };
    const beachLineLabel = this.props.line <= 3 && !!this.props.line ?
      `${this.props.line} линия` : '';
    const card = (
      <div className={classNames('card card--partners', { 'card--first': this.props.isFirstCard })}>
        <div className='container'>
          {withImages && (
            <Slick ref='slider' {...slickSettings}>
              {this.getImages().map((url, index) => (
                <div
                  key={index}
                  className='card__photo'
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              ))}
            </Slick>
          )}
          <div className='buttons'>
            <div className='touch left' onClick={this.previous}></div>
            <div className='touch right' onClick={this.next}></div>
          </div>
        </div>
        <main className='card__main'>
          <header className='card__header'>
            <div className='card__title'>{this.props.name}</div>
            <div className='card__stars'>
              <Stars count={this.props.stars} size='small' color='orange' />
            </div>
            {this.cardMark()}
          </header>
          <div className='card__line'>
            <span style={{ color: '#000' }}>
              {this.props.city}{beachLineLabel !== '' && `, ${beachLineLabel}`}
            </span>
            <br/>
            <br/>
            {this.props.tourInfo.tourData.provider}
          </div>
          <div className='card__tours'>{this.cardTours()}</div>
          <footer className='card__footer'>
            <div className='card__features'>{this.cardFeatures()}</div>
            <div className='card__button'>
              <Button
                color='orange'
                modifiers={buttonModifiers}
                href={tourData.link}
                target='_blank' tag='a'
              >{tourPrice}</Button>
            </div>
          </footer>
        </main>
        <div className='card__tour'>
          <div>
            <div className='card__tour-header'>
              <div className='card__tour-header-item card__tour-logo'>
                {this.operatorLink()}
              </div>
              <div className='card__tour-header-item card__tour-nights'>
                {`${nights} ночей`}
              </div>
              {roomName && (
                <div className='card__tour-header-item card__tour-room'>
                  {roomName}
                </div>
              )}
              <div className='card__tour-header-item card__tour-meal'>
                {mealName || 'Без питания'}
              </div>
            </div>
            <TourFlightItem
              checkin={this.props.tourInfo.checkin}
              tourInfo={this.props.tourInfo}
              flightData={flightData.flightTo}
            />
            <TourFlightItem
              checkin={this.props.tourInfo.checkin_to}
              tourInfo={this.props.tourInfo}
              flightData={flightData.flightBack}
              backFlight={true}
            />
            <div className='card__tour-footer'>
              {fuelLabel} {transferLabel}
            </div>
          </div>
        </div>
      </div>
    );

    return card;
  }

  render() {
    return this.hotelCard();
  }
}
