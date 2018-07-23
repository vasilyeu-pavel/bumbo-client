import actionTypes from '../constants/app';
import { getMapZoom, getSearchOnMapMove } from '../selectors/';
import { put, select } from 'redux-saga/effects';

const changeCardsGroupByType = (cardsGroupByType) => ({
  type: actionTypes.CHANGE_CARDS_TYPE, cardsGroupByType,
});

function* changeCardsTypeSaga(action) {
  try {
    const zoom = yield select(getMapZoom);
    const searchOnMapMove = yield select(getSearchOnMapMove);

    if (searchOnMapMove) {
      if (zoom >= 8) yield put(changeCardsGroupByType('hotel'));
      if (zoom >= 0) yield put(changeCardsGroupByType('city'));
    }
  } catch (e) {
    console.error('Error in changeCardsTypeSaga');
  }
}

export default changeCardsTypeSaga;
