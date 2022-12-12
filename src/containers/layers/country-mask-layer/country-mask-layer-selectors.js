import { createStructuredSelector } from 'reselect';

const getCountryBorder = ({ countriesGeometries }, { countryISO }) => {
  if (!countryISO || !countriesGeometries) return null;
  if (!countriesGeometries.data) return null;
  if (
    !countriesGeometries.data[countryISO] ||
    !countriesGeometries.data[countryISO].borderGraphic
  )
    return null;
  return countriesGeometries.data[countryISO].borderGraphic;
};

const getCountryMask = ({ countriesGeometries }, { countryISO }) => {
  if (!countryISO || !countriesGeometries) return null;
  if (!countriesGeometries.data) return null;
  if (
    !countriesGeometries.data[countryISO] ||
    !countriesGeometries.data[countryISO].mask
  )
    return null;
  return countriesGeometries.data[countryISO].mask;
};

export default createStructuredSelector({
  countryBorder: getCountryBorder,
  countryMask: getCountryMask,
});
