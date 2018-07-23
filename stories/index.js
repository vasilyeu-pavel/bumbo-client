import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../app/bundles/World/components/common/Button/Button.jsx';

storiesOf('Button', module)
  .add('default', () => (
    <Button>Default button</Button>
  ))
  .add('orange color', () => (
    <Button color='orange'>Orange button</Button>
  ))
  .add('small green color', () => (
    <Button color='green' modifiers={['small']}>Small green button</Button>
  ))
  .add('green color', () => (
    <Button color='green'>Green button</Button>
  ))
  .add('big with green color', () => (
    <Button color='green' modifiers={['big']}>Big green button</Button>
  ))
  .add('bigger with orange color', () => (
    <Button color='orange' modifiers={['bigger']}>Bigger orange button</Button>
  ))
  .add('linear with green color', () => (
    <Button modifiers={['linear', 'color-green']}>Linear green button</Button>
  ))
  .add('big linear with orange color', () => (
    <Button modifiers={['big', 'linear', 'color-orange']}>Big linear orange button</Button>
  ));
