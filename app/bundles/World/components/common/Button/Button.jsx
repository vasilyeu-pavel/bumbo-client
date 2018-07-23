import React, { PropTypes } from 'react';

const Button = ({ children, color, type, tag, modifiers, href, target, onClick }) => {
  let className = 'button';

  if (color) {
    className += ` ${`button--${color}`}`;
  }

  if (modifiers.length) {
    modifiers.map((modifier) => className += ` ${`button--${modifier}`}`);
  }

  const attributes = { className };

  if (onClick) attributes.onClick = onClick;

  if (type) attributes.type = type;

  if (href) {
    attributes.href = href;
    attributes.target = target;
  }

  return React.createElement(tag, attributes, children);
};

Button.defaultProps = {
  tag: 'button',
  modifiers: [],
};

Button.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  tag: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  href: PropTypes.string,
  target: PropTypes.string,
};

export default Button;
