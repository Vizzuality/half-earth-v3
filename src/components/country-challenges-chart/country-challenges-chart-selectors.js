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

const getSelectedCountryRelations = createSelector(
  [selectCountriesData, getCountryISO],
  (countriesData, selectedCountryIso) => {
    if (!countriesData || !selectedCountryIso) return null;
    return JSON.parse(countriesData[selectedCountryIso].filter_similar)
  }
)

const getFilteredData = createSelector(
  [getScatterplotRawData, getCountryChallengesSelectedFilter, getSelectedCountryRelations],
  (plotRawData, selectedFilter, selectedCountryRelations) => {
    if (!plotRawData) return null;
    if (!selectedFilter || selectedFilter === 'all') return plotRawData;
    const relatedCountries = selectedCountryRelations[selectedFilter];
    return plotRawData.filter(country => relatedCountries.includes(country.iso));
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
    return [0, 100]
  }
)


const mapStateToProps = createStructuredSelector({
  data: getFilteredData,
  xAxisTicks: getXAxisTicks,
  yAxisTicks: getYAxisTicks,
})

export default mapStateToProps;