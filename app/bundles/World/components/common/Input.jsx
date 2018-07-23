import React, { PropTypes } from 'react';

const Input = props => (
  <div className='order-form-control'>
    <label className='order-form-control__label'>{props.label}</label>
    <input {...props} className='order-form-control__input' />
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
