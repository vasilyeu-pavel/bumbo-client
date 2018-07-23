import React, { Component, PropTypes } from 'react';
import { map, find } from 'lodash';
import { Map } from 'immutable';
import classNames from 'classnames';
import HotelsSortItem from './HotelsSortItem';

export default class HotelsSort extends Component {
  static propTypes = {
    sortHotelsBy: PropTypes.instanceOf(Map).isRequired,
    changeHotelsCardSort: PropTypes.func.isRequired,
    isPartners: PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      filterItemTypes: [
        { id: 1, type: 'min_price', text: 'По стоимости' },
        { id: 2, type: 'rate', text: 'По рейтингу' },
        { id: 3, type: 'reviews_count', text: 'По наличию отзывов' },
        { id: 4, type: 'stars', text: 'По звездности' },
      ],
    };
  }

  render() {
    const { filterItemTypes } = this.state;
    const sort = this.props.sortHotelsBy.get('sort');
    const activeItem = find(filterItemTypes, { type: sort });
    const activeId = activeItem.id || 1;

    return (
      <div className={classNames(
          'hotels-filter',
          { 'hotels-filter--partners': this.props.isPartners })}
      >
        {map(filterItemTypes, (item, key) =>
          (<HotelsSortItem
            activeId={activeId}
            id={item.id}
            text={item.text}
            key={item.type}
            sort={item.type}
            sortHotelsBy={this.props.sortHotelsBy}
            changeHotelsCardSort={this.props.changeHotelsCardSort}
          />)
        )}
      </div>
    );
  }
}
