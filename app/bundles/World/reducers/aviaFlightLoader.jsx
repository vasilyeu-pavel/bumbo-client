import actionTypes from '../constants/app';

export const initialState = {
  loaderElemet: null,
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOADER_ELEMENT:

    	return {
    		loaderElement: action.element,
    	}

    default:
      return state;
  }
}
