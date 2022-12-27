import { createSelector } from 'reselect';

import {
  selectLangUrlState,
  selectUiUrlState,
} from 'selectors/location-selectors';

import { LAND_MARINE } from 'constants/country-mode-constants';
import { NRC_UI_DEFAULTS } from 'constants/pages-ui-defaults';

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();

const selectCountriesData = ({ countryData }) =>
  countryData && countryData.data;

export const getCountryData = createSelector(
  [selectCountriesData, selectCountryIso],
  (countriesData, countryIso) => {
    if (!countryIso || !countriesData) return null;
    return (countriesData && countriesData[countryIso]) || null;
  }
);

export const getDescription = createSelector(
  [getCountryData, selectLangUrlState],
  (countryData, locale) => {
    if (!countryData) return null;
    return locale && locale !== 'en'
      ? countryData[`sentence_${locale}`]
      : countryData.sentence;
  }
);

const getUiSettings = createSelector([selectUiUrlState], (uiUrlState) => {
  return {
    ...NRC_UI_DEFAULTS,
    ...uiUrlState,
  };
});

export const getLandMarineSelected = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.landMarineSelection || LAND_MARINE.land
);
