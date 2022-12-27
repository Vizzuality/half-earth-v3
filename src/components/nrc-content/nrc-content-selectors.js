import { createStructuredSelector } from 'reselect';

import {
  getCountryData,
  getDescription,
  getLandMarineSelected,
} from 'selectors/nrc-selectors';

import {
  getOnboardingType,
  getOnboardingStep,
  getOnWaitingInteraction,
} from 'containers/onboarding/onboarding-selectors';

export default createStructuredSelector({
  countryData: getCountryData,
  countryDescription: getDescription,
  landMarineSelection: getLandMarineSelected,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
});
