import React, { PureComponent, PropTypes } from 'react';
import HeaderContainer from '../containers/HeaderContainer';

export default class AviasalesLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className='landing'>
        <div className='landing__header landing__header--avisales'>
          <div className='inner'>
            <HeaderContainer />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
