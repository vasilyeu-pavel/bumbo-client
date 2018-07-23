import React, { Component, PropTypes } from 'react';
import CheckboxGroup from './common/CheckboxGroup.jsx';
import Checkbox from './common/Checkbox.jsx';
import StarRating from './StarRating.jsx';
import RangeSlider from './RangeSlider.jsx';
import { HotelFiltersDropdown } from './HotelFilters';
import _ from 'lodash';

export default class FilterGroup extends Component {
  static propTypes = {
    filtersProps: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    isPartners: PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  getFilterProps(name) {
    return _.find(this.props.filtersProps, { filter_name: name });
  }

  handleSave = (filterName) => {
    const value = this.state[filterName];

    this.props.onChange(filterName, value);
  }

  handleChange = (filterName, value) => {
    this.setState({
      [filterName]: _.castArray(value),
    });
  }

  rateRangeSettings() {
    const { filtersProps: { rate } } = this.props;
    const { handleChange } = this;

    const rateSelectedFrom = rate.selectedValues[0] ? rate.selectedValues[0].min : 0;
    const rateSelectedTo = rate.selectedValues[1] ? rate.selectedValues[1].max : rate.values.to;

    return {
      type: 'double',
      min: 0,
      max: rate.values.to,
      from: rateSelectedFrom,
      to: rateSelectedTo,
      hide_min_max: true,
      force_edges: true,
      step: 1,
      onFinish(data) {
        handleChange('rate', [{ min: data.from }, { max: data.to }]);
      },
    };
  }

  priceRangeSettings() {
    const { filtersProps } = this.props;
    const { handleChange } = this;
    const price = this.props.isPartners ? filtersProps.price : filtersProps.min_price;

    const priceSelectedFrom = price.selectedValues[0] ? price.selectedValues[0].min : 0;
    const priceSelectedTo = price.selectedValues[1] ? price.selectedValues[1].max : price.values.to;

    return {
      type: 'double',
      min: 0,
      max: price.values,
      from: priceSelectedFrom,
      to: priceSelectedTo,
      hide_min_max: true,
      force_edges: true,
      step: 100,
      onFinish(data) {
        handleChange('min_price', [{ min: data.from }, { max: data.to }]);
      },
    };
  }

  render() {
    const {
      filtersProps,
      filtersProps: {
        rate,
        stars,
        meals,
        beach_line_id: beachLine,
      },
    } = this.props;

    const price = this.props.isPartners ? filtersProps.price : filtersProps.min_price;

    return (
      <div className='filter-group'>
        <HotelFiltersDropdown
          name='stars'
          onApply={this.handleSave}
          title={stars.filter_human_name}
          selectedCount={stars.selectedValues.length}
        >
          <StarRating
            name='stars'
            starCount={5}
            value={stars.selectedValues[0] || 0}
            onChange={this.handleChange}
          />
        </HotelFiltersDropdown>

        <HotelFiltersDropdown
          name={price.filter_name}
          onApply={this.handleSave}
          title={price.filter_human_name}
          selectedCount={price.selectedValues.length}
        >
          <RangeSlider
            name={price.filter_name}
            settings={this.priceRangeSettings()}
          />
        </HotelFiltersDropdown>

        <HotelFiltersDropdown
          name={rate.filter_name}
          onApply={this.handleSave}
          title={rate.filter_human_name}
          selectedCount={rate.selectedValues.length}
        >
          <RangeSlider
            name={rate.filter_name}
            settings={this.rateRangeSettings()}
          />
        </HotelFiltersDropdown>

        <HotelFiltersDropdown
          withNumber={true}
          onApply={this.handleSave}
          name={meals.filter_name}
          title={meals.filter_human_name}
          selectedCount={meals.selectedValues.length}
        >
          <CheckboxGroup
            name={meals.filter_name}
            values={meals.values}
            checked={meals.selectedValues}
            onChange={this.handleChange}
          />
        </HotelFiltersDropdown>

        <HotelFiltersDropdown
          withNumber={true}
          onApply={this.handleSave}
          name={beachLine.filter_name}
          title={beachLine.filter_human_name}
          selectedCount={beachLine.selectedValues.length}
        >
          <CheckboxGroup
            name={beachLine.filter_name}
            values={beachLine.values}
            checked={beachLine.selectedValues}
            onChange={this.handleChange}
          />
        </HotelFiltersDropdown>
      </div>
    );
  }
}
