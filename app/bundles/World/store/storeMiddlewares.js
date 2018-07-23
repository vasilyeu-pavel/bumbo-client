import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

const isDevelopment = process.env.NODE_ENV === 'development';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = createRouterMiddleware(history);

const middlewares = [
  thunkMiddleware,
  sagaMiddleware,
  isDevelopment && loggerMiddleware,
  routeMiddleware,
  ];

export default middlewares;
