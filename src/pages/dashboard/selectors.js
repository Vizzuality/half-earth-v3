import { createSelector, createStructuredSelector } from 'reselect';

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
const selectCountriesData = ({ countryData }) =>
  countryData && countryData.data;

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
  return countryData.OBJECTID;
});

export default createStructuredSelector({
  countryISO: selectCountryIso,
  countryId: getCountryId,
  countryName: getCountryName,
});
