/* global expect, jest */

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Checkbox from '../../app/bundles/World/components/common/Checkbox';

describe('<Checkbox /> component', () => {
  const minProps = {
    id: 'filter',
    labelText: 'filterEnabled',
  };

  it('should render input checkbox with label', () => {
    const checkbox = renderer.create(<Checkbox {...minProps} />);
    const checkboxTree = checkbox.toJSON();

    expect(checkboxTree).toMatchSnapshot();
  });

  it('should render input checkbox and "form-field" class', () => {
    const checkbox = renderer.create(<Checkbox {...minProps} modifiers={['form-field']} />);
    const checkboxTree = checkbox.toJSON();

    expect(checkboxTree).toMatchSnapshot();
  });

  it('should call the "onChange" method and set checked to true after input change', () => {
    const handleChange = (id, isChecked) => {
      expect(id).toEqual(minProps.id);
      expect(isChecked).toEqual(true);
    };
    const handler = jest.fn(handleChange);
    const checkbox = renderer.create(<Checkbox {...minProps} onChange={handler} />);
    let checkboxTree = checkbox.toJSON();

    const input = checkboxTree.children.filter(child => child.type === 'input')[0];

    input.props.onChange();

    expect(handler).toHaveBeenCalled();

    checkboxTree = checkbox.toJSON();

    expect(checkboxTree).toMatchSnapshot();
  });

  it('should change the "checked" prop after receiving new one', () => {
    const checkbox = mount(<Checkbox {...minProps}/>);

    checkbox.setProps({ checked: false });

    expect(checkbox.prop('checked')).toEqual(false);

    checkbox.setProps({ checked: true });

    expect(checkbox.prop('checked')).toEqual(true);
  });
});
