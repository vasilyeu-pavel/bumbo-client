import React, { Component } from 'react';
import OrderAviaFlight from './OrderAviaFlight';

export default class OrderAviaFlights extends Component {
  render() {
    const { flightTo, flightBack } = this.props.flightData;

    return (
      <div>
        <OrderAviaFlight flights={flightTo} flightTo={true} />
        <OrderAviaFlight flights={flightBack} flightTo={false} />
      </div>
    );
  }
}
