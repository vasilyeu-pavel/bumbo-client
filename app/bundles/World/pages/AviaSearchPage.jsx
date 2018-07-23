import React from 'react';
import { extend } from 'lodash';
import { withRouter } from 'react-router';
import { compose, lifecycle, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkRequestTickets } from '../actions/aviaActionCreators';
import AviaSearchToursContainer from '../containers/AviaSearchToursContainer';
import AviaFlightsContainer from '../containers/AviaFlightsContainer';
import { queriesSelector, getDestination } from '../selectors';
import declOfNums from '../utils/declOfNum';
import AviaFlightsHeaderComponent from '../components/avia/AviaFlightsHeaderComponent/AviaFlightsHeaderComponent'
import AviaFiltersBar from '../components/avia/AviaFiltersBar'

const AviaSearchPage = props => {

  return (
    <div className='avia-search-page'>
      <div className='avia-search-page__header'>
        <AviaSearchToursContainer query={{}} mainPage={false}/>
      </div>
      <div className='avia-search-page__content-wrapper'>
        <div className='avia-search-page__content'>
        <AviaFlightsHeaderComponent {...props}/>
          <div className='avia-search-page__content__result'>
            <AviaFlightsContainer/>
          </div>
        </div>
        <AviaFiltersBar />
        </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  defaultSearchParams: state.searchToursState.get('defaultSearchParams'),
  destination: getDestination(state),
  locationQueries: queriesSelector(state),
  tickets: state.aviaSearchesState.get('tickets'),
});

const mapDispatchToProps = (dispatch) => ({
  checkRequestTickets: bindActionCreators(checkRequestTickets, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  mapProps((props) => extend({}, props, { query: props.location.query })),
  lifecycle({
    componentDidMount() {
      this.props.checkRequestTickets(this.props.match.params.id, true);
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.match.params.id !== this.props.match.params.id) {
        this.props.checkRequestTickets(nextProps.match.params.id, true);
      }
    },
  })
);

export default enhance(AviaSearchPage);
