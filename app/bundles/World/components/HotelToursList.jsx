import React, { PropTypes, Component } from 'react';
import HotelToursItem from './HotelToursItem';
import { List } from 'immutable';

export default class HotelToursList extends Component {
  static propTypes = {
    tours: PropTypes.instanceOf(List).isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let renderElement;

    if (this.props.tours.size !== 0) {
      renderElement = this.props.tours.map((item) => (
        <HotelToursItem
          key={item.tourHash + item.operatorId + item.offerId}
          tour={item}
        />
      ));
    }

    return (
      <div className='tours__list'>
        {renderElement}
        {(this.props.tours.size === 0 && this.props.toursLoadedSuccess) && (<div className='notFounded'>Сожалеем, по этим параметрам поиска туров не найдено:( Попробуйте изменить поиск</div>)}
      </div>
    );
  }
}
