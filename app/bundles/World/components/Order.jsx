import React, { PropTypes, Component } from 'react';
import OrderInfo from './avia/OrderInfo';
import OrderExtendedInfo from './OrderExtendedInfo';
import OrderAviaFlights from './OrderAviaFlights';
import OrderCampers from './OrderCampers';
import formattedPrice from '../utils/price';
import Input from './common/Input';
import Checkbox from './common/Checkbox';
import Button from './common/Button/Button';
import InputPhoneNumber from './common/InputPhoneNumber';
import { bindAll } from 'lodash';

export default class Order extends Component {
  static propTypes = {
    match: PropTypes.object,
    order: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    const { adults, kids } = this.props.order.tourData;
    const participants = adults + kids;
    const touristsAttributes = [];

    for (let i = 0; i < participants; i++) {
      const camper = {
        name_latin: '',
        surname_latin: '',
        birthday: '',
        passport_number: '',
        pass_estimate_date: '',
        sex: 'male',
        nationality: 'Россия',
      };

      touristsAttributes[i] = camper;
    }

    this.state = {
      step: 1,
      order: {
        agreement_contact_info: false,
        have_promocode: false,
        prepayment: false,
        promocode: '',
        payment_type: 'online',
        client_name: '',
        phone: '',
        tourists_attributes: touristsAttributes,
      },
    };

    bindAll(this, [
      'handleChangePaymentMethod',
      'handleInputChange',
      'handleOrderInputChange',
      'handleCamperInfoChange',
      'handlePhoneChange',
      'handleFormSubmit',
      'renderContactForm',
      'renderCardForm',
    ]);
  }

  componentWillMount() {
    const { adults, kids } = this.props.order.tourData;
    const participants = adults + kids;

    for (let i = 0; i < participants.length; i++) {
      const camper = {
        id: i,
        name_latin: '',
        surname_latin: '',
        birthday: '',
        passport_number: '',
        pass_estimate_date: '',
        sex: 'male',
        nationality: {},
      };

      this.setState({ order: {
        ...this.state.order,
        tourists_attributes: [...this.state.order.tourists_attributes, [i]: camper],
      } });
    }
  }

  componentDidMount() {
    if (this.props.actualizeHotelOrder) {
      this.props.actualizeHotelOrder(this.props.match.params.id);
    }
  }

  handleChangePaymentMethod(method) {
    this.setState({ order: { ...this.state.order, payment_type: method } });
  }

  handleInputChange(event) {
    const { value, name } = event.target;

    this.setState({ order: { ...this.state.order, [name]: value } });
  }

  handleOrderInputChange(name, value) {
    this.setState({ order: { ...this.state.order, [name]: value } });
  }

  handlePhoneChange(number, phoneData) {
    this.setState({ order: { ...this.state.order, phone: number } });
  }

  handleCamperInfoChange(index, name, value) {
    const campers = this.state.order.tourists_attributes;
    const newCampers = [...campers];

    newCampers[index][name] = value;

    this.setState({ order: {
      ...this.state.order,
      tourists_attributes: newCampers,
    } });
  }

  renderCardForm() {
    const { price } = this.props.order.tourData;

    return (
      <div className='order-page__footer'>
        <div className='order-page__payment-info'>
          После нажатия на кнопку
          «Оплатить и забронировать» на вашей карте будет заморожена сумма {formattedPrice(price)} руб.
          <div>
            Как только бронирование вашего тура будет подтверждено, данная сумма будет списана
            с карты, и вы получите подтверждение бронирования.
          </div>
        </div>
        <div className='order-page__submit'>
          <div className='order-page__agreement'>
            <Checkbox
              id='agreement_contact_info'
              required='required'
              checked={this.state.order.agreement_contact_info}
              labelText={`Я ознакомлен с договором и принимаю условия договора.`}
              onChange={this.handleOrderInputChange}
            />
          </div>
          <div className='order-page__payment-button'>
            <Button color='blue'>
              Оплатить и забронировать
            </Button>
          </div>
        </div>
      </div>
    );
  }

