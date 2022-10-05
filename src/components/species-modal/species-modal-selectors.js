import { createSelector } from 'reselect';

import { selectLangUrlState } from 'selectors/location-selectors';

import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

import { SORT } from 'components/header-item';

import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import { getCountryNames } from 'constants/translation-constants';

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();

export const getSearchTerm = ({ location }) =>
  (location && get(location, 'query.ui.speciesModalSearch')) || null;
export const getSpeciesModalSort = ({ location }) =>
  (location && get(location, 'query.ui.speciesModalSort')) || null;

const selectCountriesData = ({ countryData }) =>
  (countryData && countryData.data) || null;

export const getCountryData = createSelector(
  [selectCountriesData, selectCountryIso, selectLangUrlState],
  // eslint-disable-next-line no-unused-vars
  (countriesData, iso, locale) => {
    if (!countriesData) return null;
    const countryData = countriesData[iso];
    const countryNames = getCountryNames();

    return {
      iso: countryData.GID_0,
      name: countryNames[countryData.NAME_0] || countryData.NAME_0,
      coastal: countryData.Marine === 'True',
      landSpeciesTotal: countryData[COUNTRY_ATTRIBUTES.nspecies_richness_ter],
      marineSpeciesTotal: countryData.nspecies_mar,
    };
  }
);

export const getFilteredSpeciesList = createSelector(
  [(state) => state.speciesList, getSearchTerm],
  (speciesList, searchTerm) => {
    if (!speciesList) return null;
    if (!searchTerm) return speciesList;
    return speciesList.filter((c) =>
      Object.values(c).some(
        (v) => v && String(v).toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    );
  }
);

export const getSortedSpeciesList = createSelector(
  [getFilteredSpeciesList, getSpeciesModalSort],
  (filteredSpeciesList, speciesModalSort) => {
    if (!filteredSpeciesList) return null;
    if (!speciesModalSort) return filteredSpeciesList;
    const sortedCategory =
      speciesModalSort && speciesModalSort.split('-')[0].toLowerCase();
    const direction = speciesModalSort && speciesModalSort.split('-')[1];
    const category =
      {
        'species group': 'speciesgroup',
        'range within country protected': 'percentprotected',
        'species protection score': 'NSPS',
      }[sortedCategory] || sortedCategory;
    const sortedData = sortBy(filteredSpeciesList, (d) => d[category]);
    return direction === SORT.DESC ? sortedData.reverse() : sortedData;
  }
);
