import React, { PropTypes } from 'react';

const RadioButton = props => (
  <div className='radio-button'>
    <input {...props} children={null} type='radio' className='radio' />
    <label htmlFor={props.id}>{props.children}</label>
  </div>
);

RadioButton.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default RadioButton;
