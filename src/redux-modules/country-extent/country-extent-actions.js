import { createAction } from 'redux-tools';

export const setCountryExtentLoading = createAction(
  'SET_COUNTRY_EXTENT_LOADING'
);
export const setCountryExtentReady = createAction(
  'SET_COUNTRY_EXTENT_READY'
);
export const setCountryExtentError = createAction(
  'SET_COUNTRY_EXTENT_ERROR'
);
