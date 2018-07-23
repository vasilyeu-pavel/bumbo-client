import sagas from '../sagas';
import rootReducer from './rootReducer';
import middlewares from './storeMiddlewares';
import getInitialState from './initialState';
import _ from 'lodash';
import { persistState } from 'redux-devtools';
import { compose, createStore, applyMiddleware } from 'redux';

const createAppStore = backendProps => {
  const initialState = getInitialState(backendProps);

  const composedStore = compose(
    applyMiddleware(..._.compact(middlewares)),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  );

  const storeCreator = composedStore(createStore);
  const store = storeCreator(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  middlewares[1].run(sagas);

  return store;
};

export default createAppStore;
