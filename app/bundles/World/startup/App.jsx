import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import AviaOrderPage from '../pages/AviaOrderPage';
import MainPageAvia from '../pages/MainPageAvia';
import AviaSearchPage from '../pages/AviaSearchPage';
import AviaLayout from '../layout/AviaLayout';
import MainContentAbout from '../pages/MainContentAbout';

// const stringifyQuery = query => stringify(query, { arrayFormat: 'brackets', encode: false });

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('appStore');

  // Create an enhanced history that syncs navigation events with the store
  // const history = syncHistoryWithStore(
  //   useRouterHistory(createBrowserHistory)({ parseQueryString: parse, stringifyQuery }),
  //   store
  // );

  const history = createHistory();

  return (
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <AviaLayout>
          <Route exact={true} path='/' component={MainPageAvia} />
          <Route path ='/about' component={MainContentAbout} />
          <Route path='/avia_searches/:id' component={AviaSearchPage} />
          <Route exact={true} path='/avia/orders/:id' component={AviaOrderPage} />
        </AviaLayout>
      </ConnectedRouter>
    </Provider>
  );
};
