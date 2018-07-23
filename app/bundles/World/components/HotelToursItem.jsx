import React, { PropTypes, Component } from 'react';
import { convertKeysToSnakeCase } from '../utils/case';
import { fromObjToLinkParams } from '../utils/links';
import moment from 'moment';
import _ from 'lodash';

export default class HotelToursItem extends Component {
  static propTypes = {
    rate: PropTypes.number,
  }

  constructor(props, context) {
    super(props, context);
  }

  getRateIcon() {
    const { rate } = this.props.tour;

    if (rate >= 4) {
      return (<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><g fill='#C3BEB1'><path d='M7 9.5c.965 0 1.75-.785 1.75-1.75S7.965 6 7 6s-1.75.785-1.75 1.75S6.035 9.5 7 9.5zm0-2a.25.25 0 0 1 .25.25c0 .276-.5.276-.5 0A.25.25 0 0 1 7 7.5z'/><path d='M10 0C4.486 0 0 4.486 0 10c0 5.515 4.486 10 10 10s10-4.485 10-10c0-5.514-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z'/><path d='M10 14a3.973 3.973 0 0 1-3.2-1.598l-1.597 1.204A5.956 5.956 0 0 0 10 16a5.952 5.952 0 0 0 4.8-2.399L13.2 12.4A3.968 3.968 0 0 1 10 14zM11 7h4v2h-4z'/></g></svg>);
    } else if (rate < 2.4) {
      return (<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='#C3BEB1' d='M9.999 13.2a3.973 3.973 0 0 0-3.2 1.597l-1.597-1.203A5.956 5.956 0 0 1 9.999 11.2c1.905 0 3.654.874 4.8 2.399l-1.6 1.201a3.968 3.968 0 0 0-3.2-1.6z'/><path fill='#C3BEB1' d='M10 0C4.486 0 0 4.486 0 10c0 5.515 4.486 10 10 10s10-4.485 10-10c0-5.514-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z'/><path fill='#C3BEB1' d='M6 6h2v3H6zM12 6h2v3h-2z'/></svg>);
    }

    return (<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><g fill='#C3BEB1'><path d='M10 0C4.486 0 0 4.486 0 10c0 5.515 4.486 10 10 10s10-4.485 10-10c0-5.514-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z'/><path d='M6 13h8v2H6zM6 6h2v3H6zM12 6h2v3h-2z'/></g></svg>);
  }

  getDayOfTheWeek(date) {
    const mmddyy = date.split('.');
    const ddmmyy = `${mmddyy[1]}.${mmddyy[0]}.${mmddyy[2]}`;

    return moment(new Date(ddmmyy)).format('dd');
  }

  renderDate() {
    const { dateFrom, dateTo } = this.props.tour;

    return (
      <div className='tour__date'>
        {dateFrom.slice(0, 5)}
        <span> {this.getDayOfTheWeek(dateFrom)} - </span>
        {dateTo.slice(0, 5)}
        <span> {this.getDayOfTheWeek(dateTo)}</span>
        {/* <a className='tour__date-link' href='>Уточнить авиаперелет</a> */}
      </div>
    );
  }

  getFormattedIntInCurrency(val) {
    const $currency = 'BYR';
    let value = val;
    // currency

    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 ');
  }

  orderTourLink() {
    const baseLink = '/hotel/order_tours/new?';
    const tourParams = convertKeysToSnakeCase(this.props.tour);

    return baseLink + fromObjToLinkParams(tourParams);
  }

  calculatePriceBeforeDiscount() {
    const { price, discount } = this.props.tour;

    return this.getFormattedIntInCurrency(Math.round(price + (price * discount / 100)));
  }

  formatCurrency() {
    const { price } = this.props.tour;

    return this.getFormattedIntInCurrency(price);
  }

  countPeopleInTours() {
    return 2;
  }

