import { createSelector, createStructuredSelector } from 'reselect';
import { CONTINENT_COLORS } from 'constants/country-mode-constants';
import { getLocalSceneFilters, getCountryISO } from 'pages/data-globe/data-globe-selectors';
const selectCountriesList = ({ countriesList }) => countriesList.data || null;

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;

const getScatterplotData = createSelector(
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


const mapStateToProps = createStructuredSelector({
  countriesData: selectCountriesData,
  scatterplotData: getScatterplotData
})

export default mapStateToProps;