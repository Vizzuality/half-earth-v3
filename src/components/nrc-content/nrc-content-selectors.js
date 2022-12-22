import { createStructuredSelector } from 'reselect';

import {
  getOnboardingType,
  getOnboardingStep,
  getOnWaitingInteraction,
} from 'containers/onboarding/onboarding-selectors';

export default createStructuredSelector({
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
});
