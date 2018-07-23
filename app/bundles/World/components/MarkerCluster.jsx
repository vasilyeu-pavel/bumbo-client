import React, { PropTypes, Component } from 'react';

export default class MarkerCluster extends Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    text: PropTypes.number.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className='marker-cluster' onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}
