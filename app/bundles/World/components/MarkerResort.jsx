/* eslint max-len: 0 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

const MarkerResort = ({ lat, lng, children, onClick, modifiers }) => {
  const fillColor = '#15981c';

  return (
    <div className={classNames('marker marker--resort', modifiers.map(modifier => `marker--${modifier}`))} onClick={onClick}>
      <svg viewBox='0 0 49 64' xmlns='http://www.w3.org/2000/svg'>
        <g fill='none' fillRule='evenodd'>
          <path className='marker__circle' d='M24.45 39.767c-8.65 0-15.663-6.943-15.663-15.507 0-8.563 7.012-15.507 15.662-15.507 8.65 0 15.663 6.944 15.663 15.507 0 8.564-7.013 15.507-15.663 15.507z' fill={fillColor} opacity='0.5'/>
        </g>
      </svg>
      {children}
    </div>
  );
};

MarkerResort.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  visible: PropTypes.bool,
};

export default MarkerResort;
