/* global expect */

import declOfNums from '../../app/bundles/World/utils/declOfNum';

describe('declOfNums util', () => {
  const titles = ['ночь', 'ночи', 'ночей'];

  it('should render component with correct title "1 ночь"', () => {
    expect(declOfNums(1, titles)).toEqual('ночь');
  });

  it('should render component with correct title "2 ночи"', () => {
    expect(declOfNums(2, titles)).toEqual('ночи');
  });

  it('should render component with correct title "5 ночей"', () => {
    expect(declOfNums(5, titles)).toEqual('ночей');
  });

  it('should render component with correct title "437 ночей"', () => {
    expect(declOfNums(437, titles)).toEqual('ночей');
  });
});
