import { createSelector, createStructuredSelector } from 'reselect';

const selectCountriesData = ({ countryData }) =>
  (countryData && countryData.data) || null;
const selectUserConfig = ({ userConfig }) => userConfig || null;

const getCountryBorder = ({ countriesGeometries }, { countryISO }) => {
  if (!countryISO || !countriesGeometries) return null;
  if (!countriesGeometries.data) return null;
  if (!countriesGeometries.data[countryISO] || !countriesGeometries.data[countryISO].borderGraphic) return null;
  return countriesGeometries.data[countryISO].borderGraphic;
}

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();

const getCountryData = createSelector(
  [selectCountriesData, selectCountryIso],
  (countriesData, countryIso) => {
    if (!countryIso || !countriesData) return null;
    return (countriesData && countriesData[countryIso]) || null;
  }
)

export default createStructuredSelector({
  countriesData: selectCountriesData,
  countryBorder: getCountryBorder,
  userConfig: selectUserConfig,
  countryData: getCountryData,
})
