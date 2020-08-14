import { createStructuredSelector } from 'reselect';

const getCountryBorder = ({ countriesGeometries }, { countryISO }) => {
  if (!countryISO || !countriesGeometries) return null;
  if (!countriesGeometries.data) return null;
  if (!countriesGeometries.data[countryISO] || !countriesGeometries.data[countryISO].border) return null;
  return countriesGeometries.data[countryISO].border;
}

export default createStructuredSelector({
  countryBorder: getCountryBorder
})