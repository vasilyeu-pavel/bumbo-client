import React, { Component }  from 'react';
import { Tooltip } from 'react-tippy';
import _ from 'lodash';

export default class AviaSearchItemLine extends Component {
  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'transitionContent',
    ]);
  }

  transitionContent() {
    const { transition } = this.props;
    if (transition) {
      return `Пересадка ${transition.date} ${transition.startTime} в городе ${transition.cityFrom}`;
    }
  }

  render() {
    const {
      startTime,
      endTime,
      startDate,
      endDate,
      cityFrom,
      cityTo,
      airportFrom,
      airportTo,
      airline,
    } = this.props.flightData;

    const { flightTo, transition } = this.props;

    return (
      <div className='avia-search-item__row _top'>
        <div className='avia-search-item__cell'>
          <div className='avia-search-item__time'>{startTime}</div>
          <div className='avia-search-item__place'>
            <div style={{flex: '1'}}>{cityFrom}, {airportFrom}</div>
            <span className={'mobile-show ' + (flightTo ? 'avia-search-item__cell__flights-separator-to' : 'avia-search-item__cell__flights-separator-back')}>
            </span>
          </div>
          <div className='avia-search-item__date'>{startDate}</div>
        </div>
        <div className='avia-search-item__cell mobile-skip'>
          <div className='avia-search-item__travel-time'>В пути: 8ч 25м</div>
          <div className='avia-search-item__travel-view'>
            <div className='avia-search-item__travel-view__dott'>
            <div className='avia-search-item__travel-view__dott__mark-start'></div>
            </div>
            <div className = 'avia-search-item__travel-view__line'></div>
            {
              (transition && (
                <Tooltip title={this.transitionContent()} position='right' arrow={true}>
                  <div className='avia-search-item__travel-view__dott-transitions'></div>
                </Tooltip>
              ))
            }
            <div className = 'avia-search-item__travel-view__line'></div>
            <div className='avia-search-item__travel-view__dott'>
            <div className='avia-search-item__travel-view__dott__mark-end'></div>
            </div>
          </div>
        </div>
        <div className='avia-search-item__cell'>
          <div className='avia-search-item__time'>{endTime}</div>
          <div className='avia-search-item__place'>
            <div>{cityTo}, {airportTo}</div>
          </div>
          <div className='avia-search-item__date'>{endDate}</div>
        </div>
        {/*<div className='avia-search-item__cell'>
          {airline}
        </div>*/}
      </div>
    );
  }
}
