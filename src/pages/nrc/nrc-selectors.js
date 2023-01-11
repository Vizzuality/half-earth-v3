import { isEmpty } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectUiUrlState,
  selectLangUrlState,
} from 'selectors/location-selectors';
import { getNRCSidebarView } from 'selectors/ui-selectors';

import {
  LAND_MARINE,
  getLandMarineOptions,
} from 'constants/country-mode-constants';
import { NRC_UI_DEFAULTS } from 'constants/pages-ui-defaults';

const selectBiodiversityData = ({ biodiversityData }) =>
  biodiversityData && (biodiversityData.data || null);
const selectMetadataData = ({ metadata }) =>
  metadata && (!isEmpty(metadata.data) || null);
const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
const selectCountriesData = ({ countryData }) =>
  countryData && countryData.data;

const selectActiveView = ({ location }) =>
  location.payload.view || NRC_UI_DEFAULTS.view;

const getUiSettings = createSelector([selectUiUrlState], (uiUrlState) => {
  return {
    ...NRC_UI_DEFAULTS,
    ...uiUrlState,
  };
});

const getHalfEarthModalOpen = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.openedModal
);

export const getCountryChallengesSelectedKey = createSelector(
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
export const getLandMarineSelected = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.landMarineSelection || LAND_MARINE.land
);

const getCountryData = createSelector(
  [selectCountriesData, selectCountryIso],
  (countriesData, countryISO) => {
    if (!countriesData || !countryISO) {
      return null;
    }
    return countriesData[countryISO];
  }
);

const getCountryName = createSelector([getCountryData], (countryData) => {
  if (!countryData) {
    return null;
  }
  return countryData.NAME_0;
});

const getCountryId = createSelector([getCountryData], (countryData) => {
  if (!countryData) {
    return null;
  }
  return countryData.ObjectId;
});

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

// locale is here to recompute landmarineOptions
const getCalculatedlandMarineOptions = createSelector(
  selectLangUrlState,
  // eslint-disable-next-line no-unused-vars
  (locale) => getLandMarineOptions()
);

const getSelectedLandMarineOption = createSelector(
  [getLandMarineSelected, getCalculatedlandMarineOptions],
  (landMarineSelection, landMarine) =>
    landMarine.find((option) => option.slug === landMarineSelection)
);

export default createStructuredSelector({
  countryISO: selectCountryIso,
  countryId: getCountryId,
  countryName: getCountryName,
  openedModal: getHalfEarthModalOpen,
  hasMetadata: selectMetadataData,
  speciesCategories: selectBiodiversityData,
  localSceneActiveTab: selectActiveView,
  countryChallengesSelectedKey: getCountryChallengesSelectedKey,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
  selectedLandMarineOption: getSelectedLandMarineOption,
  NRCSidebarView: getNRCSidebarView,
});
