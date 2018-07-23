import actionTypes from '../constants/app';
import Immutable from 'immutable';
import { getCardsByType } from '../selectors/';
import { put, select } from 'redux-saga/effects';


function* updateCardsListVisibilitySaga(action) {
  try {
    const cardsList = yield select(getCardsByType);
    const { cardsState } = yield select();
    const visibleParams = cardsState.get('visibleParams');

    const cardsListElement = document.querySelector('.cards-list');
    const { clientHeight, scrollTop } = cardsListElement;

    const cardsListCount = cardsList.size;
    const ROW_HEIGHT = 171;
    const CLIENT_HEIGHT = clientHeight === 0 ? ROW_HEIGHT * 5 : clientHeight;
    const SCROLL_HEIGHT = cardsListCount * ROW_HEIGHT;
    const FAR_CARD_INDEX = 5;
    const NEAR_CARD_INDEX = 10;
    const scrollDown = SCROLL_HEIGHT - scrollTop - CLIENT_HEIGHT;
    const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
    const endIndex = cardsListCount - Math.floor(scrollDown / ROW_HEIGHT);
    const visibleCards = cardsList.slice(startIndex, endIndex).map(card => card.id);

    const nearIndexBefore = (startIndex < NEAR_CARD_INDEX) ? 0 : (startIndex - NEAR_CARD_INDEX);
    const nearIndexAfter = endIndex + NEAR_CARD_INDEX;
    const nearCardsBefore = cardsList.slice(nearIndexBefore, startIndex);
    const nearCardsAfter = cardsList.slice(endIndex, nearIndexAfter);

    const farIndexBefore = (nearIndexBefore < FAR_CARD_INDEX)
      ? 0
      : (nearIndexBefore - FAR_CARD_INDEX);
    const farIndexAfter = nearIndexAfter + FAR_CARD_INDEX;
    const farCardsBefore = cardsList.slice(farIndexBefore, nearIndexBefore);
    const farCardsAfter = cardsList.slice(nearIndexAfter, farIndexAfter);

    const params = new Immutable.Map({
      visible: visibleCards,
      near: nearCardsBefore.concat(nearCardsAfter).map(card => card.id),
      far: farCardsBefore.concat(farCardsAfter).map(card => card.id),
    });

    if (!Immutable.is(params, visibleParams)) {
      yield put({ type: actionTypes.UPDATE_VISIBLE_PARAMS, params });
    }
  } catch (e) {
    console.error('Error in actionTypes.CHANGE_HOTELS_SORT saga');
  }
}

export default updateCardsListVisibilitySaga;
