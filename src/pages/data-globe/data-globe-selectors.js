import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState, selectListenersState } from 'selectors/location-selectors';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER, RAISIG_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';
import initialState from './data-globe-initial-state';

const selectBiodiversityData = ({ biodiversityData }) => biodiversityData && (biodiversityData.data || null);
const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);
const selectCountryExtent = ({ countryExtent }) => countryExtent ? countryExtent.data : null;

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

export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView)
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating)
const getSelectedSpecies = createSelector(getGlobeSettings, globeSettings => globeSettings.selectedSpecies)
const getCountryISO = createSelector(getGlobeSettings, globeSettings => globeSettings.countryISO)
const getCountryName = createSelector(getGlobeSettings, globeSettings => globeSettings.countryName)
const getSidebarVisibility = createSelector(getUiSettings, uiSettings => uiSettings.isSidebarOpen)
const getFullscreenActive = createSelector(getUiSettings, uiSettings => uiSettings.isFullscreenActive)
const getActiveCategory = createSelector(getUiSettings, uiSettings => uiSettings.activeCategory)
const getActiveOption = createSelector(getUiSettings, uiSettings => uiSettings.activeOption)
const getLandscapeSidebarCollapsed = createSelector(getUiSettings, uiSettings => uiSettings.isLandscapeSidebarCollapsed);
const getHalfEarthModalOpen = createSelector(getUiSettings, uiSettings => uiSettings.isHEModalOpen);
const getSceneMode = createSelector(getUiSettings, uiSettings => uiSettings.sceneMode);
const getCountedActiveLayers = createSelector(
  [getActiveLayers, getRasters],
  (activeLayers, rasters) => {
    const biodiversityLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Biodiversity').length : 0;
    const protectionLayers = activeLayers ? activeLayers.filter(({ category, title }) => {
      // we have to filter 'RAISIG' layer because activating 'Community-based' checbox selects two layers on the globe: "protected_areas_vector_tile_layer" and "RAISIG_areas_vector_tile_layer"
      return category === 'Existing protection' && title !== RAISIG_AREAS_VECTOR_TILE_LAYER
    }).length : 0; 
    const humanPressureLayer = activeLayers ? activeLayers.filter(({ title }) => title === LAND_HUMAN_PRESSURES_IMAGE_LAYER).length : 0;
    const humanPressureRasters = humanPressureLayer && Object.keys(rasters).filter(key => rasters[key]).length;

    return {
      'Biodiversity': biodiversityLayers,
      'Existing protection': protectionLayers,
      'Human pressures': humanPressureRasters
    };
  }
);


export default createStructuredSelector({
  sceneSettings: getGlobeSettings,
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  countryISO: getCountryISO,
  countryName: getCountryName,
  isLandscapeMode: getLandscapeMode,
  isSidebarOpen: getSidebarVisibility,
  isGlobeUpdating: getGlobeUpdating,
  isFullscreenActive: getFullscreenActive,
  activeCategory: getActiveCategory,
  speciesCategories: selectBiodiversityData,
  hasMetadata: selectMetadataData,
  listeners: getListenersSetting,
  selectedSpecies: getSelectedSpecies,
  isHEModalOpen: getHalfEarthModalOpen,
  activeOption: getActiveOption, // mobile
  isLandscapeSidebarCollapsed: getLandscapeSidebarCollapsed, // mobile
  sceneMode: getSceneMode,
  countryExtent: selectCountryExtent,
  countedActiveLayers: getCountedActiveLayers,
})