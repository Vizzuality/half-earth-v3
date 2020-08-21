import { createSelector, createStructuredSelector } from 'reselect';
import { CONTINENT_COLORS } from 'constants/country-mode-constants';
import { getCountryChallengesSelectedFilter, getCountryISO } from 'pages/data-globe/data-globe-selectors';
import * as d3 from 'd3';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;

const getCountryChallengesSelectedKey = (state, props) => props && props.countryChallengesSelectedKey;

const getScatterplotRawData = createSelector(
  [selectCountriesData],
  countriesData => {
    if (!countriesData) return null;
    return Object.keys(countriesData).map((key) => {
      const country = countriesData[key];
      return {
        continent: country.continent,
        name: country.NAME_0,
        color: CONTINENT_COLORS[country.continent] || '#fff',
        iso: country.GID_0,
        xAxisValues: {
          Population2016: country.Population2016,
          GNI_PPP: country.GNI_PPP,
          prop_hm_very_high: country.prop_hm_very_high,
          total_endemic: country.total_endemic,
          N_SPECIES: country.N_SPECIES
        },
        yAxisValue: country.SPI
      }
        })
  }
)

const getSelectedCountryFilters = createSelector(
  [selectCountriesData, getCountryISO],
  (countriesData, selectedCountryIso) => {
    if (!countriesData || !selectedCountryIso) return null;
    console.log(countriesData[selectedCountryIso].filter_similar)
    console.log(countriesData[selectedCountryIso].filter_similar)
    return JSON.parse(countriesData[selectedCountryIso].filter_similar)
  }
)

//FILTERS:
// filter_Area
// filter_Population2016
// filter_prop_protected
// filter_prop_hm_very_high
// filter_protection_needed
// filter_GNI_PPP
// filter_total_endemic
// filter_N_SPECIES
// filter_SPI
// filter_neigh
// filter_steward

const getFilteredData = createSelector(
  [getScatterplotRawData, getCountryChallengesSelectedFilter, getSelectedCountryFilters],
  (plotRawData, selectedFilter, selectedCountryFilters) => {
    console.log(selectedCountryFilters)
    if (!plotRawData) return null;
    if (!selectedFilter || selectedFilter === 'all') return plotRawData;
    return plotRawData;
  }
)

const getXAxisTicks = createSelector(
  [getFilteredData, getCountryChallengesSelectedKey],
  (plotData, selectedKey) => {
    if (!plotData || !selectedKey) return null;
    return [
      d3.min(plotData, d => d.xAxisValues[selectedKey]),
      d3.max(plotData, d => d.xAxisValues[selectedKey])
    ]
  }
)

const getYAxisTicks = createSelector(
  [getFilteredData],
  (plotData) => {
    if (!plotData) return null;
    return [
      d3.min(plotData, d => d.yAxisValue),
      d3.max(plotData, d => d.yAxisValue)
    ]
  }
)


const mapStateToProps = createStructuredSelector({
  data: getFilteredData,
  xAxisTicks: getXAxisTicks,
  yAxisTicks: getYAxisTicks,
})

export default mapStateToProps;