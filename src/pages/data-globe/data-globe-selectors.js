import { createSelector, createStructuredSelector } from 'reselect';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState } from 'selectors/location-selectors';
import initialState from './data-globe-initial-state';
import sceneSettings from './data-globe-settings';

const getBiodiversityData = ({ biodiversityData }) => biodiversityData && (biodiversityData.data || null);

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

const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView)
const getSidebarVisibility = createSelector(getUiSettings, uiSettings => uiSettings.isSidebarOpen)
const getActiveCategory = createSelector(getUiSettings, uiSettings => uiSettings.activeCategory)

export default createStructuredSelector({
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  isLandscapeMode: getLandscapeMode,
  isSidebarOpen: getSidebarVisibility,
  sceneSettings: getSceneSettings,
  activeCategory: getActiveCategory,
  speciesCategories: getBiodiversityData
})