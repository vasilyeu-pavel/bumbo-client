import React, { Component, PropTypes } from 'react';
import HeaderContainer from '../containers/HeaderContainer';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  };

  render() {
    return (
      <div className='landing'>
        <div className='landing__header'>
          <div className='inner'>
            <HeaderContainer />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
