import actionTypes from '../constants/app';
import { getMapZoom } from '../selectors/';
import { put, select } from 'redux-saga/effects';

const changeMarkersType = (markersType) => ({
  type: actionTypes.CHANGE_MARKERS_TYPE, markersType,
});

function* changeMarkersTypeSaga(action) {
  try {
    const zoom = yield select(getMapZoom);

    if (zoom >= 8) yield put(changeMarkersType('hotel'));
    if (zoom >= 5) yield put(changeMarkersType('city'));
  } catch (e) {
    console.error('Error in changeMarkersTypeSaga');
  }
}

export default changeMarkersTypeSaga;
