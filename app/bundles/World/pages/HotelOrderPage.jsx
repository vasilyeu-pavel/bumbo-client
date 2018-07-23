import { withRouter } from 'react-router';
import { compose, lifecycle, branch, renderComponent, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import Order from '../components/Order';
import { bindActionCreators } from 'redux';
import { queriesSelector } from '../selectors';
import { isEmpty } from 'lodash';
import { fetchHotelOrderInfo, createHotelOrder, actualizeHotelOrder, createAviaOrderRequest } from '../actions/orderActionCreators';

const mapStateToProps = (state) => ({
  queries: queriesSelector(state),
  order: state.orderState.get('order'),
  flightsAreLoading: state.orderState.get('flightsAreLoading')
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrderInfo: bindActionCreators(fetchHotelOrderInfo, dispatch),
  createOrder: bindActionCreators(createHotelOrder, dispatch),
  actualizeHotelOrder: bindActionCreators(actualizeHotelOrder, dispatch),
  createOrderRequest: bindActionCreators(createAviaOrderRequest, dispatch)
});

const nothing = compose(
  lifecycle({
    componentWillMount() {
      const orderId = this.props.match.params.id;

      this.props.fetchOrderInfo(orderId, {});
    },
  }),
  renderNothing
);

const nothingWhileFetching = (test, Component) => branch(
  test,
  nothing,
  renderComponent(Component)
);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  nothingWhileFetching((props) => !props.order, Order)
)(Order);
