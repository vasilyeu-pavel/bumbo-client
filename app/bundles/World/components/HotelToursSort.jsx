import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { Map } from 'immutable';
import _ from 'lodash';

export default class HotelToursSort extends Component {
  static propTypes = {
    toursSortBy: PropTypes.instanceOf(Map).isRequired,
    changeHotelToursSort: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { activeId: 7 };

    _.bindAll(this, ['updateActiveFilter']);
  }

  updateActiveFilter(id) {
    this.setState({ activeId: id });
  }

  render() {
    const { toursSortBy, changeHotelToursSort } = this.props;

    const items = [
        {
          id: 1,
          type: 'rate',
          text: '1-5',
          modifier: 'rate',
        },
        {
          id: 2,
          type: 'operator_id',
          text: 'Оператор',
          modifier: 'operator',
        },
        {
          id: 3,
          type: 'date_from',
          text: 'Даты',
          modifier: 'date',
        },
        {
          id: 4,
          type: 'nights',
          text: 'Ночей',
          modifier: 'time',
        },
        {
          id: 5,
          type: 'ht_place_description',
          text: 'Номер',
          modifier: 'rooms',
        },
        {
          id: 6,
          type: 'meal_name',
          text: 'Питание',
          modifier: 'food',
        },
        {
          id: 7,
          type: 'price',
          text: 'Стоимость',
          modifier: 'price',
        },
        {
          id: 8,
          type: 'discount',
          text: 'Cкидка',
          modifier: 'discount',
        },
    ];

    let renderElement = null;

    if (items.length !== 0) {
      renderElement = _.map(items, (item, key) => (
        <HotelToursSortItem
          activeId={this.state.activeId}
          id={item.id}
          modifier={item.modifier}
          text={item.text}
          type={item.type}
          key={item.type}
          changeFilter={this.updateActiveFilter}
          toursSortBy={toursSortBy}
          changeHotelToursSort={changeHotelToursSort}
        />
      ));
    }

    return (
      <div className='tours__sort'>
        {renderElement}
      </div>
    );
  }
}

const HotelToursSortItem = (props) => {
  const {
    id,
    activeId,
    modifier,
    text,
    type,
    toursSortBy,
    changeHotelToursSort,
    changeFilter,
  } = props;

  const currentSort = toursSortBy.get('sort');
  const isActiveId = activeId === id;
  const sortDirection = toursSortBy.get('direction');
  const isReversed = type === currentSort && sortDirection;

  const handleClick = () => {
    const direction = isActiveId ? !sortDirection : false;

    changeFilter(id);
    changeHotelToursSort({ sort: type, direction });
  };

  return (
    <div
      className={classNames(
        `tours__sort-item tours__sort__${modifier}`,
        { 'tours__sort-item--active': isActiveId },
        { 'tours__sort-item--reverse': isReversed }
      )}
      onClick={handleClick}
    >
      <div className='tours__sort-item--inner'>
        <div className='tours__sort-item-title'>{text}</div>
        <svg className='tours__sort-item-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.825 21.825' fill='#322113'>
          <path d='M16.791 13.254a1.112 1.112 0 0 1 1.587 0 1.14 1.14 0 0 1 0 1.587l-6.65 6.651a1.14 1.14 0 0 1-.809.333c-.317 0-.603-.127-.81-.333l-6.65-6.651c-.444-.444-.444-1.143 0-1.587s1.143-.444 1.587 0l4.746 4.762V1.111A1.116 1.116 0 0 1 10.918 0c.619 0 1.111.492 1.111 1.111v16.904l4.762-4.761z'/>
        </svg>
      </div>
    </div>
  );
};

HotelToursSortItem.propTypes = {
  id: PropTypes.number.isRequired,
  activeId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired,
  toursSortBy: PropTypes.instanceOf(Map).isRequired,
  changeFilter: PropTypes.func.isRequired,
  changeHotelToursSort: PropTypes.func.isRequired,
};