  renderPrice() {
    const { discount, currency } = this.props.tour;

    if (discount) {
      return (
        <div className='tour__price'>
          <div className='tour__price__discount'>
            <span>{this.calculatePriceBeforeDiscount()}</span> <b>-{discount} %</b>
          </div>
          <br />
          <div className='tour__price__main tour__price__main--discount'>
            <span> {this.formatCurrency()} {currency}</span>
            <div className='tour__price__popup'>
              <div className='popup'>
                <div className='popup__arrow'></div>
                <div className='popup__inner'>
                  <div className='popup__title'>Цены на тур за весь период</div>
                  <div className='popup__content'><div id='chartdiv'></div></div>
                </div>
              </div>
            </div>
          </div>
          <span className='tour__price__people'>на {this.countPeopleInTours()} человек</span>
        </div>
      );
    }

    return (
      <div className='tour__price'>
        <div className='tour__price__main'>
          {this.formatCurrency()} {currency}
        </div>
        <span className='tour__price__people'>на {this.countPeopleInTours()} человек</span>
      </div>
    );
  }

  renderLiceIcon() {
    return (
      <svg version='1.1' id='Слой_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 15 13' enableBackground='new 0 0 15 13'>
        <g>
          <path className='heart-line' fillRule='evenodd' clipRule='evenodd' fill='#898480' d='M13.68921,1.3017
          c-2.21875-2.19647-4.41785-1.23633-6.17932,0.33026C5.74878,0.06537,3.56738-0.91241,1.33112,1.3017
          c-1.74304,1.7254-1.75244,4.49756,0,6.21399c6.1601,5.48657,6.15869,5.47607,6.15869,5.47607s0.00867,0.01843,6.1994-5.47607
          C15.44147,5.79926,15.43237,3.0271,13.68921,1.3017z M13.03027,6.77258c-3.3053,2.89319-4.83167,4.43909-5.53546,5.0484
          c-0.70642-0.61853-2.23474-2.17621-5.53754-5.07831c-0.63129-0.61127-0.99786-1.46259-1.00037-2.3681
          C0.95428,3.45929,1.32239,2.59436,1.99316,1.93945c0.69464-0.67834,1.37732-1.008,2.0874-1.008
          c0.82611,0,1.7691,0.4599,2.80292,1.36755l0.6261,0.5495l0.62628-0.54926c1.02832-0.90295,1.97284-1.36096,2.8067-1.36096
          c0.71265,0,1.39423,0.32788,2.08405,1.00116c0.67059,0.65491,1.03876,1.51984,1.0365,2.43512
          C14.06049,5.27966,13.69397,6.13141,13.03027,6.77258z'/>
        </g>
        <g>
          <path className='heart-fill' fill='none' d='M13.68921,1.3017c-2.21875-2.19647-4.41785-1.23633-6.17932,0.33026
          C5.74878,0.06537,3.56738-0.91241,1.33112,1.3017c-1.74304,1.7254-1.75244,4.49756,0,6.21399
          c6.1601,5.48657,6.15869,5.47607,6.15869,5.47607s0.00867,0.01843,6.1994-5.47607
          C15.44147,5.79926,15.43237,3.0271,13.68921,1.3017z'/>
        </g>
      </svg>
    );
  }

  renderOilDuty() {
    const { oilDuty } = this.props.tour;

    if (!!oilDuty) {
      return ', топливный сбор ' + oilDuty + '$';
    }

    return '. Топливный сбор отсутствует';
  }

  render() {
    const {
      rate,
      nights,
      roomName,
      htPlaceDescription,
      tourHash,
      operatorLogo,
      dateFrom,
      dateTo,
      localMealName,
    } = this.props.tour;

    return (
      <div className='tour'>

        <div className='tour__rate'>
          {rate}&nbsp;
          <div className='tour__rate-icon'>
            {this.getRateIcon()}
          </div>
        </div>

        <div className='tour__operator'><img src={operatorLogo} /></div>

        {this.renderDate()}

        <div className='tour__time'>{nights} ночей</div>

        <div className='tour__rooms'>{roomName}<p>{htPlaceDescription}</p></div>

        <div className='tour__food'>{localMealName}</div>

        {this.renderPrice()}

        <a href={this.orderTourLink()} target='_blank' className='tour__action'>Подробнее</a>
        <div className='tour__info'>
          Включены питание, перелеты, проживание, трансфер до отеля, страховка{this.renderOilDuty()}.
          {/* <a data-tour-params={JSONprops} className='tour__condition'>Все условия</a> */}
          <div className='tour__favorite'>{this.renderLiceIcon()} В избранное</div>
        </div>
        <div className='tour__order-info'></div>
      </div>
    );
  }
}
