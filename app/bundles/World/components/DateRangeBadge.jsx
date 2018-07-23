import React, { PropTypes } from 'react';

const DateRangeBadge = ({ from, to, nights }) => (
  <div className='date-range-badge'>
    <div className='date-range-badge__from'>{from.format('DD.MM ddd')}.</div>
    <div className='date-range-badge__nights'>{nights}</div>
    <div className='date-range-badge__to'>{to.format('DD.MM ddd')}.</div>
  </div>
);

DateRangeBadge.propTypes = {
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  nights: PropTypes.string.isRequired,
};

export default DateRangeBadge;
