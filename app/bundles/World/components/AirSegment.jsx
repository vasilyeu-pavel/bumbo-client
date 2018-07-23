import React from 'react';
import moment from 'moment';
import declOfNums from '../utils/declOfNum';

const AirSegment = ({ flight, transitionsCount, departure }) => {
  const DATE_FORMAT = 'DD.MM.YYYY';
  const TIME_FORMAT = 'hh:mm';
  const { startTime, endTime, startDate, endDate } = flight;
  const flightTimeMilliseconds = moment(endTime, TIME_FORMAT).diff(moment(startTime, TIME_FORMAT));
  const flightTimeHours = moment.utc(flightTimeMilliseconds).format('H');
  const flightTimeMinutes = moment.utc(flightTimeMilliseconds).format('mm');
  const transitionsTitles = ['пересадка', 'пересадки', 'пересадки'];
  const transitionTitle = `${transitionsCount} ${declOfNums(transitionsCount, transitionsTitles)}`;

  return (
    <div style={{ display: 'flex' }}>
      <div className='air-segment__main'>
        <div className='air-segment__info'>
          {/* <div className='air-segment__airline'><img src='/images/aeroflot.png' alt=''/></div> */}
          <div>{departure ? 'Туда ' : 'Обратно '} &mdash;&nbsp;</div>
          <div className='air-segment__airline'>{flight.airline}</div>
          <div className='air-segment__flight-number'>{flight.flight}</div>
          <div>,&nbsp;{departure ? 'самолет Boeing 737-800 ' : 'самолет Boeing 737-800'}</div>
        </div>
        <div className='air-segment'>
          <div className='air-segment__flight'>
            <div className='air-segment__time'>{flight.startTime}</div>
            <div className='air-segment__date'>{startDate}</div>
            <div className='air-segment__location'>
              {flight.cityFrom}&nbsp;
              <span className='air-segment__location-code'>{flight.airportFromIata}</span>
            </div>
          </div>
          <div className='air-segment__transfer'>
            <div className='air-segment__transfer-time'>
            </div>
            {transitionsCount >= 1 && (
              <div className='air-segment__transfer-count'>{transitionTitle}</div>
            )}
          </div>
          <div className='air-segment__flight'>
            <div className='air-segment__time'>{flight.endTime}</div>
            <div className='air-segment__date'>{endDate}</div>
            <div className='air-segment__location'>
              {flight.cityTo}&nbsp;
              <span className='air-segment__location-code'>{flight.airportToIata}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='air-segment__additional'>
        <div className='air-segment__additional-item'>
            <span className='air-segment__additional-label'>Багаж&nbsp;</span>
            <span className='air-segment__additional-text'>
              {departure ? '20 кг + ручная кладь' : '30 кг + ручная кладь'}
            </span>
            <div className='air-segment__additional-label'>
              {departure ? 'Осталось 10 мест' : 'Осталось 20 мест'}
            </div>
            <div className='air-segment__additional-label'>Эконом-класс</div>
        </div>
      </div>
    </div>
  );
};


AirSegment.propTypes = {
};

export default AirSegment;
