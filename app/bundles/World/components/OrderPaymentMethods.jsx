/* eslint max-len: 0 */

import React, { Component, PropTypes } from 'react';
import RadioButton from './common/RadioButton';
import classNames from 'classnames';

const OrderPaymentMethod = ({ method, onChange, currentPaymentMethod }) => {
  const isDisabled = method.disabled === 'disabled';
  const isCurrentPaymentMethod = currentPaymentMethod === method.key;
  const handleChange = () => {
    if (!isDisabled) onChange(method.key);
  };

  return (
    <div
      onClick={handleChange}
      key={method.key}
      className={classNames(
        'order-payment-method',
        { 'order-payment-method--active': isCurrentPaymentMethod },
        { 'order-payment-method--disabled': isDisabled }
      )}
    >
      <RadioButton
        onChange={handleChange}
        checked={isCurrentPaymentMethod}
        id={method.key}
        disabled={method.disabled}
        name='paid-type'
      >
        <span
          className='payment-method__label payment-method__label--title'
          dangerouslySetInnerHTML={{ __html: method.title }}
        ></span>
        <br />
        {method.description && <span className='payment-method__label'>
          {method.description}
        </span>}
      </RadioButton>
      {method.sale && <div className='order-payment-method__sale'>-{method.sale}%</div>}
    </div>
  );
};

class OrderPaymentMethods extends Component {
  static propTypes = {
    paymentMethod: PropTypes.string,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      methods: [
        {
          title: 'Онлайн-оплата банковской картой ',
          description: 'Мы принимаем Visa и MasterCard',
          key: 'online',
        },
        {
          title: 'Наличными или картой курьеру',
          description: 'Бесплатный выезд специалиста с пакетом документов',
          key: 'visit',
          disabled: 'disabled',
        },
        {
          title: 'Для юридических лиц <br>',
          sale: 2,
          description: 'Безналичный расчет',
          key: 'company',
          disabled: 'disabled',
        },
      ],
    };
  }

  handlePaymentChange = (paymentMethod) => {
    this.props.onChange(paymentMethod);
  }

  render() {
    return (
      <div className='order-payment-methods'>
        {this.state.methods.map((method) => (
          <OrderPaymentMethod
            key={method.key}
            method={method}
            currentPaymentMethod={this.props.paymentMethod}
            onChange={this.handlePaymentChange}
          />
        ))}
      </div>
    );
  }
}

export default OrderPaymentMethods;
