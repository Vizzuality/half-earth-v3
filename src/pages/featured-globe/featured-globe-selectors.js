import { createSelector, createStructuredSelector } from 'reselect';
import { getFeaturedGlobeSpec, getFeaturedGlobeLayers } from 'selectors/layers-selectors';
import { getQuery, selectGlobeUrlState } from 'selectors/location-selectors';
import initialState from './initial-state';

const getGlobeSettings = createSelector(selectGlobeUrlState, globeUrlState => {
  return {
    ...initialState,
    ...globeUrlState
  }
})

const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView)

export default createStructuredSelector({
  query: getQuery,
  layerSpec: getFeaturedGlobeSpec,
  sceneLayers: getFeaturedGlobeLayers,
  activeLayers: getActiveLayers,
  globeSettings: getGlobeSettings,
  isLandscapeMode: getLandscapeMode
})