import { createSelector, createStructuredSelector } from 'reselect';

import { getCountryData, getDescription } from 'selectors/nrc-selectors';
import { getNRCSidebarView } from 'selectors/ui-selectors';

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
      spi: i.SPI_high,
      protected: parseInt(i.percentprotected_high, 10),
    };
  });
  return sortBy(parsedData, ['year']);
};

const getTrendChartData = createSelector([getChartData], (chartData) => {
  if (!chartData) return null;
  const { land, marine } = chartData;
  const parsedLandData = parseData(land);
  const parsedMarineData = parseData(marine);
  return { land: parsedLandData, marine: parsedMarineData };
});

export default createStructuredSelector({
  trendChartData: getTrendChartData,
  countryData: getCountryData,
  countryDescription: getDescription,
  NRCSidebarView: getNRCSidebarView,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
});
