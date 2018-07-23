import { withRouter } from 'react-router';
import { compose, lifecycle, branch, renderComponent, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import Order from '../components/Order';
import { bindActionCreators } from 'redux';
import { queriesSelector } from '../selectors';
import { fetchAviaOrderInfo, createAviaOrder, createAviaOrderRequest } from '../actions/orderActionCreators';

const mapStateToProps = (state) => ({
  queries: queriesSelector(state),
  order: state.orderState.get('order'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrderInfo: bindActionCreators(fetchAviaOrderInfo, dispatch),
  createOrder: bindActionCreators(createAviaOrder, dispatch),
  createOrderRequest: bindActionCreators(createAviaOrderRequest, dispatch),
});

const nothing = compose(
  lifecycle({
    componentWillMount() {
      const orderId = this.props.match.params.id;
      const { marker, variant } = this.props.queries;

      this.props.fetchOrderInfo(orderId, { marker, variant });
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
