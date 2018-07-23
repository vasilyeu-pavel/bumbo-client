import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { bindActionCreators } from 'redux';
import {
filteredByPriceMin,
filteredByPriceMax
} from '../../actions/searchToursActionCreators';

class AviaFiltersBar extends Component {
  static propTypes = {
    //from connect
    filteredByPriceMin: PropTypes.func.isRequired,
    filteredByPriceMax: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
    if (!this.state.isOpen) {
      this.props.filteredByPriceMin()
    }else {
      this.props.filteredByPriceMax()
    }
  }

  render() {
    const { isOpen } = this.state
    const classActive = isOpen ? `radio-input--active` : `radio-input`

    return (
      <div className='avia-search-page__filters-wrapper'>
        <div className='avia-search-page__filters-wrapper__filter'>
          <span className='filter-title'>
            Фильтры
          </span>

          <div className='filter-radio' onClick={this.toggleOpen}>
            <div className={classActive}>
              <img src='/images/forma-1.svg'/> 
            </div>
            <div className='radio-text'>Сортировать по цене</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  filteredByPriceMin: bindActionCreators(filteredByPriceMin, dispatch),
  filteredByPriceMax: bindActionCreators(filteredByPriceMax, dispatch),
});

const enhance = compose(connect(null, mapDispatchToProps))

export default enhance(AviaFiltersBar)