import React, { Component } from 'react';
import Stars from '../common/Stars.jsx';
import moment from 'moment';
import DateRangeBadge from '../DateRangeBadge.jsx';
import Mark from '../common/Mark.jsx';
import includes from 'lodash';
import declOfNums from '../../utils/declOfNum';

export default class OrderInfo extends Component {
  componentDidMount() {
    $('.order__slider__fotorama')
    .fotorama({
      height: 255,
      width: 440,
      arrows: false,
      nav: false,
    });
  }

  location() {
    const { hotelData } = this.props;

    const countryName = hotelData.countryName ? `${hotelData.countryName}, ` : '';
    const beachLine = hotelData.beachLineId ? `, ${hotelData.beachLineId} пляжная линия` : '';

    return `${countryName} ${hotelData.cityName}${beachLine}`;
  }

  cardMark() {
    const { hotelData } = this.props;

    if (hotelData.rate === null || hotelData.rate === 0 || hotelData.rate === '0') return '';

    return (
      <div className='card__mark card__mark--order'>
        <Mark value={hotelData.rate} small={true} />
      </div>
    );
  }

  getImages = () => {
    const { id, imagesCount, imageUrls } = this.props.hotelData;

    if (imagesCount == 0 || includes(!imageUrls[0], 'sletat'))
      return imageUrls;

    const ratio = window.devicePixelRatio;
    const width = 440 * ratio;
    const height = 240 * ratio;
    const images = [];

    for (let i = 0; i < imagesCount; i++) {
      images[i] = `https://hotels.sletat.ru/i/f/${id}_${i}_${width}_${height}.jpg`;
    }

    return images;
  }

  render() {
    const { hotelData, tourData } = this.props;
    const dateFormat = 'DD.MM.YYYY';
    const startDate = moment(tourData.dateFrom, dateFormat);
    const endDate = moment(tourData.dateTo, dateFormat);
    const nightTitles = ['ночь', 'ночи', 'ночей'];
    const countOfNights = tourData.nights;
    const numberOfNights = `${countOfNights} ${declOfNums(countOfNights, nightTitles)}`;
    const adultsTitles = ['взрослый', 'взрослых', 'взрослых'];
    const adults = `${tourData.adults} ${declOfNums(tourData.adults, adultsTitles)}`;
    const kidsTitles = ['ребёнок', 'детей', 'детей'];
    const kids = `${tourData.kids} ${declOfNums(tourData.kids, kidsTitles)}`;
    const participants = adults + (tourData.kids > 0 ? kids : '');

    return (
      <div className='order-info'>
        <div className='order-info__hotel-images'>
          <div className='order__slider__fotorama'>
            {this.getImages().map(image => (<img key={image} src={image}/>))}
          </div>
        </div>
        <div className='order-info__hotel-info'>
          <div className='order-info__hotel-info__base'>
            <h2 className='order-info__hotel-name'>{hotelData.key}</h2>
            <div className='order-info__hotel-info__stars'>
              <Stars count={hotelData.stars} size='middle' color='blue' />
            </div>

            <div className='order-info__location'>
              <div className='order-info__location__mark'></div>
              <div className='order-info__location__text'>
                {this.location()}
              </div>
            </div>
            <div className='order-info-separator'></div>
          </div>
          <div className='order-info__hotel-info__separator'></div>
          <div className='order-info__hotel-info__addition'>
            <DateRangeBadge from={startDate} to={endDate} nights={numberOfNights} />
            <span className='order-info-addition__text order-info-addition__text--mobile-hidden'>
              <span className='order-info-addition__title'>Время размещения:&nbsp;</span>
              {numberOfNights} (c {tourData.dateFrom} по {tourData.dateTo})
            </span>
            <span className='order-info-addition__text'>
              <span className='order-info-addition__title'>Кто едет:&nbsp;</span>
              {participants}
            </span>
            <span className='order-info-addition__text'>
              <span className='order-info-addition__title'>Номер:&nbsp;</span>
              {tourData.roomName}
            </span>
            <span className='order-info-addition__text'>
              <span className='order-info-addition__title'>Питание:&nbsp;</span>
              {tourData.mealName}
            </span>
          </div>
          <div className='order-info__hotel-review'>
            {this.cardMark()}
          </div>
        </div>
        {/* <Routes routes={routes} /> */}
      </div>
    );
  }
}
