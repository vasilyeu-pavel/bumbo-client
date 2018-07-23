import React from 'react';
import AsideCardsContainer from '../containers/AsideCardsContainer';
import SearchToursContainer from '../containers/SearchToursContainer';
import WorldMapContainer from '../containers/WorldMapContainer';
import HotelFiltersContainer from '../containers/HotelFiltersContainer';
import classnames from 'classnames';

const MainPage = (props, context) => (
  <div className='landing__content'>
    <div className='landing__filter'>
      <div className='search-tour'>
        <SearchToursContainer query={{}} />
      </div>
      <div className='hotel-filters'>
        <HotelFiltersContainer />
      </div>
    </div>
    <p>{context}</p>
    <div className='landing__world'>
      <div className={classnames('world', { 'world--small': props.cardsGroupByType === 'hotel' })}>
        <div className='world__aside'>
          <AsideCardsContainer query={{}}/>
        </div>
        <div className='world__map'>
          <WorldMapContainer query={{}}/>
        </div>
      </div>
    </div>
  </div>
);

export default MainPage;
