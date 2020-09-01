import { createSelector, createStructuredSelector } from 'reselect';
import { getHighlightedCountryIso } from 'pages/data-globe/data-globe-selectors';

const selectCountriesGeometries = ({ countriesGeometries }) => countriesGeometries.data;

const getCountryBorder = ({ countriesGeometries }, { countryISO }) => {
  if (!countryISO || !countriesGeometries) return null;
  if (!countriesGeometries.data) return null;
  if (!countriesGeometries.data[countryISO] || !countriesGeometries.data[countryISO].borderGraphic) return null;
  return countriesGeometries.data[countryISO].borderGraphic;
}

const getHighlightedCountryBorder = createSelector(
  [selectCountriesGeometries, getHighlightedCountryIso],
  (countriesGeometries, highlightedCountryIso) => {
  if (!highlightedCountryIso || !countriesGeometries) return null;
  if (!countriesGeometries[highlightedCountryIso] || !countriesGeometries[highlightedCountryIso].borderGraphic) return null;
  return countriesGeometries[highlightedCountryIso].borderGraphic;
  })

export default createStructuredSelector({
  selectedCountryBorder: getCountryBorder,
  highlightedCountryIso: getHighlightedCountryIso,
  highlightedCountryBorder: getHighlightedCountryBorder
})