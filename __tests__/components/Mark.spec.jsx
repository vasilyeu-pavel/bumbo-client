/* global expect */

import React from 'react';
import renderer from 'react-test-renderer';
import Mark from '../../app/bundles/World/components/common/Mark';

describe('<Mark /> component', () => {
  const minProps = { value: 5.7 };

  it('should render component with class "mark"', () => {
    const mark = renderer.create(<Mark {...minProps} />).toJSON();

    expect(mark).toMatchSnapshot();
  });

  it('should render component with class "mark--small"', () => {
    const mark = renderer.create(<Mark {...minProps} small={true} />).toJSON();

    expect(mark).toMatchSnapshot();
  });
});
