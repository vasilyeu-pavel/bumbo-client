/* eslint max-len: 0 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Marker = ({ lat, lng, children, onClick, modifiers }) => {
  const fillColor = '#15981c';

  return (
    <div className={classNames('marker', modifiers.map(modifier => `marker--${modifier}`))} onClick={onClick}>
      <svg viewBox='0 0 49 64' xmlns='http://www.w3.org/2000/svg'>
        <g fill='none' fillRule='evenodd'>
          <path className='marker__inner' d='M.955 24.26a23.003 23.003 0 0 0 4.688 13.944L24.45 63.027l18.806-24.823a23.002 23.002 0 0 0 4.688-13.944C47.943 11.415 37.423 1 24.45 1S.955 11.415.955 24.26z' stroke='#FFF' strokeWidth='2' fill={fillColor}/>
          <path className='marker__circle' d='M24.45 39.767c-8.65 0-15.663-6.943-15.663-15.507 0-8.563 7.012-15.507 15.662-15.507 8.65 0 15.663 6.944 15.663 15.507 0 8.564-7.013 15.507-15.663 15.507z' fill='#FFF'/>
        </g>
      </svg>
      {children}
    </div>
  );
};

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  visible: PropTypes.bool,
};

export default Marker;
