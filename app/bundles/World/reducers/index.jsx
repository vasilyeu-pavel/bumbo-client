// This file is our manifest of all reducers for the app.
// See also /client/app/bundles/HelloWorld/store/helloWorldStore.jsx
// A real world app will likely have many reducers and it helps to organize them in one file.
import appReducer from './appReducer';
import orderReducer from './orderReducer';
import searchToursReducer from './searchToursReducer';
import aviaSearchesReducer from './aviaSearchesReducer';
import aviaFlightLoader from './aviaFlightLoader'
import { initialState as appInitialState } from './appReducer';
import { initialState as orderInitialState } from './orderReducer';
import { initialState as aviasSearchesInitialState } from './aviaSearchesReducer';
import { initialState as searchToursInitialState } from './searchToursReducer';

export default {
  searchToursState: searchToursReducer,
  appState: appReducer,
  orderState: orderReducer,
  aviaSearchesState: aviaSearchesReducer,
  aviaFlightLoader: aviaFlightLoader
};

export const initialStates = {
  appInitialState,
  searchToursInitialState,
  orderInitialState,
  aviasSearchesInitialState,
};
