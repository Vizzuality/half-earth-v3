import { createSelector, createStructuredSelector } from 'reselect';

import {
  getCountryData,
  getDescription,
  getLandMarineSelected,
} from 'selectors/nrc-selectors';

import sortBy from 'lodash/sortBy';

import {
  getOnboardingType,
  getOnboardingStep,
  getOnWaitingInteraction,
} from 'containers/onboarding/onboarding-selectors';

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

const getAreaChartData = createSelector([getChartData], (chartData) => {
  if (!chartData) return null;
  const { land, marine } = chartData;
  const parsedLandData = parseData(land);
  const parsedMarineData = parseData(marine);
  return { land: parsedLandData, marine: parsedMarineData };
});

export default createStructuredSelector({
  areaChartData: getAreaChartData,

  countryData: getCountryData,
  countryDescription: getDescription,
  landMarineSelection: getLandMarineSelected,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
});
