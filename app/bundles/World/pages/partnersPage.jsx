import React from 'react';
import { extend, pick, isEqual } from 'lodash';
import { withRouter } from 'react-router';
import { compose, mapProps, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPartnersHotels } from '../actions/appActionCreators';
import AsideCardsContainer from '../containers/AsideCardsContainer';
import SearchToursContainer from '../containers/SearchToursContainer';
import { queriesSelector, getDestination } from '../selectors';

const PartnersPage = (props, context) => (
  <div className='landing__content'>
    <div className='landing__filter'>
      <div className='search-tour'>
        <SearchToursContainer query={{}} partners={true}/>
      </div>
    </div>
    <p>{context}</p>
    <div className='landing__world'>
      <div className='world world--partners'>
        <div className='world__aside world__aside--partners'>
          dasdsa
          <AsideCardsContainer query={{}} partners={true}/>
        </div>
      </div>
    </div>
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
  lifecycle({
    componentWillMount() {
      const { cityId } = this.props.match.params;

      if (cityId) this.props.fetchPartnersHotels(cityId);
    },
    componentWillReceiveProps(nextProps) {
      const {
        locationQueries,
      } = this.props;
      const { cityId } = this.props.match.params;
      const { cityId: nextCityId } = nextProps.match.params;

      const isCityIdsNotEqual = cityId !== nextCityId;
      const matchedFields = [
        'date_from', 'date_to', 'nights', 'nights_range',
        'adults', 'kids_ages', 'city_from_id',
      ];
      const locationQueriesBefore = pick(locationQueries, matchedFields);
      const locationQueriesAfter = pick(nextProps.locationQueries, matchedFields);

      const isLocationQueriesNotEqual = !isEqual(
        locationQueriesBefore,
        locationQueriesAfter
      );

      if (isCityIdsNotEqual || isLocationQueriesNotEqual) {
        this.props.fetchPartnersHotels(nextCityId);
      }
    },
  })
);

export default enhance(PartnersPage);
