import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class Marker extends Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    hovered: PropTypes.bool.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  getClassNames() {
    return classNames(
      'marker-circle',
      { 'marker-circle--small': this.props.count < 20 },
      { 'marker-circle--large': this.props.count > 50 && this.props.count < 100 },
      { 'marker-circle--huge': this.props.count >= 100 },
      { 'marker-circle--hovered': this.props.hovered }
    );
  }

  render() {
    return (
      <div className={this.getClassNames()} onClick={this.props.onClick}>
        <div className='marker-circle__count'>{this.props.count}</div>
      </div>
    );
  }
}
