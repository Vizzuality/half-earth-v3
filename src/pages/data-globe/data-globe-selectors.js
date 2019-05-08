import { createSelector, createStructuredSelector } from 'reselect';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState } from 'selectors/location-selectors';
import initialState from './data-globe-initial-state';

const getGlobeSettings = createSelector(selectGlobeUrlState, globeUrlState => {
  return {
    ...initialState.globe,
    ...globeUrlState
  }
})

const getUiSettings = createSelector(selectUiUrlState, uiUrlState => {
  return {
    ...initialState.ui,
    ...uiUrlState
  }
})

const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView)
const getScenePadding = createSelector(getUiSettings, uiSettings => uiSettings.isPaddingActive)

export default createStructuredSelector({
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  isLandscapeMode: getLandscapeMode,
  isPaddingActive: getScenePadding
})