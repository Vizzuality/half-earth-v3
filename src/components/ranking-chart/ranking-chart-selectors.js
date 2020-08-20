import { createStructuredSelector, createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import { SORT } from './ranking-chart';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const getSortRankingCategory = (_, props) => (props && props.sortRankingCategory) || null;
const getRankingData = createSelector([selectCountriesData], countriesData => {
  if(!countriesData) return null;
  console.log(countriesData)
  return Object.keys(countriesData).map((iso) => {
    const d = countriesData[iso];
    return {
      spi: d.SPI,
      name: d.NAME_0,
      species: {
        nonEndemic: 100 - (100 * d.total_endemic / d.nspecies),
        endemic: (100 * d.total_endemic / d.nspecies)
      },
      human: {
        veryHigh: d.prop_hm_very_high,
        totalMinusVeryHigh: 100 - d.prop_hm_very_high
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
  console.log(sortRankingCategory)
  const sortedCategory = sortRankingCategory && sortRankingCategory.split('-')[0].toLowerCase();
  const direction = sortRankingCategory && sortRankingCategory.split('-')[1];
  const sortField = {
    species: 'endemic',
    human: 'veryHigh',
    protection: 'protected'
  };
  const sortedData = sortBy(data, d => d[sortedCategory][sortField[sortedCategory]]);
  return direction === SORT.ASC ? sortedData.reverse() : sortedData;
});

const mapStateToProps = createStructuredSelector({
  data: getSortedData
});

export default mapStateToProps;