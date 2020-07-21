import { createSelector } from 'reselect';

const selectCountryData = ({ countryData }, { countryISO }) => (countryData && countryData.data && countryData.data[countryISO]) || null;
const selectCountryDataLoading = ({ countryData }) => (countryData && countryData.loading) || null;


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

const getTaxa = (taxa) => createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData[taxa];
})
const getEndemicSpecies = (taxa) => createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData[`endemic_${taxa}`];
})

const mapStateToProps = (state, props) => ({
    SPI: getSpeciesProtectionIndex(state, props),
    mean: getSPIMean(state, props),
    birds: getTaxa('birds')(state, props),
    mammals: getTaxa('mammals')(state, props),
    reptiles: getTaxa('reptiles')(state, props),
    amphibians: getTaxa('amphibians')(state, props),
    countryData: selectCountryData(state, props),
    birdsEndemic: getEndemicSpecies('birds')(state, props),
    mammalsEndemic: getEndemicSpecies('mammals')(state, props),
    indexStatement: getIndexStatement(state, props),
    reptilesEndemic: getEndemicSpecies('reptiles')(state, props),
    vertebratesCount: getNumberOfVertebrates(state, props),
    protectionNeeded: getProtectionNeeded(state, props),
    amphibiansEndemic: getEndemicSpecies('amphibians')(state, props),
    currentProtection: getCurrentProtection(state, props),
    countryDescription: getDescription(state, props),
    countryDataLoading: selectCountryDataLoading(state, props),
    endemicVertebratesCount: getNumberOfEndemicVertebrates(state, props)
  }
)
export default mapStateToProps;