var React = require('react');

import PopupPanel from './../components/PopupPanel.jsx';

var OrderAllConditions = React.createClass({
  render  : function () {
    return <div>
          <h5> В стоимость тура входит: </h5>
          <p>авиаперелет, экономический класс; трансфер аэропорт - отель – аэропорт; проживание в отеле выбранное количество ночей на базе указанного питания; медицинская страховка.  </p>
          <h5>Документы, которые вы получите после покупки тура*: </h5>
          <p>Договор о подборе, бронировании и приобретении тура – документ, отражающий реквизиты сторон, условия купли – продажи тура, права и обязанности сторон, а так же свойства туристского продукта; Ваучер туристический - документ, устанавливающий право туриста на услуги, входящие в состав тура, и подтверждающий факт их передачи. По прибытии туриста (туристов) в пункт прибытия ваучер передается принимающей стороне; Электронный билет или e-ticket (современная замена бумажному билету); Медицинская страховка.</p>

          <h5>Правила отмены бронирования тура: </h5>
          <p>Условия отмены бронирования зависят от типа отдыха, сезонности поездки и туроператора. Наиболее часто встречающиеся у туроператоров расходы (штрафы) при отмене бронирования тура позднее 21 дня до даты вылета:</p>
          <p>при отмене от 15 до 11 дней - 10% стоимости тура, при отмене от 10 до 6 дней - 50 % стоимости тура, при отмене от 5 и менее дней - 100 % стоимости тура. При возникновении необходимости отмены забронированного тура, точный размер фактически понесенных расходов уточняйте у менеджера.</p>
        </div>;
  }
});

function format(number) {
  if (!number) return number;

  return number.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,'\$1 ');
}


var FieldItem = React.createClass({
  render : function () {
    var css = 'field-items';
    //TODO: cx
    css += this.props.last ? ' field-items--last' : '';
    css += this.props.first ? ' field-items--first' : '';

    return <div className={css}>
      <div className="field-items__label">{this.props.label}</div>
      <div className="field-items__value">{this.props.children}</div>
    </div>;
  }
});

var OrderAdditionalInfo = React.createClass({
  getInitialState: function () {
    return {
      allConditions : false
    };
  },
  togglePanel : function () {
    this.setState({ allConditions : !this.state.allConditions });
  },
  render : function () {
    var { order } = this.props;

    if (!order) return null;
  //  order.oil_duty = '12$';

    var final_price = format(order.tour_final_price) + ' ' + order.currency_name;
    var operator_logo_link = order.operator_logo_link;
    var tour_operator_name = order.tour_operator_name;
    var tour_prepayment_percent = order.tour_prepayment_percent;
    var tour_prepayment_nominal = order.tour_discount_nominal;
    var tour_url = order.tour_url;
    var tour_prepayment_nominal = format(tour_prepayment_nominal) + ' ' + order.currency_name;
    // var included = "питание, перелеты, проживание, страховка, трансфер до отеля " + serverData.tour_oil_duty;
    var included = 'питание, перелеты, проживание, страховка, трансфер до отеля.';
    var extra = order.tour_visa_duty > 0 ? 'визовый сбор ' + order.tour_visa_duty +'$ (при необходимости).' : 'Визовый сбор отсутствует';

    // order.oil_duty ??;
    var paymentMethod = this.props.paymentMethod;

    var partner;
    /*
    var benefit = <div className="order-additional-info__benefit">
      <p className="benefit-item benefit-item--delivery" >Бесплатная доставка документов!</p>
    </div>
  */
    var isPartnerOffice = paymentMethod === 'partner-office';

    var benefit = (<div className="order-additional-info__benefit-container">
          <h3 className="order-additional-info__benefit-title">Бронируя тур у нас вы получаете:</h3>
          <p className="benefit-item benefit-item--delivery" >БЕСПЛАТНАЯ доставка готовых документов (ваучер, билеты, страховки, виза)!</p>
          {true && <p className="benefit-item benefit-item--insurance">В ПОДАРОК страховка “Белгосстрах”  от невылета стоимостью 15$!
</p>}
      </div>);

    if (true) {


      partner = <div>
        <h3 className="additional-conditions__title">Туроператор</h3>
        <div className="tour-operator">
          <img src={operator_logo_link} className="tour-operator__logo"/>
          <span className="tour-operator__name"><a href={tour_url}>{tour_operator_name}</a></span>
        </div>
      </div>;
    }


    return <div>
      <PopupPanel>
        <div className="order-additional-info">
          <div className="order-additional-info__left">
            <FieldItem label="Стоимость тура:">
              {final_price}
            </FieldItem>
            <FieldItem label="Топливный сбор:">
              {order.oil_duty
                ? <span>Включен <span className="field-items__small-value">&nbsp;({order.oil_duty})</span></span>
                : <span>Отсутствует</span>}
            </FieldItem>
            <FieldItem last={true} label={'Предоплата (' + tour_prepayment_percent + '%):'}>
              {tour_prepayment_nominal}
            </FieldItem>
            {benefit}
          </div>
          <div className="order-additional-info__right">
            <div className="additional-conditions">
              {partner}

              <h3 className="additional-conditions__title">Дополнительные условия</h3>
              <p className="additional-conditions__item">
                <b>Включены:</b> {included}
              </p>
              <p className="additional-conditions__item">
               <b>Не включены:</b> {extra}
              </p>
            </div>
            <a onClick={this.togglePanel} href="javscript:void(0)" className="order-link">Просмотреть все условия</a>
          </div>
        </div>
        {this.state.allConditions && <OrderAllConditions/>}
      </PopupPanel>
    </div>;
  }
});



module.exports = OrderAdditionalInfo;
