import { createStructuredSelector, createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const getRankingData = createSelector([selectCountriesData], countriesData => {
  if(!countriesData) return null;
  return Object.keys(countriesData).map((iso) => {
    const d = countriesData[iso];
    return {
      spi: d.SPI,
      name: d.NAME_0,
      species: {
        nonEndemic: 1 - (d.nspecies - d.total_endemic / d.nspecies) * 100,
        endemic: 1 - (d.total_endemic / d.nspecies) * 100
      },
      humanModification: {
        totalMinusVeryHigh: 100 - d.HM_very_high,
        veryHigh: d.HM_very_high
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

const mapStateToProps = createStructuredSelector({
  data: getDataWithSPIOrder
});

export default mapStateToProps;