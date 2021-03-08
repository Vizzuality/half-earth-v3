import { createStructuredSelector, createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import { SORT } from 'components/header-item';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const getSortRankingCategory = (_, props) => (props && props.sortRankingCategory) || null;
const getSearchTerm = ({ location }) => (location && get(location, 'query.ui.rankingSearch')) || null;

const getRankingData = createSelector([selectCountriesData], countriesData => {
  if(!countriesData) return null;
  return Object.keys(countriesData).map((iso) => {
    const d = countriesData[iso];
    return {
      spi: d.SPI,
      name: d.NAME_0,
      iso,
      species: {
        nonEndemic: 100 - (100 * d.total_endemic / d.nspecies),
        endemic: (100 * d.total_endemic / d.nspecies)
      },
      'human modification': {
        veryHigh: d.prop_hm_very_high,
        totalMinusVeryHigh: 100 - d.prop_hm_very_high - d.prop_hm_0,
        noModification: d.prop_hm_0
      },
      protection: {
        protected: d.prop_protected,
        protectionNeeded: d.protection_needed,
        protectionNotNeeded: 100 - d.protection_needed - d.prop_protected
      }
    };
  });
});

const getDataWithSPIOrder = createSelector([getRankingData], data => {
  const sortedData = sortBy(data, 'spi').reverse();
  return sortedData.map((d, i) => ({ ...d, index: i + 1 }));
});

const getSortedData = createSelector([getDataWithSPIOrder, getSortRankingCategory], (data, sortRankingCategory) => {
  if(!sortRankingCategory) return data;
  const sortedCategory = sortRankingCategory && sortRankingCategory.split('-')[0].toLowerCase();
  const direction = sortRankingCategory && sortRankingCategory.split('-')[1];
  const sortField = {
    species: 'endemic',
    'human modification': 'veryHigh',
    protection: 'protected'
  };
  const sortedData = sortBy(data, d => d[sortedCategory][sortField[sortedCategory]]);
  return direction === SORT.ASC ? sortedData.reverse() : sortedData;
});

const getScrollPosition = createSelector([getSortedData, getSearchTerm], (data, searchTerm) => {
  if (!data || !searchTerm) return null;
  const index = data.findIndex(d => d.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
  return index;
});

const mapStateToProps = createStructuredSelector({
  data: getSortedData,
  searchTerm: getSearchTerm,
  scrollPosition: getScrollPosition
});

export default mapStateToProps;