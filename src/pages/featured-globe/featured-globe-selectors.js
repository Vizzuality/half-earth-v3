import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getFeaturedGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState } from 'selectors/location-selectors';
import initialState from './featured-globe-initial-state';
import sceneSettings from './featured-globe-settings.js';

const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);

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

const getSceneSettings = createSelector(getGlobeSettings, globeSettings => {
  return {
    ...sceneSettings,
    zoom: globeSettings.zoom,
    center: globeSettings.center
  }
})

// GLOBE
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView);
const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers);

// UI
const getSelectedFeaturedMap = createSelector(getUiSettings, uiSettings => uiSettings.selectedFeaturedMap);
const getFullscreenActive = createSelector(getUiSettings, uiSettings => uiSettings.isFullscreenActive);

export default createStructuredSelector({
  sceneLayers: getFeaturedGlobeLayers,
  activeLayers: getActiveLayers,
  isLandscapeMode: getLandscapeMode,
  sceneSettings: getSceneSettings,
  hasMetadata: selectMetadataData,
  isFullscreenActive: getFullscreenActive,
  selectedFeaturedMap: getSelectedFeaturedMap
})