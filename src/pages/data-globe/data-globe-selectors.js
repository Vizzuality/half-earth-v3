import { createSelector, createStructuredSelector } from 'reselect';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState } from 'selectors/location-selectors';
import initialState from './data-globe-initial-state';

const getGlobeSettings = createSelector(selectGlobeUrlState, globeUrlState => {
  return {
    ...initialState,
    ...globeUrlState
  }
})

const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView)

export default createStructuredSelector({
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  globeSettings: getGlobeSettings,
  isLandscapeMode: getLandscapeMode
})