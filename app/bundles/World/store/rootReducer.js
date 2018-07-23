import reducers from '../reducers';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

export default rootReducer;
