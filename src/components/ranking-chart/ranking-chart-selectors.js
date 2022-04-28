import { createStructuredSelector, createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import { SORT_OPTIONS, RANKING_INDICATORS, RANKING_GROUPS_SLUGS, RANKING_INDICATOR_GROUPS } from 'constants/country-mode-constants';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import { LAND_MARINE_OPTIONS } from 'constants/country-mode-constants';
import { getLandMarineSelected } from 'pages/nrc/nrc-selectors';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const getSortRankingCategory = ({ location }) => (location && get(location, 'query.ui.sortRankingCategory')) || null;

const { REACT_APP_FEATURE_MARINE } = process.env;

const getRankingData = createSelector([selectCountriesData], countriesData => {
  if(!countriesData) return null;
  return Object.keys(countriesData).map((iso) => {
    const d = countriesData[iso];
    return {
      [RANKING_INDICATORS.spi]: d[COUNTRY_ATTRIBUTES.SPI_ter],
      [RANKING_INDICATORS.speciesRichness]: d[COUNTRY_ATTRIBUTES.nspecies_richness_ter], // Just for sorting
      name: d.NAME_0,
      iso,
      [RANKING_GROUPS_SLUGS.species]: {
        [RANKING_INDICATORS.nonEndemic]: 100 - (100 * d[COUNTRY_ATTRIBUTES.total_endemic_ter] / d[COUNTRY_ATTRIBUTES.nspecies_richness_ter]),
        [RANKING_INDICATORS.endemic]: (100 * d[COUNTRY_ATTRIBUTES.total_endemic_ter] / d[COUNTRY_ATTRIBUTES.nspecies_richness_ter])
      },
      [RANKING_GROUPS_SLUGS.humanModification]: {
        [RANKING_INDICATORS.veryHigh]: d[COUNTRY_ATTRIBUTES.hm_vh_ter],
        [RANKING_INDICATORS.totalMinusVeryHigh]: REACT_APP_FEATURE_MARINE ? d[COUNTRY_ATTRIBUTES.hm_ter] : 100 - d.prop_hm_very_high - d.prop_hm_0,
        [RANKING_INDICATORS.noModification]: d[COUNTRY_ATTRIBUTES.hm_no_ter]
      },
      [RANKING_GROUPS_SLUGS.protection]: {
        [RANKING_INDICATORS.protected]: d[COUNTRY_ATTRIBUTES.prop_protected_ter],
        [RANKING_INDICATORS.protectionNeeded]: d[COUNTRY_ATTRIBUTES.protection_needed_ter],
        [RANKING_INDICATORS.protectionNotNeeded]: 100 - d[COUNTRY_ATTRIBUTES.protection_needed_ter] - d[COUNTRY_ATTRIBUTES.prop_protected_ter]
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

const getLandMarineOptions = () => LAND_MARINE_OPTIONS;

const getSelectedLandMarineOption = createSelector(
  getLandMarineSelected,
  landMarineSelection => LAND_MARINE_OPTIONS.find(option => option.slug === landMarineSelection) || LAND_MARINE_OPTIONS.find(option => option.slug === 'land')
);

const mapStateToProps = createStructuredSelector({
  data: getSortedData,
  selectedFilterOption: getSelectedFilterOption,
  selectedLandMarineOption: getSelectedLandMarineOption,
  landMarineOptions: getLandMarineOptions
});

export default mapStateToProps;
