import { initialStates as frontendState } from '../reducers';
import InitialStateConfigurator from './InitialStateConfigurator';

const getInitialState = (backendState) => {
  const initialStateConfigurator = new InitialStateConfigurator(backendState, frontendState);
  const initialState = initialStateConfigurator.get();

  return initialState;
};

export default getInitialState;
