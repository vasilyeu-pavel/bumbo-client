import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import InputElement from 'react-input-mask';

export default class ReactCreditCardFormField extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  fieldClassNames = () => {
    const { inlineField, fieldName } = this.props;

    return classNames(
      'react-credit-card-form__field',
      { 'react-credit-card-form__field--inline': inlineField },
      { [`react-credit-card-form__field--${fieldName}`]: fieldName },
    );
  }

  render() {
    const { inputProps, label } = this.props;

    return (
      <div className={this.fieldClassNames()}>
          <label
            htmlFor={inputProps.id}
            className='react-credit-card-form__label'
            dangerouslySetInnerHTML={{ __html: label }}
          />
        {/* <input {...inputProps} className='react-credit-card-form__input' /> */}
        <InputElement {...inputProps} className='react-credit-card-form__input' />
      </div>
    );
  }
}
