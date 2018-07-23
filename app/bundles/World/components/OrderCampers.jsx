import React, { PropTypes, Component } from 'react';
import OrderCamper from './OrderCamper';
import { times, map } from 'lodash';

export default class OrderCampers extends Component {
  static propTypes = {
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      titles: [
        'Первый', 'Второй', 'Третий', 'Четвёртый', 'Пятый',
        'Шестой', 'Седьмой', 'Восьмой', 'Девятый', 'Десятый',
      ],
    };
  }

  renderCampers() {
    const participants = this.props.adults + this.props.kids;

    return map(times(participants, (index) => (
      <OrderCamper
        key={index}
        index={index}
        data={this.props.campers[index]}
        title={this.state.titles[index]}
        onChange={this.props.onChange}
      />
    )));
  }

  render() {
    return (
      <div className='order-campers'>
        {this.renderCampers()}
      </div>
    );
  }
}
