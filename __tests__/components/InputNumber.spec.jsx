/* global expect, jest */
/* eslint arrow-body-style: 0 */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import InputNumber from '../../app/bundles/World/components/common/InputNumber';

describe('<InputNumber /> component', () => {
  const minProps = {
    titles: ['ночь', 'ночи', 'ночей'],
    value: 2,
    onIncrement: () => {},
    onDecrement: () => {},
  };

  it('should render component with correct title "1 ночь"', () => {
    const inputNumber = renderer.create(<InputNumber {...minProps} value={1} />).toJSON();

    expect(inputNumber).toMatchSnapshot();
  });

  it('should render component with correct title "2 ночи"', () => {
    const inputNumber = renderer.create(<InputNumber {...minProps} value={2} />).toJSON();

    expect(inputNumber).toMatchSnapshot();
  });

  it('should render component with correct title "5 ночей"', () => {
    const inputNumber = renderer.create(<InputNumber {...minProps} value={5} />).toJSON();

    expect(inputNumber).toMatchSnapshot();
  });

  it('should increment value after click on increment button', () => {
    const handleChange = (value) => expect(value).toEqual(minProps.value + 1);
    const handler = jest.fn(handleChange);
    const inputNumber = shallow(<InputNumber {...minProps} onIncrement={handler} />);
    const incrementButton = inputNumber.find('.input-number__incr');

    incrementButton.simulate('click');

    expect(handler).toHaveBeenCalled();
  });

  it('should not call "onIncrement" method if value >= maxValue', () => {
    const props = { value: 10, maxValue: 10 };
    const handler = jest.fn();
    const inputNumber = shallow(<InputNumber {...minProps} {...props} onIncrement={handler} />);
    const incrementButton = inputNumber.find('.input-number__incr');

    incrementButton.simulate('click');

    expect(handler).not.toHaveBeenCalled();
  });

  it('should decrement value after click on decrement button', () => {
    const handleChange = (value) => expect(value).toEqual(minProps.value - 1);
    const handler = jest.fn(handleChange);
    const inputNumber = shallow(<InputNumber {...minProps} onDecrement={handler} />);
    const decrementButton = inputNumber.find('.input-number__decr');

    decrementButton.simulate('click');

    expect(handler).toHaveBeenCalled();
  });

  it('should not call "onDecrement" method if value <= 1', () => {
    const handler = jest.fn();
    const inputNumber = shallow(<InputNumber {...minProps} value={1} onDecrement={handler} />);
    const decrementButton = inputNumber.find('.input-number__decr');

    decrementButton.simulate('click');

    expect(handler).not.toHaveBeenCalled();
  });
});
