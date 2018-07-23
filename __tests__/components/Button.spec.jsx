/* global expect, jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../app/bundles/World/components/common/Button/Button';

describe('<Button /> component', () => {
  it('should render button tag by default', () => {
    const button = renderer.create(<Button />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render link tag', () => {
    const button = renderer.create(<Button tag='a' />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render link tag with href="/" and target="_blank"', () => {
    const button = renderer.create(<Button tag='a' href='/' target='_blank' />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render button with class "button--orange"', () => {
    const button = renderer.create(<Button color='orange' />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render button with class "button--big" and "button--linear"', () => {
    const button = renderer.create(<Button modifiers={['big', 'linear']} />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render button with text "Send"', () => {
    const text = 'Send';
    const button = renderer.create(<Button>{text}</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render button with type "submit"', () => {
    const type = 'submit';
    const button = renderer.create(<Button type={type} />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should call "onClick" method after click on button', () => {
    const handler = jest.fn();
    const button = renderer.create(<Button onClick={handler} />).toJSON();

    button.props.onClick();

    expect(handler).toHaveBeenCalled();
  });
});
