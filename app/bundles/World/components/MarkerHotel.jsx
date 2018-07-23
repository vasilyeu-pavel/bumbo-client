/* eslint max-len: 0 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

const MarkerHotel = ({ lat, lng, children, onClick, modifiers, minPrice, hovered }) => {
  let fillColor = '#424242';
  let mods = modifiers || [];

  if (hovered) {
    fillColor = '#ff9c00';
    mods = [...modifiers, 'on-focus'];
  }

  return (
    <div
      className={classNames('marker marker--hotel', mods.map(modifier => `marker--${modifier}`))}
      onClick={onClick}
    >
      <div className='marker__price'>
        {minPrice}
      </div>
      <svg x='0px' y='0px' viewBox='0 0 70 40' enableBackground='new 0 0 70 40'>
        <path className='marker__bg' fillRule='evenodd' clipRule='evenodd' fill={fillColor} d='M67,0H3C1.34314,0,0,1.34314,0,3v27c0,1.65686,1.34314,3,3,3h3v7 l7-7h54c1.65686,0,3-1.34314,3-3V3C70,1.34314,68.65686,0,67,0z'/>
      </svg>
      {children}
    </div>
  );
};

MarkerHotel.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  minPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  visible: PropTypes.bool,
};

export default MarkerHotel;
