import { createAction } from 'redux-tools';

export const setSpecies = createAction(
  'SET_SPECIES'
);

export const setSpeciesLoading = createAction(
  'SET_SPECIES_LOADING'
);

export const setSpeciesError = createAction(
  'SET_SPECIES_ERROR'
);