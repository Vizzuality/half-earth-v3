import * as actions from './species-actions';
import iucnList from 'constants/iucn-list';

export const initialState = { loading: false, error: false, data: null };

function fetchSpeciesLoading(state) {
  return { ...state, loading: true };
}

function fetchSpeciesReady(state, { payload }) {
  const speciesData = payload
  .filter(speciesObject => speciesObject.data.length )
  .map(speciesObject => ({ ...speciesObject.data[0], iucn: iucnList[speciesObject.data[0].redlist] }));

  return { ...state, data: speciesData };
}

function fetchSpeciesError(state, { payload }) {
  return { ...state, loading: false, error: payload };
}

export default {
  [actions.SPECIES_FETCH_DATA_LOADING]: fetchSpeciesLoading,
  [actions.SPECIES_FETCH_DATA_READY]: fetchSpeciesReady,
  [actions.SPECIES_FETCH_DATA_ERROR]: fetchSpeciesError
};
