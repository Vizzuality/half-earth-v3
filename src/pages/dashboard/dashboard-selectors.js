/* eslint-disable max-len */
import { isEmpty } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { getDataGlobeLayers } from 'selectors/layers-selectors';
import {
  selectGlobeUrlState,
  selectUiUrlState,
} from 'selectors/location-selectors';

import dashboardViewConfig from '../../containers/views/dashboard-view/dashboard-view-config';

const selectBiodiversityData = ({ biodiversityData }) =>
  biodiversityData && (biodiversityData.data || null);
const selectMetadataData = ({ metadata }) =>
  metadata && (!isEmpty(metadata.data) || null);
const selectCountryExtent = ({ countryExtent }) =>
  countryExtent ? countryExtent.data : null;

const getViewSettings = createSelector(selectGlobeUrlState, (globeUrlState) => {
  return {
    ...dashboardViewConfig.view,
    ...globeUrlState,
  };
});

const getUiSettings = createSelector(selectUiUrlState, (uiUrlState) => {
  return {
    ...dashboardViewConfig.ui,
    ...uiUrlState,
  };
});

export const getActiveLayers = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.activeLayers
);
export const getCountryTooltipDisplayFor = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.countryTooltipDisplayFor
);
const getGlobeUpdating = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.isGlobeUpdating
);
const getSelectedSpecies = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.selectedSpecies
);
export const getCountryISO = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.countryISO
);
const getCountryName = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.countryName
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
  viewSettings: getViewSettings,
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
