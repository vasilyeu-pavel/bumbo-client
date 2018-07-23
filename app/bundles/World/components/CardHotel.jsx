import Stars from './common/Stars.jsx';
import Mark from './common/Mark.jsx';
import Button from './common/Button/Button.jsx';
import CardTour from './CardTour.jsx';
import React, { PropTypes, PureComponent } from 'react';
import { map, bindAll, uniq, compact } from 'lodash';
import Slick from 'react-slick';
import classNames from 'classnames';

export default class CardHotel extends PureComponent {
  static propTypes = {
    id: PropTypes.number,
    hotelLink: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    imagesCount: PropTypes.number,
    priceUpdatedAt: PropTypes.number,
    stars: PropTypes.number,
    mark: PropTypes.number,
    tours: PropTypes.arrayOf(PropTypes.object),
    line: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.string),
    buttonText: PropTypes.string.isRequired,
    cardIsOpen: PropTypes.bool.isRequired,
    tourInfo: PropTypes.object,
    onCardHover: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      slick: { arrows: true, lazyLoad: true, speed: 200 },
      beachLine: this.props.line !== 4 && !!this.props.line ? `${this.props.line} линия` : '',
    };

    bindAll(this, ['next', 'previous', 'handleCardHover', 'handleCardMouseLeave']);
  }

  next() {
    this.refs.slider.slickNext();
  }

  previous() {
    this.refs.slider.slickPrev();
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

    return `/online_tours/${id}?${hotelLink}`;
  }

  getImages = () => {
    const { id, imagesCount } = this.props;
    const ratio = window.devicePixelRatio;
    const width = 270;
    const height = 200;
    const images = [];

    for (let i = 0; i < imagesCount; i++) {
      images[i] = `https://hotels.sletat.ru/i/f/${id}_${i}_${width}_${height}.jpg`;
    }

    return images;
  }

  handleCardHover() {
    if (this.props.onCardHover) {
      this.props.onCardHover(this.props.id);
    }
  }

  handleCardMouseLeave() {
    if (this.props.onCardHover) {
      this.props.onCardHover(null);
    }
  }

  beachLine() {
    const city = this.props.city ? this.props.city : '';
    const beachLine = this.state.beachLine ? `, ${this.state.beachLine}` : '';
    return `${city}${beachLine}`;
  }

  priceUpdateTime() {
    if (!this.props.priceUpdatedAt) return '';

    return (
      <span>{this.props.priceUpdatedAt} часов назад</span>
    );
  }

  cardMark({ collapsed }) {
    if (this.props.mark === null || this.props.mark === 0 || this.props.mark === '0') return '';

    const className = collapsed ? 'card__mark card__mark--collapse' : 'card__mark';

    return (
      <div className={className}>
        <Mark value={this.props.mark} small={true} />
      </div>
    );
  }

  renderCard() {
    return (
      <div
        onMouseEnter={this.handleCardHover}
        onMouseLeave={this.handleCardMouseLeave}
        className={classNames('card card--hotel', { 'card--partners': this.props.isPartners })}
      >
        <div className='container'>
          <Slick ref='slider' {...this.state.slick}>
            {this.getImages().map((url, index) => (
              <div
                key={index}
                className='card__photo'
                style={{ backgroundImage: `url(${url})` }}
              ></div>
            ))}
          </Slick>
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
            {this.cardMark({ collapsed: false })}
          </header>
          <div className='card__line'>
            {this.beachLine()}

          </div>
          <div className='card__features'>
            {this.cardFeatures()}
          </div>
          <footer className='card__footer'>
            <div className='card__button'>
              <Button color='orange' href={this.hotelLink()} target='_blank' tag='a'>
                {this.props.buttonText}
              </Button>
            </div>
            <div className='card__price-update-time'>
              {this.priceUpdateTime()}
            </div>
          </footer>

        </main>
      </div>
    );
  }

  collapsedCardBottom() {
    return (
      <div className='card__bottom'>
        <div className='card__stars'>
          <Stars count={this.props.stars} size='small' color='orange' />
        </div>
        <div className='card__beach-line'>
          <span>{this.beachLine()}</span>
        </div>
        <div className='card__button card__button--collapse card__button--hotel'>
          <Button color='orange' href={this.hotelLink()} target='_blank' tag='a'>
            {this.props.buttonText}
          </Button>
          <div className='card__price-update-time'>
              {this.priceUpdateTime()}
            </div>
        </div>
      </div>
    );
  }

  collapsedCardBody() {
    return (
      <div className='card__body'>
        <div className='card__overlay'></div>
        <div className='container'>
          <Slick ref='slider' {...this.state.slick}>
            {this.getImages().map((url, index) => (
              <div
                key={index}
                className='card__photo'
                style={{ backgroundImage: `url(${url})` }}
              ></div>
            ))}
          </Slick>
          <div className='buttons'>
            <div className='touch left' onClick={this.previous}></div>
            <div className='touch right' onClick={this.next}></div>
          </div>
        </div>
        <div className='card__title card__title--collapse'>
          {`${this.props.name}`}
        </div>
        {this.cardMark({ collapsed: true })}

      </div>
    );
  }

  renderCollapsedCard() {
    return (
      <div
        onMouseEnter={this.handleCardHover}
        onMouseLeave={this.handleCardMouseLeave}
        className='card card--collapse card--hotel'
      >
        {this.collapsedCardBody()}
        {this.collapsedCardBottom()}
      </div>
    );
  }

  render() {
    return this.props.cardIsOpen ? this.renderCard() : this.renderCollapsedCard();
  }
}
