import { createSelector } from 'reselect';
import { format } from 'd3-format';

const selectCountriesListData = ({ countriesList }) => (countriesList && countriesList.data) || null;
const selectCountryData = ({ countryData }, { countryISO }) => (countryData && countryData.data && countryData.data[countryISO]) || null;
const selectCountryDataLoading = ({ countryData }) => (countryData && countryData.loading) || null;

const getCountriesList = createSelector(selectCountriesListData, countriesListData => {
  if (!countriesListData) return null;
  return countriesListData.countriesList;
})

const getArea = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const { Area } = countryData;
  if (!Area) return 'data not available'
  const areaFormat = format(",.0f");
  const formatedArea = `${areaFormat(Area)}`;
  return formatedArea;
})

const getPopulation = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const { Population2016 } = countryData;
  if (!Population2016) return 'data not available'
  const valueFormat = population => {
    if (population < 1000000) {
      return population.toLocaleString('en');
    }
    return format(".2f")(population / 1e6);
  };
  const unitFormat = population => {
    if (population > 1000000) {
      return 'million';
    }
    return '';
  }
  const formatedPopulation = `${valueFormat(Population2016)} ${unitFormat(Population2016)} people`;
  return formatedPopulation;
})

const getGrossNationalIncome = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const { GNI_PPP } = countryData;
  if (!GNI_PPP) return 'data not available'
  const GNIFormat = format("$,.2f");
  const formatedGNI = `${GNIFormat(GNI_PPP)} billion`;
  return formatedGNI;
})

const getDescription = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData.sentence;
})

const getNumberOfVertebrates = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData.N_SPECIES.toLocaleString('en');
})

const mapStateToProps = (state, props) => ({
    countriesList: getCountriesList(state, props),
    countryData: selectCountryData(state, props),
    countryDataLoading: selectCountryDataLoading(state, props),
    countryArea: getArea(state, props),
    countryPopulation: getPopulation(state, props),
    grossNationalIncome: getGrossNationalIncome(state, props),
    countryDescription: getDescription(state, props),
    vertebratesCount: getNumberOfVertebrates(state, props)
  }
)
export default mapStateToProps;