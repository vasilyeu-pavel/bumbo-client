/* global expect, jest */
/* eslint arrow-body-style: 0 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import CheckboxGroup from '../../app/bundles/World/components/common/CheckboxGroup';
import Checkbox from '../../app/bundles/World/components/common/Checkbox';

describe('<CheckboxGroup /> component', () => {
  const minProps = {
    name: 'beachTypes',
    subtitle: 'Beach types',
    values: { 'Песок белый': 151, 'Песок вулканический': 149, 'Песок жёлтый': 150 },
    checked: [],
    onChange: () => {},
  };
  const valuesCount = Object.keys(minProps.values).length;

  it(`should render ${valuesCount} Checkbox'es`, () => {
    const checkboxGroup = renderer.create(<CheckboxGroup {...minProps} />);
    const checkboxGroupTree = checkboxGroup.toJSON();

    expect(checkboxGroupTree).toMatchSnapshot();
  });

  it(`should render ${valuesCount} Checkbox component instances`, () => {
    const checkboxGroup = shallow(<CheckboxGroup {...minProps} />);

    checkboxGroup.find('.checkbox-group__item').forEach((node) => {
      expect(node.children().shallow().instance()).toBeInstanceOf(Checkbox);
    });
  });

  it(`should call "onChange" method with name ${minProps.name}`, () => {
    const handleChange = (name) => expect(name).toEqual(minProps.name);
    const handler = jest.fn(handleChange);
    const checkboxGroup = renderer.create(<CheckboxGroup {...minProps} onChange={handler} />);
    let checkboxGroupTree = checkboxGroup.toJSON();
    const checkboxes = checkboxGroupTree.children;
    const checkbox = checkboxes
      .filter(child => child.props.className === 'checkbox-group__item')[0];
    const input = checkbox.children[0].children.filter(child => child.type === 'input')[0];

    // Click on first checkbox
    input.props.onChange();

    expect(handler).toHaveBeenCalled();

    checkboxGroupTree = checkboxGroup.toJSON();

    expect(checkboxGroupTree).toMatchSnapshot();

    // Second click on first checkbox
    input.props.onChange();

    expect(handler).toHaveBeenCalledTimes(2);

    checkboxGroupTree = checkboxGroup.toJSON();

    expect(checkboxGroupTree).toMatchSnapshot();
  });

  it('should add an id to "checked" array after click on checkbox', () => {
    const handleChange = (name, checkedArray) => expect(checkedArray).toEqual([151]);
    const handler = jest.fn(handleChange);
    const checkboxGroup = mount(<CheckboxGroup {...minProps} onChange={handler} />);

    checkboxGroup.find('input[type="checkbox"]').first().simulate('change');
    expect(handler).toHaveBeenCalled();
  });
});
