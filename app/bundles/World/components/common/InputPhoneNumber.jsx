import React, { Component } from 'react';
import ReactTelephoneInput from 'react-telephone-input';
import countryData from 'country-telephone-data';

class InputPhoneNumber extends Component {
  constructor(props) {
    super(props);

    this.state = { phoneData: {} };
  }

  handleInputChange(number, phoneData) {
    this.props.onChange(number);
    this.setState({ phoneData });
  }

  render() {
    const { allCountries, iso2Lookup } = countryData;
    return (
      <div className='order-form-control'>
        <label className='order-form-control__label'>{this.props.label}</label>
        <ReactTelephoneInput
          defaultCountry='ru'
          flagsImagePath='/assets/flags.png'
          classNames='input-phone-number'
          onChange={this.handleInputChange.bind(this)}
          onlyCountries={[
            { name: 'Азербайджан', iso2: 'az', dialCode: '994', format: '+...-..-...-..-..', priority: 0 },
            { name: 'Армения', iso2: 'am', dialCode: '374', format: '+...-..-...-...', priority: 0 },
            { name: 'Беларусь', iso2: 'by', dialCode: '375', format: '+... (..) ...-..-..', priority: 0 },
            { name: 'Казахстан', iso2: 'kz', dialCode: '7', format: '+. ... ...-..-..', priority: 1 },
            { name: 'Кыргызстан', iso2: 'kg', dialCode: '996', format: '+... (...) ...-...', priority: 0 },
            { name: 'Молдова', iso2: 'md', dialCode: '373', format: '+...-....-....', priority: 0 },
            { name: 'Россия', iso2: 'ru', dialCode: '7', format: '+. ... ...-..-..', priority: 0 },
            { name: 'Таджикистан', iso2: 'tj', dialCode: '992', format: '+...-..-...-....', priority: 0 },
            { name: 'Туркмения', iso2: 'tm', dialCode: '993', format: '+...-.-...-....', priority: 0 },
            { name: 'Узбекистан', iso2: 'uz', dialCode: '998', format: '+...-..-...-....', priority: 0 },
            { name: 'Украина', iso2: 'ua', dialCode: '380', format: '+... (..) ...-..-..', priority: 0 },
          ]}
        />
        {/* <InputElement
          ref='input'
          {...this.props}
          className='order-form-control__input'
          onChange={_onChange}
          alwaysShowMask={true}
          mask='+ 999 (99) 999-99-99'
          maskChar='_'
        /> */}
      </div>
    );
  }
}

export default InputPhoneNumber;
