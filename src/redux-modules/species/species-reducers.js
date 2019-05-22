import * as actions from './species-actions';
import iucnList from 'constants/iucn-list';

export const initialState = { data: null };

function fetchSpeciesReady(state, { payload }) {
  console.log(payload)
  const speciesData = payload
  .filter(speciesObject => speciesObject.data.length )
  .map(speciesObject => ({ ...speciesObject.data[0], iucn: iucnList[speciesObject.data[0].redlist] }));

  return { ...state, data: speciesData };
}

export default {
  [actions.SPECIES_FETCH_DATA_READY]: fetchSpeciesReady
};
