import React from 'react';
import declOfNums from '../../../utils/declOfNum';
import Loader from './AviaFlightsLoader'

const AviaFlightHeaderComponent = props => {
  console.log(props)
  const ticketsSize = props.tickets.size;
  const ticketsTitles = ['вариант', 'варианта', 'вариантов'];
  const transitionTitle = 
  <span className='progress__search'>
    {`Найдено `}
      <span className='progress__search__value'>
        {`${ticketsSize} `}
      </span> 
      {declOfNums(ticketsSize, ticketsTitles)}
  </span>

  const departureLib = {
    832: 'Москва',
    1264: 'Санкт-Петербург'
  }
  
  ;
  console.log('props =>', props)
  return (
    <div className='avia-search-page__content__head'>
      <div className='avia-search-page__content__head__left'>
        <div className='avia-search-page__content__head__title'>{departureLib[props.defaultSearchParams
._root.entries[5][1]]} - {props.destination.label}</div>
        <div className='avia-search-page__content__head__search-result'>{transitionTitle}</div>
        <Loader /> 
      </div>
      <div className='avia-search-page__content__head__right'></div>
    </div>
  );
};

export default AviaFlightHeaderComponent;
