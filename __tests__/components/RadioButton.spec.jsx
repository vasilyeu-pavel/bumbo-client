/* global expect, jest */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RadioButton from '../../app/bundles/World/components/common/RadioButton';

describe('<RadioButton /> component', () => {
  const minProps = { id: 'paymentMethod' };
  const text = 'Mastercard';

  it(`should render input type "radio" with label and text "${text}"`, () => {
    const radioButton = renderer.create(<RadioButton {...minProps} />).toJSON();

    expect(radioButton).toMatchSnapshot();
  });

  it('should call the "onChange" method after input change', () => {
    const handler = jest.fn();
    const radioButton = shallow(<RadioButton {...minProps} onChange={handler}/>);

    radioButton.find('input[type="radio"]').simulate('change');

    expect(handler).toHaveBeenCalled();
  });
});
