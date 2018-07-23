import ReactOnRails from 'react-on-rails';
import appStore from '../store/store';
import App from './App';

// This is how react_on_rails can see the World in the browser.
ReactOnRails.register({ App });

ReactOnRails.registerStore({ appStore });
