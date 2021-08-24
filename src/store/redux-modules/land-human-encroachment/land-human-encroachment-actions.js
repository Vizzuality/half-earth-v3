import { createAction } from 'redux-tools';

export const SET_LAND_PRESSURES_DATA_READY = createAction('SET_LAND_PRESSURES_DATA_READY');
export const STORE_LAND_PRESSURES_DATA_ERROR = createAction('STORE_LAND_PRESSURES_DATA_ERROR');
export const STORE_LAND_PRESSURES_DATA_LOADING = createAction('STORE_LAND_PRESSURES_DATA_LOADING');