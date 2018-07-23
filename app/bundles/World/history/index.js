import qs from 'qs';

import * as mapActionCreators from '../actions/mapActionCreators.jsx';
import * as cardsActionsCreators from '../actions/cardsActionsCreators.jsx';

export const connectHistoryWithDispatch = (history) => (dispatch, getState) => {
  history.listen(location => {
    const queries = qs.parse(location.search.slice(1));
    const { zoom, s_map_move: searchOnMove } = queries;

    if (zoom >= 8 && searchOnMove === 'true') {
      mapActionCreators.showHotels()(dispatch, getState);
    }

    console.log('connectHistoryWithDispatch', location);
  });
};
