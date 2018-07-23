import React, { Component, PropTypes } from 'react';
import declOfNums from '../../utils/declOfNum';
import { bindAll } from 'lodash';

export default class InputNumber extends Component {
  static propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    bindAll(this, ['handleIncrement', 'handleDecrement']);
  }

  handleIncrement() {
    const { value, maxValue } = this.props;

    if (value >= maxValue) return;

    this.props.onIncrement(value + 1);
  }

  handleDecrement() {
    const { value } = this.props;

    if (value <= 1) return;

    this.props.onDecrement(value - 1);
  }

  render() {
    const { value, titles } = this.props;
    const title = declOfNums(value, titles);

    return (
      <div className='input-number'>
        <div className='input-number__decr' onClick={this.handleDecrement}>-</div>
        <div className='input-number__title'>{`${value} ${title}`}</div>
        <div className='input-number__incr' onClick={this.handleIncrement}>+</div>
      </div>
    );
  }
}
