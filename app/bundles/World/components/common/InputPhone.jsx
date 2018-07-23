import React, { Component } from 'react';
import InputElement from 'react-input-mask';

class InputPhone extends Component {
  render() {
    const _onChange = (e) => {
      const isFilled = this.refs.input.isFilled(e.target.value);
      this.props.onChange(e, isFilled);
    };

    return (
      <div className='order-form-control'>
        <label className='order-form-control__label'>{this.props.label}</label>
        <InputElement
          ref='input'
          {...this.props}
          className='order-form-control__input'
          onChange={_onChange}
          alwaysShowMask={true}
          mask='+ 999 (99) 999-99-99'
          maskChar='_'
        />
      </div>
    );
  }
}

export default InputPhone;
