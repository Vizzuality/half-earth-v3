import { createSelector, createStructuredSelector } from 'reselect';
import { random } from 'lodash';

const SPECIES_COLOR = {
  birds: '#34BD92',
  mammals: '#92EB58',
  amphibians: '#9873EF',
  reptiles: '#3AA8EE'
}

const selectCountryIso = ({location}) => location.payload.iso.toUpperCase();
const selectScene = ({scene}) => scene;
const selectCountriesData = ({ countryData }) => countryData && countryData.data;
const selectCountryDataLoading = ({ countryData }) => (countryData && countryData.loading) || null;
const getCountryData = createSelector(
  [selectCountriesData, selectCountryIso],
  (countriesData, countryIso) => {
    if (!countryIso || !countriesData) return null;
    return (countriesData && countriesData[countryIso]) || null;
  }
)

const getCountryName = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData.NAME_0;
})

const getDescription = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData.sentence;
})

const getHasPriority = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData.has_priority === 1;
})

const getPriorityAreasSentence = createSelector([getCountryData, getHasPriority], (countryData, hasPriority) => {
  if (!countryData) return null;
  return hasPriority ?
  `The brightly colored map layer presents one possible configuration
  of the additional areas needed to achieve the Half-Earth goal of
  comprehensive terrestrial biodiversity conservation. Higher values
  indicate locations within ${countryData.NAME_0} that contribute more to the
  conservation of species habitat.` :
  `Our global model of comprehensive terrestrial vertebrate biodiversity
  conservation did not identify any areas in ${countryData.NAME_0} in need of additional protection.
  Further expansion of ${countryData.NAME_0}'s protected areas will nonetheless promote resilience towards global biodiversity loss,
  and can contribute to creating a global conservation network with more equity between countries.` ;
})

const getSpeciesProtectionIndex = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData.SPI;
})

const getCurrentProtection = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData.prop_protected));
})

const getProtectionNeeded = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData.protection_needed));
})

const getSPIMean = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData.spi_mean));
})

const getNumberOfVertebrates = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData.N_SPECIES.toLocaleString('en');
})

const getNumberOfEndemicVertebrates = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData.total_endemic.toLocaleString('en');
})

const getHighlightedSpeciesSentence = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return `Here are some example species of significant conservation interest for each taxonomic group.
   These species are either endemic to ${countryData.NAME_0} or have small range sizes`;
})


const getHighlightedSpeciesRandomNumber = createSelector(getCountryData, countryData => {
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

const getTaxa = (taxa) => createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData[taxa];
})
const getEndemicSpecies = (taxa) => createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData[`endemic_${taxa}`];
})
const getSpeciesChartData = createSelector(getCountryData, countryData => {
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
  {name: 'birds', value: birds - endemic_birds, color: SPECIES_COLOR['birds'], explodedSlice: false},
  {name: 'endemic mammals', value: endemic_mammals, color: SPECIES_COLOR['mammals'], explodedSlice: true},
  {name: 'mammals', value: mammals - endemic_mammals, color: SPECIES_COLOR['mammals'], explodedSlice: false},
  {name: 'endemic reptiles', value: endemic_reptiles, color: SPECIES_COLOR['reptiles'], explodedSlice: true},
  {name: 'reptiles', value: reptiles - endemic_reptiles, color: SPECIES_COLOR['reptiles'], explodedSlice: false},
]
  return chartData
})

const mapStateToProps = createStructuredSelector({
  birds: getTaxa('birds'),
  mammals: getTaxa('mammals'),
  hasPriority: getHasPriority,
  reptiles: getTaxa('reptiles'),
  countryData: getCountryData,
  countryName: getCountryName,
  SPI: getSpeciesProtectionIndex,
  amphibians: getTaxa('amphibians'),
  scene: selectScene,
  indexStatement: getIndexStatement,
  // openedModal: getModalOpen,
  countryDescription: getDescription,
  protectionNeeded: getProtectionNeeded,
  speciesChartData: getSpeciesChartData,
  currentProtection: getCurrentProtection,
  vertebratesCount: getNumberOfVertebrates,
  birdsEndemic: getEndemicSpecies('birds'),
  countryDataLoading: selectCountryDataLoading,
  mammalsEndemic: getEndemicSpecies('mammals'),
  reptilesEndemic: getEndemicSpecies('reptiles'),
  amphibiansEndemic: getEndemicSpecies('amphibians'),
  priorityAreasSentence: getPriorityAreasSentence,
  endemicVertebratesSentence: getEndemicSpeciesSentence,
  endemicVertebratesCount: getNumberOfEndemicVertebrates,
  highlightedSpeciesSentence: getHighlightedSpeciesSentence,
  highlightedSpeciesRandomNumber: getHighlightedSpeciesRandomNumber
})

export default mapStateToProps;