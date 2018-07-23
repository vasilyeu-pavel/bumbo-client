import React, { Component, PropTypes } from 'react';
import Header from './../components/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as mapActionCreators from '../actions/appActionCreators';

function select(state) {
  return { appState: state.appState };
}

class HeaderContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    appState: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('%c Rerender HeaderContainer! ', 'background: #222; color: #bada55');
    const { dispatch, appState } = this.props;
    const actions = bindActionCreators(mapActionCreators, dispatch);
    const { changeCurrency } = actions;
    const currencyId = appState.get('currencyId');
    const allCurrencies = appState.get('allCurrencies').toJS();
    const isAviasales = appState.get('aviasales');

    return (
      <Header
        currencyId={currencyId}
        changeCurrency={changeCurrency}
        allCurrencies={allCurrencies}
        isAviasales={isAviasales}
      />
    );
  }
}

export default connect(select)(HeaderContainer);
