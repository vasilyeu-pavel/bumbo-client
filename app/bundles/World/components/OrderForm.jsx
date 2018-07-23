import React, { Component, PropTypes } from 'react';
import Checkbox from './common/Checkbox';
import Select2 from 'react-select2-wrapper';
import Button from './common/Button/Button.jsx';
import Input from './common/Input';
import InputPhone from './common/InputPhone';
import Textarea from './common/Textarea';
import OrderPaymentMethod from './OrderPaymentMethod';
import TouristsList from './TouristsList';
import { bindAll } from 'lodash';


class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fillLater: false,
      city_id: null,

      have_promocode: false,

      need_documents_delivery: false,
      client_name: '',
      name: '',
      phone: '+375',
      email: '',
      promocode: '',
      address: '',
      comment: '',
      delivery_time: '',

      companyName: '',
      companyUNP: '',
      companyAddress: '',
      companyHeadPosition: '',
      companyHeadName: '',
    };

    bindAll(this, [
      'handleInputChange',
      'toogleFillLater',
      'changeDelivery',
      'tooglePromoCode',
      'changeCity',
      'createOrder',
      'changePhone',
    ]);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cities !== nextProps.cities && nextProps.cities.length > 1) {
      this.setState({
        city_id: nextProps.cities[0].id,
      });
    }
  }

  handleInputChange(name, event) {
    this.setState({ [name]: event.target.value });
  }

  toogleFillLater() {
    this.setState({ fillLater: !this.state.fillLater });
  }

  changeDelivery() {
    this.setState({ need_documents_delivery: !this.state.need_documents_delivery });
  }

  tooglePromoCode() {
    this.setState({ have_promocode: !this.state.have_promocode });
  }

  changeCity(e) {
    this.setState({ city_id: e.params.data.id });
  }

  createOrder(e) {
    e.preventDefault();

    this.props.onCreate({
      need_documents_delivery: this.state.need_documents_delivery,
      client_name: this.state.client_name,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      comment: this.state.comment,
      delivery_time: this.state.delivery_time,
      payment_type: this.props.paymentMethod,

      city_id: this.state.city_id,

      have_promocode: this.state.have_promocode,
      promocode: this.state.promocode,

      agreement_contact_info: '{}',
    });
  }

  changePhone(e, isFilled) {
    //isFilled - TODO validation
    this.setState({ phone: e.target.value });
  }

  renderForm() {
    const paymentMethod = this.props.paymentMethod;

    const data = this.props.cities.map(c => ({ text: c.name, id: c.id }));
    const citySelect = (
      <Select2
        onSelect={this.changeCity}
        className='select2--form-item'
        data={data} options={{ minimumResultsForSearch: -1, width: '190px' }}
      />
    );

    if (paymentMethod === 'partner_office' || paymentMethod === 'card_leasing') {
      return (
        <div>
          <InputPhone
            required='required'
            value={this.state.phone}
            onChange={this.changePhone}
            label='Контактный телефон'
          />
          <Input
            required='required'
            onChange={this.handleInputChange.bind(this, 'client_name')}
            label='Ваше имя'
          />
        <Textarea onChange={this.handleInputChange.bind(this, 'comment')} label='Комментарий' />
          <Checkbox
            modifiers={['form-field']}
            onChange={this.changeDelivery}
            checked={this.state.need_documents_delivery}
            labelText='Воспользоваться бесплатной доставкой документов.'
            id='delivery'
          />
          {this.state.need_documents_delivery && <div>
            <h3 className='order-sub-title'>
              Адрес для доставки документов
              <span className='order-sub-title__free'>(бесплатно)</span>
            </h3>
            {citySelect}
            <Input onChange={this.handleInputChange.bind(this, 'address')} label='Ваш адрес' />
            <Input onChange={this.handleInputChange.bind(this, 'delivery_time')} label='Удобное время' />
          </div>}
          <Checkbox
            modifiers={['form-field']}
            onChange={this.tooglePromoCode}
            checked={this.state.have_promocode}
            labelText='У меня есть промокод.'
            id='promo'
          />
          {this.state.have_promocode && (
            <Input onChange={this.handleInputChange.bind(this, 'promocode')} label='Промокод' />
          )}
        </div>
      );
    }

    if (paymentMethod === 'company') {
      return (
        <div>
          <h3 className='order-sub-title'>Контактное лицо:</h3>
          <InputPhone
            required='required'
            value={this.state.phone}
            onChange={this.changePhone}
            label='Контактный телефон'
          />
          <Input
            required='required'
            onChange={this.handleInputChange.bind(this, 'client_name')}
            label='Ваше имя'
          />
        <Input onChange={this.handleInputChange.bind(this, 'email')} label='Адрес эл.почты' />
          <Textarea onChange={this.handleInputChange.bind(this, 'comment')} label='Комментарий' />

          <h3 className='order-sub-title'>Организация (для договора):</h3>
          <Checkbox
            modifiers={['form-field']}
            onChange={this.toogleFillLater}
            labelText='Заполнить потом'
            id='fillLater'
          />
          {!this.state.fillLater && <div>
            <Input onChange={this.handleInputChange.bind(this, 'companyName')} label='Название' />
            <Input onChange={this.handleInputChange.bind(this, 'companyUNP')} label='УНП' />
            <Input onChange={this.handleInputChange.bind(this, 'companyAddress')} label='Адрес' />
            <Input onChange={this.handleInputChange.bind(this, 'companyHeadPosition')} label='Должность руководителя' />
          </div>}
          <Input onChange={this.handleInputChange.bind(this, 'companyHeadName')} label='ФИО руководителя' />
        </div>
      );
    }


    if (paymentMethod === 'visit') {
      return (
        <div>
          <InputPhone
            required='required'
            value={this.state.phone}
            onChange={this.changePhone}
            label='Контактный телефон'
          />
          <Input required='required' onChange={this.handleInputChange.bind(this, 'name')} label='Ваше имя' />
          <Input required='required' onChange={this.handleInputChange.bind(this, 'email')} label='Адрес эл.почты' />
          <h3 className='order-sub-title'>
            Адрес для доставки документов
            <span className='order-sub-title__free'>(бесплатно)</span>
          </h3>
          {citySelect}
          <Input onChange={this.handleInputChange.bind(this, 'address')} label='Ваш адрес' />
          <Input onChange={this.handleInputChange.bind(this, 'delivery_time')} label='Удобное время' />
          <Textarea onChange={this.handleInputChange.bind(this, 'comment')} label='Комментарий' />

          <Checkbox
            modifiers={['form-field']}
            onChange={this.tooglePromoCode}
            checked={this.state.have_promocode}
            labelText='У меня есть промокод.'
            id='promo'
          />
          {this.state.have_promocode && (
            <Input onChange={this.handleInputChange.bind(this, 'promocode')} label='Промокод' />
          )}
        </div>
      );
    }

    if (paymentMethod === 'online') {
      return (
        <div>
          <Input
            required='required'
            label='Фамилия'
          />
          <Input
            required='required'
            onChange={this.handleInputChange.bind(this, 'name')}
            label='Имя'
          />
          <Input required='required' label='Отчество' />
          <InputPhone
            required='required'
            value={this.state.phone}
            onChange={this.changePhone}
            label='Контактный телефон'
          />
          <Input required='required' label='Адрес эл.почты' />
          <Input required='required' label='Номер пасорта' />
          <Input
            required='required'
            label='Дата выдачи паспорта'
          />
          <Input
            required='required'
            label='Орган, выдавший паспорт'
          />
          <h3 className='order-sub-title'>
            Адрес для доставки документов
            <span className='order-sub-title__free'>(бесплатно)</span>
          </h3>
          {citySelect}
          <Input onChange={this.handleInputChange.bind(this, 'address')} label='Ваш адрес' />
          <Input onChange={this.handleInputChange.bind(this, 'email')} label='Удобное время' />

          <TouristsList />

          <Textarea onChange={this.handleInputChange.bind(this, 'comment')} label='Комментарий' />
        </div>
      );
    }

    return null;
  }

  render() {
    const form = this.renderForm();

    return (
      <div className='payment-method-container'>
        <div className='payment-method-container__types'>
          <OrderPaymentMethod
            paymentMethod={this.props.paymentMethod}
            onChange={this.props.chagePaymentMethod}
          />
        </div>
        <div className='payment-method-container__form'>
          <div >
            <form onSubmit={this.createOrder}>
              <h2 className='order-title'>Заполните ваши данные</h2>
              {form}
              <div>
                <Button
                  color='orange'
                  type='submit'
                  modifiers={['bigger']}
                >Бронировать тур на 48 часов</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderForm;
