import React, { PropTypes, Component } from 'react';
import AviaSearchItem from '../components/AviaSearchItem';

export default class AirSegmentsGroup extends Component {
  static propTypes = {
    ticket: PropTypes.object,
  }

  render() {
    return <AviaSearchItem {...this.props.ticket} />;
  }
}
