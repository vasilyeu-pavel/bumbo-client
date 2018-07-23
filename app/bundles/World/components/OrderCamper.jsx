import React, { Component } from 'react';
import Input from './common/Input';
import { ReactRadioButtonsGroup, ReactRadioButton } from 'react-radio-buttons-group';
import Select from 'react-select';
import { bindAll } from 'lodash';

export default class OrderCamper extends Component {
  static propTypes = {
  }

  constructor(props, context) {
    super(props, context);

    bindAll(this, ['handleInputChange', 'handleSelectChange', 'handleSexChange']);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.props.onChange(this.props.index, name, value);
  }

  handleSelectChange(data) {
    this.props.onChange(this.props.index, 'nationality', data.value);
  }

  handleSexChange(sex) {
    this.props.onChange(this.props.index, 'sex', sex);
  }

  render() {
    const nationalities = [
      { value: 'Азербайджан', label: 'Азербайджан' },
      { value: 'Армения', label: 'Армения' },
      { value: 'Беларусь', label: 'Беларусь' },
      { value: 'Казахстан', label: 'Казахстан' },
      { value: 'Киргизия', label: 'Киргизия' },
      { value: 'Молдавия', label: 'Молдавия' },
      { value: 'Россия', label: 'Россия' },
      { value: 'Таджикистан', label: 'Таджикистан' },
      { value: 'Туркмения', label: 'Туркмения' },
      { value: 'Узбекистан', label: 'Узбекистан' },
      { value: 'Украина', label: 'Украина' },
    ];

    return (
      <div className='order-camper__item'>
        <div className='order-camper__title'>{this.props.title} отдыхающий</div>
        <div className='order-camper__form-line'>
          <div className='order-camper__form-col-1'>
            <Input
              label='Фамилия латиницей'
              required='required'
              pattern='[A-Za-z]{2,30}'
              placeholder='как в паспорте'
              style={{ borderRadius: '2px', textTransform: 'uppercase' }}
              onChange={this.handleInputChange}
              name='surname_latin'
              value={this.props.data.surname_latin}
            />
          </div>
          <div className='order-camper__form-col-1'>
            <Input
              label='Имя латиницей'
              required='required'
              pattern='[A-Za-z]{2,30}'
              placeholder='как в паспорте'
              style={{ borderRadius: '2px', textTransform: 'uppercase' }}
              onChange={this.handleInputChange}
              name='name_latin'
              value={this.props.data.name_latin}
            />
          </div>
          <div className='order-camper__form-col-2'>
            <Input
              label='Дата рождения'
              required='required'
              pattern='(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}'
              style={{ borderRadius: '2px' }}
              onChange={this.handleInputChange}
              placeholder='ДД.ММ.ГГГГ'
              name='birthday'
              value={this.props.data.birthday}
            />
          </div>
          <div className='order-camper__form-col-3'>
            <label className='order-form-control__label'>Пол</label>
            <ReactRadioButtonsGroup
              group={`sex[${this.props.index}]`}
              onChange={this.handleSexChange}
            >
                <ReactRadioButton value='male'>М</ReactRadioButton>
                <ReactRadioButton value='female'>Ж</ReactRadioButton>
            </ReactRadioButtonsGroup>
          </div>
          <div className='order-camper__form-col-2'>
            <label className='order-form-control__label'>Гражданство</label>
            <Select
              value={this.props.data.nationality}
              clearable={false}
              searchable={false}
              openOnFocus={true}
              className='order-form-control__select'
              tabSelectsValue={false}
              options={nationalities}
              onChange={this.handleSelectChange}
              placeholder=''
            />
          </div>
        </div>
        <div className='order-camper__form-line'>
          <div className='order-camper__form-col-1'>
            <Input
              label='Серия и № документа'
              required='required'
              pattern='[A-Za-z]{0,2}[0-9]{2,9}'
              style={{ borderRadius: '2px', textTransform: 'uppercase' }}
              onChange={this.handleInputChange}
              name='passport_number'
              value={this.props.data.passport_number}
            />
          </div>
          <div className='order-camper__form-col-1'>
            <Input
              label='Срок действия'
              required='required'
              pattern='(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}'
              style={{ borderRadius: '2px' }}
              onChange={this.handleInputChange}
              placeholder='ДД.ММ.ГГГГ'
              name='pass_estimate_date'
              value={this.props.data.pass_estimate_date}
            />
          </div>
        </div>
      </div>
    );
  }
}
