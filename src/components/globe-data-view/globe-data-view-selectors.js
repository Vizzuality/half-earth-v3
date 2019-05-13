import { createStructuredSelector } from 'reselect';
import { getDataGlobeSpec, getDataGlobeLayers } from 'selectors/layers-selectors';
import { getQuery, getActiveLayers, getLandscapeModeParam } from 'selectors/location-selectors';

export default createStructuredSelector({
  query: getQuery,
  layerSpec: getDataGlobeSpec,
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  landscapeViewActive: getLandscapeModeParam
})