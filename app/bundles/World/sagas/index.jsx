import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../constants/app';
import updateCardsListVisibilitySaga from './updateCardsListVisibilitySaga';
import changeMarkersTypeSaga from './changeMarkersTypeSaga';
import changeCardsTypeSaga from './changeCardsTypeSaga';
import updateGeoDataSaga from './updateGeoDataSaga';

export default function* sagas() {
  yield takeEvery([
    actionTypes.CHANGE_HOTELS_SORT,
    actionTypes.TRIGGER_VISIBLE_PARAMS_UPDATING,
  ], updateCardsListVisibilitySaga);

  // yield takeEvery([
  //   actionTypes.SET_MAP_BOUNDS,
  // ], changeMarkersTypeSaga);

  yield takeEvery([
    actionTypes.SET_MAP_ZOOM,
  ], changeCardsTypeSaga);

  yield takeEvery([
    actionTypes.SET_MAP_ZOOM,
  ], changeMarkersTypeSaga);

  yield takeEvery([
    actionTypes.UPDATE_GEO_DATA,
  ], updateGeoDataSaga);
}
