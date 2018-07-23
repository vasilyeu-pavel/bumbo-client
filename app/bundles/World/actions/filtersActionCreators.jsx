import actionTypes from '../constants/app';

export const updateFiltersParameters = (name, value) => ({
  type: actionTypes.UPDATE_FILTERS_PARAMETERS, name, value,
});

export const resetFiltersParameters = () => ({
  type: actionTypes.RESET_FILTERS_PARAMETERS,
});
