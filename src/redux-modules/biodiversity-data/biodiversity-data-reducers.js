import * as actions from './biodiversity-data-actions';

export const initialState = { data: null, loading: false, loaded: false };

const MARINE_SPECIES = 'fishes';

function setSpeciesLoading(state) {
  return { ...state, loading: true };
}

function setSpeciesError(state, { payload }) {
  return { ...state, loading: false, loaded: false, error: payload };
}

function setSpecies(state, { payload }) {
  return { 
    ...state,
    loading: false,
    loaded: true,
    data: {
      terrestrial: payload.filter(o => o.value.toLowerCase() !== MARINE_SPECIES),
      marine: payload.filter(o => o.value.toLowerCase() === MARINE_SPECIES)
    } 
  };
}

export default {
  [actions.setSpecies]: setSpecies,
  [actions.setSpeciesError]: setSpeciesError,
  [actions.setSpeciesLoading]: setSpeciesLoading
};
