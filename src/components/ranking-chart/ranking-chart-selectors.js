import { createStructuredSelector, createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import { getSortOptions, RANKING_INDICATORS, RANKING_GROUPS_SLUGS, RANKING_INDICATOR_GROUPS } from 'constants/country-mode-constants';
import { getLandMarineOptions, LAND_MARINE_COUNTRY_ATTRIBUTES } from 'constants/country-mode-constants';
import { getLandMarineSelected } from 'pages/nrc/nrc-selectors';
import { selectLangUrlState } from 'selectors/location-selectors';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const getSortRankingCategory = ({ location }) => (location && get(location, 'query.ui.sortRankingCategory')) || null;

const getRankingData = createSelector([selectCountriesData, getLandMarineSelected], (countriesData, landMarineSelection) => {
  if(!countriesData) return null;
  const attributes = LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection];
  return Object.keys(countriesData)
    .filter((iso) => landMarineSelection === 'marine' ? countriesData[iso].Marine === 'True' : true)
    .map((iso) => {
    const d = countriesData[iso];
    return {
      [RANKING_INDICATORS.spi]: d[attributes.SPI],
      [RANKING_INDICATORS.speciesRichness]: d[attributes.nspecies_richness], // Just for sorting
      name: d.NAME_0,
      iso,
      [RANKING_GROUPS_SLUGS.species]: {
        [RANKING_INDICATORS.nonEndemic]: 100 - (100 * d[attributes.total_endemic] / d[attributes.nspecies_richness]),
        [RANKING_INDICATORS.endemic]: (100 * d[attributes.total_endemic] / d[attributes.nspecies_richness])
      },
      [RANKING_GROUPS_SLUGS.humanModification]: {
        [RANKING_INDICATORS.veryHigh]: d[attributes.hm_vh],
        [RANKING_INDICATORS.totalMinusVeryHigh]: d[attributes.hm],
        [RANKING_INDICATORS.noModification]: d[attributes.hm_no]
      },
      [RANKING_GROUPS_SLUGS.protection]: {
        [RANKING_INDICATORS.protected]: d[attributes.prop_protected],
        [RANKING_INDICATORS.protectionNeeded]: d[attributes.protection_needed],
        [RANKING_INDICATORS.protectionNotNeeded]: 100 - d[attributes.protection_needed] - d[attributes.prop_protected]
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

const getSelectedFilterOption = createSelector([getSortRankingCategory, selectLangUrlState], (sortRankingCategory, locale) => {
  // locale is here to recompute sortOptions when locale changes
  const sortOptions = getSortOptions();
  if (!sortRankingCategory) return sortOptions[0];
  return sortOptions.find(o => o.slug === sortRankingCategory.slug) || sortOptions[0];
});

// locale is here to recompute landmarineOptions
const getCalculatedlandMarineOptions = createSelector(selectLangUrlState, locale => getLandMarineOptions());

const getSelectedLandMarineOption = createSelector(
  [getLandMarineSelected, getCalculatedlandMarineOptions],
  (landMarineSelection, landMarine) => landMarine.find(option => option.slug === landMarineSelection)
);

const mapStateToProps = createStructuredSelector({
  data: getSortedData,
  selectedFilterOption: getSelectedFilterOption,
  selectedLandMarineOption: getSelectedLandMarineOption,
  landMarineOptions: getCalculatedlandMarineOptions
});

export default mapStateToProps;
