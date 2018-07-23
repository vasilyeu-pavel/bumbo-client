import React, { PureComponent, PropTypes } from 'react';
import Select from 'react-select';
import { Map } from 'immutable';
import classNames from 'classnames';
import { bindAll } from 'lodash';

class ToursFilterDeparture extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    departFrom: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired,
    departPrices: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    this.state = { active: false, options: [] };

    bindAll(this, ['handleChange', 'handleOpen', 'handleClose']);
  }

  componentWillMount() {
    this.setOptions(this.props.departFrom, this.props.departPrices);
  }

  componentWillReceiveProps(nextProps) {
    const isCitiesEqual = nextProps.departFrom === this.props.departFrom;
    const isPricesEqual = nextProps.departPrices === this.props.departPrices;

    if (!isCitiesEqual || !isPricesEqual) {
      this.setOptions(nextProps.departFrom, nextProps.departPrices);
    }
  }

  setOptions(departFrom, departPrices) {
    this.setState({
      options: departFrom.map((value, name) => {
        const price = departPrices && departPrices[value];
        const label = price ? `${name} (${price})` : name;

        return { value, label };
      }).toArray(),
    });
  }

  handleChange(data) {
    this.props.onChange('city_from_id', data.value, this.props.tabIndex);
  }

  handleOpen() {
    this.setState({ active: true });
  }

  handleClose() {
    this.setState({ active: false });
  }

  render() {
    const className = 'tours-filter__item';
    const classList = classNames(
      className,
      `${className}--departure`,
      { [`${className}--active`]: this.state.active }
    );

    return (
      <div className={classList}>
        <Select
          tabIndex={this.props.tabIndex}
          value={this.props.value}
          clearable={false}
          searchable={false}
          openOnFocus={true}
          tabSelectsValue={false}
          options={this.state.options}
          onChange={this.handleChange}
          onOpen={this.handleOpen}
          onFocus={this.handleOpen}
          onClose={this.handleClose}
          onBlur={this.handleClose}
        />
      </div>
    );
  }
}

export default ToursFilterDeparture;
