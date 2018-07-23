import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const CardCityItem = ({ city, onCityHover, isMinPrice, locationQueriesString }) => {
  const handleCityHover = () => onCityHover(city.id);

  return (
    <Link
      key={`city_${city.id}`}
      to={{
        pathname: `/search/city/${city.id}`,
        search: locationQueriesString,
      }}
    >
      <div
        onMouseEnter={handleCityHover}
        className={classNames(
          'geo-card__city',
          { 'geo-card__city--min': (isMinPrice) }
        )}
      >
        <div className='geo-card__city-name'>{city.key}</div>
        <div className='geo-card__city-price'>от {city.minPrice} р.</div>
      </div>
    </Link>
  );
};

export default CardCityItem;
