import { createStructuredSelector } from 'reselect';
import { getHighlightedCountryIso } from 'pages/data-globe/data-globe-selectors';

const getCountryBorder = ({ countriesGeometries }, { countryISO }) => {
  if (!countryISO || !countriesGeometries) return null;
  if (!countriesGeometries.data) return null;
  if (!countriesGeometries.data[countryISO] || !countriesGeometries.data[countryISO].border) return null;
  return countriesGeometries.data[countryISO].border;
}

const getHighlightedCountryBorder = ({ countriesGeometries, highlightedCountryIso }) => {
  if (!highlightedCountryIso || !countriesGeometries) return null;
  if (!countriesGeometries.data) return null;
  if (!countriesGeometries.data[highlightedCountryIso] || !countriesGeometries.data[highlightedCountryIso].border) return null;
  return countriesGeometries.data[highlightedCountryIso].border;
}

export default createStructuredSelector({
  selectedCountryBorder: getCountryBorder,
  highlightedCountryIso: getHighlightedCountryIso,
  highlightedCountryBorder: getHighlightedCountryBorder
})