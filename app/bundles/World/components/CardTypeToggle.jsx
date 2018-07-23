import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class CardTypeToggle extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    mapIsShown: PropTypes.bool,
    onlineHotelsFetching: PropTypes.bool,
    hotelsLength: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      toggles: {
        tiles: {
          selected: props.mapIsShown,
          needShowMap: true,
          icon: 'cards-tiles-icon',
        },
        list: {
          selected: !props.mapIsShown,
          needShowMap: false,
          icon: 'cards-list-icon',
        },
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      toggles: {
        tiles: {
          selected: nextProps.mapIsShown,
          needShowMap: true,
          icon: 'cards-tiles-icon',
        },
        list: {
          selected: !nextProps.mapIsShown,
          needShowMap: false,
          icon: 'cards-list-icon',
        },
      },
    });
  }

  toggleClassName(toggleKey) {
    const className = `world__aside-cards-toggle world__aside-cards-toggle--${toggleKey}`;

    return classNames(className, {
      'world__aside-cards-toggle--active': this.state.toggles[toggleKey].selected,
    });
  }

  cardToggle(toggleKey) {
    const toggle = this.state.toggles[toggleKey];
    const onToggleClick = () => {
      this.setState({
        tiles: {
          ...this.state.toggles.tiles,
          selected: toggleKey === 'tiles',
        },
        list: {
          ...this.state.toggles.list,
          selected: toggleKey === 'list',
        },
      });
      this.props.onSelect(toggle.needShowMap);
    };

    return (
      <div
        key={toggleKey}
        className={this.toggleClassName(toggleKey)}
        onClick={onToggleClick}
      >
      </div>
    );
  }

  label() {
    const { onlineHotelsFetching, hotelsLength } = this.props;

    //  FIXME
    const labelStyles = {
      marginRight: 'auto',
      marginLeft: '6px',
    };

    if (!onlineHotelsFetching) return (<div style={labelStyles}>{`${hotelsLength} отелей`}</div>);

    return (<div style={labelStyles}>Подгружаем туры...</div>);
  }

  cardsToggles() {
    return Object.keys(this.state.toggles).map(key =>
      this.cardToggle(key)
    );
  }

  render() {
    return (
      <div className='world__aside-cards-toggles'>
        {this.label()}
        {this.cardsToggles()}
      </div>
    );
  }
}
