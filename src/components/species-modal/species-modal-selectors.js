import { createSelector } from 'reselect';
import { getCountryISO } from 'pages/data-globe/data-globe-selectors';

const selectCountriesData = ({ countryData }) =>
  (countryData && countryData.data) || null;

export const getCountryData = createSelector(
  [selectCountriesData, getCountryISO],
  (countriesData, iso) => {
    if (!countriesData) return null;
    const countryData = countriesData[iso];
    return {
      iso: countryData.GID,
      name: countryData.NAME_0,
      speciesNumber: countryData.nspecies
    };
  }
);
