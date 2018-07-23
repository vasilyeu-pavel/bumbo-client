import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { isInclusivelyAfterDay, SingleDatePicker } from 'react-dates';
import { bindAll } from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';
import classNames from 'classnames';
import СheaperButton from './СheaperButton'
import ToggleMobileMode from '../../../decorators/toggleMobileMode'
import MobileDatesHeader from '../MobileDatesHeader'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


class AviaToursFilterDateTo extends PureComponent {
  static propTypes = {
    onChangeDate: PropTypes.func.isRequired,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    inputIsValid: PropTypes.bool,
    onChangeValid: PropTypes.func,
    // from decorators
    mobileMode: PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
      focused: false,
      cheaper: false,
      selectDates: '',
    };

    bindAll(this, ['handleDateChange', 'handleFocusChange']);
  }

  componentWillReceiveProps() {
    const { inputIsValid } = this.props

    if(inputIsValid) {
      this.setState({
        cheaper: true,
      })
    }
  }

  componentDidMount() {
    const { tabIndex } = this.props;

    const node = ReactDOM.findDOMNode(this);
    const dateInput_input = node.querySelector('.DateInput_input')

    if (tabIndex) {
     dateInput_input.setAttribute('tabindex', tabIndex)
    }

    moment.locale('ru');
  }

  handleDateChange(date) {
    const { maximumNights, dateFrom } = this.props;
    // moment obj
    let dateTo = date;

    let momentDateFrom = moment(dateFrom , 'DD.MM.YY');

    if (momentDateFrom.isAfter(dateTo)) {
      dateTo = undefined;
    }

    if (!dateTo || dateTo === undefined) return

    dateTo = dateTo && dateTo.format('DD.MM.YY');

    this.setState({selectDates: date.format('DD.MM.YY')})

    const dateToAny = ''

    this.props.onChangeDate({ dateTo, dateToAny });
  }

  handleFocusChange({ focused }) {
    this.setState({ focused, active: !!focused });
  }

  isOutsideRange = (day) => {
    const { dateFrom } = this.props
    const startDate = (dateFrom && moment(dateFrom , 'DD.MM.YY')) || moment();

    return !isInclusivelyAfterDay(day, startDate)
  }

  closeCalendar = () => {
    this.setState({
      active: false,
      cheaper: true,
    })

    const dateTo = null
    const dateToAny = 'any'


    this.props.onChangeDate({ dateTo, dateToAny })
  }

  render() {
    const { dateFrom, dateTo, maximumNights, mobileMode } = this.props;
    const { active, cheaper, selectDates } = this.state

    const endDate = dateTo && moment(dateTo , 'DD.MM.YY');

    const classList = classNames(
      'tours-filter__item',
      'tours-filter__item--dates',
      { 'tours-filter__item--active': this.state.active }
    );

    return (
      <div className={classList}>
       <img src='/images/appointment.svg'/>
      {!mobileMode ?
        <SingleDatePicker
          id={'2'}
          ref='singleDateToPicker'
          anchorDirection={'right'}
          readOnly={true}
          isOutsideRange={this.isOutsideRange}
          date={endDate} // momentPropTypes.momentObj or null
          onDateChange={this.handleDateChange} // PropTypes.func.isRequired
          onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired
          numberOfMonths={1}
          focused={this.state.active}
          placeholder={cheaper ? 'Любая' : 'Обратно'}
          calendarInfoPosition="after"
          renderCalendarInfo={() => (
              <СheaperButton borderPosition='borderBottom' 
              closeCalendar={this.closeCalendar}
              />
          )}
        />
        :
        <SingleDatePicker
          id={'2'}
          orientation="vertical" 
          withFullScreenPortal 
          ref='singleDateToPicker'
          isOutsideRange={this.isOutsideRange}
          date={endDate} // momentPropTypes.momentObj or null
          onDateChange={this.handleDateChange} // PropTypes.func.isRequired
          onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired
          numberOfMonths={1}
          focused={this.state.active}
          placeholder={cheaper ? 'Любая' : 'Обратно'}
          calendarInfoPosition="top"
          renderCalendarInfo={() => (
              <MobileDatesHeader 
                selectDates={selectDates}
                typeInput={1}
                СheaperButton={
                  <СheaperButton borderPosition='borderBottom' 
                  closeCalendar={this.closeCalendar}
                  />
                }
              />
          )}
        />         
      }
      </div>
    );
  }
}

export default ToggleMobileMode(AviaToursFilterDateTo);
