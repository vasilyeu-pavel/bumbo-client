import React, { Component, PropTypes } from 'react';
import RadioButton from './common/RadioButton';

class OrderPaymentMethod extends Component {
  static propTypes = {
    paymentMethod: PropTypes.string,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.changeMethod = this.changeMethod.bind(this);
  }

  changeMethod(paymentMethod) {
    this.props.onChange(paymentMethod);
  }

  render() {
    const { paymentMethod } = this.props;

    const items = [
        {
          title: 'Наличными или картой в одном из ',
          description: 'турагентств-партнеров',
          key: 'partner_office',
        },
        {
          title: 'Картой рассрочки \'Халва\' или ',
          description: 'бонусной картой \'Халва+\' в нашем офисе',
          key: 'card_leasing',
        },
        {
          title: 'Наличными, с выездом нашего ',
          description: 'специалиста на ваш адрес.',
          key: 'visit',
        },
        {
          title: 'Онлайн-оплата банковской картой ',
          description: 'Visa или MasterCard',
          key: 'online',
        },
        {
          title: 'Оплата организацией-юридическим ',
          description: 'лицом через расчетный счет',
          sale: 3,
          key: 'company',
        },
    ];

    return (
      <div className='payment-method'>
        <h2 className='order-title'>Споcоб оплаты</h2>
        <div>
          {items.map((item) => (
            <RadioButton
              onChange={() => this.changeMethod(item.key)}
              key={item.key}
              checked={paymentMethod === item.key}
              id={item.key}
              name='paid-type'
            >
              <span className='payment-method__label payment-method__label--title'>
                {item.title}
              </span>
              <br />
              {item.description && <span className='payment-method__label'>
                {item.description}
              </span>}
              {item.sale && <div className='payment-method__sale'>-{item.sale}%</div>}
            </RadioButton>
          ))}
        </div>

        {paymentMethod === 'online' && (
          <div className='payment-details'>
            <p className='payment-details__title'>Уважаемый клиент!</p>

            <p>Вы можете оплатить свой заказ онлайн с помощью банковской карты через платежный
              сервис компании Uniteller. После подтверждения заказа Вы будете перенаправлены на
               защищенную платежную страницу Uniteller, где необходимо будет ввести данные для
               оплаты заказа. После успешной оплаты на указанную в форме оплаты электронную
               почту будет направлен электронный чек с информацией о заказе и данными по
               произведенной оплате.
             </p>

            <p className='payment-details__title'>Гарантии безопасности</p>

            <p>Безопасность процессинга Uniteller подтверждена сертификатом стандарта
              безопасности данных индустрии платежных карт PCI DSS. Надежность сервиса
              обеспечивается интеллектуальной системой мониторинга мошеннических операций,
              а также применением 3D Secure - современной технологией безопасности
              интернет-платежей.
            </p>

            <p>Данные Вашей карты вводятся на специальной защищенной платежной странице.
              Передача информации в процессинговую компанию Uniteller происходит с применением
              технологии шифрования TLS. Дальнейшая передача информации осуществляется по
              закрытым банковским каналам, имеющим наивысший уровень надежности.
            </p>

            <p className='payment-details__title'>Uniteller не передает данные Вашей
              карты магазину и иным третьим лицам!
            </p>

            <p>Если Ваша карта поддерживает технологию 3D Secure, для осуществления платежа,
              Вам необходимо будет пройти дополнительную проверку пользователя в банке-эмитенте
              (банк, который выпустил Вашу карту). Для этого Вы будете направлены на страницу
              банка, выдавшего карту. Вид проверки зависит от банка. Как правило, это дополнительный
              пароль, который отправляется в SMS, карта переменных кодов, либо другие способы.
            </p>

            <p>Если у Вас возникли вопросы по совершенному платежу, Вы можете обратиться в службу
              технической поддержки процессингового центра Uniteller:
              <a href='mailto:support@uniteller.ru'>support@uniteller.ru</a>
              или по телефону 8 800 100 19 60.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default OrderPaymentMethod;
