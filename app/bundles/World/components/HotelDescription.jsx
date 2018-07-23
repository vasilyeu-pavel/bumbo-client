import React, { PropTypes, Component } from 'react';
import HotelReviews from './HotelReviews';
import Stars from './common/Stars';
import { List, Map } from 'immutable';

export default class HotelDescription extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    video: PropTypes.string,
    rate: PropTypes.number,
    ratingPlace: PropTypes.number,
    ratingMeal: PropTypes.number,
    ratingService: PropTypes.number,
    hotelReviews: PropTypes.instanceOf(List),
    humanStarCount: PropTypes.number,
    hotelFacilities: PropTypes.instanceOf(Map),
    hotel: PropTypes.instanceOf(Map),
    hotelDescription: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);

    const receiveMessage = (b) => {
      const a = document.getElementById('hotelDescriptionID');
      a.style.height = b.data + "px";
    };

    if (window.addEventListener) {
      window.addEventListener('message', receiveMessage, false);
    } else {
      window.attachEvent('onmessage', receiveMessage);
    }
  }

  hotelRates() {
    const {
      name,
      rate,
      ratingPlace,
      ratingMeal,
      ratingService,
      hotelReviews,
    } = this.props;

    if (!rate && !ratingPlace && !ratingMeal && !ratingService) return '';

    return (
      <div>
        <div className='description__review__title title'>Рейтинг и отзывы об отеле {name}</div>
        <HotelReviews
          rate={rate}
          ratingPlace={ratingPlace}
          ratingMeal={ratingMeal}
          ratingService={ratingService}
          hotelReviews={hotelReviews}
        />
      </div>
    );
  }

  hotelAdditionalInfo = (additionalInfo) => {
    const hotelInfoKeys = {
      site: 'Сайт отеля',
      phone: 'Телефон',
      video: 'Ссылка на видео',
      email: 'Email',
      square: 'Площадь отеля',
      street: 'Улица',
      address: 'Адрес',
      postIndex: 'Индекс',
      renovation: 'Дата реконструкции',
      roomsCount: 'Количество номеров',
      buildingDate: 'Дата постройки',
      nativeAddress: 'Адрес на языке страны отеля',
      airportDistance: 'Расстояние до аэропорта',
      distanceToLifts: 'Расстояние до подъемников',
      cityCenterDistance: 'Расстояние до центра города',
    };

    const makeInfo = (key) => {
      if (key === 'site' || key === 'video') {
        return <a href={additionalInfo[key]} target='_blank'>{additionalInfo[key]}</a>
      }
      
      if (key === 'email') {
        const mailProp = `mailto:${additionalInfo[key]}`;
        return <a href={mailProp}>{additionalInfo[key]}</a>
      }

      return additionalInfo[key];
    }

    return (
      <div className='hotel__additional-info'>
        {Object.keys(additionalInfo).map(key => {
          if (additionalInfo[key]) {
            return (
              <div className='hotel__additional-info-item'>
                <span className='hotel__additional-info-field'>{hotelInfoKeys[key]}</span>: {makeInfo(key)}
              </div>
            );
          }
          return '';
        })}
      </div>
    );
  };

  render() {
    const {
      id,
      name,
      video,
      humanStarCount,
      hotelFacilities,
      hotel,
    } = this.props;

    const additionalInfo = {
      site: hotel.get('site'),
      phone: hotel.get('phone'),
      video: hotel.get('video'),
      email: hotel.get('email'),
      square: hotel.get('square'),
      street: hotel.get('street'),
      address: hotel.get('address'),
      postIndex: hotel.get('postIndex'),
      renovation: hotel.get('renovation'),
      roomsCount: hotel.get('roomsCount'),
      buildingDate: hotel.get('buildingDate'),
      nativeAddress: hotel.get('nativeAddress'),
      airportDistance: hotel.get('airportDistance'),
      distanceToLifts: hotel.get('distanceToLifts'),
      cityCenterDistance: hotel.get('cityCenterDistance'),
    };

    return (
      <div className='description'>
        <div className='inner-hotel-page'>
          <a
            className='description__review__anchor-link'
            id='description__review'
            name='description__review'
          ></a>

          <a className='hotel-description' id='hotel-description' name='hotel-description'></a>

          <div className='description__title title'>
            Описание отеля {name}
            <div className='description__title__rating'>
              <Stars count={humanStarCount} color='orange' size='huge'/>
            </div>
          </div>

          <div className='description__services'>
            {hotelFacilities.map((facilities, facilityGroupName) => (
              <div key={facilityGroupName} className='service'>
                <div className='service__top'>
                  <div className='service__top__icon'></div>
                  <div className='service__top__title'>{facilityGroupName}</div>
                </div>
                {facilities.map((item, index) => (
                  <div key={item.get('name')} className='service__item'>{item.get('name')}</div>
                ))}
              </div>
            ))}
          </div>
          {this.hotelAdditionalInfo(additionalInfo)}
          <div className='description__text'>
            <iframe
              id='hotelDescriptionID'
              src={`https://hotels.sletat.ru/hotel_desc/?id=${id}&cssStylesheet=https://jamm.travel/hotel_desc.css`}
            >
            </iframe>
          </div>
          {video && (
              <div className='description__video'>
                <div className='description__video__title title'>Видео о {name}</div>
                <iframe
                  width='800'
                  height='480'
                  src={video}
                  allowFullScreen={true}
                  frameBorder='0'
                ></iframe>
              </div>
            )
          }
          {this.hotelRates()}
        </div>
      </div>
    );
  }
}
