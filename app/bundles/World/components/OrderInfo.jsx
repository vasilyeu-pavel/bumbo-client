import React, { Component, PropTypes } from 'react';
import Slick from 'react-slick';
import Stars from './common/Stars.jsx';
import HotelReview from './HotelReview.jsx';
import DateRangeBadge from './DateRangeBadge.jsx';
import classNames from 'classnames';
import moment from 'moment';
import declOfNums from '../utils/declOfNum';

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

class OrderInfo extends Component {
  render() {
    const { order, isWide } = this.props;

    if (!order) return null;

    const hotelImage = order.hotel_image;
    const hotelName = order.hotel_name;

    const hotelRate = order.hotel_rate;
    const reviewCount = order.reviews_count;
    const participants = order.tour_participants;
    const roomName = order.room_name;
    const mealName = order.meal_name;
    const stars = order.hotel_stars_count;
    const countryWithCityView = order.hotel_address;
    const dateFormat = 'DD.MM.YYYY';
    const startDate = moment(order.tour_date_from, dateFormat);
    const endDate = moment(order.tour_date_to, dateFormat);
    const nightTitles = ['ночь', 'ночи', 'ночей'];
    const countOfNights = endDate.diff(startDate, 'days') - 1;
    const numberOfNights = `${countOfNights} ${declOfNums(countOfNights, nightTitles)}`;

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
          {hotelImage && (
            <div className='order-info__image-container'>
              <Slick ref='slider' {...slickSettings}>
                <img className='order-info__image' src={hotelImage} />
                <img className='order-info__image' src={hotelImage} />
                <img className='order-info__image' src={hotelImage} />
              </Slick>
            </div>
          )}
          <div className='order-info__info'>
            <div className='order-info__base-info'>
              <h2 className='order-info__hotel-name'>{hotelName}</h2>
              <Stars count={stars} size='middle' color='orange' />
              <DateRangeBadge from={startDate} to={endDate} nights={numberOfNights} />
              <span className='order-info__location'>
                <span className='order-info__location-text'>
                  {countryWithCityView}
                </span>
              </span>
            </div>
            <div className='order-info-addition'>
              <span className='order-info-addition__text order-info-addition__text--mobile-hidden'>
                <span className='order-info-addition__title'>Время размещения:&nbsp;</span>
                {numberOfNights} (c {order.tour_date_from} по {order.tour_date_to})
              </span>
              <span className='order-info-addition__text'>
                <span className='order-info-addition__title'>Кто едет:&nbsp;</span>
                {participants}
              </span>
              <span className='order-info-addition__text'>
                <span className='order-info-addition__title'>Номер:&nbsp;</span>
                {roomName}
              </span>
              <span className='order-info-addition__text'>
                <span className='order-info-addition__title'>Питание:&nbsp;</span>
                {mealName}
              </span>
            </div>
            <div className='order-info__hotel-review'>
              <HotelReview hotelRate={hotelRate} reviewCount={reviewCount} />
            </div>
          </div>
        </div>
        {/* <Routes routes={routes} /> */}
      </div>
    );
  }
}

OrderInfo.propTypes = {
  order: PropTypes.object,
};

export default OrderInfo;
