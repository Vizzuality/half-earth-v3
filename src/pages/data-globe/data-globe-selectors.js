import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState, selectListenersState } from 'selectors/location-selectors';
import { RAISIG_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import dataSceneConfig from 'scenes/data-scene/data-scene-config';

const selectBiodiversityData = ({ biodiversityData }) => biodiversityData && (biodiversityData.data || null);
const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);
const selectCountryExtent = ({ countryExtent }) => countryExtent ? countryExtent.data : null;
const selectUserConfig = ({ userConfig }) => userConfig || null;

const getGlobeSettings = createSelector(selectGlobeUrlState,
  (globeUrlState) => {
  return {
    ...dataSceneConfig.globe,
    ...globeUrlState
  }
})

const getUiSettings = createSelector(selectUiUrlState,
  (uiUrlState) => {
  return {
    ...dataSceneConfig.ui,
    ...uiUrlState
  }
})

const getListenersSetting = createSelector(selectListenersState, listenersUrlState => {
  return listenersUrlState ? listenersUrlState : false;
})

export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView)
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating)
const getSelectedSpecies = createSelector(getGlobeSettings, globeSettings => globeSettings.selectedSpecies)
export const getCountryISO = createSelector(getGlobeSettings, globeSettings => globeSettings.countryISO)
const getCountryName = createSelector(getGlobeSettings, globeSettings => globeSettings.countryName)
const getSidebarVisibility = createSelector(getUiSettings, uiSettings => uiSettings.isSidebarOpen)
const getFullscreenActive = createSelector(getUiSettings, uiSettings => uiSettings.isFullscreenActive)
const getActiveCategory = createSelector(getUiSettings, uiSettings => uiSettings.activeCategory)
const getActiveOption = createSelector(getUiSettings, uiSettings => uiSettings.activeOption)
const getLandscapeSidebarCollapsed = createSelector(getUiSettings, uiSettings => uiSettings.isLandscapeSidebarCollapsed);
const getHalfEarthModalOpen = createSelector(getUiSettings, uiSettings => uiSettings.openedModal);
const getSceneMode = createSelector(getUiSettings, uiSettings => uiSettings.sceneMode);
const getLocalSceneActiveTab = createSelector(getUiSettings, uiSettings => uiSettings.localSceneActiveTab);
const getCountryChallengesSelectedKey = createSelector(getUiSettings, uiSettings => uiSettings.countryChallengesSelectedKey);
export const getLocalSceneFilters = createSelector(getUiSettings, uiSettings => uiSettings.localSceneFilters);
export const getCountryChallengesSelectedFilter = createSelector(getUiSettings, uiSettings => uiSettings.countryChallengesSelectedFilter);
const getCountedActiveLayers = createSelector(
  [getActiveLayers],
  (activeLayers) => {
    const biodiversityLayers = activeLayers ? activeLayers.filter(({ category }) => category === LAYERS_CATEGORIES.BIODIVERSITY).length : 0;
    const protectionLayers = activeLayers ? activeLayers.filter(({ category, title }) => {
      // we have to filter 'RAISIG' layer because activating 'Community-based' checbox selects two layers on the globe: "protected_areas_vector_tile_layer" and "RAISIG_areas_vector_tile_layer"
      return category === LAYERS_CATEGORIES.PROTECTION && title !== RAISIG_AREAS_VECTOR_TILE_LAYER
    }).length : 0;
    const landHumanPressureLayers = activeLayers ? activeLayers.filter(({ category }) => category === LAYERS_CATEGORIES.LAND_PRESSURES).length : 0;

    return {
      'Biodiversity': biodiversityLayers,
      'Existing protection': protectionLayers,
      'Human pressures': landHumanPressureLayers
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
  openedModal: getHalfEarthModalOpen,
  activeOption: getActiveOption, // mobile
  isLandscapeSidebarCollapsed: getLandscapeSidebarCollapsed, // mobile
  sceneMode: getSceneMode,
  localSceneActiveTab: getLocalSceneActiveTab,
  countryChallengesSelectedKey: getCountryChallengesSelectedKey,
  countryExtent: selectCountryExtent,
  localSceneFilters: getLocalSceneFilters,
  countedActiveLayers: getCountedActiveLayers,
  userConfig: selectUserConfig
});