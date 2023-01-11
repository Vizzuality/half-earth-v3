import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectLangUrlState,
  selectUiUrlState,
} from 'selectors/location-selectors';
import {
  getCountryData,
  getDescription,
  getLandMarineSelected,
  getCountryChallengesSelectedFilter,
} from 'selectors/nrc-selectors';
import { getNRCSidebarView } from 'selectors/ui-selectors';

import {
  countryChallengesChartFormats,
  countryChallengesSizes,
} from 'utils/data-formatting-utils';

import * as d3 from 'd3';
import kebabCase from 'lodash/kebabCase';
import sortBy from 'lodash/sortBy';

import {
  getOnboardingType,
  getOnboardingStep,
  getOnWaitingInteraction,
} from 'containers/onboarding/onboarding-selectors';

import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import {
  CONTINENT_COLORS,
  getChallengesRelatedFilterOptions,
  LAND_MARINE,
  LAND_MARINE_COUNTRY_ATTRIBUTES,
  getIndicatorLabels,
} from 'constants/country-mode-constants';
import { NRC_UI_DEFAULTS } from 'constants/pages-ui-defaults';

const getChartData = (state, { chartData }) => chartData;

const parseData = (data) => {
  if (!data) return null;
  const parsedData = data.map((i) => {
    return {
      year: i.year.toString(),
      spi: [i.SPI_high, i.SPI_low],
      protected: [
        parseInt(i.percentprotected_high, 10),
        parseInt(i.percentprotected_low, 10),
      ],
    };
  });
  return sortBy(parsedData, ['year']);
};

const selectCountriesData = ({ countryData }) =>
  (countryData && countryData.data) || null;

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();

const getAreaChartData = createSelector([getChartData], (chartData) => {
  if (!chartData) return null;
  const { land, marine } = chartData;
  const parsedLandData = parseData(land);
  const parsedMarineData = parseData(marine);
  return { land: parsedLandData, marine: parsedMarineData };
});

const getScatterplotRawData = createSelector(
  [selectCountriesData, getLandMarineSelected],
  (countriesData, landMarineSelection) => {
    if (!countriesData) return null;
    const attributes = LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection];

    return Object.keys(countriesData)
      .map((key) => {
        const country = countriesData[key];
        const continent = kebabCase(country.continent);

        return {
          continent,
          name: country.NAME_0,
          color: CONTINENT_COLORS[continent] || '#fff',
          iso: country.GID_0,
          size: countryChallengesSizes(
            country[COUNTRY_ATTRIBUTES.Area_Country]
          ),
          xAxisValues: {
            [COUNTRY_ATTRIBUTES.Pop2020]: country[COUNTRY_ATTRIBUTES.Pop2020],
            GNI_PPP: country.GNI_PPP,
            [COUNTRY_ATTRIBUTES.hm_vh_ter]: country[attributes.hm_vh],
            [COUNTRY_ATTRIBUTES.prop_protected_ter]:
              country[attributes.prop_protected],
            [COUNTRY_ATTRIBUTES.protection_needed_ter]:
              country[attributes.protection_needed],
            [COUNTRY_ATTRIBUTES.total_endemic_ter]:
              country[attributes.total_endemic],
            [COUNTRY_ATTRIBUTES.nspecies_ter]: country[attributes.nspecies],
          },
          yAxisValue: country[attributes.SPI],
        };
      })
      .sort((a, b) => b.size - a.size);
  }
);

const getSelectedFilterSlug = createSelector(
  [getCountryChallengesSelectedFilter, getLandMarineSelected],
  (selectedFilter, landMarineSelection) => {
    const options = getChallengesRelatedFilterOptions(landMarineSelection);

    // GNI_PPP is not available for marine
    if (
      selectedFilter === 'filter_GNI_PPP' &&
      landMarineSelection === LAND_MARINE.marine
    ) {
      return options[0].slug;
    }

    if (options.some((o) => o.slug === selectedFilter)) return selectedFilter;

    const neutralFilterName = selectedFilter
      .replace('filter_', '')
      .replace('_mar', '')
      .replace('_ter', '');
    return `filter_${LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection][neutralFilterName]}`;
  }
);

