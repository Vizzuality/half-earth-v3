import { createStructuredSelector } from 'reselect';

const selectCountriesData = ({ countryData }) => countryData.data || null;

const getCountryBorder = ({ countriesGeometries }, { countryISO }) => {
  if (!countryISO || !countriesGeometries) return null;
  if (!countriesGeometries.data) return null;
  if (!countriesGeometries.data[countryISO] || !countriesGeometries.data[countryISO].borderGraphic) return null;
  return countriesGeometries.data[countryISO].borderGraphic;
}

export default createStructuredSelector({
  countriesData: selectCountriesData,
  countryBorder: getCountryBorder
})
