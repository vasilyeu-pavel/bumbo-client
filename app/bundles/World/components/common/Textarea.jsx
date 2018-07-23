import React, { PropTypes } from 'react';

const Textarea = props => (
  <div className='order-form-control'>
    <label className='order-form-control__label'>{props.label}</label>
    <textarea
      {...props}
      rows='3'
      className='order-form-control__input order-form-control__input--textarea'
    />
  </div>
);


Textarea.propTypes = {
  label: PropTypes.string,
};

export default Textarea;
