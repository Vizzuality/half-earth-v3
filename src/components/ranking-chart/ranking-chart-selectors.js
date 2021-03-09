import { createStructuredSelector, createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import { SORT_OPTIONS } from './ranking-chart-component';

export const RANKING_INDICATORS = {
  spi: 'spi',
  nonEndemic: 'nonEndemic',
  endemic: 'endemic',
  veryHigh: 'veryHigh',
  totalMinusVeryHigh: 'totalMinusVeryHigh',
  noModification: 'noModification',
  protected: 'protected',
  protectionNeeded: 'protectionNeeded',
  protectionNotNeeded: 'protectionNotNeeded',
};

export const RANKING_GROUPS_SLUGS = {
  species: 'species',
  humanModification: 'human modification',
  protection: 'protection'
};

const RANKING_INDICATOR_GROUPS = {
  [RANKING_INDICATORS.nonEndemic]: RANKING_GROUPS_SLUGS.species,
  [RANKING_INDICATORS.endemic]: RANKING_GROUPS_SLUGS.species,
  [RANKING_INDICATORS.veryHigh]: RANKING_GROUPS_SLUGS.humanModification,
  [RANKING_INDICATORS.totalMinusVeryHigh]: RANKING_GROUPS_SLUGS.humanModification,
  [RANKING_INDICATORS.noModification]: RANKING_GROUPS_SLUGS.humanModification,
  [RANKING_INDICATORS.protected]: RANKING_GROUPS_SLUGS.protection,
  [RANKING_INDICATORS.protectionNeeded]: RANKING_GROUPS_SLUGS.protection,
  [RANKING_INDICATORS.protectionNotNeeded]: RANKING_GROUPS_SLUGS.protection
};

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const getSortRankingCategory = ({ location }) => (location && get(location, 'query.ui.sortRankingCategory')) || null;
const getSearchTerm = ({ location }) => (location && get(location, 'query.ui.rankingSearch')) || null;

const getRankingData = createSelector([selectCountriesData], countriesData => {
  if(!countriesData) return null;
  return Object.keys(countriesData).map((iso) => {
    const d = countriesData[iso];
    return {
      spi: d.SPI,
      name: d.NAME_0,
      iso,
      [RANKING_GROUPS_SLUGS.species]: {
        [RANKING_INDICATORS.nonEndemic]: 100 - (100 * d.total_endemic / d.nspecies),
        [RANKING_INDICATORS.endemic]: (100 * d.total_endemic / d.nspecies)
      },
      [RANKING_GROUPS_SLUGS.humanModification]: {
        [RANKING_INDICATORS.veryHigh]: d.prop_hm_very_high,
        [RANKING_INDICATORS.totalMinusVeryHigh]: 100 - d.prop_hm_very_high - d.prop_hm_0,
        [RANKING_INDICATORS.noModification]: d.prop_hm_0
      },
      [RANKING_GROUPS_SLUGS.protection]: {
        [RANKING_INDICATORS.protected]: d.prop_protected,
        [RANKING_INDICATORS.protectionNeeded]: d.protection_needed,
        [RANKING_INDICATORS.protectionNotNeeded]: 100 - d.protection_needed - d.prop_protected
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
  // SPI sorting is the default order
  if (sortRankingCategory === RANKING_GROUPS_SLUGS.spi) return data;
  const sortRankingGroup = RANKING_INDICATOR_GROUPS[sortRankingCategory];
  return sortBy(data, d => sortRankingGroup ? d[sortRankingGroup][sortRankingCategory] : d[sortRankingCategory]).reverse();
});

const getScrollPosition = createSelector([getSortedData, getSearchTerm], (data, searchTerm) => {
  if (!data || !searchTerm) return null;
  const index = data.findIndex(d => d.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
  return index;
});

const getSelectedFilterOption = createSelector([getSortRankingCategory], (sortRankingCategory) => {
  if (!sortRankingCategory) return SORT_OPTIONS[0];
  return SORT_OPTIONS.find(o => o.slug === sortRankingCategory) || SORT_OPTIONS[0];
});

const mapStateToProps = createStructuredSelector({
  data: getSortedData,
  searchTerm: getSearchTerm,
  selectedFilterOption: getSelectedFilterOption,
  scrollPosition: getScrollPosition
});

export default mapStateToProps;