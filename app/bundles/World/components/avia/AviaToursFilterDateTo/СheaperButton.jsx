import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class СheaperButton extends PureComponent {
  constructor(props) {
    super(props)
  }  

  static propTypes = {
    closeCalendar: PropTypes.func,
  }

  componentDidMount() {
    const parentNode = this.node.parentNode

    parentNode.addEventListener("click", () => {
      this.sendCheaperRequest()
    })

  }

  sendCheaperRequest = () => { 
    this.props.closeCalendar()
  }

  render() {

    return (  
        <div className = "СheaperButton" ref = {el => this.node = el}>
          <p>лишь бы дешевле</p>
        </div>
    );
  }
}

export default СheaperButton;
