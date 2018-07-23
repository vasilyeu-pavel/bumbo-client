import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import InputNumber from './common/InputNumber';
import { bindAll } from 'lodash';
import classNames from 'classnames';
import declOfNums from '../utils/declOfNum';

class ToursFilterVisitTime extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    tabIndex: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    dateRange: PropTypes.number.isRequired,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
  }

  constructor(props, context) {
    super(props, context);

    this.state = { active: false, overlay: false };

    bindAll(this, [
      'handleOverlayClick',
      'handleItemFocus',
      'handleItemBlur',
      'handleChange',
      'handleNightsWithRangeClick',
      'handleNightsWithoutRangeClick',
    ]);
  }

  handleOverlayClick() {
    ReactDOM.findDOMNode(this.refs.ToursFilterVisitTime).blur();
  }

  handleItemFocus() {
    this.setState({ active: true, overlay: true });
  }

  handleItemBlur() {
    this.setState({ active: false, overlay: false });
  }

  handleChange(value) {
    this.props.onChange('nights', value);
  }

  handleNightsWithRangeClick() {
    this.props.onChange('nights_range', 2);
  }

  handleNightsWithoutRangeClick() {
    this.props.onChange('nights_range', 0);
  }

  render() {
    const { value, dateRange, minPrice, maxPrice } = this.props;
    const text = (dateRange > 0) ? `${value} ± ${dateRange}` : value;
    const num = (dateRange > 0) ? dateRange : value;
    const titles = ['ночь', 'ночи', 'ночей'];
    const title = declOfNums(num, titles);
    const prices = (minPrice && maxPrice) && `${minPrice} - ${maxPrice}`;

    const className = 'tours-filter__item';
    const classList = classNames(
      className,
      `${className}--people`,
      { [`${className}--active`]: this.state.active }
    );

    return (
      <div
        ref='ToursFilterVisitTime'
        className={classList}
        tabIndex={this.props.tabIndex}
        onFocus={this.handleItemFocus}
        onBlur={this.handleItemBlur}
      >
        <div className='tours-filter__value'>{`${text} ${title}`}</div>
        {this.state.overlay && (
          <div className='tours-filter__overlay' onClick={this.handleOverlayClick}></div>
        )}
        <div className='tours-filter__time'>
          <div className='tours-filter__time-title'>Количество ночей</div>
          <InputNumber
            titles={titles}
            value={value}
            maxValue={30}
            onIncrement={this.handleChange}
            onDecrement={this.handleChange}
          />
          <div className='tours-filter__time-prices'>{prices}</div>
          <div className='tours-filter__plus-minus-nights'>
            <div
              className={classNames('tours-filter__radio', {
                'tours-filter__radio--active': dateRange > 0,
              })}
              onClick={this.handleNightsWithRangeClick}
            >± 2 ночи</div>
            <div
              className={classNames('tours-filter__radio', {
                'tours-filter__radio--active': dateRange === 0,
              })}
              onClick={this.handleNightsWithoutRangeClick}
            >ровно</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToursFilterVisitTime;
