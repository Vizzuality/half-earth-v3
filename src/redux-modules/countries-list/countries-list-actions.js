import { createAction } from 'redux-tools';

export const setCountriesListLoading = createAction(
  'SET_COUNTRIES_LIST_LOADING'
);
export const setCountriesListReady = createAction(
  'SET_COUNTRIES_LIST_READY'
);
export const setCountriesListError = createAction(
  'SET_COUNTRIES_LIST_ERROR'
);