const getSelectedCountryRelations = createSelector(
  [selectCountriesData, selectCountryIso, getLandMarineSelected],
  (countriesData, selectedCountryIso, landMarineSelection) => {
    if (!countriesData || !selectedCountryIso) return null;
    return JSON.parse(
      countriesData[selectedCountryIso][
        `filter_${LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection].similar}`
      ]
    );
  }
);

const getUiSettings = createSelector([selectUiUrlState], (uiUrlState) => {
  return {
    ...NRC_UI_DEFAULTS,
    ...uiUrlState,
  };
});

const getCountryChallengesSelectedKey = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.countryChallengesSelectedKey
);

const getFilteredData = createSelector(
  [
    getScatterplotRawData,
    getSelectedFilterSlug,
    getSelectedCountryRelations,
    getCountryChallengesSelectedKey,
  ],
  (plotRawData, selectedFilter, selectedCountryRelations, selectedKey) => {
    if (!plotRawData) return null;
    if (!selectedFilter || selectedFilter === 'all') return plotRawData;
    const relatedCountries = selectedCountryRelations[selectedFilter];
    const hasNotNullXValue = (country) =>
      country.xAxisValues[selectedKey] ||
      country.xAxisValues[selectedKey] === 0;
    return plotRawData.filter(
      (country) =>
        relatedCountries.includes(country.iso) && hasNotNullXValue(country)
    );
  }
);

const getXAxisTicks = createSelector(
  [getFilteredData, getCountryChallengesSelectedKey],
  (plotData, selectedKey) => {
    if (!plotData || !selectedKey) return null;
    const highValue = d3.max(plotData, (d) => d.xAxisValues[selectedKey]);
    const lowValue = d3.min(plotData, (d) => d.xAxisValues[selectedKey]);
    const formatFunction = countryChallengesChartFormats[selectedKey];
    return [formatFunction(lowValue), formatFunction(highValue)];
  }
);

const getYAxisTicks = createSelector([getFilteredData], (plotData) => {
  if (!plotData) return null;
  return [0, 100];
});

const getChallengesFilterOptions = createSelector(
  [getLandMarineSelected],
  getChallengesRelatedFilterOptions
);

const getXAxisKeys = createSelector(
  [selectCountryIso, getScatterplotRawData, selectLangUrlState],
  // eslint-disable-next-line no-unused-vars
  (countryIso, rawData, locale) => {
    // locale is here to recompute indicatorLabels
    const AllXAxisKeys = Object.keys(getIndicatorLabels());
    if (!rawData) return AllXAxisKeys;
    const countryData = rawData.find((country) => country.iso === countryIso);
    return AllXAxisKeys.filter(
      (key) =>
        countryData.xAxisValues[key] || countryData.xAxisValues[key] === 0
    );
  }
);

const getIndicatorOptions = createSelector(
  [selectCountryIso, getScatterplotRawData, selectLangUrlState],
  // eslint-disable-next-line no-unused-vars
  () => {
    // locale is here to recompute indicatorLabels
    const labels = Object.values(getIndicatorLabels());
    const options = labels.map((l) => ({
      label: l,
    }));

    return options;
  }
);

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
      `filter_${attributes.nspecies}`,
    ];
    return challengesFilterOptions.filter((option) => {
      // GNI_PPP is not available for marine
      if (
        landMarineSelection === LAND_MARINE.marine &&
        option.slug === 'filter_GNI_PPP'
      )
        return false;
      if (!indicatorDependantOptions.includes(option.slug)) return true;
      return keys.some((key) => option.slug.endsWith(key));
    });
  }
);

const getSelectedFilterOption = createSelector(
  [getSelectedFilterSlug, getChallengesFilterOptions],
  (selectedFilter, challengesFilterOptions) =>
    challengesFilterOptions.find((option) => option.slug === selectedFilter)
);

export default createStructuredSelector({
  areaChartData: getAreaChartData,
  challengesFilterOptions: getChallengesDependantFilterOptions,
  countryData: getCountryData,
  countryDescription: getDescription,
  countryChallengesSelectedKey: getCountryChallengesSelectedKey,
  indicatorOptions: getIndicatorOptions,
  landMarineSelection: getLandMarineSelected,
  NRCSidebarView: getNRCSidebarView,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  scatterPlotData: getFilteredData,
  selectedFilterOption: getSelectedFilterOption,
  xAxisTicks: getXAxisTicks,
  yAxisTicks: getYAxisTicks,
  waitingInteraction: getOnWaitingInteraction,
});
