/* eslint-disable max-len */
import { isEmpty } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectListenersState, selectUiUrlState } from 'selectors/location-selectors';

import dataSceneConfig from 'scenes/nrc-landing-scene/scene-config';

const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);
const selectCountryExtent = ({ countryExtent }) => (countryExtent ? countryExtent.data : null);

const getGlobeSettings = createSelector(
  selectGlobeUrlState,
  (globeUrlState) => {
    return {
      ...dataSceneConfig.globe,
      ...globeUrlState,
    };
  },
);

const getUiSettings = createSelector(
  selectUiUrlState,
  (uiUrlState) => {
    return {
      ...dataSceneConfig.ui,
      ...uiUrlState,
    };
  },
);

const getListenersSetting = createSelector(selectListenersState, (listenersUrlState) => {
  return listenersUrlState || false;
});

export const getActiveLayers = createSelector(getGlobeSettings, (globeSettings) => globeSettings.activeLayers);
const getGlobeUpdating = createSelector(getGlobeSettings, (globeSettings) => globeSettings.isGlobeUpdating);
export const getCountryISO = createSelector(getGlobeSettings, (globeSettings) => globeSettings.countryTooltipDisplayFor);
const getCountryName = createSelector(getGlobeSettings, (globeSettings) => globeSettings.countryName);
const getSceneMode = createSelector(getUiSettings, (uiSettings) => uiSettings.sceneMode);
export const getLocalSceneFilters = createSelector(getUiSettings, (uiSettings) => uiSettings.localSceneFilters);
export const getCountryChallengesSelectedFilter = createSelector(getUiSettings, (uiSettings) => uiSettings.countryChallengesSelectedFilter);
export const getOnboardingType = createSelector(getUiSettings, (uiSettings) => uiSettings.onboardingType);
export const getOnboardingStep = createSelector(getUiSettings, (uiSettings) => uiSettings.onboardingStep);
export const getOnWaitingInteraction = createSelector(getUiSettings, (uiSettings) => uiSettings.waitingInteraction);

export default createStructuredSelector({
  sceneSettings: getGlobeSettings,
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  countryISO: getCountryISO,
  countryName: getCountryName,
  isGlobeUpdating: getGlobeUpdating,
  hasMetadata: selectMetadataData,
  listeners: getListenersSetting,
  sceneMode: getSceneMode,
  countryExtent: selectCountryExtent,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
});
