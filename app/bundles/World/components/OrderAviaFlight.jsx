import React, { Component } from 'react';
import { bindAll } from 'lodash';

export default class OrderAviaFlight extends Component {
  constructor(props, context) {
    super(props, context);

    bindAll(this, [
      'firstFlight',
      'secondFlight',
      'flightNumberText',
      'flightTitle',
      'flightRouteForTitle',
      'departureTime',
      'arrivalTime',
    ]);

    this.state = {
      isOpen: false
    }
  }

  firstFlight() {
    return this.props.flights[0];
  }

  secondFlight() {
    return this.props.flights[1];
  }

  flightNumberText(flight) {
    //рейс
    return `${flight.flight}`;
  }

  flightTitle() {
    const titlePrefix = this.props.flightTo ? 'Туда' : 'Обратно';

    return `${titlePrefix}`;
  }

  flightRouteForTitle() {
    const [firstFlight, secondFlight] = [this.firstFlight(), this.secondFlight()];

    let flightRoute = `${firstFlight.cityFrom} - ${firstFlight.cityTo}`;

    if (secondFlight) {
      flightRoute = `${flightRoute} - ${secondFlight.cityTo}`;
    }

    return flightRoute;
  }

  departureTime(flight) {
    return `Вылет в ${flight.startTime}, ${flight.startDate}`;
  }

  arrivalTime(flight) {
    return `Прилет в ${flight.endTime}, ${flight.endDate}`;
  }

  fligthLength(flight) {
    let firstDate = flight.startTime;
    let secondDate = flight.endTime;
    let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
    let different = (getDate(secondDate) - getDate(firstDate));
    let differentRes, hours, minuts;
    if(different > 0) {
      differentRes = different;
      hours = Math.floor((differentRes % 86400000) / 3600000);
      minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
    } else {
      differentRes = Math.abs((getDate(firstDate) - getDate(secondDate)));
      hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
      minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
    }
    let result = `${hours}ч${minuts}м`;
    return result
  }

  handleOpen = () => {
    const {isOpen} = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    const [firstFlight, secondFlight] = [this.firstFlight(), this.secondFlight()];
    const {isOpen} = this.state 

    console.log(secondFlight)
    return (
      <div className='order-page__flight'>
        <div className='order-page__flight__title'>
          <div className='order-page__flight__title__content'>{this.flightTitle()}</div>
        </div>
        <div className='order-page__flight__table__title'>
          <div className='order-page__flight__table__title__element'>Вылет</div>
          <div className='order-page__flight__table__title__element'>Прилет</div>
          <div className='order-page__flight__table__title__element'>Рейс</div>
          <div className='order-page__flight__table__title__element'>В пути</div>
        </div>
        <div className='order-page__flight__info'>
          <div className='order-page__flight__info__group' style={{ flex: 2.5 }}>
            <div className='order-page__flight__info__group__top'>{this.departureTime(firstFlight)}</div>
            <div className='order-page__flight__info__group__bottom'>{firstFlight.cityFrom}({firstFlight.airportFrom})</div>
          </div>
          <div className='order-page__flight__info__group'>
            <div className='order-page__flight__info__group__top'>{this.arrivalTime(firstFlight)}</div>
            <div className='order-page__flight__info__group__bottom'>{firstFlight.cityTo}({firstFlight.airportTo})</div>          
          </div>
          <div className='order-page__flight__info__group'>
            <div className='order-page__flight__info__group__top'>{this.flightNumberText(firstFlight)}</div>
          </div>
          <div className='order-page__flight__info__group'>
            <div className='order-page__flight__info__group__top'>{this.fligthLength(firstFlight)}</div>
          </div>
        </div>
        { secondFlight ? <div className='order-page__flight__second__text' onClick = {this.handleOpen}>1 пересадка</div> : null}
        {
          isOpen ?
            <div className='order-page__flight__info'>
              <div className='order-page__flight__info__group' style={{ flex: 2.5 }}>
                <div className='order-page__flight__info__group__top'>{this.departureTime(secondFlight)}</div>
                <div className='order-page__flight__info__group__bottom'>{secondFlight.cityFrom}({secondFlight.airportFrom})</div>
              </div>
              <div className='order-page__flight__info__group'>
                <div className='order-page__flight__info__group__top'>{this.arrivalTime(secondFlight)}</div>
                <div className='order-page__flight__info__group__bottom'>{secondFlight.cityTo}({secondFlight.airportTo})</div>          
              </div>
              <div className='order-page__flight__info__group'>
                <div className='order-page__flight__info__group__top'>{this.flightNumberText(secondFlight)}</div>
              </div>
              <div className='order-page__flight__info__group'>
                <div className='order-page__flight__info__group__top'>{this.fligthLength(secondFlight)}</div>
              </div>
            </div>

        :
        null 
        }
      </div>
    );
  }
}
