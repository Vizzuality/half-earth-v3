import { createSelector, createStructuredSelector } from 'reselect';
import { CONTINENT_COLORS } from 'constants/country-mode-constants';
import { getCountryChallengesSelectedFilter } from 'pages/nrc/nrc-selectors';
import { countryChallengesChartFormats, countryChallengesSizes } from 'utils/data-formatting-utils';
import * as d3 from 'd3';
import {
  INDICATOR_LABELS,
  CHALLENGES_RELATED_FILTERS_OPTIONS,
} from 'constants/country-mode-constants';

const selectCountriesData = ({ countryData }) => (countryData && countryData.data) || null;
const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
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
        size: countryChallengesSizes(country.Area_Country),
        xAxisValues: {
          Pop2020: country.Pop2020,
          GNI_PPP: country.GNI_PPP,
          hm_vh_ter: country.hm_vh_ter,
          prop_protected_ter: country.prop_protected_ter,
          protection_needed_ter: country.protection_needed_ter,
          total_endemic_ter: country.total_endemic_ter,
          nspecies_ter: country.nspecies_ter
        },
        yAxisValue: country.SPI_ter
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
  [selectCountriesData, selectCountryIso],
  (countriesData, selectedCountryIso) => {
    if (!countriesData || !selectedCountryIso) return null;
    return JSON.parse(countriesData[selectedCountryIso].filter_similar_ter)
  }
)

const getFilteredData = createSelector(
  [
    getScatterplotRawData,
    getCountryChallengesSelectedFilter,
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

const getChallengesFilterOptions = createSelector(
  [getXAxisKeys],
  (keys) => {
    if (!keys) return [];
    const indicatorDependantOptions = [
      'filter_Pop2020',
      'filter_hm_vh_ter',
      'filter_GNI_PPP',
      'filter_total_endemic_ter',
      'filter_nspecies_ter'
    ];

    return CHALLENGES_RELATED_FILTERS_OPTIONS.filter((option) => {
      if (!indicatorDependantOptions.includes(option.slug)) return true;
      return keys.some(key => option.slug.endsWith(key));
    });
  }
);

const getSelectedFilterOption = createSelector(
  getCountryChallengesSelectedFilter,
  selectedFilter => CHALLENGES_RELATED_FILTERS_OPTIONS.find(option => option.slug === selectedFilter)
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
  challengesFilterOptions: getChallengesFilterOptions
});

export default mapStateToProps;
