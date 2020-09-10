import { createSelector } from 'reselect';
import { getCountryISO } from 'pages/data-globe/data-globe-selectors';
import get from 'lodash/get';

export const getSearchTerm = ({ location }) => console.log(location, get(location, 'query.ui')) ||
(location && get(location, 'query.ui.speciesModalSearch')) || null;

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