  renderContactForm() {
    return (
      <div className='order-page__inner'>
        <div className='order-page__contacts'>
          <div className='order-page__inputs'>
            <div className='order-page__input'>
              <Input
                required='required'
                pattern='[A-Za-zА-Яа-яЁё]{2,30}'
                style={{ borderRadius: '2px' }}
                value={this.state.order.client_name}
                name='client_name'
                onChange={this.handleInputChange}
                autoComplete='given-name'
                label='Ваше имя'
              />
            </div>
            <div className='order-page__input'>
              <InputPhoneNumber
                label='Контактный телефон'
                value={this.state.order.phone}
                onChange={this.handlePhoneChange}
              />
            </div>
          </div>
          <div className='order-page__contacts-caption'>
            Пожалуйста, внимательно  заполните поля с паспортными данными
          </div>
        </div>
      </div>
    );
  }

  renderCampers() {
      return (
        <OrderCampers
          adults={this.props.order.tourData.adults}
          kids={this.props.order.tourData.kids}
          campers={this.state.order.tourists_attributes}
          onChange={this.handleCamperInfoChange}
        />
      );
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.createOrder(this.state.order, this.props.match.params.id);
  }

  transferInfo() {
    const transferText = this.transferInfoText();

    return (
      <p className='order-extended-info__text'>
        {transferText}
      </p>
    );
  }

  transferInfoText() {
    const { tourData } = this.props.order;
    const { transfer } = tourData;

    if (transfer === 'unknown') return this.tourOperatorUrl('Не известно');

    if (transfer) {
      return 'Групповой, аэропорт-отель-аэропорт';
    } else {
      return (<span style={{ color: 'red' }}>Не включен</span>);
    }
  }

  tourOperatorUrl(linkText) {
    const { tourData } = this.props.order;
    const { tourUrl } = tourData;
    const linkStyle = {
      display: 'block',
      paddingBottom: '20px',
    };

    if (tourUrl === '') {
      return (
        <span
          style={linkStyle}
          className='order-extended-info__title__operator'
        >
          {linkText}
        </span>
      );
    }

    return (
      <a
        style={linkStyle}
        className='order-extended-info__title__operator order-extended-info__title__operator--green'
        href={tourData.tourUrl} target="_blank"
      >
        {linkText}
      </a>
    );
  }

  insurance() {
    return (
      <div style={{ paddingBottom: '10px' }}>
        Страховка на предоставление медицинской помощи на каждого клиента.
      </div>
    );
  }

  render() {
    const { hotelData, tourData, flightData } = this.props.order;

    return (
      <form className='order-page' onSubmit={this.handleFormSubmit}>
        <div className='order-page__main-inner'>
          <div className='order-page__flights'>
            <div className='order-page__flights__inner'>
            <div className='order-page__flight__header'>Информация о рейсе</div>
              <OrderAviaFlights flightData={flightData} />
            </div>
          </div>
          <div className='order-page__main'>
            <div className='order-page__hotel-title-wrap'>
              <div className='order-page__hotel-title'>
                <div className='order-page__hotel-title__text'>
                  Пакетный тур в {hotelData.key}
                </div>
                <div className='order-page__hotel-title__touroperator'>
                  Туроператор {tourData.operatorName}
                </div>
              </div>
              <div
                className='order-page__touroperator-logo'
                style={{ backgroundImage: `url(${`/images/operators/${tourData.operatorId}.png`})` }}
              ></div>
            </div>

            <OrderInfo
              hotelData={hotelData}
              tourData={tourData}
              isWide={true}
            />
            {this.renderContactForm()}
            {this.renderCampers()}
            <OrderExtendedInfo
              tourData={tourData}
              havePromocode={this.state.order.have_promocode}
              prepayment={this.state.order.prepayment}
              onChange={this.handleOrderInputChange}
            />
            {this.renderCardForm()}
          </div>
        </div>
      </form>
    );
  }
}
