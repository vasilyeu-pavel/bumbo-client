import React, { Component, PropTypes } from 'react';
import Slick from 'react-slick';
import Stars from './common/Stars.jsx';
import HotelReview from './HotelReview.jsx';
import DateRangeBadge from './DateRangeBadge.jsx';
import classNames from 'classnames';
import moment from 'moment';
import includes from 'lodash';
import declOfNums from '../utils/declOfNum';
import Mark from './common/Mark.jsx';

/*
function Routes({ routes }) {
  const rows = routes.map((route, index) => (
    <tr className='order-routes__item' key={index}>
      <td className='order-routes__col-time'>{route.time_from}</td>
      <td className='order-routes__col-date'>{route.date_from}</td>
      <td>{route.city_from}&#160;({route.airport_code_from})</td>
      <td className='order-routes__tere'>&#8212;</td>
      <td className='order-routes__col-travel-time'>{route.travel_time}</td>
      <td className='order-routes__tere'>&#8212;</td>
      <td className='order-routes__col-time'>{route.time_to}</td>
      <td className='order-routes__col-date'>{route.date_to}</td>
      <td>{route.city_to}&#160;({route.airport_code_to})</td>
      <td className='order-routes__separator'>|</td>
      <td className='order-routes__col-carrier'>{route.carrier}&#160;{route.flight_number}</td>
    </tr>
  ));

  return (
    <div className='order-routes'>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}
*/

function Routes({ routes }) {
  const rows = routes.map((route, index) => (
    <tr className='order-routes__item' key={index}>
      <td className='order-routes__col-date'>{route.date_from}</td>
      <td className='order-routes__col-city'>{route.city_from}</td>
       <td className='order-routes__tere'>&#8212;</td>
      <td className='order-routes__col-date'>{route.date_to}</td>
      <td className='order-routes__col-city'>{route.city_to}</td>
    </tr>
  ));

  return (
    <div className='order-routes'>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

Routes.propTypes = {
  routes: React.PropTypes.array,
};

class OrderInfoNew extends Component {
  constructor(props) {
    super(props);
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
    const { isWide, hotelData, tourData } = this.props;

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

    // const routes = [
    //     {
    //       date_from: order.tour_date_from,
    //       city_from: order.tour_depart_city.name,
    //       date_to: order.tour_date_from,
    //       city_to: order.tour_city_go_to_name,
    //     },
    //     {
    //       date_from: order.tour_date_to,
    //       city_from: order.tour_city_go_to_name,
    //       date_to: order.tour_date_to,
    //       city_to: order.tour_depart_city.name,
    //     },
    // ];
    const slickSettings = { arrows: true, lazyLoad: true };

    return (
      <div className={classNames('order-info', { 'order-info--wide': isWide })}>
        <div className='order-info__image-and-info'>
          <div className='order-info__info'>
            <div className='order-info__base-info'>
              <h2 className='order-info__hotel-name'>{hotelData.key}</h2>
              <Stars count={hotelData.stars} size='middle' color='orange' />
              <DateRangeBadge from={startDate} to={endDate} nights={numberOfNights} />
              <span className='order-info__location'>
                <span className='order-info__location-text'>
                  {this.location()}
                </span>
              </span>
            </div>
            <div className='order-info-addition'>
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
        </div>
        {/* <Routes routes={routes} /> */}
      </div>
    );
  }
}

OrderInfoNew.propTypes = {
  tourData: PropTypes.object,
  hotelData: PropTypes.object,
  isWide: PropTypes.bool,
};

export default OrderInfoNew;
