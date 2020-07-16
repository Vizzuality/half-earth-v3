import { createSelector } from 'reselect';
import { orderBy } from 'lodash';
import { format } from 'd3-format';

const selectCountriesListData = ({ countriesList }) => (countriesList && countriesList.data) || null;
const selectCountryIso = (state, { countryISO }) => countryISO;
const selectCountryData = ({ countryData }, { countryISO }) => (countryData && countryData.data && countryData.data[countryISO]) || null;
const selectCountryDataLoading = ({ countryData }) => (countryData && countryData.loading) || null;

const getCountriesList = createSelector(
  [selectCountriesListData, selectCountryIso], (countriesListData, countryIso) => {
  if (!countriesListData) return null;
  const filteredList = countriesListData.countriesList.filter( country => country.value !== countryIso)
  return orderBy(filteredList, 'name');
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


const getSpeciesProtectionIndex = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData.SPI;
})

const getCurrentProtection = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData.prop_protected));
})

const getProtectionNeeded = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData.protection_needed));
})

const getSPIMean = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData.spi_mean));
})

const getNumberOfVertebrates = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData.N_SPECIES.toLocaleString('en');
})

const getNumberOfEndemicVertebrates = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData.total_endemic.toLocaleString('en');
})

const getIndexStatement = createSelector(
  [getSpeciesProtectionIndex,getSPIMean],
  (SPI, SPIMean) => {
  if (!SPI || !SPIMean) return null;
  const comparation = SPI >=SPIMean ? 'higher' : 'lower';
  return `The index of this country is ${comparation} than the average`;
})

const mapStateToProps = (state, props) => ({
    countriesList: getCountriesList(state, props),
    countryData: selectCountryData(state, props),
    countryDataLoading: selectCountryDataLoading(state, props),
    countryArea: getArea(state, props),
    countryPopulation: getPopulation(state, props),
    grossNationalIncome: getGrossNationalIncome(state, props),
    countryDescription: getDescription(state, props),
    SPI: getSpeciesProtectionIndex(state, props),
    mean: getSPIMean(state, props),
    indexStatement: getIndexStatement(state, props),
    currentProtection: getCurrentProtection(state, props),
    protectionNeeded: getProtectionNeeded(state, props),
    vertebratesCount: getNumberOfVertebrates(state, props),
    endemicVertebratesCount: getNumberOfEndemicVertebrates(state, props),
  }
)
export default mapStateToProps;