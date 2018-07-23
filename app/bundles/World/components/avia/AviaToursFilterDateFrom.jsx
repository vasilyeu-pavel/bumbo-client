import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {  SingleDatePicker } from 'react-dates';
import { bindAll } from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';
import classNames from 'classnames';
import MobileDatesHeader from './MobileDatesHeader'
import ToggleMobileMode from '../../decorators/toggleMobileMode'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class AviaToursFilterDateFrom extends PureComponent {
  static propTypes = {
    onChangeDate: PropTypes.func.isRequired,
    dateFrom: PropTypes.string,
    priceDates: PropTypes.object,
    inputIsValid: PropTypes.bool,
    // from decorators
    mobileMode: PropTypes.bool,

  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
      focused: false,
      selectDates: '',
    };

    bindAll(this, ['handleDateChange', 'handleFocusChange']);
  }

  componentDidMount() {
    const { tabIndex } = this.props;

    const node = ReactDOM.findDOMNode(this);

    if (tabIndex) {
     node.querySelector('.DateInput_input').setAttribute('tabindex', tabIndex)
    }

    moment.locale('ru');
  }

  handleDateChange(date) {
    if (!date) {
      return
    }

    this.setState({selectDates: date.format('DD.MM.YY')})

    this.props.onChangeDate({ dateFrom: date.format('DD.MM.YY') }, this.props.tabIndex);
  }

  handleFocusChange({ focused }) {
    this.setState({ focused, active: !!focused });
  }

  render() {
    const { dateFrom, inputIsValid, mobileMode } = this.props;
    const { selectDates } = this.state
    const startDate = dateFrom && moment(dateFrom , 'DD.MM.YY');

    const classError = !inputIsValid ? 'tours-filter__item--error' : null
    const classList = classNames(
      'tours-filter__item',
      classError,
      'tours-filter__item--dates',
      { 'tours-filter__item--active': this.state.active }
    );

    return (
      <div className={classList}>
        <img src='/images/appointment.svg'/>
      { mobileMode ?
        <SingleDatePicker      
          id={'2'}
          numberOfMonths={1}
          orientation="vertical" 
          withFullScreenPortal 
          ref='singleDateFromPicker'
          date={startDate} // momentPropTypes.momentObj or null
          onDateChange={this.handleDateChange} // PropTypes.func.isRequired
          onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired
          focused={this.state.active}
          placeholder={'Туда'}
          calendarInfoPosition="top"
          renderCalendarInfo={() => (
              <MobileDatesHeader 
                selectDates={selectDates}
                typeInput={0}
              />
          )}
        />
        :
        <SingleDatePicker      
          id={'2'}
          readOnly={true}
          ref='singleDateFromPicker'
          date={startDate} // momentPropTypes.momentObj or null
          onDateChange={this.handleDateChange} // PropTypes.func.isRequired
          onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired
          numberOfMonths={1}
          focused={this.state.active}
          placeholder={'Туда'}
        /> 
      } 
      </div>
    );
  }
}

export default ToggleMobileMode(AviaToursFilterDateFrom);
