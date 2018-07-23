import React, { PropTypes, Component } from 'react';
import Input from './common/Input';
import Checkbox from './common/Checkbox';
import { bindAll } from 'lodash';

export default class TouristsListItems extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = { later: false };

    bindAll(this, ['changeLater']);
  }

  change() {

  }

  changeLater() {
    this.setState({ later: !this.state.later });
  }

  render() {
    const fileLable = 'Вы можете ускорить работу турагента, ' +
      'загрузив сейчас фото/скан последней страницы паспорта';

    return (
      <div>
        <h3 className='order-sub-title'>{this.props.title}</h3>
        <Checkbox
          modifiers={['form-field']}
          onChange={this.changeLater}
          checked={this.state.later}
          labelText='Заполнить потом'
          id='later'
        />
        {!this.state.later && <div>
          <Checkbox
            modifiers={['form-field']}
            onChange={this.change}
            labelText='Он же контактное лицо'
            id='contact_person'
          />
          <Input label='Фамилия' />
          <Input label='Имя' />
          <Input label='Отчество' />
          <Input label='Дата рождения' />
          <Input label='Номер пасорта' />
        </div>}
        <Input label={fileLable} />
      </div>
    );
  }
}
