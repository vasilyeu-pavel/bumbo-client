import React, { PureComponent } from 'react';
import TouristsListItems from './TouristsListItems';

class TouristsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tourists: [
        {
          name: 'name', surname: 'surname',
          patronymic: 'patronymic', birthday: 'birthday',
          passport_id: 'passport_id',
        },
        {
          name: 'name', surname: 'surname',
          patronymic: 'patronymic', birthday: 'birthday',
          passport_id: 'passport_id',
        },
      ],
    };
  }

  render() {
    const numbers = {
      0: 'Первый турист',
      1: 'Второй турист',
      2: 'Третий турист',
    };
    const tourists = this.state.tourists.map((tourist, index) => {
      let title = 'следующий турист';
      if (numbers[index]) title = numbers[index];

      return <TouristsListItems key={index} title={title} />;
    });

    return (
      <div>{tourists}</div>
    );
  }
}

export default TouristsList;
