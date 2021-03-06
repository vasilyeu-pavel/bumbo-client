import React, { PropTypes } from 'react';

const HotelReview = props => (
  <div className='hotel-reviews'>
    {props.reviewCount !== 0 && props.reviewCount !== '0' &&
      <div>
        <div className='hotel-reviews__icon'>
          <svg width='42' height='38' viewBox='0 0 42.08301 38.29297'>
            <path clipRule='evenodd' fill='none' d='M8 34.506c0 .987-.8 1.787-1.787 1.787H2.787c-.987 0-1.787-.8-1.787-1.787V19.08c0-.987.8-1.787 1.787-1.787h3.426c.987 0 1.787.8 1.787 1.787v15.426z'></path><path fill='none' d='M18.894 8.386c1.06-2.485.785-4.442.958-5.22.172-.777.323-2.366 2.303-2.28 1.982.086 3.118 1.618 3.003 5.032-.07 2.023-.43 4.832-2.31 7.597-.878 1.29 2.058 1.625 2.458 1.625l13.015-.005c1.62 0 2.904.877 2.904 2.504 0 1.873-.007 1.043-.007 1.06 0 .8-.2.968-.754 1.74-.208.29-1.26.705-1.45.77-1.482.497-1.556.3-.34 1.04.31.19.746.62.746 1.55 0 .945-.015.84-.015 1.35 0 .61-.457 1.05-.77 1.43-.327.39-1.348.52-1.67.594-.495.116-.75.193-.14.593.512.334.845.784.845 1.35 0 .823-.008-.086-.008 1.097 0 .962-.53 1.178-.742 1.344-.316.243-1.41.592-1.84.663-.802.133-.42.32.11.66.285.186.614.44.614 1.05 0 .442.038.9-.11 1.436-.335 1.21-1.588 1.25-2.18 1.25-2.37 0-8.593-.007-10.324-.007-2.402 0-8.53.13-12.335-.117.01-.147-.188-19.303.015-19.453 4.092-2.153 6.43-4.924 8.024-8.654z'></path>
          </svg>
        </div>
        <div className='hotel-reviews__value'>
          {props.hotelRate}
        </div>
      </div>
    }
    {props.reviewCount > 0 && <p className='hotel-reviews__text'>
      {props.reviewCount} отзывов
    </p>}
  </div>
);


HotelReview.propTypes = {
  reviewCount: PropTypes.number,
  hotelRate: PropTypes.number.isRequired,
};

export default HotelReview;
