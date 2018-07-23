/* eslint max-len: 0 */

import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { bindAll } from 'lodash';
import classNames from 'classnames';

export default class HotelsSortItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    sort: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    sortHotelsBy: PropTypes.instanceOf(Map).isRequired,
    activeId: PropTypes.number.isRequired,
    changeHotelsCardSort: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    bindAll(this, ['handleClick']);
  }

  handleClick() {
    const { id, sort, sortHotelsBy, activeId } = this.props;
    const sortDirection = sortHotelsBy.get('direction');
    const direction = activeId === id ? !sortDirection : false;

    this.props.changeHotelsCardSort({ sort, direction });
  }

  render() {
    const { id, sort, text, sortHotelsBy, activeId } = this.props;
    const sortDirection = sortHotelsBy.get('direction');
    const sortKey = sortHotelsBy.get('sort');
    const isActiveId = activeId === id;
    const isReversed = sortKey === sort && sortDirection;

    return (
      <div
        className={classNames(
          'hotels-filter__item',
          { 'hotels-filter__item--active': isActiveId },
          { 'hotels-filter__item--reverse': isReversed }
        )}
        onClick={this.handleClick}
      >
        {text}
        <svg className='hotels-filter__item-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.825 21.825' fill='#322113'>
          <path d='M16.791 13.254a1.112 1.112 0 0 1 1.587 0 1.14 1.14 0 0 1 0 1.587l-6.65 6.651a1.14 1.14 0 0 1-.809.333c-.317 0-.603-.127-.81-.333l-6.65-6.651c-.444-.444-.444-1.143 0-1.587s1.143-.444 1.587 0l4.746 4.762V1.111A1.116 1.116 0 0 1 10.918 0c.619 0 1.111.492 1.111 1.111v16.904l4.762-4.761z'/>
        </svg>
      </div>
    );
  }
}
