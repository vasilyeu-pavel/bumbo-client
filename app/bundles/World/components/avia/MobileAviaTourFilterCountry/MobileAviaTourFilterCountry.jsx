import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Portal } from 'react-portal'
import { X } from 'react-feather';
import AviaToursFilterCountry from '../AviaToursFilterCountry';

class MobileAviaTourFilterCountry extends PureComponent {
  static PropTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    isPartners: PropTypes.bool,
    removeSearch: PropTypes.func,
    inputIsValid: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      portalActive: false
    }
  }  

  togglePortal = () => {
    this.setState({ portalActive: !this.state.portalActive })
  }

  render() {
    const { onChange, removeSearch, value, tabIndex, isPartners, searchParams,
    inputIsValid } = this.props
    const { portalActive } = this.state

    const className = 'tours-filter__country__mobile';
    const classError = !inputIsValid ? 'tours-filter__item--error' : null

    const classList = classNames(className, classError);

    return (
    <div className={classList}>  
      <div onClick={this.togglePortal}>
        {value.text ? value.text : 'Город назначения'}
      </div>
      {portalActive && (
        <Portal>
          <div className="portal_container">
            <span 
            className="buttonClosePortal" 
            onClick={this.togglePortal}>
              <X />
            </span>
          <div className="portal_header">Город назначения</div>
          <div className="portal_line"></div>
          <div className="portal_content">
            <AviaToursFilterCountry 
              onChange={onChange}
              removeSearch={removeSearch}
              value={value}
              tabIndex={tabIndex}
              isPartners={isPartners}
              searchParams={searchParams}
              inputIsValid={inputIsValid}
              closePortal={this.togglePortal}
            />
          </div>
          </div>
        </Portal>
      )}
     </div> 
    );
  }
}

export default MobileAviaTourFilterCountry;
