/* eslint max-len: 0 */

import React, { Component } from 'react';
import { bindAll } from 'lodash';
import formattedPrice from '../utils/price';

export default class OrderExtendedInfo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      prepayment: false,
      havePromocode: false,
    };

    bindAll(this, [
      'handleChangePrepayment',
      'handlePromoChange',
      'handlePromocodeChange',
      'transferInfoText',
    ]);
  }

  handleChangePrepayment(id, checked) {
    this.props.onChange('prepayment', checked);
  }

  handlePromoChange() {
    if (this.state.havePromocode) {
      this.props.onChange('promocode', '');
    }

    this.props.onChange('have_promocode', !this.props.havePromocode);
  }

  handlePromocodeChange(event) {
    const { value, name } = event.target;

    this.props.onChange(name, value);
  }

  tourUrl() {
    const { tourData } = this.props;
    const { tourUrl } = tourData;

    if (tourUrl === '') return (<span className='order-extended-info__title__operator'>{tourData.operatorName}</span>);

    return (<a className='order-extended-info__title__operator order-extended-info__title__operator--green' href={tourData.tourUrl} target="_blank">{tourData.operatorName}</a>);
  }

  transferInfoText() {
    const { transfer } = this.props.tourData;

    if (transfer === 'unknown') return 'Неизвестно';

    if (transfer) {
      return 'Групповой, аэропорт-отель-аэропорт';
    } else {
      return (<span style={{ color: 'red' }}>Не включен</span>);
    }
  }

  render() {
    const { tourData } = this.props;
    const { transfer } = tourData;

    return (
      <div className='order-extended-info'>
      <div className='order-extended-info__header'>
        <div className='order-extended-info__header__title'>Итоговая cтоимость:</div>
        <div className='order-extended-info__header__title'>Пассажиры:</div>
        <div className='order-extended-info__header__title'>Авиаперелёт:</div>
        <div className='order-extended-info__header__title'>Мед. страховка:</div>
        <div className='order-extended-info__header__title'>Трансфер:</div>
        <div className='order-extended-info__header__title'>Багаж:</div>
      </div>
      <div className='order-extended-info__content'>
        <div className='order-extended-info__content__element'>
          <span className='order-extended-info__content__element__price__value'>{formattedPrice(tourData.price)}руб</span>
        </div>
        <div className='order-extended-info__content__element'>
          2 взрослых
        </div>
        <div className='order-extended-info__content__element'>
          <img src='/images/check.png'/>
        </div>
        <div className='order-extended-info__content__element'>
          <img src='/images/check.png'/>
        </div>
        <div className='order-extended-info__content__element'>
          <img src='/images/unCkeck.png'/>
        </div>
        <div className='order-extended-info__content__element'>
          <div className='order-extended-info__content__element__baggage'>
            <img src='/images/check.png'/>
          </div>
          <div>20кг</div>
          <div>+ ручная кладь</div>
        </div>
      </div>
      </div>
    );
  }
}
