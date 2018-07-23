import React from 'react';
import { extend } from 'lodash';
import { withRouter } from 'react-router';
import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPartnersHotels } from '../actions/appActionCreators';
import AviaSearchToursContainer from '../containers/AviaSearchToursContainer';
import { queriesSelector, getDestination } from '../selectors';
import MainContentHeader from './MainContentHeader';

const MainPageAvia= (props, context) => (
  <div className="landing__content">
    <MainContentHeader />
    <AviaSearchToursContainer query={{}} mainPage={true}/>
    <p>{context}</p>
  </div>
);

const mapStateToProps = (state) => ({
  defaultSearchParams: state.searchToursState.get('defaultSearchParams'),
  destination: getDestination(state),
  locationQueries: queriesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPartnersHotels: bindActionCreators(fetchPartnersHotels, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  mapProps((props) => extend({}, props, { query: props.location.query })),
);

export default enhance(MainPageAvia);
