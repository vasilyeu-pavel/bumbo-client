import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class MapToggleControl extends Component {
  static propTypes = {
    state: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, ['handleChange']);
  }

  handleChange() {
    this.props.onChange(!this.props.state);
  }

  render() {
    const { state } = this.props;
    const text = state ? 'Свернуть карту' : 'Развернуть карту';

    return (
      <div
        className='map__show-map-button'
        onClick={this.handleChange}
      >
        {!state && (<div className='map__show-map-arrow map__show-map-arrow--left'></div>)}
        <div className='map__show-map-text'>{text}</div>
        {state && (<div className='map__show-map-arrow map__show-map-arrow--right'></div>)}
      </div>
    );
  }
}
