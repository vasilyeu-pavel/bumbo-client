import React, { PropTypes, Component } from 'react';
import SearchHotelTourContainer from '../containers/SearchHotelTourContainer';
import RangeSlider from '../components/RangeSlider';
import _ from 'lodash';

export default class HotelToursFilter extends Component {
  constructor(props, context) {
    super(props, context);
  }

  rangeSettings() {
    const { toursFilters, updateHotelToursFilter } = this.props;
    const price = toursFilters.get('price');

    return {
      type: 'double',
      min: price.get('min'),
      max: price.get('max'),
      from: price.get('from'),
      to: price.get('to'),
      hide_min_max: true,
      force_edges: true,
      onFinish(data) {
        updateHotelToursFilter('price', _.pick(data, ['from', 'to']));
      },
    };
  }

  discountSettings() {
    const { toursFilters, updateHotelToursFilter } = this.props;
    const discount = toursFilters.get('discount');

    return {
      type: 'double',
      min: discount.get('min'),
      max: discount.get('max'),
      from: discount.get('from'),
      to: discount.get('to'),
      hide_min_max: true,
      force_edges: true,
      postfix: '%',
      onFinish(data) {
        updateHotelToursFilter('discount', _.pick(data, ['from', 'to']));
      },
    };
  }

  render() {
    const { hotelName, toursAreLoading, toursLoadedSuccess, count } = this.props;

    return (
      <div className='tours__filter tours-list__filter'>
        {toursLoadedSuccess && (<SearchHotelTourContainer />)}
        {toursLoadedSuccess && (
          <div className='tours__filter-line'>
            <div className='tours__filter-range tours__filter-range--price'>
              <div className='tours__filter-range-label'>Стоимость туров</div>
              <div className='tours__filter-range-input'>
                <RangeSlider
                  settings={this.rangeSettings()}
                  name='price-range'
                  className='tours__filter-range-price-js tours__filter-range-input--price'
                />
              </div>
            </div>

            <div className='tours__filter-range tours__filter-range--discount'>
              <div className='tours__filter-range-label'>Туры со скидкой</div>
              <div className='tours__filter-range-input'>
                <RangeSlider
                  settings={this.discountSettings()}
                  name='discount-range'
                  className='tours__filter-range-discount-js tours__filter-range-input--discount'
                />
              </div>
            </div>

            {/* <div className='tours__filter-select tours__filter-select--tour-operator'>
              {= select_tag 'ops', options_for_select(SletatTourOperator.active.map { |op| [op.name, op.sletat_tour_operator_id] }.to_h ), class: 'tours__filter-select-operator-js', multiple: 'multiple'}
            </div> */}

            {toursLoadedSuccess && <div className='tours__count'><span>{count}</span> туров</div>}
          </div>

        )}

        {toursAreLoading && (
          <div className='statusbar--hotel-page'>
            <span className='statusbar__text'>Догружаем туры в {hotelName}</span>
          </div>
        )}
      </div>
    );
  }
}
