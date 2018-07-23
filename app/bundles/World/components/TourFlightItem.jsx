import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import TourFlightLabel from './TourFlightLabel';

export default class TourFlightItem extends Component {
  static propTypes = {
    flightData: PropTypes.array,
    backFlight: PropTypes.bool,
    checkin: PropTypes.string,
    tourInfo: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const { flightData } = props;

    if (!!flightData && flightData.length > 2) {
      this.state = {
        hasTransfer: true,
        showTransfer: false,
      };
    }

    if (!!flightData && flightData.length <= 2) {
      this.state = {
        hasTransfer: false,
      };
    }

    _.bindAll(this, ['toggleTransfer']);
  }

  toggleTransfer() {
    this.setState({
      showTransfer: !this.state.showTransfer,
    });
  }

  makeLabel(label) {
    return label.length > 11 ?
    ` ${label.substr(0, 9)}...` :
    ` ${label}`;
  }

  render() {
    const { flightData } = this.props;

    const dptCityName = flightData[0].cityFrom;
    const arrCityName = flightData[0].cityTo;
    let flightWithTransfer = false;

    if (flightData.length > 1) {
      flightWithTransfer = true;
    }

    const renderFlight = () => (
      <div>
        <div className='card__tour-flight card__tour-flight--departure'>
          <div className='card__tour-flight-item'>
            <b>{this.props.flightData[0].date}</b>
          </div>
          <div className='card__tour-flight-item card__tour-flight-item--city'>
            {flightData[0].startTime}
            {this.makeLabel(dptCityName)}
            {`, ${flightData[0].airportFromIata}`}
          </div>
          <div className='card__tour-flight-item card__tour-flight-item--separator' />
          <div className='card__tour-flight-item card__tour-flight-item--city'>
            {flightData[0].endTime}
            {this.makeLabel(arrCityName)}
            {`, ${flightData[0].airportToIata}`}
          </div>
          <div className='card__tour-flight-item card__tour-flight-item--airline'>
            <TourFlightLabel label={`${flightData[0].flight}, ${flightData[0].airline}`}/>
          </div>
        </div>
        <div className='card__tour-footer'>
        </div>
      </div>
    );

    const renderTransfer = () => (
      <div className='card__tour-flight__transfer'>
        <b>{this.props.flightData[0].date}</b>
        <div className='card__tour-flight__transfer-item'>
          <div className='card__tour-flight-item card__tour-flight-item--city'>
            {flightData[0].startTime}
            {` ${flightData[0].cityFrom}`}
            {`, ${flightData[0].airportFromIata}`}
            <div className='card__tour-flight-item card__tour-flight-item--airline'>
              <TourFlightLabel label={`${flightData[0].airline}, ${flightData[0].flight}`}/>
            </div>
          </div>
          <div className='card__tour-flight-item card__tour-flight-item--city'>
            {flightData[0].endTime}
            {` ${flightData[0].cityTo}`}
            {`, ${flightData[0].airportToIata}`}
          </div>
        </div>
        <div className='card__tour-flight__transfer-item'>
          <div className='card__tour-flight-item card__tour-flight-item--city'>
            {flightData[1].startTime}
            {` ${flightData[1].cityFrom}`}
            {`, ${flightData[1].airportFromIata}`}
            <div className='card__tour-flight-item card__tour-flight-item--airline'>
              <TourFlightLabel label={flightData[1].airline}/>
            </div>
          </div>
          <div className='card__tour-flight-item card__tour-flight-item--city'>
            {flightData[1].endTime}
            {` ${flightData[1].cityTo}`}
            {`, ${flightData[1].airportToIata}`}
          </div>
        </div>
      </div>
    );

    const renderFlightWithTransfer = () => (
      <div>
        <div className='card__tour-flight card__tour-flight--departure'>
          <div className='card__tour-flight-item'>
            <b>{this.props.flightData[0].date}</b>
          </div>
          <div className='card__tour-flight-item card__tour-flight-item--city'>
            {flightData[0].startTime}
            {this.makeLabel(dptCityName)}
            {`, ${flightData[0].airportFromIata}`}
          </div>
          <div className='card__tour-flight-item__transfer-button'>
            <span onClick={this.toggleTransfer}>1 пересадка</span>
            {this.state.showTransfer && (renderTransfer())}
          </div>
          <div className='card__tour-flight-item card__tour-flight-item--city'>
            {flightData[1].endTime}
            {this.makeLabel(flightData[1].cityTo)}
            {`, ${flightData[1].airportToIata}`}
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {flightWithTransfer ? renderFlightWithTransfer() : renderFlight()}
      </div>
    );
  }
}
