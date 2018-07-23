import React, { Component, PropTypes } from 'react';
import { bindAll, includes, pull, clone, map } from 'lodash';
import Checkbox from './Checkbox.jsx';

export default class CheckboxGroup extends Component {
  static propTypes = {
    name: PropTypes.string,
    subtitle: PropTypes.string,
    values: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    checked: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.checkedItems = clone(props.checked) || [];

    bindAll(this, ['handleChange']);
  }

  handleChange(id, isChecked) {
    if (isChecked && !includes(this.checkedItems, id)) {
      this.checkedItems.push(id);
    } else {
      pull(this.checkedItems, id);
    }

    this.props.onChange(this.props.name, this.checkedItems);
  }

  render() {
    return (
      <div className='checkbox-group'>
        <div className='checkbox-group__subtitle'>{this.props.subtitle}</div>
        {
          map(this.props.values, (key, value) => (
            <div key={key} className='checkbox-group__item'>
              <Checkbox
                id={key}
                checked={includes(this.props.checked, key)}
                labelText={value}
                onChange={this.handleChange}
              />
            </div>
          ))
        }
      </div>
    );
  }
}
