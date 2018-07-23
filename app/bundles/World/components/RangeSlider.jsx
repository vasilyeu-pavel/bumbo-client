import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class RangeSlider extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    settings: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const $input = $(ReactDOM.findDOMNode(this.refs[this.props.name]));

    $input.ionRangeSlider(this.props.settings);
  }

  render() {
    return (
      <div className='range-slider'>
        <input ref={this.props.name}/>
      </div>
    );
  }
}
