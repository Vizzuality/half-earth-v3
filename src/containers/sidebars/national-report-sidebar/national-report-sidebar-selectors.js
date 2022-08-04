import { createSelector, createStructuredSelector } from 'reselect';
import { t } from '@transifex/native';
import { random } from 'lodash';
import { getOnWaitingInteraction } from 'containers/onboarding/onboarding-selectors';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import { selectLangUrlState } from 'selectors/location-selectors';

const SPECIES_COLOR = {
  amphibians: '#34BD92',
  birds: '#FCC44A',
  mammals: '#8B62E9',
  mammals_mar: '#3AA8EE',
  fishes: '#38E5DB',
  reptiles: '#92EB57',
}

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
const selectScene = ({ scene }) => scene;
const selectCountriesData = ({ countryData }) => countryData && countryData.data;
const selectCountryDataLoading = ({ countryData }) => (countryData && countryData.loading) || null;
const getCountryData = createSelector(
  [selectCountriesData, selectCountryIso],
  (countriesData, countryIso) => {
    if (!countryIso || !countriesData) return null;
    return (countriesData && countriesData[countryIso]) || null;
  }
)

// locale is here to recompute the data when the language changes
const getCountryName = createSelector([getCountryData, selectLangUrlState], (countryData, locale) => {
  if (!countryData) return null;
  const countryNames = getCountryName();

  return countryNames(countryData.NAME_0) || countryData.NAME_0;
})

const getDescription = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData.sentence;
})

const getHasPriority = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData.has_priority === 1;
})

// locale is here to recompute the data when the language changes
const getPriorityAreasSentence = createSelector([getCountryData, getHasPriority, selectLangUrlState, getCountryName], (countryData, hasPriority, locale, countryName) => {
  if (!countryData) return null;
  return hasPriority ?
    `${t(`The brightly colored map layer presents one possible configuration
  of the additional areas needed to achieve the Half-Earth goal of
  comprehensive terrestrial biodiversity conservation. Higher values
  indicate locations within `)}${countryName}${t(` that contribute more to the
  conservation of species habitat.`)}` :
    `${t(`Our global model of comprehensive terrestrial vertebrate biodiversity
  conservation did not identify any areas in `)}${countryName}${t(` in need of additional protection.
  Further expansion of `)}${countryName}${t(`'s`)}${t(` protected areas will nonetheless promote resilience towards global biodiversity loss,
  and can contribute to creating a global conservation network with more equity between countries.`)}`;
})

const getSpeciesProtectionIndex = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData[COUNTRY_ATTRIBUTES.SPI_ter];
})

export const getCurrentProtection = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData[COUNTRY_ATTRIBUTES.prop_protected_ter]));
})

export const getCurrentMarineProtection = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData.prop_protected_mar));
})

export const getProtectionNeeded = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData[COUNTRY_ATTRIBUTES.protection_needed_ter]));
})

export const getMarineProtectionNeeded = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData.protection_needed_mar));
})

const getSPIMean = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return Math.round(parseFloat(countryData[COUNTRY_ATTRIBUTES.Global_SPI_ter]));
})

const getNumberOfVertebrates = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData[COUNTRY_ATTRIBUTES.nspecies_ter];
})

const getNumberOfEndemicVertebrates = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  return countryData[COUNTRY_ATTRIBUTES.total_endemic_ter];
})

// locale is here to recompute the data when the language changes
const getHighlightedSpeciesSentence = createSelector([getCountryData, selectLangUrlState], (countryData, locale) => {
  if (!countryData) return null;
  return ` ${t(`Here are some examples of land species of significant conservation interest for each taxonomic group.
  These species are either endemic to `)}${countryData.NAME_0} ${t('or have small range sizes.')}`;
})

const getHighlightedSpeciesRandomNumber = createSelector(getCountryData, countryData => {
  if (!countryData) return null;
  const max = countryData.max_highlited_sp;
  const highlightedSpeciesRandomNumber = random(1, max);
  return highlightedSpeciesRandomNumber;
})

// locale is here to recompute the data when the language changes
const getIndexStatement = createSelector(
  [getSpeciesProtectionIndex, getSPIMean, selectLangUrlState],
  (SPI, SPIMean, locale) => {
    if (!SPI || !SPIMean) return null;
    const comparation = SPI >= SPIMean ? t('higher') : t('lower');
    return `${t('THE INDEX OF THIS COUNTRY IS ')}${comparation} ${t('than the average national SPI: ')}${SPIMean} `
  })

// locale is here to recompute the data when the language changes
const getEndemicSpeciesSentence = createSelector([getNumberOfEndemicVertebrates, selectLangUrlState], (endemicVertebrates, locale) => {
  if (!endemicVertebrates) return null;
  return endemicVertebrates === '1' ? `${endemicVertebrates} ${t('is')}` : `${endemicVertebrates} ${t('are')}`
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
    mammals_mar,
    fishes_mar,
    reptiles,
    amphibians,
    endemic_birds,
    endemic_reptiles,
    endemic_mammals,
    endemic_mammals_mar,
    endemic_fishes_mar,
    endemic_amphibians,
  } = countryData;

  const chartData = [
    { name: 'endemic amphibians', value: endemic_amphibians, color: SPECIES_COLOR['amphibians'], explodedSlice: true },
    { name: 'amphibians', value: amphibians - endemic_amphibians, color: SPECIES_COLOR['amphibians'], explodedSlice: false },
    { name: 'endemic birds', value: endemic_birds, color: SPECIES_COLOR['birds'], explodedSlice: true },
    { name: 'birds', value: birds - endemic_birds, color: SPECIES_COLOR['birds'], explodedSlice: false },
    { name: 'endemic mammals', value: endemic_mammals, color: SPECIES_COLOR['mammals'], explodedSlice: true },
    { name: 'mammals', value: mammals - endemic_mammals, color: SPECIES_COLOR['mammals'], explodedSlice: false },
    { name: 'endemic mammals mar', value: endemic_mammals_mar, color: SPECIES_COLOR['mammals_mar'], explodedSlice: true },
    { name: 'mammals mar', value: mammals_mar - endemic_mammals_mar, color: SPECIES_COLOR['mammals_mar'], explodedSlice: false },
    { name: 'endemic fishes mar', value: endemic_fishes_mar, color: SPECIES_COLOR['fishes'], explodedSlice: true },
    { name: 'fishes mar', value: fishes_mar - endemic_fishes_mar, color: SPECIES_COLOR['fishes'], explodedSlice: false },
    { name: 'endemic reptiles', value: endemic_reptiles, color: SPECIES_COLOR['reptiles'], explodedSlice: true },
    { name: 'reptiles', value: reptiles - endemic_reptiles, color: SPECIES_COLOR['reptiles'], explodedSlice: false },
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
  fishes: getTaxa('fishes_mar'),
  fishesEndemic: getEndemicSpecies('fishes_mar'),
  mammalsMar: getTaxa('mammals_mar'),
  mammalsMarEndemic: getEndemicSpecies('mammals_mar'),
  scene: selectScene,
  indexStatement: getIndexStatement,
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
  highlightedSpeciesRandomNumber: getHighlightedSpeciesRandomNumber,
  waitingInteraction: getOnWaitingInteraction
})

export default mapStateToProps;
