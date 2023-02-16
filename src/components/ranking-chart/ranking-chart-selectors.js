import { createStructuredSelector, createSelector } from 'reselect';

import { roundSPI } from 'utils/data-formatting-utils';

import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import { getLandMarineSelected } from 'pages/nrc/nrc-selectors';

import { SORT } from 'components/header-item';

import {
  RANKING_INDICATORS,
  RANKING_GROUPS_SLUGS,
  LAND_MARINE_COUNTRY_ATTRIBUTES,
} from 'constants/country-mode-constants';

const selectCountriesData = ({ countryData }) =>
  (countryData && countryData.data) || null;
const getCategorySort = ({ location }) =>
  (location && get(location, 'query.ui.categorySort')) || null;

const getRankingData = createSelector(
  [selectCountriesData, getLandMarineSelected],
  (countriesData, landMarineSelection) => {
    if (!countriesData) return null;
    const attributes = LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection];
    return Object.keys(countriesData)
      .filter((iso) =>
        landMarineSelection === 'marine'
          ? countriesData[iso].Marine === 'True'
          : true
      )
      .map((iso) => {
        const d = countriesData[iso];
        return {
          [RANKING_INDICATORS.spi]: roundSPI(d[attributes.SPI]),
          [RANKING_INDICATORS.speciesRichness]: d[attributes.nspecies_richness], // Just for sorting
          name: d.NAME_0,
          iso,
          [RANKING_GROUPS_SLUGS.species]: {
            [RANKING_INDICATORS.nonEndemic]:
              100 -
              (100 * d[attributes.total_endemic]) /
                d[attributes.nspecies_richness],
            [RANKING_INDICATORS.endemic]:
              (100 * d[attributes.total_endemic]) /
              d[attributes.nspecies_richness],
          },
          [RANKING_GROUPS_SLUGS.humanModification]: {
            [RANKING_INDICATORS.veryHigh]: d[attributes.hm_vh],
            [RANKING_INDICATORS.totalMinusVeryHigh]: d[attributes.hm],
            [RANKING_INDICATORS.noModification]: d[attributes.hm_no],
          },
          [RANKING_GROUPS_SLUGS.protection]: {
            [RANKING_INDICATORS.protected]: d[attributes.prop_protected],
            [RANKING_INDICATORS.protectionNeeded]:
              d[attributes.protection_needed],
            [RANKING_INDICATORS.protectionNotNeeded]:
              100 -
              d[attributes.protection_needed] -
              d[attributes.prop_protected],
          },
        };
      });
  }
);

const getDataWithSPIOrder = createSelector([getRankingData], (data) => {
  const sortedData = sortBy(data, RANKING_INDICATORS.spi).reverse();
  return sortedData.map((d, i) => ({ ...d, index: i + 1 }));
});

const getSortedData = createSelector(
  [getDataWithSPIOrder, getCategorySort],
  (data, categorySort) => {
    if (!categorySort) return data;
    // SPI sorting is the default order
    const sortedCategory = categorySort && categorySort.split('-')[0];
    const direction = categorySort && categorySort.split('-')[1];
    const primarySortField = {
      species: 'endemic',
      humanModification: 'veryHigh',
      protection: 'protected',
    }[sortedCategory];
    const secondarySortField = {
      humanModification: 'totalMinusVeryHigh',
      protection: 'protectionNeeded',
    }[sortedCategory];
    const sortedData = sortBy(data, [
      (d) => d[sortedCategory][primarySortField] !== null, // Move the null data to the end
      (d) => d[sortedCategory][primarySortField],
      (d) => d[sortedCategory][secondarySortField],
    ]);
    return direction === SORT.ASC ? sortedData.reverse() : sortedData;
  }
);

const mapStateToProps = createStructuredSelector({
  data: getSortedData,
  categorySort: getCategorySort,
});

export default mapStateToProps;
