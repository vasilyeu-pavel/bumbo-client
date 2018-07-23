import Button from './common/Button/Button.jsx';
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const CardCountry = ({ id, country, photo, text, onClick }) => (
  <Link to={{ pathname: `/search/country/${id}`, state: { country_id: id } }}>
    <div
      className='geo-card'
      style={{ backgroundImage: `url(${`/images/countries/${id}.jpeg`})` }}
      onClick={onClick}
    >
      <div className='geo-card__title'>{country}</div>
      <div className='geo-card__button'>
        <Button color='orange' modifiers={['rounded']}>{text}</Button>
      </div>
      <div className='geo-card__overlay'></div>
    </div>
  </Link>
);


CardCountry.propTypes = {
  country: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CardCountry;
