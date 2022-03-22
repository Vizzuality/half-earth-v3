import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState } from 'selectors/location-selectors';

import nrcSceneConfig from 'scenes/nrc-scene/nrc-scene-config';
import { NRC_UI_DEFAULTS } from 'constants/pages-ui-defaults';

const selectBiodiversityData = ({ biodiversityData }) => biodiversityData && (biodiversityData.data || null);
const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);
const selectCountryExtent = ({ countryExtent }) => countryExtent ? countryExtent.data : null;
const selectUserConfig = ({ userConfig }) => userConfig || null;
const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
const selectActiveView = ({ location }) => location.payload.view || NRC_UI_DEFAULTS.view;

const getGlobeSettings = createSelector([selectGlobeUrlState],
  (globeUrlState) => {
    return {
      ...nrcSceneConfig,
      ...globeUrlState
    }
  })

const getUiSettings = createSelector([selectUiUrlState],
  (uiUrlState) => {
    return {
      ...NRC_UI_DEFAULTS,
      ...uiUrlState
    }
  })


export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers);
export const getCountryTooltipDisplayFor = createSelector(getGlobeSettings, globeSettings => globeSettings.countryTooltipDisplayFor);
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating);
const getHalfEarthModalOpen = createSelector(getUiSettings, uiSettings => uiSettings.openedModal);
const getCountryChallengesSelectedKey = createSelector(getUiSettings, uiSettings => uiSettings.countryChallengesSelectedKey);
export const getLocalSceneFilters = createSelector(getUiSettings, uiSettings => uiSettings.localSceneFilters);
export const getCountryChallengesSelectedFilter = createSelector(getUiSettings, uiSettings => uiSettings.countryChallengesSelectedFilter);
const getCountryName = createSelector(getGlobeSettings, globeSettings => globeSettings.countryName)
export const getOnBoardingType = createSelector(getUiSettings, uiSettings => uiSettings.onBoardingType);
export const getOnBoardingStep = createSelector(getUiSettings, uiSettings => uiSettings.onBoardingStep);
export const getOnWaitingInteraction = createSelector(getUiSettings, uiSettings => uiSettings.waitingInteraction);

export default createStructuredSelector({
  countryISO: selectCountryIso,
  countryName: getCountryName,
  userConfig: selectUserConfig,
  sceneLayers: getDataGlobeLayers,
  openedModal: getHalfEarthModalOpen,
  hasMetadata: selectMetadataData,
  activeLayers: getActiveLayers,
  sceneSettings: getGlobeSettings,
  countryExtent: selectCountryExtent,
  isGlobeUpdating: getGlobeUpdating,
  speciesCategories: selectBiodiversityData,
  localSceneActiveTab: selectActiveView,
  countryTooltipDisplayFor: getCountryTooltipDisplayFor,
  countryChallengesSelectedKey: getCountryChallengesSelectedKey,
  onBoardingType: getOnBoardingType,
  onBoardingStep: getOnBoardingStep,
  waitingInteraction: getOnWaitingInteraction,
});
