import React, { PropTypes } from 'react';
import classNames from 'classnames';

const CardTour = ({ name, price, hot }) => (
  <div className={classNames('card-tour', { 'card-tour--hot': hot })}>
    <div className='card-tour__name'>{name}</div>
    <div className='card-tour__price'>{price}</div>
  </div>
);

CardTour.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  hot: PropTypes.bool,
};

export default CardTour;
