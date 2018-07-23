import { getMapZoom, getSearchOnMapMove } from '../selectors/';
import { showHotels } from '../actions/mapActionCreators';
import { put, select } from 'redux-saga/effects';


function* updateGeoDataSaga(action) {
  try {
    const zoom = yield select(getMapZoom);
    const searchOnMapMove = yield select(getSearchOnMapMove);

    if (searchOnMapMove && zoom >= 8 && action.groupByType === 'city') {
      yield put(showHotels());
    }
  } catch (e) {
    console.error('Error in updateGeoDataSaga');
  }
}

export default updateGeoDataSaga;
