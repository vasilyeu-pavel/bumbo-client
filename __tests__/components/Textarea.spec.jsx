/* global expect, jest */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Textarea from '../../app/bundles/World/components/common/Textarea';

describe('<Textarea /> component', () => {
  const minProps = { label: 'description' };

  it('should render textarea element with label', () => {
    const textarea = renderer.create(<Textarea {...minProps} />).toJSON();

    expect(textarea).toMatchSnapshot();
  });

  it('should call the "onChange" method after textarea change', () => {
    const handler = jest.fn();
    const inputWrapper = shallow(<Textarea {...minProps} onChange={handler}/>);

    inputWrapper.find('textarea').simulate('change');

    expect(handler).toHaveBeenCalled();
  });
});
