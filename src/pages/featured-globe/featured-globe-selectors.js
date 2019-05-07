import { createSelector, createStructuredSelector } from 'reselect';
import { getFeaturedGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState } from 'selectors/location-selectors';
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
  sceneLayers: getFeaturedGlobeLayers,
  activeLayers: getActiveLayers,
  globeSettings: getGlobeSettings,
  isLandscapeMode: getLandscapeMode
})