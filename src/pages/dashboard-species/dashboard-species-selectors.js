/* eslint-disable max-len */
import { createSelector, createStructuredSelector } from 'reselect';

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
const selectCountriesData = ({ countryData }) =>
  countryData && (countryData.data || null);

export const getCountryISO = createSelector(
  selectCountryIso,
  (countryISO) => countryISO
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

const getCountryName = createSelector(
  [getCountryData],
  (countryData) => {
    if (!countryData) {
      return null;
    }
    return countryData.NAME_0;
  }
);

export default createStructuredSelector({
  countryISO: getCountryISO,
  countriesData: selectCountriesData,
  countryName: getCountryName
});
