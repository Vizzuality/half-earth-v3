import { createStructuredSelector } from 'reselect';
import { getFeaturedGlobeSpec, getFeaturedGlobeLayers } from 'selectors/layers-selectors';
import { getQuery, getActiveLayers, getLandscapeModeParam } from 'selectors/location-selectors';

export default createStructuredSelector({
  query: getQuery,
  layerSpec: getFeaturedGlobeSpec,
  sceneLayers: getFeaturedGlobeLayers,
  activeLayers: getActiveLayers,
  landscapeViewActive: getLandscapeModeParam
})