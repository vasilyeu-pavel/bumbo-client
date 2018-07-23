import React, { PureComponent, PropTypes } from 'react';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import { bindAll } from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';
import classNames from 'classnames';

class ToursFilterDate extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    priceDates: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    this.state = { active: false, currentMonth: null };

    bindAll(this, ['handleDatesChange', 'handleFocusChange', 'handleMonthChange']);
  }

  componentWillReceiveProps(nextProps) {
    const isPricesEqual = nextProps.priceDates === this.props.priceDates;

    if (!isPricesEqual) this.setPrices(nextProps.priceDates);
  }

  componentDidMount() {
    const { tabIndex, priceDates } = this.props;

    if (priceDates) this.setPrices(priceDates);

    if (tabIndex) {
      const [startDate, endDate] = $(this.refs.dateRangePicker.dayPickerContainer)
        .parent().find('.DateInput__input');

      startDate.setAttribute('tabindex', tabIndex);
      endDate.setAttribute('tabindex', parseInt(tabIndex, 10) + 1);
    }

    moment.locale('ru');
  }

  setPrices(prices) {
    this.setState({ prices });
  }

  handleMonthChange(event) {
    const dayPicker = this.refs.dateRangePicker.dayPicker;
    const date = dayPicker.dayPicker.refs.calendarMonthGrid.props.initialMonth;
    const dateObj = date.toDate();
    const year = dateObj.getFullYear();
    const start = moment(new Date(year, dateObj.getMonth() + 2, 1)).format('YYYY.MM.DD');
    const finish = moment(new Date(year, dateObj.getMonth() + 3, 0)).format('YYYY.MM.DD');

    this.props.onMonthChange({ start, finish });
  }

  handleDatesChange({ startDate, endDate }) {
    const { maximumNights } = this.props;
    const dateFrom = startDate && startDate.format('DD.MM.YY');
    let dateTo = endDate && endDate.format('DD.MM.YY');

    if (startDate.isAfter(endDate)) {
      dateTo = undefined;
    } else if (endDate && endDate.diff(startDate, 'days') > maximumNights - 1) {
      dateTo = undefined;
    }

    this.props.onChange({ dateFrom, dateTo });
  }

  handleFocusChange(focusedInput) {
    this.setState({ focusedInput, active: !!focusedInput });
  }

  render() {
    const { dateFrom, dateTo, maximumNights } = this.props;
    const startDate = dateFrom && moment(dateFrom, 'DD.MM.YY');
    const endDate = dateTo && moment(dateTo, 'DD.MM.YY');
    const classList = classNames(
      'tours-filter__item',
      'tours-filter__item--dates',
      { 'tours-filter__item--active': this.state.active }
    );

    let isOutsideRange;
    if (startDate) {
      isOutsideRange = day => {
        const isEndDateFocused = this.state.focusedInput === 'endDate';
        const isEndDateAfterOutside = day.isAfter(startDate.clone().add(maximumNights, 'days'));
        const isEndDateValid = isEndDateFocused
          && (day.isBefore(startDate) || isEndDateAfterOutside);

        return !isInclusivelyAfterDay(day, moment()) || isEndDateValid;
      };
    }

    return (
      <div className={classList}>
        <DateRangePicker
          ref='dateRangePicker'
          onDatesChange={this.handleDatesChange}
          onFocusChange={this.handleFocusChange}
          focusedInput={this.state.focusedInput}
          isOutsideRange={isOutsideRange}
          minimumNights={this.props.minimumNights}
          startDate={startDate}
          endDate={endDate}
          monthInfo={this.state.prices}
          displayFormat={'D MMMM'}
          monthInfoDateFormat={'YYYY.MM.DD'}
          startDatePlaceholderText='Начало'
          endDatePlaceholderText='Конец'
          onNextMonthClick={this.handleMonthChange}
        />
      </div>
    );
  }
}

export default ToursFilterDate;
