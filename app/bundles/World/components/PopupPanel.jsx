const React = require('react');

const PopupPanel = React.createClass({
  render() {
    return (
      <div className='popup-panel'>
        {this.props.children}
      </div>
    );
  },
});

module.exports = PopupPanel;
