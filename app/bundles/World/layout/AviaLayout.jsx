import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import AviaBurgerMenu from '../components/AviaBurgerMenu'

@connect(state => ({
  pathname: state.routing.location.pathname,
}))
export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  };

  render() {
    const { pathname } = this.props;

    return (
      <div className='app-root'>
          <header className='main__header'>
            <AviaBurgerMenu />
            <div className='header__wrapper'>
              <NavLink to = {`/`} style = {{
                  textDecoration: "none"
              }}>
                <div className='logo-wrap'>
                  <img src='/images/logo.svg' width='14px' height='19px'/>
                  SKYTRAVEL.store
                </div>
              </NavLink>
              <nav>
                <ul>
                  <li>Личный кабинет</li>
                  <li>Оплатить онлайн</li>
                  <li>Мобильное приложение</li>
                 {/* <NavLink to = {`/about`} style = {{
                        textDecoration: "none"
                    }}>
                      <li>О нас</li>
                  </NavLink>*/}
                </ul>
              </nav>
            </div>
         </header>
         <div className={cx('main__content', {'_with-bg': pathname !== '/'})}>
            {this.props.children}
        </div>

      {/*<footer className='main__footer'>
          <div className='footer__wrapper'>
            <h2>Logo Here!</h2>
            <ul className='footer__nav'>
              <li><a href='#'>О компании</a></li>
              <li><a href='#'>Партнерская программа</a></li>
              <li><a href='#'>Вакансии</a></li>
              <li><a href='#'>Реклама</a></li>
              <li><a href='#'>Помощь</a></li>
            </ul>
            <ul className='social__links'>
              <li><a href='#' className='fb'></a></li>
              <li><a href='#' className='tw'></a></li>
              <li><a href='#' className='vk'></a></li>
            </ul>
          </div>
        </footer>*/}

      </div>
    );
  }
}
