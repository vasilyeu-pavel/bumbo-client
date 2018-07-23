import React, { PropTypes, Component } from 'react';
import FilterGroup from './../FilterGroup.jsx';
import { isEqual } from 'lodash';

export default class HotelFilters extends Component {
  static propTypes = {
    onlineHotelsFetching: PropTypes.bool,
    filtersProps: PropTypes.object.isRequired,
    cardsGroupByType: PropTypes.string.isRequired,
    initialFiltersProps: PropTypes.object.isRequired,
    resetFiltersParameters: PropTypes.func.isRequired,
    updateFiltersParameters: PropTypes.func.isRequired,
  }

  filters() {
    return (
      <FilterGroup
        isPartners={false}
        onChange={this.props.updateFiltersParameters}
        filtersProps={this.props.filtersProps}
        className='checkbox-group'
      />
    );
  }

  filtersHasChanged() {
    const { filtersProps, initialFiltersProps } = this.props;

    return !isEqual(filtersProps, initialFiltersProps);
  }

  resetButton() {
    const { resetFiltersParameters } = this.props;

    if (!this.filtersHasChanged()) return '';

    return (
      <button
        className='button button--small button--bg-gray button--rad-3'
        onClick={resetFiltersParameters}
      >
        Сбросить все
      </button>
    );
  }

  render() {
    if (this.props.cardsGroupByType !== 'hotel') return null;

    return (
      <div className='inner--bordered inner-hotel-filters'>
        {this.filters()}
        {this.resetButton()}
      </div>
    );
  }
}
