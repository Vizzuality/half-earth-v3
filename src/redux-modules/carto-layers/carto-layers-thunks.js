import CARTO from 'services/carto';
import './carto-layers';
import { setDatasetsLoading, setDatasetsReady, setDatasetsError } from './carto-layers-actions';
import { parseCartoLayersToWRI } from './carto-layers-utils';

export default async function fetchDatasetsThunk(dispatch, getState) {
  const { data } = getState().cartoLayers;
  if (!data) {
    dispatch(setDatasetsLoading());
    try {
      const [ layers, datasets ] = await Promise.all([ CARTO.get('layers'), CARTO.get('datasets') ]);
      const parsedDatasets = parseCartoLayersToWRI(layers, datasets);
      dispatch(setDatasetsReady(parsedDatasets));
    } catch (e) {
      console.warn(e);
      dispatch(setDatasetsError(e));
    }
  }
}
