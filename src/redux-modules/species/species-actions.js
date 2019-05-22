import { createAction } from 'redux-tools';

export const SPECIES_FETCH_DATA_READY = createAction(
  'SPECIES_FETCH_DATA_READY'
);

export const SPECIES_FETCH_DATA_LOADING = createAction(
  'SPECIES_FETCH_DATA_LOADING'
);
export const SPECIES_FETCH_DATA_ERROR = createAction(
  'SPECIES_FETCH_DATA_ERROR'
);