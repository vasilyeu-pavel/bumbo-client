import React, { Component, PropTypes } from 'react';
import Checkbox from './common/Checkbox';
import _ from 'lodash';

export default class MapMoveControl extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, ['handleChange']);
  }

  handleChange(id, isChecked) {
    this.props.onChange(isChecked);
  }

  render() {
    return (
        <div className='map__move-control'>
          <Checkbox
            id='map__move-control'
            checked={this.props.checked}
            labelText='Новый поиск при движении карты'
            onChange={this.handleChange}
          />
        </div>
    );
  }
}
