import { createSelector, createStructuredSelector } from 'reselect';
import { CONTINENT_COLORS } from 'constants/country-mode-constants';
import { getCountryChallengesSelectedFilter, getLandMarineSelected } from 'pages/nrc/nrc-selectors';
import { countryChallengesChartFormats, countryChallengesSizes } from 'utils/data-formatting-utils';
import * as d3 from 'd3';
import {
  INDICATOR_LABELS,
  getChallengesRelatedFilterOptions,
  LAND_MARINE,
  LAND_MARINE_OPTIONS,
  LAND_MARINE_COUNTRY_ATTRIBUTES
} from 'constants/country-mode-constants';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
const getCountryChallengesSelectedKey = (state, props) => props && props.countryChallengesSelectedKey;

const getSelectedFilterSlug = createSelector([getCountryChallengesSelectedFilter, getLandMarineSelected], (selectedFilter, landMarineSelection) => {
  const options = getChallengesRelatedFilterOptions(landMarineSelection);

  // GNI_PPP is not available for marine
  if (selectedFilter === 'filter_GNI_PPP' && landMarineSelection === LAND_MARINE.marine) {
    return options[0].slug;
  }

  if (options.some(o => o.slug === selectedFilter)) return selectedFilter;

  const neutralFilterName = selectedFilter.replace('filter_', '').replace('_mar', '').replace('_ter', '');
  return `filter_${LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection][neutralFilterName]}`;
});

const getScatterplotRawData = createSelector(
  [selectCountriesData, getLandMarineSelected],
  (countriesData, landMarineSelection) => {
    if (!countriesData) return null;
    const attributes = LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection];

    return Object.keys(countriesData).map((key) => {
      const country = countriesData[key];
      return {
        continent: country.continent,
        name: country.NAME_0,
        color: CONTINENT_COLORS[country.continent] || '#fff',
        iso: country.GID_0,
        size: countryChallengesSizes(country[COUNTRY_ATTRIBUTES.Area_Country]),
        xAxisValues: {
          [COUNTRY_ATTRIBUTES.Pop2020]: country[COUNTRY_ATTRIBUTES.Pop2020],
          GNI_PPP: country.GNI_PPP,
          [COUNTRY_ATTRIBUTES.hm_vh_ter]: country[attributes.hm_vh],
          [COUNTRY_ATTRIBUTES.prop_protected_ter]: country[attributes.prop_protected],
          [COUNTRY_ATTRIBUTES.protection_needed_ter]: country[attributes.protection_needed],
          [COUNTRY_ATTRIBUTES.total_endemic_ter]: country[attributes.total_endemic],
          [COUNTRY_ATTRIBUTES.nspecies_ter]: country[attributes.nspecies]
        },
        yAxisValue: country[attributes.SPI]
      }
        }).sort((a, b) => (b.size - a.size))
  }
)

const getXAxisKeys = createSelector(
  [selectCountryIso, getScatterplotRawData],
  (countryIso, rawData) => {
  const AllXAxisKeys = Object.keys(INDICATOR_LABELS);
  if (!rawData) return AllXAxisKeys;
  const countryData = rawData.find(country => country.iso === countryIso);
  return AllXAxisKeys.filter(
    (key) => countryData.xAxisValues[key] || countryData.xAxisValues[key] === 0
  );
});

const getSelectedCountryRelations = createSelector(
  [selectCountriesData, selectCountryIso, getLandMarineSelected],
  (countriesData, selectedCountryIso, landMarineSelection) => {
    if (!countriesData || !selectedCountryIso) return null;
    return JSON.parse(countriesData[selectedCountryIso][`filter_${LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection].similar}`])
  }
)

const getFilteredData = createSelector(
  [
    getScatterplotRawData,
    getSelectedFilterSlug,
    getSelectedCountryRelations,
    getCountryChallengesSelectedKey
  ],
  (plotRawData, selectedFilter, selectedCountryRelations, selectedKey) => {
    if (!plotRawData) return null;
    if (!selectedFilter || selectedFilter === 'all') return plotRawData;
    const relatedCountries = selectedCountryRelations[selectedFilter];
    const hasNotNullXValue = (country) => (
      country.xAxisValues[selectedKey] ||
      country.xAxisValues[selectedKey] === 0
    );
    return plotRawData.filter(
      (country) => relatedCountries.includes(country.iso) && hasNotNullXValue(country)
    );
  }
);

const getChallengesFilterOptions = createSelector([getLandMarineSelected], getChallengesRelatedFilterOptions);

const getChallengesDependantFilterOptions = createSelector(
  [getXAxisKeys, getLandMarineSelected, getChallengesFilterOptions],
  (keys, landMarineSelection, challengesFilterOptions) => {
    if (!keys) return [];
    const attributes = LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection];
    const indicatorDependantOptions = [
      `filter_${COUNTRY_ATTRIBUTES.Pop2020}`,
      `filter_${attributes.hm_vh}`,
      'filter_GNI_PPP',
      `filter_${attributes.total_endemic}`,
      `filter_${attributes.nspecies}`
    ];
    return challengesFilterOptions.filter((option) => {
      // GNI_PPP is not available for marine
      if (landMarineSelection === LAND_MARINE.marine && option.slug === 'filter_GNI_PPP') return false;
      if (!indicatorDependantOptions.includes(option.slug)) return true;
      return keys.some(key => option.slug.endsWith(key));
    });
  }
);

const getLandMarineOptions = () => LAND_MARINE_OPTIONS;

const getSelectedFilterOption = createSelector(
  [getSelectedFilterSlug, getChallengesFilterOptions],
  (selectedFilter, challengesFilterOptions) => challengesFilterOptions.find(option => option.slug === selectedFilter)
);

const getSelectedLandMarineOption = createSelector(
  getLandMarineSelected,
  landMarineSelection => LAND_MARINE_OPTIONS.find(option => option.slug === landMarineSelection)
);

const getXAxisTicks = createSelector(
  [getFilteredData, getCountryChallengesSelectedKey],
  (plotData, selectedKey) => {
    if (!plotData || !selectedKey) return null;
    const highValue = d3.max(plotData, d => d.xAxisValues[selectedKey])
    const lowValue = d3.min(plotData, d => d.xAxisValues[selectedKey])
    const formatFunction = countryChallengesChartFormats[selectedKey];
    return [
      formatFunction(lowValue),
      formatFunction(highValue)
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
  xAxisKeys: getXAxisKeys,
  xAxisTicks: getXAxisTicks,
  yAxisTicks: getYAxisTicks,
  selectedFilterOption: getSelectedFilterOption,
  selectedLandMarineOption: getSelectedLandMarineOption,
  challengesFilterOptions: getChallengesDependantFilterOptions,
  landMarineOptions: getLandMarineOptions
});

export default mapStateToProps;
