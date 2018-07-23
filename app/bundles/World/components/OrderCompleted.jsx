import React, { Component, PropTypes } from 'react';
import PopupPanel from './../components/PopupPanel.jsx';
import Select2 from 'react-select2-wrapper';
import YandexMap from './YandexMap.jsx';
import request from 'axios';

const OrderAgentsPartnersItem = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.address}</td>
    <td>пн-пт {props.working_hours_weekdays}, сб {props.working_hours_weekends}</td>
    <td><div className='partner-phone-item'><span>{props.contact_phone}</span></div></td>
  </tr>
);

OrderAgentsPartnersItem.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  working_hours_weekdays: PropTypes.string,
  working_hours_weekends: PropTypes.string,
  contact_phone: PropTypes.string,
};


function OrderAgentsPartners({ onChangeCity, partners, cities, onToggleMap, showMap, mapCenter, changeMapCenter }) {
  const rows = partners.map(partner => <OrderAgentsPartnersItem key={partner.id} {...partner} />);

  const changeCity = (e) => {
    onChangeCity(e.params.data);
    request.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${e.params.data.text}&format=json&kind=locality`)
      .then(res => {
        const cityLocation = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');

        cityLocation[0] = Number(cityLocation[0]);
        cityLocation[1] = Number(cityLocation[1]);

        const swap = cityLocation[1];
        cityLocation[1] = cityLocation[0];
        cityLocation[0] = swap;

        changeMapCenter(cityLocation);
      });
  };

  const toggleMap = () => {
    onToggleMap();
  };

  const data = cities.map(city => ({ text: city.name, id: city.id }));
  const citySelect = (
    <Select2
      onSelect={changeCity}
      className='select2--green'
      id='select2-success-city'
      data={data} options={{ minimumResultsForSearch: -1, width: '100px' }}
    />
  );

  const mapToggleButton = showMap
    ? (<span className='order-link' onClick={toggleMap}>Скрыть карту</span>)
    : (<span className='order-link' onClick={toggleMap}>Показать на карте</span>);

  return (
    <div className='order-agents-partners'>
      <div className='order-agents-partners__filters'>
        {citySelect}

        {mapToggleButton}
      </div>

      <table className='order-agents-partners__table'>
        <caption>Агенства-партнеры jamm.travel</caption>
        {!showMap && (
        <thead>
          <tr>
            <th>Название</th>
            <th>Адрес</th>
            <th>Время работы</th>
            <th className='partner-phone-th'>Телефон</th>
          </tr>
        </thead>
        )}
        {!showMap && (
        <tbody>
        {rows}
        </tbody>
        )}
      </table>
      {showMap && (
        <YandexMap
          className = {'order-complited__agents-map'}
          height = {500}
          center = {mapCenter}
          zoom = {10}
          markers = {partners}
          showMap = {showMap}
          cities = {cities}
        />
      )}
    </div>
  );
}

OrderAgentsPartners.propTypes = {
  cities: PropTypes.array,
  partners: PropTypes.array,
  onChangeCity: PropTypes.func,
  onToggleMap: PropTypes.func,
};

const getHostNameWithoutSubdomain = (host) => {
  const spplitted = host.split('.');
  const sliceSize = spplitted.length;

  if (sliceSize === 1) {
    return spplitted.slice(-1).join('.');
  }

  if (sliceSize > 1) {
    return spplitted.slice(-2).join('.');
  }
};

const OrderCompleted = props => (
  <div className='order-complited'>
    <h2 className='order-complited__title'>Отлично!</h2>
    <h3 className='order-complited__sub-title'>Вы заказали тур, заказ дейстует 48 часов</h3>
    <div className='order-complited__order-number'>
      <div className='order-number'>
        <span className='order-number__label'>Номер вашего заказа</span>
        <a href={`http://agent.${getHostNameWithoutSubdomain(location.hostname)}${location.port ? `:${location.port}` : ''}/${props.tourHash}`} className='order-number__number'>{props.orderId}</a>
      </div>
    </div>

    <PopupPanel>
      <p className='order-complited__text'>
        <b>Сохраните номер заказа, скачайте pdf файл или распечатайте его.</b><br />
        С ним вы можете обратится в любое из агенств - наших партнеров и внести предоплату {props.order.tour_discount_nominal} р.<br />
        Мы организуем бесплатную доставку готовых документов, включая страховку от невылета в Подарок.
      </p>
      <button className='order-btn'>Скачать pdf с вашим заказом</button>
    </PopupPanel>
      <OrderAgentsPartners
        onChangeCity={props.onChangeCity}
        onToggleMap={props.onToggleMap}
        cities={props.cities}
        partners={props.partners}
        showMap = {props.showMap}
        changeMapCenter = {props.changeMapCenter}
        mapCenter = {props.mapCenter}
      />

    <div className="order-complited__footer">
      По всем вопросам можете обращаться в jamm.travel:
      <span className="order-complited__phone-number">
        766-66-32
      </span>
      (velcom, life, МTC)
    </div>
    <div className="order-complited__additional-info">
      <p>
        {props.orderClientName}, {props.orderPhone}, {props.orderEmail}
      </p>
      <p>
          {props.orderComment}
      </p>
      {props.needDelivery && (
        <p>
          Доставка документов: {props.orderDeliveryAdress}, {props.deliveryTime}
        </p>
      )}
    </div>
  </div>
);

OrderCompleted.propTypes = {
  order: PropTypes.object,
  orderId: PropTypes.number,
  tourHash: PropTypes.string,
  cities: PropTypes.array,
  partners: PropTypes.array,
  onChangeCity: PropTypes.func,
};

export default OrderCompleted;
