/* global expect, jest */

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Input from '../../app/bundles/World/components/common/Input';

describe('<Input /> component', () => {
  const minProps = { label: 'name' };

  it('should render input element with label', () => {
    const input = renderer.create(<Input {...minProps} />).toJSON();

    expect(input).toMatchSnapshot();
  });

  it('should render input with required (or any) attribute', () => {
    const input = renderer.create(<Input {...minProps} required='required' />).toJSON();

    expect(input).toMatchSnapshot();
  });

  it('should render input type "email"', () => {
    const input = renderer.create(<Input {...minProps} type='email' />).toJSON();

    expect(input).toMatchSnapshot();
  });

  it('should call the "onChange" method after input change', () => {
    const handler = jest.fn();
    const input = mount(<Input {...minProps} onChange={handler}/>);

    input.find('input').simulate('change');

    expect(handler).toHaveBeenCalled();
  });
});
