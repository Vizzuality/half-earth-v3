import { createSelector, createStructuredSelector } from 'reselect';
import { CONTINENT_COLORS } from 'constants/country-mode-constants';
import { getCountryChallengesSelectedFilter, getCountryISO } from 'pages/data-globe/data-globe-selectors';
import * as d3 from 'd3';

const mockedSelectedCountryRelations = {
  filter_Area: ["FRA", "BWA", "KEN", "MDG", "UKR", "CAF", "SSD", "SOM", "AFG", "MMR", "ZMB"],
  filter_GNI_PPP: ["CYM", "BLZ", "GNB", "CPV", "ABW", "CAF", "CUW", "BRB", "GMB", "LBR", "GUY"],
  filter_N_SPECIES: ["GHA", "CIV", "GIN", "PHL", "HND", "CAF", "GTM", "MOZ", "ZMB", "LAO", "SSD"],
  filter_Population2016: ["LBR", "IRL", "CRI", "COG", "NOR", "CAF", "PSE", "ERI", "TKM", "SVK", "SGP"],
  filter_SPI: ["NIC", "KOR", "BOL", "TWN", "GAB", "CAF", "ALB", "SSD", "AUS", "UGA", "NER"],
  filter_neigh: ["CMR", "TCD", "SSD", "COG", "COD", "GNQ", "GAB", "SDN", "RWA", "UGA"],
  filter_prop_hm_very_high: ["SDN", "HTI", "MAC", "BRA", "THA", "CAF", "PSE", "ISL", "TZA", "LIE", "XAD"],
  filter_prop_protected: ["YEM", "VUT", "COK", "BLR", "ALA", "CAF", "ARM", "XNC", "IRQ", "PYF", "CHN"],
  filter_protection_needed: ["IND", "ESP", "COG", "TZA", "PSE", "CAF", "ISL", "GUF", "BRA", "SDN", "XKO"],
  filter_steward: ["CMR", "COD", "NGA", "UGA", "SSD", "COG", "GHA", "CIV", "GIN", "AGO"],
  filter_total_endemic: ["MNP", "UKR", "LBY", "BLZ", "TON", "CAF", "TCD", "SGP", "LBR", "GRD", "BRB"],
}

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
    console.log(countriesData[selectedCountryIso].filter_similar)
    console.log(countriesData[selectedCountryIso].filter_similar)
    return JSON.parse(countriesData[selectedCountryIso].filter_similar)
  }
)

const getFilteredData = createSelector(
  [getScatterplotRawData, getCountryChallengesSelectedFilter, getSelectedCountryRelations],
  (plotRawData, selectedFilter, selectedCountryRelations) => {
    console.log(selectedCountryRelations)
    if (!plotRawData) return null;
    if (!selectedFilter || selectedFilter === 'all') return plotRawData;
    const relatedCountries = mockedSelectedCountryRelations[selectedFilter];
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