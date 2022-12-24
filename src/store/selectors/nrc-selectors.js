import { createSelector } from 'reselect';

import { selectLangUrlState } from 'selectors/location-selectors';

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
