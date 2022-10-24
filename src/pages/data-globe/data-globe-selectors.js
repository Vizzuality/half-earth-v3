/* eslint-disable max-len */
import { isEmpty } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { getDataGlobeLayers } from 'selectors/layers-selectors';
import {
  selectGlobeUrlState,
  selectListenersState,
  selectUiUrlState,
} from 'selectors/location-selectors';

import dataSceneConfig from 'scenes/data-scene/data-scene-config';

const selectBiodiversityData = ({ biodiversityData }) =>
  biodiversityData && (biodiversityData.data || null);
const selectMetadataData = ({ metadata }) =>
  metadata && (!isEmpty(metadata.data) || null);
const selectCountryExtent = ({ countryExtent }) =>
  countryExtent ? countryExtent.data : null;

const getGlobeSettings = createSelector(
  selectGlobeUrlState,
  (globeUrlState) => {
    return {
      ...dataSceneConfig.globe,
      ...globeUrlState,
    };
  }
);

const getUiSettings = createSelector(selectUiUrlState, (uiUrlState) => {
  return {
    ...dataSceneConfig.ui,
    ...uiUrlState,
  };
});

const getListenersSetting = createSelector(
  selectListenersState,
  (listenersUrlState) => {
    return listenersUrlState || false;
  }
);

export const getActiveLayers = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.activeLayers
);
export const getCountryTooltipDisplayFor = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.countryTooltipDisplayFor
);
const getGlobeUpdating = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.isGlobeUpdating
);
const getSelectedSpecies = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.selectedSpecies
);
export const getCountryISO = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.countryISO
);
const getCountryName = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.countryName
);
const getSidebarVisibility = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.isSidebarOpen
);
const getFullscreenActive = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.isFullscreenActive
);
const getActiveCategory = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.activeCategory
);
const getHalfEarthModalOpen = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.openedModal
);
const getSceneMode = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.sceneMode
);
const getCountryChallengesSelectedKey = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.countryChallengesSelectedKey
);
export const getLocalSceneFilters = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.localSceneFilters
);
export const getCountryChallengesSelectedFilter = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.countryChallengesSelectedFilter
);
export const getOnboardingType = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.onboardingType
);
export const getOnboardingStep = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.onboardingStep
);
export const getOnWaitingInteraction = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.waitingInteraction
);
export const getAOIId = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.aoiId
);
export const getSelectedAnalysisLayer = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.selectedAnalysisLayer
);
export const getSelectedAnalysisTab = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.selectedAnalysisTab || 'click'
);

export default createStructuredSelector({
  sceneSettings: getGlobeSettings,
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  countryISO: getCountryISO,
  countryName: getCountryName,
  isSidebarOpen: getSidebarVisibility,
  isGlobeUpdating: getGlobeUpdating,
  isFullscreenActive: getFullscreenActive,
  activeCategory: getActiveCategory,
  speciesCategories: selectBiodiversityData,
  hasMetadata: selectMetadataData,
  listeners: getListenersSetting,
  selectedSpecies: getSelectedSpecies,
  openedModal: getHalfEarthModalOpen,
  sceneMode: getSceneMode,
  countryTooltipDisplayFor: getCountryTooltipDisplayFor,
  countryChallengesSelectedKey: getCountryChallengesSelectedKey,
  countryExtent: selectCountryExtent,
  localSceneFilters: getLocalSceneFilters,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
  aoiId: getAOIId,
});
