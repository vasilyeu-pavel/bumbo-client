import React, { PureComponent, PropTypes } from 'react';
import { bindAll } from 'lodash';
import Select from 'react-select';
import { Map } from 'immutable';
import classNames from 'classnames';

class ToursFilterFood extends PureComponent {
  static propTypes = {
    meals: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.state = { active: false };

    bindAll(this, ['handleChange', 'handleOpen', 'handleClose']);
  }

  handleOpen() {
    this.setState({ active: true });
  }

  handleClose() {
    this.setState({ active: false });
  }

  handleChange(data) {
    this.props.onChange('meals', data.value, this.props.tabIndex);
  }

  createOptions() {
    const { meals } = this.props;

    return meals.map((key, value) => ({ value: key, label: value })).toArray();
  }

  render() {
    const { value } = this.props;
    const options = this.createOptions();
    const className = 'tours-filter__item';
    const classList = classNames(
      className,
      `${className}--food`,
      { [`${className}--active`]: this.state.active }
    );

    return (
      <div className={classList}>
        <Select
          tabIndex={this.props.tabIndex}
          value={value}
          clearable={false}
          searchable={false}
          openOnFocus={true}
          tabSelectsValue={false}
          className='select-width'
          options={options}
          onChange={this.handleChange}
          onOpen={this.handleOpen}
          onFocus={this.handleOpen}
          onClose={this.handleClose}
          onBlur={this.handleClose}
        />
      </div>
    );
  }
}

export default ToursFilterFood;
