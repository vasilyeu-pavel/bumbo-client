import React, { PropTypes, Component } from 'react';
import { bindAll } from 'lodash';

export default class TourFlightLabel extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { onHover: false };

    bindAll(this, ['showFullText', 'hideFullText']);
  }

  fullLabelText() {
    return this.props.label;
  }

  clippedLabelText() {
    return this.props.label.length > 11
      ? ` ${this.props.label.substr(0, 9)}...`
      : ` ${this.props.label}`;
  }

  showFullText() {
    this.setState({ onHover: true });
  }

  hideFullText() {
    this.setState({ onHover: false });
  }

  render() {
    return (
      <span
        onMouseEnter={this.showFullText}
        onMouseLeave={this.hideFullText}
      >
        {this.state.onHover && this.fullLabelText()}
        {!this.state.onHover && this.clippedLabelText()}
      </span>
    );
  }
}
