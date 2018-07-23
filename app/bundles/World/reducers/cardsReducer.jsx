import Immutable from 'immutable';

import actionTypes from '../constants/app';

export const initialState = Immutable.fromJS({
  cards: {},
  showFilter: false,
  cardsGroupByType: 'country',
  cardsFetching: false,
  visibleParams: {
    visible: Immutable.List(),
    near: Immutable.List(),
    far: Immutable.List(),
  },
  sortHotelsBy: {
    sort: 'minPrice',
    direction: true,
  },
});

export default function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_CARDS:
      return state
        .set('cards', Immutable.OrderedMap(action.cards))
        .set('cardsGroupByType', action.cardsGroupByType);

    case actionTypes.CHANGE_CARDS_TYPE:
      return state.set('cardsGroupByType', action.cardsGroupByType);

    case actionTypes.CHANGE_HOTELS_SORT:
      return state.set('sortHotelsBy', Immutable.Map(action.value));

    case actionTypes.SHOW_MAP_FILTER:
      return state.set('showFilter', action.value);

    case actionTypes.UPDATE_FILTERS_PARAMETERS:
      return state.setIn(
        ['filtersProps', action.name, 'selectedValues'],
        action.value
      );

    case actionTypes.UPDATE_VISIBLE_PARAMS:
      return state.set('visibleParams', action.params);

    case actionTypes.RESET_VISIBLE_PARAMS:
      return state.set('visibleParams', new Immutable.Map({ visible: {}, near: {}, far: {} }));

    default:
      return state;
  }
}
