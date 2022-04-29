import { createSelector } from 'reselect';
import get from 'lodash/get';
import { SORT } from 'components/header-item';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import sortBy from 'lodash/sortBy';

const selectCountryIso = ({location}) => location.payload.iso.toUpperCase();

export const getSearchTerm = ({ location }) =>
(location && get(location, 'query.ui.speciesModalSearch')) || null;
export const getSpeciesModalSort = ({ location }) =>
  (location && get(location, 'query.ui.speciesModalSort')) || null;

const selectCountriesData = ({ countryData }) =>
  (countryData && countryData.data) || null;

export const getCountryData = createSelector(
  [selectCountriesData, selectCountryIso],
  (countriesData, iso) => {
    if (!countriesData) return null;
    const countryData = countriesData[iso];

    return {
      iso: countryData.GID_0,
      name: countryData.NAME_0,
      landSpeciesTotal: countryData[COUNTRY_ATTRIBUTES.nspecies_richness_ter],
      marineSpeciesTotal: countryData['nspecies_mar'],
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
        'species protection score': 'NSPS'
      }[sortedCategory] || sortedCategory;
    const sortedData = sortBy(filteredSpeciesList, (d) => d[category]);
    return direction === SORT.DESC ? sortedData.reverse() : sortedData;
  }
);
