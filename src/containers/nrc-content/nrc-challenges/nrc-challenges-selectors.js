import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectLangUrlState,
  selectUiUrlState,
} from 'selectors/location-selectors';
import {
  getLandMarineSelected,
  getCountryChallengesSelectedFilter,
} from 'selectors/nrc-selectors';

import {
  countryChallengesChartFormats,
  countryChallengesSizes,
} from 'utils/data-formatting-utils';

import * as d3 from 'd3';
import kebabCase from 'lodash/kebabCase';

import { getOnboardingType } from 'containers/onboarding/onboarding-selectors';

import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import {
  CONTINENT_COLORS,
  getChallengesRelatedFilterOptions,
  LAND_MARINE,
  LAND_MARINE_COUNTRY_ATTRIBUTES,
  getIndicatorLabels,
} from 'constants/country-mode-constants';
import { NRC_UI_DEFAULTS } from 'constants/pages-ui-defaults';

const selectCountriesData = ({ countryData }) =>
  (countryData && countryData.data) || null;

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();

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
    if (
      !countriesData ||
      !selectedCountryIso ||
      !countriesData[selectedCountryIso]
    ) {
      return null;
    }
    let countryRelations = null;
    try {
      countryRelations = JSON.parse(
        countriesData[selectedCountryIso][
          `filter_${LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection].similar}`
        ]
      );
    } catch (e) {
      console.error('Error parsing countries data', e);
    }
    return countryRelations;
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
    if (!plotRawData || !selectedCountryRelations) return null;
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

const getIndicatorOptions = createSelector([], () => {
  const options = Object.entries(getIndicatorLabels()).map((e) => ({
    [e[0]]: e[1],
  }));
  const parsedOptions = options.map((l) => ({
    slug: Object.keys(l)[0],
    label: l[Object.keys(l)[0]],
  }));

  return parsedOptions;
});

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

const getSelectedIndicatorOption = createSelector(
  [getCountryChallengesSelectedKey, getIndicatorOptions],
  (countryChallengesSelectedKey, indicatorOptions) => {
    return indicatorOptions.find(
      (option) => option.slug === countryChallengesSelectedKey
    );
  }
);

export default createStructuredSelector({
  challengesFilterOptions: getChallengesDependantFilterOptions,
  countryChallengesSelectedKey: getCountryChallengesSelectedKey,
  indicatorLabels: getIndicatorLabels,
  indicatorOptions: getIndicatorOptions,
  landMarineSelection: getLandMarineSelected,
  scatterPlotData: getFilteredData,
  selectedIndicatorOption: getSelectedIndicatorOption,
  selectedFilterOption: getSelectedFilterOption,
  xAxisKeys: getXAxisKeys,
  xAxisTicks: getXAxisTicks,
  yAxisTicks: getYAxisTicks,
  onboardingType: getOnboardingType,
});
