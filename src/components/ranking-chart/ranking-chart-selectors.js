import { createStructuredSelector, createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import { SORT_OPTIONS, RANKING_INDICATORS, RANKING_GROUPS_SLUGS, RANKING_INDICATOR_GROUPS } from 'constants/country-mode-constants';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const getSortRankingCategory = ({ location }) => (location && get(location, 'query.ui.sortRankingCategory')) || null;

const getRankingData = createSelector([selectCountriesData], countriesData => {
  if(!countriesData) return null;
  return Object.keys(countriesData).map((iso) => {
    const d = countriesData[iso];
    return {
      [RANKING_INDICATORS.spi]: d.SPI_ter,
      [RANKING_INDICATORS.speciesRichness]: d.nspecies_ter, // Just for sorting
      name: d.NAME_0,
      iso,
      [RANKING_GROUPS_SLUGS.species]: {
        [RANKING_INDICATORS.nonEndemic]: 100 - (100 * d.total_endemic_ter / d.nspecies_ter),
        [RANKING_INDICATORS.endemic]: (100 * d.total_endemic_ter / d.nspecies_ter)
      },
      [RANKING_GROUPS_SLUGS.humanModification]: {
        [RANKING_INDICATORS.veryHigh]: d.hm_vh_ter,
        [RANKING_INDICATORS.totalMinusVeryHigh]: d.hm_ter,
        [RANKING_INDICATORS.noModification]: d.hm_no_ter
      },
      [RANKING_GROUPS_SLUGS.protection]: {
        [RANKING_INDICATORS.protected]: d.prop_protected_ter,
        [RANKING_INDICATORS.protectionNeeded]: d.protection_needed_ter,
        [RANKING_INDICATORS.protectionNotNeeded]: 100 - d.protection_needed_ter - d.prop_protected_ter
      }
    };
  });
});

const getDataWithSPIOrder = createSelector([getRankingData], data => {
  const sortedData = sortBy(data, RANKING_INDICATORS.spi).reverse();
  return sortedData.map((d, i) => ({ ...d, index: i + 1 }));
});

const getSortedData = createSelector([getDataWithSPIOrder, getSortRankingCategory], (data, sortRankingCategory) => {
  // SPI sorting is the default order
  if(!sortRankingCategory || sortRankingCategory === RANKING_INDICATORS.spi) return data;
  const sortRankingGroup = RANKING_INDICATOR_GROUPS[sortRankingCategory.slug];
  return sortBy(data, d => sortRankingGroup ? d[sortRankingGroup][sortRankingCategory.slug] : d[sortRankingCategory]).reverse();
});

const getSelectedFilterOption = createSelector([getSortRankingCategory], (sortRankingCategory) => {
  if (!sortRankingCategory) return SORT_OPTIONS[0];
  return SORT_OPTIONS.find(o => o.slug === sortRankingCategory.slug) || SORT_OPTIONS[0];
});

const mapStateToProps = createStructuredSelector({
  data: getSortedData,
  selectedFilterOption: getSelectedFilterOption,
});

export default mapStateToProps;
