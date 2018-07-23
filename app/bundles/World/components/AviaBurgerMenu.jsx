import React, { PropTypes, Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Menu as MenuIcon, Home, Info, Phone, User, Smartphone} from 'react-feather';

export default class AviaBurgerMenu extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    }
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  closeMenu = () => {
    this.setState({menuOpen: false})
  } 

  render() {
    return (
      <Menu 
        right 
        customBurgerIcon={ <MenuIcon onClick={() => this.toggleMenu()}/> }
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state) }
      >
        <a onClick={this.closeMenu} id="home" className="menu-item" href="#">
          <span className="menu-item-icons"><Home /></span>
          <span className="menu-item-text">Главная</span>
        </a>
        <a onClick={this.closeMenu} id="about" className="menu-item" href="#">
          <span className="menu-item-icons"><Info /></span>
          <span className="menu-item-text">О нас</span>
        </a>
        <div className="burger-line"></div>
        <a onClick={this.closeMenu} id="contact" className="menu-item" href="#">
          <span className="menu-item-icons"><Phone /></span>
          <span className="menu-item-text">Контакты</span>
        </a>
        <a onClick={this.closeMenu} className="menu-item--small" href="#">
          <span className="menu-item-icons"><User /></span>
          <span className="menu-item-text">Личный кабинет</span>
        </a>
        <a onClick={this.closeMenu} className="menu-item--small" href="#">
          <span className="menu-item-icons"><Smartphone /></span>
          <span className="menu-item-text">Мобильное приложение</span>
        </a>
      </Menu>
    );
  }
}
