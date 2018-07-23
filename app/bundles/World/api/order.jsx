import request from 'axios';

export default {
  getPartners: () =>
    request.get('/tour_agencies.json').then(res => res.data),
  getCities: () =>
    request.get('/cities').then(res => res.data),
  getNewOrder: (params) =>
    request.get('/orders/new.json', { params }).then(res => res.data.order),
  createOrder: (params) =>
    request.post('/orders.json', params).then(res => res.data),
};
