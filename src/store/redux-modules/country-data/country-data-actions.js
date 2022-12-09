import { createAction } from 'redux-tools';

export const setCountryDataLoading = createAction('SET_COUNTRY_DATA_LOADING');
export const setCountryDataReady = createAction('SET_COUNTRY_DATA_READY');
export const setCountryDataError = createAction('SET_COUNTRY_DATA_ERROR');
