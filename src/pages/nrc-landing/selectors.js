import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState, selectListenersState } from 'selectors/location-selectors';

import dataSceneConfig from 'scenes/nrc-landing-scene/scene-config';

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
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating)
export const getCountryISO = createSelector(getGlobeSettings, globeSettings => globeSettings.countryISO)
const getCountryName = createSelector(getGlobeSettings, globeSettings => globeSettings.countryName)
const getSceneMode = createSelector(getUiSettings, uiSettings => uiSettings.sceneMode);
export const getLocalSceneFilters = createSelector(getUiSettings, uiSettings => uiSettings.localSceneFilters);
export const getCountryChallengesSelectedFilter = createSelector(getUiSettings, uiSettings => uiSettings.countryChallengesSelectedFilter);


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
  userConfig: selectUserConfig
});