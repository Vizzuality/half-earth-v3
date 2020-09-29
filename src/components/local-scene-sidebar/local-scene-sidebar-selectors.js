import { createSelector, createStructuredSelector } from 'reselect';
import { random } from 'lodash';

const SPECIES_COLOR = {
  birds: '#34BD92',
  mammals: '#92EB58',
  amphibians: '#9873EF',
  reptiles: '#3AA8EE'
}

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

const getHighlightedSpeciesRandomNumber = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const max = countryData.max_highlited_sp;
  const highlightedSpeciesRandomNumber = random(1, max);
  return highlightedSpeciesRandomNumber;
})

const getIndexStatement = createSelector(
  [getSpeciesProtectionIndex,getSPIMean],
  (SPI, SPIMean) => {
  if (!SPI || !SPIMean) return null;
  const comparation = SPI >=SPIMean ? 'higher' : 'lower';
  return `THE INDEX OF THIS COUNTRY IS ${comparation} than the average national SPI: ${SPIMean} `
})

const getEndemicSpeciesSentence = createSelector(getNumberOfEndemicVertebrates, endemicVertebrates => {
  if (!endemicVertebrates) return null;
  return endemicVertebrates === '1' ? `${endemicVertebrates} is` : `${endemicVertebrates} are`
})

const getTaxa = (taxa) => createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData[taxa];
})
const getEndemicSpecies = (taxa) => createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData[`endemic_${taxa}`];
})
const getSpeciesChartData = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;

const {
  birds,
  mammals,
  reptiles,
  amphibians,
  endemic_birds,
  endemic_reptiles,
  endemic_mammals,
  endemic_amphibians
} = countryData;


const chartData = [
  {name: 'endemic amphibians', value: endemic_amphibians, color: SPECIES_COLOR['amphibians'], explodedSlice: true},
  {name: 'amphibians', value: amphibians - endemic_amphibians, color: SPECIES_COLOR['amphibians'], explodedSlice: false},
  {name: 'endemic birds', value: endemic_birds, color: SPECIES_COLOR['birds'], explodedSlice: true},
  {name: 'endemic birds', value: birds - endemic_birds, color: SPECIES_COLOR['birds'], explodedSlice: false},
  {name: 'endemic mammals', value: endemic_mammals, color: SPECIES_COLOR['mammals'], explodedSlice: true},
  {name: 'endemic mammals', value: mammals - endemic_mammals, color: SPECIES_COLOR['mammals'], explodedSlice: false},
  {name: 'endemic reptiles', value: endemic_reptiles, color: SPECIES_COLOR['reptiles'], explodedSlice: true},
  {name: 'endemic reptiles', value: reptiles - endemic_reptiles, color: SPECIES_COLOR['reptiles'], explodedSlice: false},
]

  return chartData
})

const mapStateToProps = createStructuredSelector({
  SPI: getSpeciesProtectionIndex,
  birds: getTaxa('birds'),
  mammals: getTaxa('mammals'),
  reptiles: getTaxa('reptiles'),
  amphibians: getTaxa('amphibians'),
  countryData: selectCountryData,
  birdsEndemic: getEndemicSpecies('birds'),
  mammalsEndemic: getEndemicSpecies('mammals'),
  indexStatement: getIndexStatement,
  reptilesEndemic: getEndemicSpecies('reptiles'),
  vertebratesCount: getNumberOfVertebrates,
  protectionNeeded: getProtectionNeeded,
  speciesChartData: getSpeciesChartData,
  amphibiansEndemic: getEndemicSpecies('amphibians'),
  currentProtection: getCurrentProtection,
  countryDescription: getDescription,
  countryDataLoading: selectCountryDataLoading,
  endemicVertebratesCount: getNumberOfEndemicVertebrates,
  endemicVertebratesSentence: getEndemicSpeciesSentence,
  highlightedSpeciesRandomNumber: getHighlightedSpeciesRandomNumber
})

export default mapStateToProps;