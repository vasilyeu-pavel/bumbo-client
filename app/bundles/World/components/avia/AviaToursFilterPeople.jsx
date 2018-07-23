import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import InputNumber from '../common/InputNumber';
import declOfNums from '../../utils/declOfNum';
import classNames from 'classnames';
import { bindAll, find, differenceBy, includes } from 'lodash';

class AviaToursFilterPeople extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    kids: PropTypes.array.isRequired,
    kidsAges: PropTypes.array.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.state = { active: false, overlay: false };

    bindAll(this, [
      'handleOverlayClick',
      'handleItemFocus',
      'handleItemBlur',
      'handleChange',
      'handleAddChildClick',
      'renderChildMenu',
      'renderSelectedChild',
      'handleSelectChild',
      'handleUnselectChild',
    ]);
  }

  handleOverlayClick() {
    ReactDOM.findDOMNode(this.refs.ToursFilterPeople).blur();
  }

  handleItemFocus(e) {
    console.log(e.target)
    this.setState({ active: true, overlay: true });
  }

  handleItemBlur() {
    this.setState({ active: false, overlay: false, showChildMenu: false });
  }

  handleChange(value) {
    this.props.onChange('adults', value);
  }

  handleAddChildClick() {
    this.setState({ showChildMenu: !this.state.showChildMenu });
  }

  renderSelectedChild(item, index) {
    const unselectChildHandler = () => this.handleUnselectChild(item);

    return (
      <div key={item.key} className='tours-filter__button tours-filter__button--light-blue'>
        {item.name}
        <div className='tours-filter__button-close' onClick={unselectChildHandler}></div>
      </div>
    );
  }

  renderChildMenu(item) {
    const selectChildHandler = () => this.handleSelectChild(item);

    return (
      <div key={item.key} className='tours-filter__child-menu-item' onClick={selectChildHandler}>
        {item.name}
      </div>
    );
  }

  handleSelectChild(item) {
    if (find(this.props.kidsAges, { key: item.key })) return;

    this.props.onChange('kids_ages', [item.key, ...this.props.kidsAges]);
  }

  handleUnselectChild(item) {
    this.props.onChange('kids_ages', differenceBy(this.props.kidsAges, [item.key]));
  }

  render() {
    const { value, kids } = this.props;
    const titles = ['взрослый', 'взрослых', 'взрослых'];
    const selectedChilds = kids.filter(kid => includes(this.props.kidsAges, kid.key));

    const className = 'tours-filter__item';
    const classList = classNames(
      className,
      `${className}--people`,
      { [`${className}--active`]: this.state.active }
    );

    return (
      <div
        ref='ToursFilterPeople'
        className={classList}
        tabIndex={this.props.tabIndex}
        onBlur={this.handleItemBlur}
        onFocus={this.handleItemFocus}
      >
        <span className='tours-filter__info'>ПОСАЖИРЫ</span>
        <div className='tours-filter__value'>
          {`${value} ${declOfNums(value, titles)}`}
        </div>
        {this.state.overlay && (
          <div className='tours-filter__overlay' onClick={this.handleOverlayClick}></div>
        )}
        <div className='tours-filter__people'>
          <InputNumber
            titles={titles}
            value={value}
            maxValue={10}
            onIncrement={this.handleChange}
            onDecrement={this.handleChange}
          />
        <div className='tours-filter__selected-childs'>
          {selectedChilds.map(this.renderSelectedChild)}
        </div>
          <div
            className='tours-filter__button tours-filter__button--centered'
            onClick={this.handleAddChildClick}
          >Добавить ребенка</div>
        {this.state.showChildMenu && (
            <div className='tours-filter__child-menu'>
              {differenceBy(kids, selectedChilds).map(this.renderChildMenu)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AviaToursFilterPeople;
