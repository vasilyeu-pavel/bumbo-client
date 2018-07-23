/* global $ */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select2 from 'react-select2-wrapper';
import _ from 'lodash';
import classNames from 'classnames';

export default class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isShow: false,
    };

    _.bindAll(this, [
      'handleCurrencyChange',
      'openHeaderFeedback',
      'clickDocument',
    ]);
  }

  static propTypes = {
    changeCurrency: React.PropTypes.func.isRequired,
    currencyId: React.PropTypes.number.isRequired,
    allCurrencies: React.PropTypes.array.isRequired,
    isAviasales: React.PropTypes.bool,
  };

  clickDocument(e) {
    const component = ReactDOM.findDOMNode(this.refs.component);

    if (e.target === component || $(component).has(e.target).length) {
      // Inside of the component.
    } else {
      this.setState({ isShow: false });
    }
  }

  componentDidMount() {
    $(document).bind('click', this.clickDocument);
  }
  componentWillUnmount() {
    $(document).unbind('click', this.clickDocument);
  }

  onCurrencyOpen() {
    $('.select2-container').addClass('select2-container--currency');
  }

  handleCurrencyChange(select2) {
    const id = parseInt(select2.target.value, 10);

    this.props.changeCurrency(id);
  }

  openHeaderFeedback(event) {
    const isShow = this.state.isShow;

    this.setState({ isShow: !isShow });
  }

  renderLogo() {
    const { isAviasales } = this.props;
    const defaultLogo = (<a className='header__logo' href='/'><img src='/images/logo_2m.svg'/></a>);
    const aviasalesLogo = (
      <a className='header__logo' href='/'>
        <img src='/images/logo_aviasales.svg'/>
        <img src='/images/logo_white.svg'/>
      </a>
    );

    return isAviasales ? aviasalesLogo : defaultLogo;
  }

  render() {
    const { allCurrencies, currencyId } = this.props;

    const classList = classNames(
        'feedback_block',
        this.state.isShow ? 'feedback_block_show' : 'feedback_block_hide'
    );
    const links = {
      whatsapp: 'whatsapp://send?abid=122&text=[[prompt]]',
      viber: 'viber://chat:your-number-here',
      vk: 'https://vk.com/im?sel=[our-user.id]',
      telegram: 'tg:msg?text=Hello&to=+42333',
      facebook: 'https://www.facebook.com/messages/[ouer-user.id]',
      skype: 'skype:participant1[;participant2;...participant9]?chat[&topic=topicString]',
    };

    return (
      <div className='header'>
        <div className='header__left'>
          <span className='header__left-test'>Jamm.travel &mdash; пакетные туры онлайн</span>
        </div>
        <div className='header__right'>
          <Select2
            className='header__currency'
            onChange={this.handleCurrencyChange}
            onOpen={this.onCurrencyOpen}
            value={currencyId}
            data={allCurrencies}
            options={{ minimumResultsForSearch: -1 }}
          />
          <div ref='component' className='header__call' onClick={this.openHeaderFeedback}>
            <div className='header__time'>Связаться</div>
            <div className={classList}>
              <div className='item__elem'><a href={links.whatsapp}>Whatsapp</a></div>
              <div className='item__elem'><a href={links.viber}>Viber</a></div>
              <div className='item__elem'><a href={links.vk}>Вконтакте</a></div>
              <div className='item__elem'><a href={links.telegram}>Telegram</a></div>
              <div className='item__elem'><a href={links.facebook}>Messenger (FB)</a></div>
              <div className='item__elem'><a href={links.skype}>Skype</a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
