import Immutable from 'immutable';
import actionTypes from '../constants/app';

export const initialState = Immutable.fromJS({
  zoom: 3,
  center: { lat: 20, lng: 40 },
  bounds: {},
  markersType: 'city',
  openedInfoBoxId: null,
  hoveredItemId: null,
  mapIsShown: true,
  searchOnMapMove: true,
});

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_MARKERS_TYPE:
      return state.set('markersType', action.markersType);

    case actionTypes.CHANGE_MAP_BOUNDS:
      return state
        .set('bounds', Immutable.Map(action.bounds));

    case actionTypes.SET_OPENED_INFOBOX:
      return state.set('openedInfoBoxId', action.id);

    case actionTypes.SET_HOVERED_ITEM:
      return state.set('hoveredItemId', action.id);

    case actionTypes.TOGGLE_WORLD_MAP:
      return state.set('mapIsShown', action.state);

    case actionTypes.CHANGE_SEARCH_ON_MAP_MOVE:
      return state.set('searchOnMapMove', action.state);

    default:
      return state;
  }
}
