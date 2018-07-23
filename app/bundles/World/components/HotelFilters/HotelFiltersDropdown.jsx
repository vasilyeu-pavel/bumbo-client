import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

export default class HotelFiltersDropdown extends Component {
  static propTypes = {
    withNumber: PropTypes.bool,
    selectedCount: PropTypes.number,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onApply: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      opened: false,
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleOutClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutClick, false);
  }

  handleOutClick = (event) => {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.setState({
      opened: false,
    });
  }

  toggleDropdown = () => {
    this.setState({
      opened: !this.state.opened,
    });
  }

  applyFilter = () => {
    this.setState({
      opened: false,
    });

    this.props.onApply(this.props.name);
  }

  selectedLabel() {
    const { selectedCount, withNumber } = this.props;

    if (!selectedCount) return '';

    if (withNumber) {
      return (
        <div className='filter-group__selected-label'>
          {selectedCount}
        </div>
      );
    }

    if (selectedCount) {
      return (
        <div className='filter-group__selected-label filter-group__selected-label--empty' />
      );
    }
  }

  arrow() {
    const arrowClassName = () =>
      classnames('filter-group__title-arrow', {
        'filter-group__title-arrow--reverse': this.state.opened,
      });

    return (
      <div className={arrowClassName()} />
    );
  }

  header() {
    const { title } = this.props;

    return (
      <div
        className='filter-group__title'
        onClick={this.toggleDropdown}
      >
        <div>{title}</div>
        {this.selectedLabel()}
        {this.arrow()}
      </div>
    );
  }

  buttonClassName() {
    return 'button button--small button--green button--rad-3';
  }

  content() {
    if (!this.state.opened) return '';

    return (
      <div className='filter-group__body'>
        {this.props.children}
        {this.footer()}
      </div>
    );
  }

  footer() {
    return (
      <div className='filter-group__footer'>
        <button
          className={this.buttonClassName()}
          onClick={this.applyFilter}
        >
          Применить
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className='filter-group__item'>
        {this.header()}
        {this.content()}
      </div>
    );
  }
}
