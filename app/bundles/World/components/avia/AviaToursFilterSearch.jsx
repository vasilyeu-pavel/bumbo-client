import React, { PureComponent, PropTypes } from 'react';
import _ from 'lodash';

export default class AviaToursFilterSearch extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isMainPage: PropTypes.bool,
    href: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    minPriceText: PropTypes.number,
    destination: PropTypes.object,
    checkedValidation: PropTypes.func,
    date_from: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, ['handleClick', 'buttonText']);
  }

  handleClick(event) {
    const { destination, date_from } = this.props

    this.props.checkedValidation()

    if (Object.keys(destination).length !== 0 && date_from) {
      if (this.props.isMainPage) {
        window.open(this.props.href, '_blank');
      } else {
        this.props.onClick();
      }
    }
  }

  buttonText() {
    const text = 'НАЙТИ БИЛЕТЫ';

    if (this.props.minPriceText) {
      return `От ${this.props.minPriceText} р`;
    }

    return text;
  }

  render() {
    const { tabIndex } = this.props;

    return (
      <div className='tours-filter__search' onClick={this.handleClick}
      >
        {this.props.href
          ? (
            <a className='tours-filter__search-link'
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
