import AviaToursFilter from './../components/avia/AviaToursFilter';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { compose, mapProps } from 'recompose';
import {
  updateSearchParams,
  updateSearchDestination,
  removeSearchDestination,
  checkedValidation,
} from '../actions/searchToursActionCreators';
import _ from 'lodash';
import { getDestination, queriesWithParamsStringSelector } from '../selectors';
import { createNewAviaSearch } from '../actions/aviaActionCreators';

const mapStateToProps = (state, ownProps) => ({
  isMainPage: ownProps.mainPage,
  destination: getDestination(state, ownProps),
  
  validInputDestination: state.searchToursState.get('validInputDestination'),
  validInputDateFrom: state.searchToursState.get('validInputDateFrom'),
  validInputDateTo: state.searchToursState.get('validInputDateTo'), 

  defaultDestination: state.searchToursState.get('defaultDestination'),
  locationQueriesStringWithParams: queriesWithParamsStringSelector(state),
  searchParams: state.searchToursState.get('searchParams'),
  departFrom: state.searchToursState.get('departFrom'),
  kidsAgesSelect: state.searchToursState.get('kidsAgesSelect').toJS(),
  priceDptCities: state.searchToursState.get('priceDptCities'),
  priceDates: state.searchToursState.get('priceDates'),
  minPriceDates: state.searchToursState.get('minPriceDates'),
  minPriceNights: state.searchToursState.get('minPriceNights'),
  maxPriceNights: state.searchToursState.get('maxPriceNights'),
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchParams: bindActionCreators(updateSearchParams, dispatch),
  updateSearchDestination: bindActionCreators(updateSearchDestination, dispatch),
  createNewAviaSearch: bindActionCreators(createNewAviaSearch, dispatch),
  removeSearchDestination: bindActionCreators(removeSearchDestination, dispatch),
  checkedValidation: bindActionCreators(checkedValidation, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  mapProps(props => {
    const queries = props.query;
    const isPartners = true;
    const searchParams = props.searchParams.toJS();
    const nightsRange = !_.isUndefined(searchParams.nights_range)
      ? searchParams.nights_range
      : queries.nights_range;

    const params = {
      isPartners,
      adults: parseInt(searchParams.adults || queries.adults, 10),
      nights: parseInt(searchParams.nights || queries.nights, 10),
      nights_range: parseInt(nightsRange, 10),
      date_from: searchParams.date_from || queries.date_from,
      date_to: searchParams.date_to || queries.date_to,
      city_from_id: parseInt(searchParams.city_from_id || queries.city_from_id, 10),
      kids_ages: searchParams.kids_ages || queries.kids_ages,
    };

    return _.extend({}, props, { searchParams: params });
  }),
);

export default enhance(AviaToursFilter);
  