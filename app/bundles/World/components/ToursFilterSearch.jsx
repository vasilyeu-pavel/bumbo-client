import React, { PureComponent, PropTypes } from 'react';
import _ from 'lodash';

export default class ToursFilterSearch extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    href: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    minPriceText: PropTypes.number,
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, ['handleClick', 'buttonText']);
  }

  handleClick(event) {
    if (!this.props.href) this.props.onClick();
  }

  buttonText() {
    const text = 'Искать туры';

    if (this.props.minPriceText) {
      return `От ${this.props.minPriceText} р`;
    }

    return text;
  }

  render() {
    const { tabIndex } = this.props;

    return (
      <div className='tours-filter__search' onClick={this.handleClick}>
        {this.props.href
          ? (
            <a className='tours-filter__search-link'
              href={this.props.href}
              target='_blank'
              tabIndex={tabIndex}
            >{this.buttonText()}</a>
          )
          : (
            <div
              className='tours-filter__search-link'
              tabIndex={tabIndex}
            >{this.buttonText()}</div>
          )
        }
      </div>
    );
  }
}
