import React, { Component } from 'react';
import AirSegmentsGroup from './AirSegmentsGroup.jsx';
import { map } from 'lodash';

export default class AviaFlights extends Component {
  render() {
    console.log('%c Rerender TicketsList! ', 'background: #333; color: yellow');
    const { tickets, ticketsAreLoading, ticketsLoadedSuccess } = this.props;
    const ticketsLoadedAndEmpty = ticketsLoadedSuccess && tickets.size == 0;
    const flightsGroup = map(tickets.toArray(), (ticket, index) => {
      return <AirSegmentsGroup key={`${ticket.toString()}_${index}`} ticket={ticket} />
    });

    return (
      <div>
        { ticketsLoadedAndEmpty && (
          <div className="avia-search-page__content__result--empty">
            <div className="avia-search-page__content__result--empty__sad"></div>
            <div className="avia-search-page__content__result--empty__text">К сожалению ничего не найдено, попробуйте изменить параметры поиска</div>
          </div>
        )}

        { ticketsAreLoading && (
          <div className="avia-search-page__content__result--loading"></div>
        )}

        {flightsGroup}
      </div>
    );
  };
};
