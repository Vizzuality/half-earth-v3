import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState } from 'selectors/location-selectors';

import dataSceneConfig from 'scenes/data-scene/data-scene-config';
import countrySceneConfig from 'scenes/country-scene/country-scene-config';

const selectBiodiversityData = ({ biodiversityData }) => biodiversityData && (biodiversityData.data || null);
const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);
const selectCountryExtent = ({ countryExtent }) => countryExtent ? countryExtent.data : null;
const selectUserConfig = ({ userConfig }) => userConfig || null;
const selectCountryIso = ({location}) => location.payload.iso

const getGlobeSettings = createSelector([selectGlobeUrlState],
  (globeUrlState) => {
  return {
    ...countrySceneConfig.globe,
    ...globeUrlState
  }
})

const getUiSettings = createSelector([selectUiUrlState],
  (uiUrlState) => {
  return {
    ...countrySceneConfig.ui,
    ...uiUrlState
  }
})


export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating)
const getCountryName = createSelector(getGlobeSettings, globeSettings => globeSettings.countryName)
const getHalfEarthModalOpen = createSelector(getUiSettings, uiSettings => uiSettings.openedModal);
const getLocalSceneActiveTab = createSelector(getUiSettings, uiSettings => uiSettings.localSceneActiveTab);
const getCountryChallengesSelectedKey = createSelector(getUiSettings, uiSettings => uiSettings.countryChallengesSelectedKey);
export const getLocalSceneFilters = createSelector(getUiSettings, uiSettings => uiSettings.localSceneFilters);
export const getCountryChallengesSelectedFilter = createSelector(getUiSettings, uiSettings => uiSettings.countryChallengesSelectedFilter);



export default createStructuredSelector({
    countryISO: selectCountryIso,
    userConfig: selectUserConfig,
    countryName: getCountryName,
    sceneLayers: getDataGlobeLayers,
    openedModal: getHalfEarthModalOpen,
    hasMetadata: selectMetadataData,
    activeLayers: getActiveLayers,
    sceneSettings: getGlobeSettings,
    countryExtent: selectCountryExtent,
    isGlobeUpdating: getGlobeUpdating,
    speciesCategories: selectBiodiversityData,
    localSceneActiveTab: getLocalSceneActiveTab,
    countryChallengesSelectedKey: getCountryChallengesSelectedKey,
});