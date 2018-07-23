import AviaFlights from './../components/AviaFlights';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapStateToProps = (state, ownProps) => ({
  tickets: state.aviaSearchesState.get('tickets'),
  ticketsAreLoading: state.aviaSearchesState.get('ticketsAreLoading'),
  ticketsLoadedSuccess: state.aviaSearchesState.get('ticketsLoadedSuccess'),
  ticketsLoadedError: state.aviaSearchesState.get('ticketsLoadedError'),
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(AviaFlights);
