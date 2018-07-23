import React, { Component, PropTypes } from 'react';
import { bindAll, map } from 'lodash';
import classNames from 'classnames';

export default class Checkbox extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    modifiers: PropTypes.array,
  }

  static defaultProps = {
    checked: false,
    modifiers: [],
  }

  constructor(props, context) {
    super(props, context);

    this.state = { checked: this.props.checked };

    bindAll(this, 'handleChange');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  handleChange(event) {
    this.props.onChange(this.props.id, !this.state.checked);
    this.setState({ checked: !this.state.checked });
  }

  getClassNames() {
    return classNames('checkbox', map(this.props.modifiers,
      (modifier) => `checkbox--${modifier}`));
  }

  render() {
    return (
      <div className={this.getClassNames()}>
        <input
          ref={'checkbox'}
          className='checkbox__real'
          id={this.props.id}
          type='checkbox'
          checked={this.state.checked}
          onChange={this.handleChange}
        />
        <label className='checkbox__label' htmlFor={this.props.id}>
          <div className='checkbox__icon'></div>
          <div className='checkbox__label-text'>
            {this.props.labelText}
            <div className='checkbox__label-caption'>{this.props.captionText}</div>
          </div>
        </label>
      </div>
    );
  }
}
