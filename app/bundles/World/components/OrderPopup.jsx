import React, { Component } from 'react';
import request from 'axios';
import OrderInfo from './OrderInfo.jsx';
import OrderAdditionalInfo from './OrderAdditionalInfo.jsx';
import OrderForm from './OrderForm.jsx';
import OrderCompleted from './OrderCompleted.jsx';
import _ from 'lodash';
import Immutable from 'immutable';

class OrderPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: null,
      orderComment: null,
      orderPhone: null,
      orderClientName: null,
      orderEmail: null,

      showMap: false,
      mapCenter: [55.75396, 37.620393],

      authenticityToken: null,

      paymentMethod: 'partner_office',
    };

    this.listener = (event) => {
      if (event.keyCode === 27) {
        this.handleClosePopup();
      }
    };

    _.bindAll(this, [
      'chagePaymentMethod',
      'createOrder',
      'changeCity',
      'toggleMap',
      'changeMapCenter',
      'handleClosePopup',
    ]);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.listener, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.listener, false);
  }

  chagePaymentMethod(paymentMethod) {
    this.setState({ paymentMethod });
  }

  createOrder(params) {
    const data = _.extend({}, params, { tour_hash: this.props.params.tour_hash });

    this.props.createOrder(data, this.props.authenticityToken);
  }

  toggleMap() {
    this.setState({ showMap: !this.state.showMap });
  }

  changeMapCenter(center) {
    this.setState({ mapCenter: center });
  }

  changeCity(obj) {
    // this.props.fetchTourPartners(obj.id);
    // getPartners(obj.id).then(partners => this.setState({ partners }));
  }

  handleClosePopup() {
    this.props.closePopup();
  }

  render() {
    const {
      paymentMethod,
      showMap,
      mapCenter,
    } = this.state;
    const { completedOrder } = this.props;


    const { params } = this.props;

    if (this.props.orderStatus === 'completed') {
      return (
        <div className='order-popup'>
          <div className='order-popup__inner'>
            <div className='order-popup__close' onClick={this.handleClosePopup}></div>
            <div className='order-popup__content'>
              <OrderCompleted
                orderId = {completedOrder.orderId}
                tourHash = {completedOrder.tourHash}
                orderPhone = {completedOrder.orderPhone}
                orderClientName = {completedOrder.orderClientName}
                orderEmail = {completedOrder.orderEmail}
                deliveryTime = {completedOrder.deliveryTime}
                orderComment = {completedOrder.orderComment}
                needDelivery = {completedOrder.needDelivery}
                orderDeliveryAdress = {completedOrder.orderDeliveryAdress}
                onChangeCity = {this.changeCity}
                onToggleMap = {this.toggleMap}
                partners = {this.props.partners.toArray()}
                cities = {this.props.cities.toArray()}
                showMap = {showMap}
                mapCenter = {mapCenter}
                changeMapCenter = {this.changeMapCenter}
                order = {params}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='order-popup'>
        <div className='order-popup__inner'>
          <div className='order-popup__close' onClick={this.handleClosePopup}></div>
          <div className='order-popup__content'>
            <OrderInfo order={params} />

            <OrderAdditionalInfo
              order = {params}
              paymentMethod = {paymentMethod}
            />

            <OrderForm
              cities = {this.props.cities}
              chagePaymentMethod={this.chagePaymentMethod}
              paymentMethod = {paymentMethod}
              onCreate = {this.createOrder}
            />
          </div>
        </div>
      </div>
    );
  }
}

OrderPopup.propTypes = {
  authenticityToken: React.PropTypes.string,
  params: React.PropTypes.object,
  cities: React.PropTypes.instanceOf(Immutable.List),
  partners: React.PropTypes.instanceOf(Immutable.List),
};

export default OrderPopup;
