import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState, selectListenersState } from 'selectors/location-selectors';
import initialState from './data-globe-initial-state';
import sceneSettings from './data-globe-settings';

const selectBiodiversityData = ({ biodiversityData }) => biodiversityData && (biodiversityData.data || null);
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

const getListenersSetting = createSelector(selectListenersState, listenersUrlState => {
  return listenersUrlState ? listenersUrlState : initialState.listeners;
})

const getSceneSettings = createSelector(getGlobeSettings, globeSettings => {
  return {
    ...sceneSettings,
    zoom: globeSettings.zoom,
    center: globeSettings.center
  }
})

export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView)
const getSidebarVisibility = createSelector(getUiSettings, uiSettings => uiSettings.isSidebarOpen)
const getHalfEarthMeterOpen = createSelector(getUiSettings, uiSettings => uiSettings.isHalfEarthMeterModalOpen)
const getAboutOpen = createSelector(getUiSettings, uiSettings => uiSettings.isAboutOpen)
const getAboutActiveSection = createSelector(getUiSettings, uiSettings => uiSettings.activeAboutSection)
const getFullscreenActive = createSelector(getUiSettings, uiSettings => uiSettings.isFullscreenActive)
const getActiveCategory = createSelector(getUiSettings, uiSettings => uiSettings.activeCategory)
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating)
export const getRasters = createSelector(getGlobeSettings, globeSettings => globeSettings.rasters)
const getSelectedSpecies = createSelector(getGlobeSettings, globeSettings => globeSettings.selectedSpecies)
const getActiveOption = createSelector(getUiSettings, uiSettings => uiSettings.activeOption)

export default createStructuredSelector({
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  isLandscapeMode: getLandscapeMode,
  isSidebarOpen: getSidebarVisibility,
  isGlobeUpdating: getGlobeUpdating,
  isFullscreenActive: getFullscreenActive,
  isHalfEarthMeterModalOpen: getHalfEarthMeterOpen, // mobile
  isAboutOpen: getAboutOpen, // mobile
  activeAboutSection: getAboutActiveSection, // mobile
  sceneSettings: getSceneSettings,
  activeCategory: getActiveCategory,
  speciesCategories: selectBiodiversityData,
  rasters: getRasters,
  hasMetadata: selectMetadataData,
  listeners: getListenersSetting,
  selectedSpecies: getSelectedSpecies,
  activeOption: getActiveOption // mobile
})