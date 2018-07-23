/* global expect */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Stars from '../../app/bundles/World/components/common/Stars';

describe('<Stars /> component', () => {
  const minProps = { count: 2 };

  it('should render component with class "stars"', () => {
    const stars = renderer.create(<Stars {...minProps} />).toJSON();

    expect(stars).toMatchSnapshot();
  });

  it('should render component with class "stars--small"', () => {
    const stars = shallow(<Stars {...minProps} size='small' />);

    expect(stars.hasClass('stars--small')).toEqual(true);
  });

  it('should render component with class "stars--huge"', () => {
    const stars = shallow(<Stars {...minProps} size='huge' />);

    expect(stars.hasClass('stars--huge')).toEqual(true);
  });

  it('should render component with yellow icons', () => {
    const stars = renderer.create(<Stars {...minProps} color='yellow' />).toJSON();

    expect(stars).toMatchSnapshot();
  });

  it('should render component with orange icons', () => {
    const stars = renderer.create(<Stars {...minProps} color='orange' />).toJSON();

    expect(stars).toMatchSnapshot();
  });

  it(`should render ${minProps.count} SVG elements`, () => {
    const stars = shallow(<Stars {...minProps} />);

    expect(stars.find('svg')).toHaveLength(minProps.count);
  });
});
