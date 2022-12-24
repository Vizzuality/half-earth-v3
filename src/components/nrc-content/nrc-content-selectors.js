import { createStructuredSelector } from 'reselect';

import { getCountryData, getDescription } from 'selectors/nrc-selectors';

import {
  getOnboardingType,
  getOnboardingStep,
  getOnWaitingInteraction,
} from 'containers/onboarding/onboarding-selectors';

export default createStructuredSelector({
  countryData: getCountryData,
  countryDescription: getDescription,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
});
